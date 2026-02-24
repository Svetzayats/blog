// .github/scripts/sync-quotes.js
// Syncs quotes from Google Drive to src/content/quotes/
// Checks modification timestamps first to avoid unnecessary work.

import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';

// ── CONFIG ──────────────────────────────────────────────────────────────────

const META_PATH = 'quotes-meta.json';
const OUTPUT_DIR = 'src/content/quotes';

// ── AUTH ────────────────────────────────────────────────────────────────────

const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
const auth = new google.auth.GoogleAuth({
  credentials: serviceAccountKey,
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
});
const drive = google.drive({ version: 'v3', auth });

// ── HELPERS ─────────────────────────────────────────────────────────────────

function loadMeta() {
  if (fs.existsSync(META_PATH)) {
    return JSON.parse(fs.readFileSync(META_PATH, 'utf8'));
  }
  return { files: {} };
}

function saveMeta(meta) {
  fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));
}

function slugify(str) {
  const cyrillicMap = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh',
    'з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o',
    'п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'kh','ц':'ts',
    'ч':'ch','ш':'sh','щ':'shch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya',
  };
  return str
    .toLowerCase()
    .replace(/[а-яё]/g, c => cyrillicMap[c] || c)
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

// Parse a single quote block: ---\nfrontmatter\n---\nbody
// Robust against trailing spaces on lines and blank lines within frontmatter.
function parseQuoteBlock(block) {
  // Normalize: strip trailing whitespace from every line
  const normalized = block.split('\n').map(l => l.trimEnd()).join('\n').trim();

  // Allow optional blank lines before closing --- of frontmatter
  const match = normalized.match(/^---\n([\s\S]*?)\n\s*---\n+([\s\S]*)$/);
  if (!match) return null;

  const frontmatterRaw = match[1];
  const body = match[2].trim();
  if (!body) return null;

  // Simple YAML parser — trims each line before matching to handle leading spaces
  const frontmatter = {};
  for (const line of frontmatterRaw.split('\n')) {
    const kv = line.trim().match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    const [, key, val] = kv;

    if (key === 'tags') {
      frontmatter.tags = val
        .replace(/[\[\]]/g, '')
        .split(',')
        .map(t => t.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean);
    } else if (key === 'favorite') {
      frontmatter.favorite = val.trim() === 'true';
    } else {
      frontmatter[key] = val.trim().replace(/^["']|["']$/g, '');
    }
  }

  // Generate a slug from author + first few words of body
  const bodySlug = slugify(body.split(/\s+/).slice(0, 6).join(' '));
  const authorSlug = slugify(frontmatter.author || '');
  const slug = `${authorSlug}-${bodySlug}`;

  return { frontmatter, body, slug };
}

function buildMarkdownFile({ frontmatter, body }) {
  const tags = frontmatter.tags?.length
    ? `[${frontmatter.tags.map(t => `"${t}"`).join(', ')}]`
    : '[]';

  const lines = [
    '---',
    `author: "${frontmatter.author || ''}"`,
  ];
  if (frontmatter.source) lines.push(`source: "${frontmatter.source}"`);
  lines.push(`tags: ${tags}`);
  if (frontmatter.comment) lines.push(`comment: "${frontmatter.comment.replace(/"/g, '\\"')}"`);
  if (frontmatter.date) lines.push(`date: ${frontmatter.date}`);
  if (frontmatter.favorite) lines.push(`favorite: true`);
  lines.push('---', '', body);

  return lines.join('\n');
}

// Splits a multi-quote .md file on `___` separators between quote blocks.
// Each block is a self-contained ---frontmatter---\nbody chunk.
function splitMultiQuoteFile(content) {
  return content
    .split(/\n___\n/)
    .map(b => b.trim())
    .filter(Boolean);
}

// ── MAIN ────────────────────────────────────────────────────────────────────

async function main() {
  const meta = loadMeta();
  const fileIds = { files: {} };
  let hasChanges = false;

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // ── 1. Main quotes.md file ────────────────────────────────────────────────
  if (process.env.QUOTES_FILE_ID) {
    const fileId = process.env.QUOTES_FILE_ID;
    const { data: fileMeta } = await drive.files.get({
      fileId,
      fields: 'id, name, modifiedTime',
    });

    fileIds.files[fileId] = fileMeta.modifiedTime;

    if (meta.files[fileId] !== fileMeta.modifiedTime) {
      console.log(`Main quotes file changed (${fileMeta.modifiedTime}), downloading…`);
      hasChanges = true;

      const res = await drive.files.export(
        { fileId, mimeType: 'text/plain' },
        { responseType: 'text' }
      );
      // Note: for regular (non-Docs) files use get with alt=media instead:
      // const res = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'text' });

      const content = res.data;
      const blocks = splitMultiQuoteFile(content);

      for (const block of blocks) {
        const parsed = parseQuoteBlock(block);
        if (!parsed) {
          console.warn('Could not parse block, skipping:', block.slice(0, 80));
          continue;
        }
        const filename = `${parsed.slug}.md`;
        const filepath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filepath, buildMarkdownFile(parsed));
        console.log(`  wrote ${filename}`);
      }
    } else {
      console.log('Main quotes file unchanged, skipping.');
    }
  }

  // ── 2. Individual quote files in folder ───────────────────────────────────
  if (process.env.QUOTES_FOLDER_ID) {
    const folderId = process.env.QUOTES_FOLDER_ID;

    const { data: folderMeta } = await drive.files.get({
      fileId: folderId,
      fields: 'id, modifiedTime',
    });

    fileIds.files[folderId] = folderMeta.modifiedTime;

    if (meta.files[folderId] !== folderMeta.modifiedTime) {
      console.log('Quotes folder changed, scanning files…');
      hasChanges = true;

      const { data: list } = await drive.files.list({
        q: `'${folderId}' in parents and trashed = false and mimeType = 'text/plain'`,
        fields: 'files(id, name, modifiedTime)',
      });

      for (const file of list.files) {
        const lastMod = meta.files[file.id];
        if (lastMod === file.modifiedTime) {
          console.log(`  ${file.name} unchanged, skipping.`);
          fileIds.files[file.id] = file.modifiedTime;
          continue;
        }

        console.log(`  downloading ${file.name}…`);
        const res = await drive.files.get(
          { fileId: file.id, alt: 'media' },
          { responseType: 'text' }
        );

        const parsed = parseQuoteBlock(res.data.trim());
        if (!parsed) {
          console.warn(`  could not parse ${file.name}, skipping.`);
          continue;
        }

        // Use the Drive filename (minus .md) as slug basis, falling back to generated
        const baseSlug = file.name.replace(/\.md$/i, '');
        const slug = slugify(baseSlug) || parsed.slug;
        const filepath = path.join(OUTPUT_DIR, `${slug}.md`);
        fs.writeFileSync(filepath, buildMarkdownFile(parsed));
        console.log(`  wrote ${slug}.md`);

        fileIds.files[file.id] = file.modifiedTime;
      }
    } else {
      console.log('Quotes folder unchanged, skipping.');
    }
  }

  if (hasChanges) {
    saveMeta(fileIds);
    console.log('quotes-meta.json updated.');
  } else {
    console.log('Nothing changed. No commit needed.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

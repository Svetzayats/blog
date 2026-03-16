import { Tldraw, getSnapshot, loadSnapshot, createTLStore, defaultShapeUtils } from 'tldraw'
import { useState, useRef, useMemo, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Editor } from 'tldraw'
import 'tldraw/tldraw.css'

type SaveState = 'idle' | 'saving' | 'saved' | 'error'
type LoadState = 'idle' | 'loading' | 'error'
type CanvasMeta = { slug: string; title: string }

export default function CanvasEditor() {
  const editorRef = useRef<Editor | null>(null)
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [saveError, setSaveError] = useState('')
  const [loadState, setLoadState] = useState<LoadState>('idle')
  const [loadError, setLoadError] = useState('')
  const [initialSnapshot, setInitialSnapshot] = useState<unknown>(null)
  const [canvasList, setCanvasList] = useState<CanvasMeta[]>([])

  const storeKey = useRef(0)

  const store = useMemo(() => {
    const s = createTLStore({ shapeUtils: defaultShapeUtils })
    if (initialSnapshot) {
      loadSnapshot(s, initialSnapshot as any)
    }
    return s
  }, [initialSnapshot])

  useEffect(() => {
    supabase
      .from('canvases')
      .select('slug, title')
      .order('updated_at', { ascending: false })
      .then(({ data }) => {
        if (data) setCanvasList(data)
      })
  }, [])

  async function handleLoad() {
    if (!slug.trim()) {
      setLoadError('Enter a slug to load')
      return
    }
    setLoadState('loading')
    setLoadError('')

    const { data, error } = await supabase
      .from('canvases')
      .select('snapshot, title')
      .eq('slug', slug)
      .maybeSingle()

    if (error || !data) {
      setLoadError(error?.message ?? 'Canvas not found')
      setLoadState('error')
      return
    }

    storeKey.current += 1
    setTitle(data.title)
    setInitialSnapshot(data.snapshot)
    setLoadState('idle')
    setLoadError('')
  }

  async function handleSave() {
    if (!editorRef.current) return
    if (!slug.trim()) { setSaveError('Slug is required'); return }
    if (!title.trim()) { setSaveError('Title is required'); return }

    const slugValid = /^[a-z0-9-]+$/.test(slug)
    if (!slugValid) {
      setSaveError('Slug: lowercase letters, numbers, hyphens only')
      return
    }

    setSaveState('saving')
    setSaveError('')

    const snapshot = getSnapshot(editorRef.current.store)

    const { error } = await supabase
      .from('canvases')
      .upsert(
        { slug, title, snapshot, updated_at: new Date().toISOString() },
        { onConflict: 'slug' }
      )

    if (error) {
      setSaveError(error.message)
      setSaveState('error')
    } else {
      setSaveState('saved')
      setTimeout(() => setSaveState('idle'), 2500)
      const { data } = await supabase
        .from('canvases')
        .select('slug, title')
        .order('updated_at', { ascending: false })
      setCanvasList(data ?? [])
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={saveBarStyle}>
        <select
          style={{ ...inputStyle, width: '200px', cursor: 'pointer' }}
          value={slug}
          onChange={e => {
            const selected = canvasList.find(c => c.slug === e.target.value)
            if (selected) {
              setSlug(selected.slug)
              setTitle(selected.title)
            }
          }}
        >
          <option value="">— existing canvases —</option>
          {canvasList.map(c => (
            <option key={c.slug} value={c.slug}>{c.title} ({c.slug})</option>
          ))}
        </select>

        <input
          placeholder="or type new slug"
          value={slug}
          onChange={e => {
            setSlug(e.target.value.toLowerCase())
            setLoadError('')
            setSaveError('')
          }}
          style={inputStyle}
        />
        <button onClick={handleLoad} disabled={loadState === 'loading'} style={loadButtonStyle}>
          {loadState === 'loading' ? 'Loading…' : 'Load'}
        </button>


        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ ...inputStyle, width: '200px' }}
        />
        {(saveError || loadError) && (
          <span style={{ color: '#dc2626', fontSize: '13px' }}>
            {saveError || loadError}
          </span>
        )}
        <button
          onClick={handleSave}
          disabled={saveState === 'saving'}
          style={saveButtonStyle(saveState)}
        >
          {saveState === 'saving' ? 'Saving…' : saveState === 'saved' ? 'Saved ✓' : 'Save'}
        </button>
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <Tldraw
          key={storeKey.current}
          store={store}
          onMount={editor => { editorRef.current = editor; editor.zoomToFit() }}
        />
      </div>
    </div>
  )
}

const saveBarStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '8px',
  padding: '8px 12px',
  background: '#ffffff',
  borderBottom: '1px solid #e5e5e5',
  flexShrink: 0,
}

const inputStyle: React.CSSProperties = {
  background: '#f9f9f9', border: '1px solid #e0e0e0',
  borderRadius: '6px', padding: '6px 10px',
  color: '#111', fontSize: '13px', width: '160px', outline: 'none',
}

const loadButtonStyle: React.CSSProperties = {
  background: '#f9f9f9', border: '1px solid #e0e0e0',
  borderRadius: '6px', padding: '6px 12px',
  color: '#555', fontSize: '13px', cursor: 'pointer',
}

function saveButtonStyle(state: SaveState): React.CSSProperties {
  const bg = state === 'saved' ? '#16a34a' : state === 'error' ? '#dc2626' : '#7c3aed'
  return {
    background: bg, color: '#fff', border: 'none',
    borderRadius: '6px', padding: '6px 14px',
    fontSize: '13px', cursor: 'pointer', fontWeight: 500,
    transition: 'background 0.2s', marginLeft: 'auto',
  }
}
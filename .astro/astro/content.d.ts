declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"about.mdx": {
	id: "about.mdx";
  slug: "about";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_10_15.mdx": {
	id: "blog/2024_10_15.mdx";
  slug: "blog/2024_10_15";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_10_17.mdx": {
	id: "blog/2024_10_17.mdx";
  slug: "blog/2024_10_17";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_11_04.mdx": {
	id: "blog/2024_11_04.mdx";
  slug: "blog/2024_11_04";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_11_18.mdx": {
	id: "blog/2024_11_18.mdx";
  slug: "blog/2024_11_18";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_11_21.mdx": {
	id: "blog/2024_11_21.mdx";
  slug: "blog/2024_11_21";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"content_list/index.mdx": {
	id: "content_list/index.mdx";
  slug: "content_list";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"content_list/reading/index.mdx": {
	id: "content_list/reading/index.mdx";
  slug: "content_list/reading";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"content_list/reading/school_sokolov.mdx": {
	id: "content_list/reading/school_sokolov.mdx";
  slug: "content_list/reading/school_sokolov";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"content_list/reading/unbearable_kundera.mdx": {
	id: "content_list/reading/unbearable_kundera.mdx";
  slug: "content_list/reading/unbearable_kundera";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/content_listing_in_starlight.mdx": {
	id: "dev_guides/content_listing_in_starlight.mdx";
  slug: "dev_guides/content_listing_in_starlight";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/courses.mdx": {
	id: "dev_guides/courses.mdx";
  slug: "dev_guides/courses";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/index.mdx": {
	id: "dev_guides/index.mdx";
  slug: "dev_guides";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/podlodka_techlead_7.mdx": {
	id: "dev_guides/podlodka_techlead_7.mdx";
  slug: "dev_guides/podlodka_techlead_7";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/start_react_uui_ts_project.mdx": {
	id: "dev_guides/start_react_uui_ts_project.mdx";
  slug: "dev_guides/start_react_uui_ts_project";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/testing_fundamentals_workshow.mdx": {
	id: "dev_guides/testing_fundamentals_workshow.mdx";
  slug: "dev_guides/testing_fundamentals_workshow";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/about.mdx": {
	id: "ru/about.mdx";
  slug: "ru/about";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_10_15.mdx": {
	id: "ru/blog/2024_10_15.mdx";
  slug: "ru/blog/2024_10_15";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_10_17.mdx": {
	id: "ru/blog/2024_10_17.mdx";
  slug: "ru/blog/2024_10_17";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_11_04.mdx": {
	id: "ru/blog/2024_11_04.mdx";
  slug: "ru/blog/2024_11_04";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_11_18.mdx": {
	id: "ru/blog/2024_11_18.mdx";
  slug: "ru/blog/2024_11_18";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_11_21.mdx": {
	id: "ru/blog/2024_11_21.mdx";
  slug: "ru/blog/2024_11_21";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/content_list/reading/index.mdx": {
	id: "ru/content_list/reading/index.mdx";
  slug: "ru/content_list/reading";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/content_list/reading/school_sokolov.mdx": {
	id: "ru/content_list/reading/school_sokolov.mdx";
  slug: "ru/content_list/reading/school_sokolov";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/content_list/reading/unbearable_kundera.mdx": {
	id: "ru/content_list/reading/unbearable_kundera.mdx";
  slug: "ru/content_list/reading/unbearable_kundera";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/dev_guides/content_listing_in_starlight.mdx": {
	id: "ru/dev_guides/content_listing_in_starlight.mdx";
  slug: "ru/dev_guides/content_listing_in_starlight";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/dev_guides/courses.mdx": {
	id: "ru/dev_guides/courses.mdx";
  slug: "ru/dev_guides/courses";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/dev_guides/podlodka_techlead_7.mdx": {
	id: "ru/dev_guides/podlodka_techlead_7.mdx";
  slug: "ru/dev_guides/podlodka_techlead_7";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/dev_guides/start_react_uui_ts_project.mdx": {
	id: "ru/dev_guides/start_react_uui_ts_project.mdx";
  slug: "ru/dev_guides/start_react_uui_ts_project";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/dev_guides/testing_fundamentals_workshow.mdx": {
	id: "ru/dev_guides/testing_fundamentals_workshow.mdx";
  slug: "ru/dev_guides/testing_fundamentals_workshow";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		"i18n": {
"en": {
	id: "en";
  collection: "i18n";
  data: InferEntrySchema<"i18n">
};
"ru": {
	id: "ru";
  collection: "i18n";
  data: InferEntrySchema<"i18n">
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}

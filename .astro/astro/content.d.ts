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
"blog/2024_11_27.mdx": {
	id: "blog/2024_11_27.mdx";
  slug: "blog/2024_11_27";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_12_09.mdx": {
	id: "blog/2024_12_09.mdx";
  slug: "blog/2024_12_09";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2024_12_20.mdx": {
	id: "blog/2024_12_20.mdx";
  slug: "blog/2024_12_20";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_01_05.mdx": {
	id: "blog/2025_01_05.mdx";
  slug: "blog/2025_01_05";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_02_06.mdx": {
	id: "blog/2025_02_06.mdx";
  slug: "blog/2025_02_06";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_02_25.mdx": {
	id: "blog/2025_02_25.mdx";
  slug: "blog/2025_02_25";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_03_14.mdx": {
	id: "blog/2025_03_14.mdx";
  slug: "blog/2025_03_14";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_04_07.mdx": {
	id: "blog/2025_04_07.mdx";
  slug: "blog/2025_04_07";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_04_10.mdx": {
	id: "blog/2025_04_10.mdx";
  slug: "blog/2025_04_10";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_05_15.mdx": {
	id: "blog/2025_05_15.mdx";
  slug: "blog/2025_05_15";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_05_23.mdx": {
	id: "blog/2025_05_23.mdx";
  slug: "blog/2025_05_23";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_05_26.mdx": {
	id: "blog/2025_05_26.mdx";
  slug: "blog/2025_05_26";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_07_25.mdx": {
	id: "blog/2025_07_25.mdx";
  slug: "blog/2025_07_25";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_11_06.mdx": {
	id: "blog/2025_11_06.mdx";
  slug: "blog/2025_11_06";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_12_06.mdx": {
	id: "blog/2025_12_06.mdx";
  slug: "blog/2025_12_06";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2025_12_29.mdx": {
	id: "blog/2025_12_29.mdx";
  slug: "blog/2025_12_29";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2026_02_25.mdx": {
	id: "blog/2026_02_25.mdx";
  slug: "blog/2026_02_25";
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
"content_list/reading/guns_germs_and_steel_diamond.mdx": {
	id: "content_list/reading/guns_germs_and_steel_diamond.mdx";
  slug: "content_list/reading/guns_germs_and_steel_diamond";
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
"dev_guides/memory_leaks.mdx": {
	id: "dev_guides/memory_leaks.mdx";
  slug: "dev_guides/memory_leaks";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"dev_guides/patterns.mdx": {
	id: "dev_guides/patterns.mdx";
  slug: "dev_guides/patterns";
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
"ru/blog/2024_11_27.mdx": {
	id: "ru/blog/2024_11_27.mdx";
  slug: "ru/blog/2024_11_27";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_12_09.mdx": {
	id: "ru/blog/2024_12_09.mdx";
  slug: "ru/blog/2024_12_09";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2024_12_20.mdx": {
	id: "ru/blog/2024_12_20.mdx";
  slug: "ru/blog/2024_12_20";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2025_01_05.mdx": {
	id: "ru/blog/2025_01_05.mdx";
  slug: "ru/blog/2025_01_05";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2025_02_06.mdx": {
	id: "ru/blog/2025_02_06.mdx";
  slug: "ru/blog/2025_02_06";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2025_02_25.mdx": {
	id: "ru/blog/2025_02_25.mdx";
  slug: "ru/blog/2025_02_25";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2025_03_14.mdx": {
	id: "ru/blog/2025_03_14.mdx";
  slug: "ru/blog/2025_03_14";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/blog/2025_07_25.mdx": {
	id: "ru/blog/2025_07_25.mdx";
  slug: "ru/blog/2025_07_25";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"ru/content_list/reading/guns_germs_and_steel_diamond.mdx": {
	id: "ru/content_list/reading/guns_germs_and_steel_diamond.mdx";
  slug: "ru/content_list/reading/guns_germs_and_steel_diamond";
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
"ru/dev_guides/memory_leaks.mdx": {
	id: "ru/dev_guides/memory_leaks.mdx";
  slug: "ru/dev_guides/memory_leaks";
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
"quotes": {
"-1-if-it-should-exist-it.md": {
	id: "-1-if-it-should-exist-it.md";
  slug: "-1-if-it-should-exist-it";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-a-carelessly-planned-project-takes-three.md": {
	id: "-a-carelessly-planned-project-takes-three.md";
  slug: "-a-carelessly-planned-project-takes-three";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-a-computer-program-does-what-you.md": {
	id: "-a-computer-program-does-what-you.md";
  slug: "-a-computer-program-does-what-you";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-a-miracle-drug-is-any-drug.md": {
	id: "-a-miracle-drug-is-any-drug.md";
  slug: "-a-miracle-drug-is-any-drug";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-a-negotiation-shall-be-considered-successful.md": {
	id: "-a-negotiation-shall-be-considered-successful.md";
  slug: "-a-negotiation-shall-be-considered-successful";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-after-food-and-sex-mans-greatest.md": {
	id: "-after-food-and-sex-mans-greatest.md";
  slug: "-after-food-and-sex-mans-greatest";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-an-idea-is-not-responsible-for.md": {
	id: "-an-idea-is-not-responsible-for.md";
  slug: "-an-idea-is-not-responsible-for";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-an-optimist-believes-we-live-in.md": {
	id: "-an-optimist-believes-we-live-in.md";
  slug: "-an-optimist-believes-we-live-in";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-any-action-for-which-there-is.md": {
	id: "-any-action-for-which-there-is.md";
  slug: "-any-action-for-which-there-is";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-any-change-looks-terrible-at-first.md": {
	id: "-any-change-looks-terrible-at-first.md";
  slug: "-any-change-looks-terrible-at-first";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-any-sufficiently-advanced-technology-is-indistinguishable.md": {
	id: "-any-sufficiently-advanced-technology-is-indistinguishable.md";
  slug: "-any-sufficiently-advanced-technology-is-indistinguishable";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-any-system-must-be-designed-to.md": {
	id: "-any-system-must-be-designed-to.md";
  slug: "-any-system-must-be-designed-to";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-any-system-that-depends-on-human.md": {
	id: "-any-system-that-depends-on-human.md";
  slug: "-any-system-that-depends-on-human";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-anyone-can-hold-the-helm-when.md": {
	id: "-anyone-can-hold-the-helm-when.md";
  slug: "-anyone-can-hold-the-helm-when";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-anything-is-possible-if-you-dont.md": {
	id: "-anything-is-possible-if-you-dont.md";
  slug: "-anything-is-possible-if-you-dont";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-anything-that-begins-well-ends-badly.md": {
	id: "-anything-that-begins-well-ends-badly.md";
  slug: "-anything-that-begins-well-ends-badly";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-anytime-things-appear-to-be-going.md": {
	id: "-anytime-things-appear-to-be-going.md";
  slug: "-anytime-things-appear-to-be-going";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-asking-dumb-questions-is-easier-than.md": {
	id: "-asking-dumb-questions-is-easier-than.md";
  slug: "-asking-dumb-questions-is-easier-than";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-delay-is-the-deadliest-form-of.md": {
	id: "-delay-is-the-deadliest-form-of.md";
  slug: "-delay-is-the-deadliest-form-of";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-do-a-little-more-each-day.md": {
	id: "-do-a-little-more-each-day.md";
  slug: "-do-a-little-more-each-day";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-dont-worry-over-that-other-people.md": {
	id: "-dont-worry-over-that-other-people.md";
  slug: "-dont-worry-over-that-other-people";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-eighty-percent-of-all-people-consider.md": {
	id: "-eighty-percent-of-all-people-consider.md";
  slug: "-eighty-percent-of-all-people-consider";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-even-the-best-friends-cannot-attend.md": {
	id: "-even-the-best-friends-cannot-attend.md";
  slug: "-even-the-best-friends-cannot-attend";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-every-solution-breeds-new-problems.md": {
	id: "-every-solution-breeds-new-problems.md";
  slug: "-every-solution-breeds-new-problems";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-everyone-has-a-scheme-that-will.md": {
	id: "-everyone-has-a-scheme-that-will.md";
  slug: "-everyone-has-a-scheme-that-will";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-everything-takes-longer-than-you-think.md": {
	id: "-everything-takes-longer-than-you-think.md";
  slug: "-everything-takes-longer-than-you-think";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-experience-enables-you-to-recognize-a.md": {
	id: "-experience-enables-you-to-recognize-a.md";
  slug: "-experience-enables-you-to-recognize-a";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-get-your-facts-first-and-then.md": {
	id: "-get-your-facts-first-and-then.md";
  slug: "-get-your-facts-first-and-then";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-hell-is-the-place-where-everything.md": {
	id: "-hell-is-the-place-where-everything.md";
  slug: "-hell-is-the-place-where-everything";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-a-thing-is-done-wrong.md": {
	id: "-if-a-thing-is-done-wrong.md";
  slug: "-if-a-thing-is-done-wrong";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-all-you-have-is-a.md": {
	id: "-if-all-you-have-is-a.md";
  slug: "-if-all-you-have-is-a";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-anything-can-go-wrong-it.md": {
	id: "-if-anything-can-go-wrong-it.md";
  slug: "-if-anything-can-go-wrong-it";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-anything-cant-go-wrong-it.md": {
	id: "-if-anything-cant-go-wrong-it.md";
  slug: "-if-anything-cant-go-wrong-it";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-at-first-you-do-succeed.md": {
	id: "-if-at-first-you-do-succeed.md";
  slug: "-if-at-first-you-do-succeed";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-at-first-you-dont-succeed.md": {
	id: "-if-at-first-you-dont-succeed.md";
  slug: "-if-at-first-you-dont-succeed";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-enough-data-is-collected-anything.md": {
	id: "-if-enough-data-is-collected-anything.md";
  slug: "-if-enough-data-is-collected-anything";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-it-looks-easy-its-tough.md": {
	id: "-if-it-looks-easy-its-tough.md";
  slug: "-if-it-looks-easy-its-tough";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-it-says-one-size-fits.md": {
	id: "-if-it-says-one-size-fits.md";
  slug: "-if-it-says-one-size-fits";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-one-views-ones-problem-closely.md": {
	id: "-if-one-views-ones-problem-closely.md";
  slug: "-if-one-views-ones-problem-closely";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-you-abstain-from-drinking-smoking.md": {
	id: "-if-you-abstain-from-drinking-smoking.md";
  slug: "-if-you-abstain-from-drinking-smoking";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-you-cannot-convince-them-confuse.md": {
	id: "-if-you-cannot-convince-them-confuse.md";
  slug: "-if-you-cannot-convince-them-confuse";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-you-dont-care-where-you.md": {
	id: "-if-you-dont-care-where-you.md";
  slug: "-if-you-dont-care-where-you";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-if-you-want-to-make-enemies.md": {
	id: "-if-you-want-to-make-enemies.md";
  slug: "-if-you-want-to-make-enemies";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-in-a-hierarchy-every-employee-tends.md": {
	id: "-in-a-hierarchy-every-employee-tends.md";
  slug: "-in-a-hierarchy-every-employee-tends";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-in-mathematics-you-dont-understand-things.md": {
	id: "-in-mathematics-you-dont-understand-things.md";
  slug: "-in-mathematics-you-dont-understand-things";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-indecision-is-the-basis-for-flexibility.md": {
	id: "-indecision-is-the-basis-for-flexibility.md";
  slug: "-indecision-is-the-basis-for-flexibility";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-insanity-is-doing-the-same-thing.md": {
	id: "-insanity-is-doing-the-same-thing.md";
  slug: "-insanity-is-doing-the-same-thing";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-insurance-covers-everything-except-what-happens.md": {
	id: "-insurance-covers-everything-except-what-happens.md";
  slug: "-insurance-covers-everything-except-what-happens";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-it-is-a-simple-task-to.md": {
	id: "-it-is-a-simple-task-to.md";
  slug: "-it-is-a-simple-task-to";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-it-is-easier-to-get-forgiveness.md": {
	id: "-it-is-easier-to-get-forgiveness.md";
  slug: "-it-is-easier-to-get-forgiveness";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-it-is-much-easier-to-suggest.md": {
	id: "-it-is-much-easier-to-suggest.md";
  slug: "-it-is-much-easier-to-suggest";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-it-is-not-true-that-life.md": {
	id: "-it-is-not-true-that-life.md";
  slug: "-it-is-not-true-that-life";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-it-is-well-to-remember-that.md": {
	id: "-it-is-well-to-remember-that.md";
  slug: "-it-is-well-to-remember-that";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-its-amazing-how-long-it-takes.md": {
	id: "-its-amazing-how-long-it-takes.md";
  slug: "-its-amazing-how-long-it-takes";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-its-better-to-have-a-horrible.md": {
	id: "-its-better-to-have-a-horrible.md";
  slug: "-its-better-to-have-a-horrible";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-its-not-who-is-right-its.md": {
	id: "-its-not-who-is-right-its.md";
  slug: "-its-not-who-is-right-its";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-just-because-youre-paranoid-doesnt-mean.md": {
	id: "-just-because-youre-paranoid-doesnt-mean.md";
  slug: "-just-because-youre-paranoid-doesnt-mean";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-man-invented-language-to-satisfy-his.md": {
	id: "-man-invented-language-to-satisfy-his.md";
  slug: "-man-invented-language-to-satisfy-his";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-men-and-nations-will-act-rationally.md": {
	id: "-men-and-nations-will-act-rationally.md";
  slug: "-men-and-nations-will-act-rationally";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-millions-long-for-immortality-who-dont.md": {
	id: "-millions-long-for-immortality-who-dont.md";
  slug: "-millions-long-for-immortality-who-dont";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-never-attribute-to-malice-that-which.md": {
	id: "-never-attribute-to-malice-that-which.md";
  slug: "-never-attribute-to-malice-that-which";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-never-let-the-facts-get-in.md": {
	id: "-never-let-the-facts-get-in.md";
  slug: "-never-let-the-facts-get-in";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-never-make-a-decision-you-can.md": {
	id: "-never-make-a-decision-you-can.md";
  slug: "-never-make-a-decision-you-can";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-never-test-for-an-error-condition.md": {
	id: "-never-test-for-an-error-condition.md";
  slug: "-never-test-for-an-error-condition";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-no-computer-has-ever-been-designed.md": {
	id: "-no-computer-has-ever-been-designed.md";
  slug: "-no-computer-has-ever-been-designed";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-no-matter-what-goes-wrong-there.md": {
	id: "-no-matter-what-goes-wrong-there.md";
  slug: "-no-matter-what-goes-wrong-there";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-no-matter-where-you-go-there.md": {
	id: "-no-matter-where-you-go-there.md";
  slug: "-no-matter-where-you-go-there";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-no-one-is-too-old-to.md": {
	id: "-no-one-is-too-old-to.md";
  slug: "-no-one-is-too-old-to";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nostalgia-is-the-realization-that-things.md": {
	id: "-nostalgia-is-the-realization-that-things.md";
  slug: "-nostalgia-is-the-realization-that-things";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-astonishes-men-so-much-as.md": {
	id: "-nothing-astonishes-men-so-much-as.md";
  slug: "-nothing-astonishes-men-so-much-as";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-ever-gets-built-on-schedule.md": {
	id: "-nothing-ever-gets-built-on-schedule.md";
  slug: "-nothing-ever-gets-built-on-schedule";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-exists-except-atoms-and-empty.md": {
	id: "-nothing-exists-except-atoms-and-empty.md";
  slug: "-nothing-exists-except-atoms-and-empty";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-in-fine-print-is-ever.md": {
	id: "-nothing-in-fine-print-is-ever.md";
  slug: "-nothing-in-fine-print-is-ever";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-is-as-easy-as-it.md": {
	id: "-nothing-is-as-easy-as-it.md";
  slug: "-nothing-is-as-easy-as-it";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-is-as-permanent-as-that.md": {
	id: "-nothing-is-as-permanent-as-that.md";
  slug: "-nothing-is-as-permanent-as-that";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-is-ever-so-bad-that.md": {
	id: "-nothing-is-ever-so-bad-that.md";
  slug: "-nothing-is-ever-so-bad-that";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-nothing-is-impossible-for-the-man.md": {
	id: "-nothing-is-impossible-for-the-man.md";
  slug: "-nothing-is-impossible-for-the-man";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-one-accurate-measurement-is-worth-a.md": {
	id: "-one-accurate-measurement-is-worth-a.md";
  slug: "-one-accurate-measurement-is-worth-a";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-ostanovite-zemlyu-ya-soydu.md": {
	id: "-ostanovite-zemlyu-ya-soydu.md";
  slug: "-ostanovite-zemlyu-ya-soydu";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-schaste-est-da-est-eto.md": {
	id: "-schaste-est-da-est-eto.md";
  slug: "-schaste-est-da-est-eto";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-teamwork-is-essential-it-allows-you.md": {
	id: "-teamwork-is-essential-it-allows-you.md";
  slug: "-teamwork-is-essential-it-allows-you";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-easier-it-is-to-do.md": {
	id: "-the-easier-it-is-to-do.md";
  slug: "-the-easier-it-is-to-do";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-less-you-do-the-less.md": {
	id: "-the-less-you-do-the-less.md";
  slug: "-the-less-you-do-the-less";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-one-who-says-it-cannot.md": {
	id: "-the-one-who-says-it-cannot.md";
  slug: "-the-one-who-says-it-cannot";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-only-faults-that-bother-us.md": {
	id: "-the-only-faults-that-bother-us.md";
  slug: "-the-only-faults-that-bother-us";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-only-way-to-discover-the.md": {
	id: "-the-only-way-to-discover-the.md";
  slug: "-the-only-way-to-discover-the";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-solution-to-a-problem-changes.md": {
	id: "-the-solution-to-a-problem-changes.md";
  slug: "-the-solution-to-a-problem-changes";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-trouble-with-doing-something-right.md": {
	id: "-the-trouble-with-doing-something-right.md";
  slug: "-the-trouble-with-doing-something-right";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-the-universe-is-not-user-friendly.md": {
	id: "-the-universe-is-not-user-friendly.md";
  slug: "-the-universe-is-not-user-friendly";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-theres-never-time-to-do-it.md": {
	id: "-theres-never-time-to-do-it.md";
  slug: "-theres-never-time-to-do-it";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-those-who-are-unable-to-learn.md": {
	id: "-those-who-are-unable-to-learn.md";
  slug: "-those-who-are-unable-to-learn";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-to-learn-from-your-mistakes-you.md": {
	id: "-to-learn-from-your-mistakes-you.md";
  slug: "-to-learn-from-your-mistakes-you";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-to-spot-the-expert-pick-the.md": {
	id: "-to-spot-the-expert-pick-the.md";
  slug: "-to-spot-the-expert-pick-the";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-traditions-are-solutions-for-which-we.md": {
	id: "-traditions-are-solutions-for-which-we.md";
  slug: "-traditions-are-solutions-for-which-we";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-were-making-progress-things-are-getting.md": {
	id: "-were-making-progress-things-are-getting.md";
  slug: "-were-making-progress-things-are-getting";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-whatever-happens-look-as-if-it.md": {
	id: "-whatever-happens-look-as-if-it.md";
  slug: "-whatever-happens-look-as-if-it";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-when-all-else-fails-read-the.md": {
	id: "-when-all-else-fails-read-the.md";
  slug: "-when-all-else-fails-read-the";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-when-things-go-wrong-dont-go.md": {
	id: "-when-things-go-wrong-dont-go.md";
  slug: "-when-things-go-wrong-dont-go";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-when-you-do-not-know-what.md": {
	id: "-when-you-do-not-know-what.md";
  slug: "-when-you-do-not-know-what";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-you-can-never-tell-which-way.md": {
	id: "-you-can-never-tell-which-way.md";
  slug: "-you-can-never-tell-which-way";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-you-can-only-be-young-once.md": {
	id: "-you-can-only-be-young-once.md";
  slug: "-you-can-only-be-young-once";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"-you-have-taken-yourself-too-seriously.md": {
	id: "-you-have-taken-yourself-too-seriously.md";
  slug: "-you-have-taken-yourself-too-seriously";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"albert-einstein-two-things-are-infinite-the-universe.md": {
	id: "albert-einstein-two-things-are-infinite-the-universe.md";
  slug: "albert-einstein-two-things-are-infinite-the-universe";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"andy-hunt-and-dave-thomas-all-software-becomes-legacy-as-soon.md": {
	id: "andy-hunt-and-dave-thomas-all-software-becomes-legacy-as-soon.md";
  slug: "andy-hunt-and-dave-thomas-all-software-becomes-legacy-as-soon";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"anne-mclaughlin-this-makes-us-think-we-are.md": {
	id: "anne-mclaughlin-this-makes-us-think-we-are.md";
  slug: "anne-mclaughlin-this-makes-us-think-we-are";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"benjamin-franklin-an-investment-in-knowledge-always-pays.md": {
	id: "benjamin-franklin-an-investment-in-knowledge-always-pays.md";
  slug: "benjamin-franklin-an-investment-in-knowledge-always-pays";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"black-books-the-pay-is-not-great-but.md": {
	id: "black-books-the-pay-is-not-great-but.md";
  slug: "black-books-the-pay-is-not-great-but";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"black-books-this-is-life-we-suffer-and.md": {
	id: "black-books-this-is-life-we-suffer-and.md";
  slug: "black-books-this-is-life-we-suffer-and";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"black-books-you-know-what-you-are-youre.md": {
	id: "black-books-you-know-what-you-are-youre.md";
  slug: "black-books-you-know-what-you-are-youre";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"blez-paskal-eto-pismo-poluchilos-takim-dlinnym-potomu.md": {
	id: "blez-paskal-eto-pismo-poluchilos-takim-dlinnym-potomu.md";
  slug: "blez-paskal-eto-pismo-poluchilos-takim-dlinnym-potomu";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"democritus-nothing-exists-except-atoms-and-empty.md": {
	id: "democritus-nothing-exists-except-atoms-and-empty.md";
  slug: "democritus-nothing-exists-except-atoms-and-empty";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"gk-chesterton-i-am-not-absentminded-it-is.md": {
	id: "gk-chesterton-i-am-not-absentminded-it-is.md";
  slug: "gk-chesterton-i-am-not-absentminded-it-is";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"hagrid-whats-comin-will-come-an-well.md": {
	id: "hagrid-whats-comin-will-come-an-well.md";
  slug: "hagrid-whats-comin-will-come-an-well";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"joseph-costello-ive-never-met-a-human-being.md": {
	id: "joseph-costello-ive-never-met-a-human-being.md";
  slug: "joseph-costello-ive-never-met-a-human-being";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"khuan-ramon-khimenes-esli-tebe-dadut-linovannuyu-bumagu-pishi.md": {
	id: "khuan-ramon-khimenes-esli-tebe-dadut-linovannuyu-bumagu-pishi.md";
  slug: "khuan-ramon-khimenes-esli-tebe-dadut-linovannuyu-bumagu-pishi";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"lewis-carroll-i-knew-who-i-was-this.md": {
	id: "lewis-carroll-i-knew-who-i-was-this.md";
  slug: "lewis-carroll-i-knew-who-i-was-this";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"pripisyvaetsya-tolstomu-esli-by-mozhno-bylo-skazat-koroche.md": {
	id: "pripisyvaetsya-tolstomu-esli-by-mozhno-bylo-skazat-koroche.md";
  slug: "pripisyvaetsya-tolstomu-esli-by-mozhno-bylo-skazat-koroche";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"ralph-waldo-emerson-nothing-astonishes-men-so-much-as.md": {
	id: "ralph-waldo-emerson-nothing-astonishes-men-so-much-as.md";
  slug: "ralph-waldo-emerson-nothing-astonishes-men-so-much-as";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"saitama-im-not-a-hero-because-i.md": {
	id: "saitama-im-not-a-hero-because-i.md";
  slug: "saitama-im-not-a-hero-because-i";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"shakespeare-striving-to-better-oft-we-mar.md": {
	id: "shakespeare-striving-to-better-oft-we-mar.md";
  slug: "shakespeare-striving-to-better-oft-we-mar";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"sophocles-it-is-a-painful-thing-to.md": {
	id: "sophocles-it-is-a-painful-thing-to.md";
  slug: "sophocles-it-is-a-painful-thing-to";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"terry-pratchett-he-hated-being-sober-it-meant.md": {
	id: "terry-pratchett-he-hated-being-sober-it-meant.md";
  slug: "terry-pratchett-he-hated-being-sober-it-meant";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"terry-pratchett-ill-be-more-enthusiastic-about-encouraging.md": {
	id: "terry-pratchett-ill-be-more-enthusiastic-about-encouraging.md";
  slug: "terry-pratchett-ill-be-more-enthusiastic-about-encouraging";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"terry-pratchett-no-clowns-were-funny-that-was.md": {
	id: "terry-pratchett-no-clowns-were-funny-that-was.md";
  slug: "terry-pratchett-no-clowns-were-funny-that-was";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"terry-pratchett-the-problem-is-people-only-think.md": {
	id: "terry-pratchett-the-problem-is-people-only-think.md";
  slug: "terry-pratchett-the-problem-is-people-only-think";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"terry-pratchett-they-accept-evil-not-because-they.md": {
	id: "terry-pratchett-they-accept-evil-not-because-they.md";
  slug: "terry-pratchett-they-accept-evil-not-because-they";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"terry-pratchett-vimes-smiled-s-omeone-was-trying.md": {
	id: "terry-pratchett-vimes-smiled-s-omeone-was-trying.md";
  slug: "terry-pratchett-vimes-smiled-s-omeone-was-trying";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"true-detective-all-that-dick-swagger-you-roll-and.md": {
	id: "true-detective-all-that-dick-swagger-you-roll-and.md";
  slug: "true-detective-all-that-dick-swagger-you-roll-and";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
"true-detective-im-the-person-least-in-need.md": {
	id: "true-detective-im-the-person-least-in-need.md";
  slug: "true-detective-im-the-person-least-in-need";
  body: string;
  collection: "quotes";
  data: InferEntrySchema<"quotes">
} & { render(): Render[".md"] };
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

import { defineCollection, z } from 'astro:content';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ schema: docsSchema() }),
	i18n: defineCollection({ type: 'data', schema: i18nSchema({
		extend: z.object({
			'something': z.string().optional(),
			'bookInfo.title': z.string().optional(),
			'bookInfo.author': z.string().optional(),
			'bookInfo.started': z.string().optional(),
			'bookInfo.finished': z.string().optional(),
			'bookInfo.whyStarted': z.string().optional(),
			'bookInfo.recommendations': z.string().optional(),
		}),
	}) }),
};

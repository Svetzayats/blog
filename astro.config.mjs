import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog';

// https://astro.build/config
export default defineConfig({
	site: 'https://www.svetzayats.com/',
	integrations: [
		starlight({
			title: '🐰 Svetlana Zaiats',
			plugins: [starlightBlog({
				title: {
					en: 'Blog',
					ru: 'Блог',
				},
			})],
			social: {
				github: 'https://github.com/Svetzayats',
				linkedin: 'https://www.linkedin.com/in/svetlana-zayats/',
				email: 'mailto:svetzayats@gmail.com',
				telegram: 'https://t.me/SvZayats',
				instagram: 'https://www.instagram.com/fare_dodger'
			},
			sidebar: [
				{ label: 'About', link: '/about/', translations: { ru: 'Обо мне' } },
				{
					label: 'About development',
					autogenerate: { directory: 'dev_guides' },
				},
				{
					label: 'Content List', 
					autogenerate: { directory: 'content_list' },
				},
				{ label: 'Quotes', link: '/quotes/', translations: { ru: 'Цитаты' } },
			],
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'English',
					locale: 'en',
					lang: 'en',
				},
				ru: {
					label: 'Русский',
					locale: 'ru',
					lang: 'ru',
				},
			},
			customCss: [
        './src/styles/custom.css',
      ],
		}),
	],
});

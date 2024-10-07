import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: '🐰 Svetlana Zaiats',
			social: {
				github: 'https://github.com/Svetzayats',
				linkedin: 'https://www.linkedin.com/in/svetlana-zayats/',
				email: 'mailto:svetzayats@gmail.com',
				telegram: 'https://t.me/SvZayats',
				instagram: 'https://www.instagram.com/fare_dodger'
			},
			sidebar: [
				{ label: 'About', link: '/about/' },
				{
					label: 'Dev Notes',
					autogenerate: { directory: 'dev_notes' },
				},
				{
					label: 'Dev Guides',
					autogenerate: { directory: 'dev_guides' },
				},
				{
					label: 'Reading List', 
					autogenerate: { directory: 'reading_list' },
				},
				{
					label: 'Life Insights', 
					autogenerate: { directory: 'life_insights' },
				}, 
				{
					label: 'Travel & Places', 
					autogenerate: { directory: 'travel_places' },
				}, 
				{
					label: 'Occasional Daily',
					autogenerate: { directory: 'occasional_daily' },
				}
			],
			customCss: [
        './src/styles/custom.css',
      ],
		}),
	],
});

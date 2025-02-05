// import adapter from '@sveltejs/adapter-vercel';

// /** @type {import('@sveltejs/kit').Config} */
// const config = {
// 	kit: {
// 		// output: {
// 		// 	preloadStrategy: 'preload-mjs'
// 		// },
// 		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
// 		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
// 		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
// 		adapter: adapter({
// 			runtime: 'edge'
// 		})
// 	}
// };

// export default config;

import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		appDir: 'app',
		// alias: {
		// 	// this will match a file
		// 	'app/*': ' https://miracle-made.vercel.app/app/*',
		// },
		// paths: {
		// 	base: dev ? '' : '/your-repo-name',
		// },
		adapter: adapter({
			runtime: 'edge'
		}),
	},
	isr: {
		expiration: 1200
	}
};

export default config;

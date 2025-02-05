<script>
 	
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	
	onMount(() => {
		// Collect all *valid* (root) routes
		// as in folder names directly under ./src/routes/
		//
		let route_folders = [];
		const page_modules = import.meta.glob('./*/**.svelte');
		for ( const page_module in page_modules ) {
			// key is svelte file name including path
			// val is a svelte generator function
			//
			// check length greater than 2 to filter out . and ..'s as well
			//
			const path_comps = page_module
								.split( '/' )
								.filter( itm => itm && itm.length && itm.length > 2 );
			const route_folder = path_comps[0];
			if ( route_folder ) {
				route_folders.push( route_folder ); }
		}
		// remove duplicates
		//
		route_folders = [...( new Set( route_folders ) )];
		route_folders.sort();


		// Try and find first valid route among url components
		// In case of no match, use the first one in existing route folders ( or should we? )
		//
		const url_comps = $page.url.pathname
							.split('/')
							.filter((itm) => itm && itm.length && itm.length > 2);
		let route_folder = '';
		// for ( let i = 0; i < url_comps.length; i++ ) {
		// 	const url_comp = url_comps[i];
		// 	const route_exists = route_folders.includes( url_comp );
		// 	if ( route_exists ) {
		// 		route_folder = url_comp;
		// 		break; }
		// }
		// if ( route_folder.length < 1 ) {
		// 	route_folder = route_folders[0]; }

		const url_redirect = 'https://try.miraclebrand.co/test/sheets' + route_folder;

		// window.location.replace(url_redirect);

		console.log('Hi, an error?')
	});

</script>

<!-- A nice version of 404 handling -->
<h1>Redirecting...</h1>
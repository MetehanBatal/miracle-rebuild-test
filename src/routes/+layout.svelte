<script> 
	// Importing global CSS files
	// 
	import '../css/global.css';
	import '../css/fonts.css';


	import { afterNavigate } from '$app/navigation';
	import { onDestroy } from 'svelte';
	import { page } from '$app/stores';
	
	import Banners from '$lib/banners/SheetBanner.svelte';

	export let data;

	let bannerAttributes = {
		stylingData: '#dcff8e',
		hasTimer: true,
		discountCode: '',
		element: '',
		content: '<p>🇺🇸 PRESIDENTS’ DAY SALE! 💸 <br class="desktop-hidden" />UP TO&nbsp;<strong>46% OFF AUTO-APPLIED&nbsp;</strong></p>'
	};
    const bannerOption = "<p>Limited Supply: <strong>3 FREE Towels + EXTRA 20% OFF</strong> with code <span>USA</span></p>";

	let bannerOptionsRolledOut = false;
	let selectedBannerIndex = 0;

	if (!bannerOptionsRolledOut && ( $page.url.pathname.includes('/a/') || $page.url.pathname.includes('/checkout/') || $page.url.pathname.includes('/kit/') ) && !data.replayMode) {
		let selectedBanner = 'LevelUp';

		selectedBannerIndex = selectedBanner === 'LevelUp10' ? 2 : selectedBanner === 'LevelUp' ? 1 : 1;
	};

	let bannerData = ( $page.url.pathname.includes('/up/') || $page.url.pathname.includes('/receipt') ) ? undefined : bannerOption;

	let rtcScript;
  	const scriptSrc = 'https://cdn.shopmiraclebrand.co/js/cart_loader.js';

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			rtcScript = document.createElement('script');
			rtcScript.src = src;
			rtcScript.defer = true;

			rtcScript.onload = () => resolve(rtcScript);
			rtcScript.onerror = () => reject(new Error(`Failed to load script: ${src}`));

			document.body.appendChild(rtcScript);
		});
	}

	function removeRTCScript() {
		if (rtcScript && rtcScript.parentNode) {
			rtcScript.parentNode.removeChild(rtcScript);
			rtcScript = null;
		}
	}
	
	onDestroy(() => {
		removeRTCScript();
	});

	afterNavigate(async ({ to, cancel }) => {
		if (data.devMode || to.route.id === '/') {
			return; }

		try {
			await loadScript(scriptSrc);
		} catch (error) {
			console.error(error);
		}

		bannerData = ( $page.url.pathname.includes('/up/') || $page.url.pathname.includes('/receipt') || $page.url.pathname.includes('/quiz') ) ? undefined : bannerOption;
	});

</script>

{#if bannerData}
<Banners bannerAttributes={bannerAttributes} bannerData={bannerData} />
{/if}

<slot />







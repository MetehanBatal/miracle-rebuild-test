<script> 
	// Importing global CSS files
	// 
	import '../css/reset.css';
	import '../css/global.css';
	import '../css/fonts.css';
	import '../css/dev.css';


	import { beforeNavigate, afterNavigate, goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { page } from '$app/stores';
	import { cart } from '../stores/cart';
	import { sessionAnalytics } from '../stores/session';
	import { events } from '../stores/events';
	import { actions } from '../stores/actions';
	import { purchaseLog } from '../stores/purchaseLog';
	import { generateRandomString, logAction, logEvent, reportEvents } from '../stores/functions';

	import platform from 'platform';
	import Cookies from 'js-cookie';
	import ActionTracker from '$lib/common/ActionTracker.svelte';
	import EventTracker from '$lib/common/EventTracker.svelte';
	import ActionController from '$lib/common/ActionController.svelte';
	import Banners from '$lib/banners/SheetBanner.svelte';

	export let data;

	const journeyMode = data.journeyMode;
	let customEvents = data.eventsData;
	let editMode = false;
	if ($page.url.searchParams.get('editMode') && $page.url.searchParams.get('editMode') === 'true') {
		editMode = true; }

	let controllerActions = '';

	let bannerAttributes = {
		stylingData: '#dcff8e',
		hasTimer: true,
		discountCode: '',
		element: '',
		content: '<p>🎄 HOLIDAY SALE! 🎅 UP TO <strong>46% OFF AUTO-APPLIED&nbsp;</strong></p>'
	};

    const bannerOption = "<p>24H SALE: GET <strong>3 FREE TOWELS + EXTRA 20% OFF</strong> WITH CODE <span>FEST20</span></p>";

	let bannerOptionsRolledOut = false;
	let selectedBannerIndex = 0;
	
	let journeyId = '';
	let actionReqCount = 0;

	let sId = '';
	let uId = '';
	let highestScrollLevel = 1;

	let experimentIndices = [];

	let initialized = false;

	const mergeArrays = (oldArray, newArray) => {
		let shaped = oldArray.map((exp) => {
			return {
				experimentId: exp?.variantIndices?.experimentId,
				order: exp?.variantIndices?.order,
				variantId: exp?.variantIndices?.variantId,
				variants: exp?.variantIndices?.variants
			}
		});
		const oldMap = new Map(shaped.map(obj => [obj.experimentId, obj]));
		newArray.forEach(obj => oldMap.set(obj.experimentId, obj));
		
		return Array.from(oldMap.values());
	};

	if (!bannerOptionsRolledOut && ( $page.url.pathname.includes('/a/') || $page.url.pathname.includes('/checkout/') || $page.url.pathname.includes('/kit/') ) && !data.replayMode) {
		let selectedBanner = $page?.data?.indices?.find(exp => exp.experimentId === 382010213694)?.variants?.find(v => v.name === 'Banner Coupon')?.component;

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
	
	// onDestroy(() => {
	// 	removeRTCScript();
	// });

	afterNavigate(async ({ to, cancel }) => {
		console.log('Edit mode: ', editMode);
		if (data.devMode || editMode || journeyMode || to.route.id === '/') {
			return; }

		// try {
		// 	await loadScript(scriptSrc);
		// } catch (error) {
		// 	console.error(error);
		// }

		let visitedSlug = to.route.id;

		actionReqCount = 0;

		if (visitedSlug === '/up/1a' || visitedSlug === '/receipt') {
			$sessionAnalytics = JSON.parse(window.sessionStorage.getItem("nvsSes"));
			$purchaseLog = JSON.parse(window.sessionStorage.getItem("nvsPur"));
		}

		let pageData = $page.data;

		journeyId = generateRandomString();

		console.log('Indices: ', $page.data.indices, $page.data);

		if ($page.data.indices?.length > 0) {
			experimentIndices = mergeArrays($page.data.existingIndices, $page.data.indices); }
			console.log('Indices merged: ', experimentIndices);

		if ($sessionAnalytics.userId.length < 1) {
			if (Cookies.get('nvsuid') === 'undefined' || !Cookies.get('nvsuid') || Cookies.get('nvsuid').length < 1) {
				let generatedId = generateRandomString();

				$sessionAnalytics.userId = generatedId;
				$purchaseLog.userId = generatedId;

				Cookies.set('nvsuid', $sessionAnalytics.userId, { expires: 30 });
			} else {
				$sessionAnalytics.userId = Cookies.get('nvsuid');
				$purchaseLog.userId = Cookies.get('nvsuid');
			}

			if (sessionStorage.getItem('nvsSes')) {
				$sessionAnalytics = JSON.parse(sessionStorage.getItem('nvsSes'));
			} else {
				$sessionAnalytics.sessionId = generateRandomString();
				$sessionAnalytics.sessionStarted = Date.now();

				$sessionAnalytics.country = pageData.country;
				$sessionAnalytics.city = pageData.city;
				$sessionAnalytics.productName = pageData.pageCrumbs?.productType;
				$sessionAnalytics.funnelName = pageData.pageCrumbs?.funnelName;
				$sessionAnalytics.ipAddress = pageData.ipAddress;

				$sessionAnalytics.browserLocales = {};
				$sessionAnalytics.browserLocales.deviceType = window.innerWidth < 769 ? 'mobile' : 'desktop';
				$sessionAnalytics.browserLocales.innerWidth = window.innerWidth;
				$sessionAnalytics.browserLocales.innerHeight = window.innerHeight;
				$sessionAnalytics.browserLocales.languagePreferences = navigator.languages || navigator.language;
				$sessionAnalytics.browserLocales.connection = navigator.connection?.effectiveType;
				$sessionAnalytics.browserLocales.browser = platform.description;
				$sessionAnalytics.browserLocales.device = platform.product;
				$sessionAnalytics.referrer = document?.referrer.length > 2 ? document.referrer : 'direct';

				if ($page.url.searchParams.size > 0) {
					$sessionAnalytics.queryParams = {};
					for (const [key, value] of $page.url.searchParams.entries()) {
						$sessionAnalytics.queryParams[key] = value;
					};
				}
			}
		}

		if (!$page.url.pathname.includes('/up/') && !$page.url.pathname.includes('/receipt')) {
			$sessionAnalytics.variantIndices = experimentIndices;
		}

		$sessionAnalytics.sessionEnded = Date.now();

		sId = $sessionAnalytics.sessionId;
		uId = $sessionAnalytics.userId;

		if (Object.keys(to.params).length > 0) {
			visitedSlug = visitedSlug.replace(`[${Object.keys(to.params)[0]}]`, Object.values(to.params)[0]);
		}

		reportEvents('UPSERT', $sessionAnalytics, 'mSessions');

		$page?.data?.indices?.forEach((experimentSeen) => {
			if (experimentSeen.returningExperimentVisitor) {
				return; }
			if (parseInt(experimentSeen.experimentId) === 382010213694 && bannerOptionsRolledOut) {
				return; }
			if (parseInt(experimentSeen.experimentId) === 382010213694 && !bannerOptionsRolledOut) {
				bannerOptionsRolledOut = true; }

			const urlencoded = new URLSearchParams();
				urlencoded.append("order", experimentSeen.order);
				urlencoded.append("experimentId", experimentSeen.experimentId);
				urlencoded.append("variantId", experimentSeen.variantId);

			const requestOptions = {
				method: "PUT",
				body: urlencoded,
				redirect: "follow"
			};

			fetch("http://localhost:3030/prod/variant/update", requestOptions)
				.then((response) => response.text())
				.then((result) => console.log(result))
				.catch((error) => console.error(error));
		});

		let pageViewTraits = {};

		if (!pageData.locals?.returningVisitor) {
			pageViewTraits.variantIndices = pageData.indices?.map(item => {
				const { experimentId, variantId, variants } = item;
				return { experimentId, variantId, variants };
			});
		} else {
			if ($page.url.pathname.includes('/up/') || $page.url.pathname.includes('/receipt')) {
				pageViewTraits.variantIndices = pageData.locals.userExperiments.map(item => {
					const { experimentId, variantId, variants } = item.variantIndices;
					return { experimentId, variantId, variants };
				});
			} else {
				pageViewTraits.variantIndices = experimentIndices;
			}
		}

		logEvent('PageView', {}, pageViewTraits);

		$actions = {
			id: journeyId,
			mouseEvents: {
				click: [],
				mousemove: [],
				mousedown: [],
				mouseup: [],
				mouseout: [],
			},
			keyboardEvents: {
				keydown: [],
				keyup: [],
				keypress: []
			},
			formEvents: {
				focus: [],
				blur: [],
				change: [],
				submit: [] 
			},
			windowEvents: {
				resize: [],
				scroll: [],
				load: [],
				blur: [],
				focus: [],
				selection: []
			},
			touchEvents: {
				touchstart: [],
				touchend: [],
				touchmove: []
			},
			// Page change
			// RageClick
			// Error
			logs: {
				rageclick: [],
				pagechange: []
			}
		}

		// logAction('logs', 'pagechange', {
		// 	value: $page.url.pathname,
		// 	target: $page.url.pathname,
		// 	targetName: pageData?.pageCrumbs?.pageName,
		// 	timestamp: Date.now()
		// })

		// since sveltekit applies scrolltop...
		setTimeout(() => {
			highestScrollLevel = 0;
		}, 200)

		bannerData = ( $page.url.pathname.includes('/up/') || $page.url.pathname.includes('/receipt') || $page.url.pathname.includes('/quiz') ) ? undefined : bannerOption;
	});

	beforeNavigate((to) => {
		// removeRTCScript();
		let from = to.from?.route?.id;
		let goingTo = from === '/checkout/secure' ? '/up/1a' : to.to?.route?.id; 

		// logAction('pageChange', {
		// 	from: from,
		// 	to: goingTo,
		// 	timestamp: Date.now()
		// });

		if (goingTo === '/checkout/secure') {
			window.sessionStorage.setItem("nvsSes", JSON.stringify($sessionAnalytics));
			window.sessionStorage.setItem("nvsPur", JSON.stringify($purchaseLog));
		}
			// to.cancel();
	
		if (to.type === 'goto' || to.type === 'link' || data.replayMode) {
			return }
		
		// window.sessionStorage.setItem("nvsSes", JSON.stringify($sessionAnalytics));
		// window.sessionStorage.setItem("nvsPur", JSON.stringify($purchaseLog));
	})

	function reportEv() {
		if ($sessionAnalytics.sessionId.length > 0) {
			// console.log($sessionAnalytics);
			reportEvents('UPSERT', $sessionAnalytics, 'mSessions');
		} else {
			console.log('Not yet');
		}
		// $sessionAnalytics.userId.length > 0 ? 
	}

	onMount(async() => {
		initialized = true;

		if (editMode) {
			window.addEventListener('message', function(event) {
				if (event.origin !== 'https://miracle.mtrix.io' && event.origin !== 'https://preview-miracle.mtrix.io' && event.origin !== 'http://localhost:5173') {
					return; }

				if (event.data?.componentName) {
					if (event.data.componentName.includes('Banner')) {
						Object.keys(bannerAttributes).forEach((attr) => bannerAttributes[attr] = event.data[attr] );
					} else if (event.data.componentName.includes('FAQ')) {
						let elToScroll = document.querySelector('.faq-section').offsetTop - 200;
						window.scroll({
							top: elToScroll,
							behavior: 'smooth'
						})

						document.getElementById(event.data.element).parentNode.setAttribute('open', true);
						document.getElementById(event.data.element).innerHTML = event.data.content;
					}
				} 
			});
		}

		if (journeyMode) {
			console.log('In journey mode');
			window.addEventListener('message', function(event) {
				if (event.origin !== 'https://miracle.mtrix.io' && event.origin !== 'https://preview-miracle.mtrix.io' && event.origin !== 'http://localhost:5173') {
					return; }

				if (event.data?.actions?.length > 0) {
					controllerActions = event.data.actions;
				}

				if (event.data?.sessionDetails) {
					console.log('From Banner: ', event.data.sessionDetails);
					let bannerExperiment = event.data?.sessionDetails.variantIndices.find(indice => indice['experimentId'] === 382010213694);
					
					bannerData = bannerOption;
				}
				
			})
		}

		let lastCheckedTime = Date.now();
		const rageClickThreshold = 3; // Number of clicks to be considered as rage clicks
		const coordinateRange = 20; // in px

		setInterval(() => {
			if (data.devMode || editMode || journeyMode ) {
				return; }

			// sendActions();

			let scrollSchema = {
				[$page.url.pathname]: highestScrollLevel
			};

			$sessionAnalytics.hsValues = { ...$sessionAnalytics.hsValues, ...scrollSchema };

			window.sessionStorage.setItem("nvsSes", JSON.stringify($sessionAnalytics));
			window.sessionStorage.setItem("nvsPur", JSON.stringify($purchaseLog));
		}, 3600);

		
		function checkFrequentClickEvents(clickEvents) {
			let consecutiveClicks = [];

			for (let event of clickEvents) {
				const x = event.value[0];
				const y = event.value[1];

				if (
					consecutiveClicks.length === 0 ||
					(Math.abs(consecutiveClicks[0].value[0] - x) <= coordinateRange &&
					Math.abs(consecutiveClicks[0].value[1] - y) <= coordinateRange)
				) {
					consecutiveClicks.push(event);
				} else {
					consecutiveClicks = [event];
				}

				if (consecutiveClicks.length > rageClickThreshold) {
					return consecutiveClicks[0];
				}
			}

			return false;
		}

		// // this function will send events to the backend
		function sendActions() {
			if ($actions.length < 1) {
				return; }

			const apiHeaders = new Headers();
			apiHeaders.append("Content-Type", "application/json");

			// Remove old click events that are outside the time window
			let pastClickEvents = $actions.mouseEvents.click;
			if (pastClickEvents.length > 2) {
				let rageClick = checkFrequentClickEvents(pastClickEvents);
				if (rageClick) {
					logAction('logs', 'rageclick', {
						value: [rageClick.value[0], rageClick.value[1]],
						target: rageClick.target,
						targetName: rageClick.targetName,
						timestamp: rageClick.timestamp,
					})
				}
			}


			let schema = {
				journeyId: journeyId,
				userId: uId,
				sessionId: sId,
				variantIndices: $page.data?.indices,
				highestScrollValue: highestScrollLevel,
				url: `https://miracle-rebuild.vercel.app${$page.url.pathname}`,
				actions: $actions
			}

			let method = 'POST';

			$sessionAnalytics.sessionEnded = new Date().getTime();

			const body = JSON.stringify(schema);

			const requestOptions = {
				method: method,
				headers: apiHeaders,
				body: body,
				redirect: "follow"
			};
			
			console.time('journeyFetch');
			fetch(`http://localhost:3030/prod/journeys/upsert`, requestOptions) 
				.then((response) => response.json())
				.then((result) => {
					$actions = {
						id: journeyId,
						mouseEvents: {
							click: [],
							mousemove: [],
							mousedown: [],
							mouseup: [],
							mouseout: [],
						},
						keyboardEvents: {
							keydown: [],
							keyup: [],
							keypress: []
						},
						formEvents: {
							focus: [],
							blur: [],
							change: [],
							submit: [] 
						},
						windowEvents: {
							resize: [],
							scroll: [],
							load: [],
							blur: [],
							focus: [],
							selection: []
						},
						touchEvents: {
							touchstart: [],
							touchend: [],
							touchmove: []
						},
						// Page change
						// RageClick
						// Error
						logs: {
							rageclick: [],
							pagechange: []
						}
					};

					lastCheckedTime = Date.now()
					console.timeEnd('journeyFetch');
				})
				.catch((error) => console.error(error));

			// $actions = [];
		}
	});

	function saveCart() {
		if (initialized) {
			sessionStorage.setItem('nvs_cart', JSON.stringify($cart))
		}
	}

	console.log('PAGE DATA: ', $page.data);

	$: $cart, saveCart();
	$: $sessionAnalytics, reportEv();
</script>

{#if journeyMode}
	<ActionController actions={controllerActions} />
{:else}
	{#if !editMode}
	<ActionTracker bind:highestScrollLevel={highestScrollLevel} />
	{/if}
{/if}

{#if $page.data.eventsData?.length > 0}
	<EventTracker />
{/if}



<!-- {#if bannerData}
<Banners bannerAttributes={bannerAttributes} bannerData={bannerData} />
{/if} -->

<slot />







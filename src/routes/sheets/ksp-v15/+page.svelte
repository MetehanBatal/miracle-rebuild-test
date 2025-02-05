<script>
import { browser } from '$app/environment';

import { page } from '$app/stores';
import { onMount } from 'svelte';
 
import ATCSection from '$lib/sheets/ATCSection.svelte';
import CarouselSection from '$lib/sheets/LogoCarousel.svelte';
const PropSection = import ('$lib/sheets/PropSection.svelte');
const ATCBanner = import ('$lib/sheets/ATCBanner.svelte');
const ReviewsSection = import ('$lib/shared/Reviews.svelte');
const FreeTrialSection = import ('$lib/sheets/FreeTrialSection.svelte');
const SizeGuide = import ('$lib/sheets/SizeGuide.svelte');
const FAQSection = import ('$lib/shared/FAQSection.svelte');

// import Color0 from '$lib/experiments/246789/Color0.svelte';
// import Color1 from '$lib/experiments/246789/Color1.svelte';
// import Color2 from '$lib/experiments/246789/Color2.svelte';
// import Color3 from '$lib/experiments/246789/Color3.svelte';
// import Color4 from '$lib/experiments/246789/Color4.svelte';
// import Color5 from '$lib/experiments/246789/Color5.svelte';
// import Color6 from '$lib/experiments/246789/Color6.svelte';
// import Color7 from '$lib/experiments/246789/Color7.svelte';



import {sessionAnalytics} from '../../../stores/session';
import {sheetFAQs} from '../../../stores/faqs/sheets';
import {reviews} from '../../../stores/reviews';

let date = new Date(Date.now() + 172800000);
let day = date.toString().split(' ')[0];
let dayNum = date.getDate();
let month = date.toString().split(' ')[1];
let shippingDate = `${day}, ${month} ${dayNum}th`;

let sizeGuideOpened = false;

export let data;
let city = data.city;
let assignedVariantId = data.assignedVariantId;

data = data.pageDetailsRes.data;
// const data = {
// 	bannerData: {
// 		"data": [
//             {
//                 "_id": "653193c3d156ca7be0f73a01",
//                 "id": "sheets-funnel-top-banner-i",
//                 "hasStagedChanges": true,
//                 "component": "TopBanner",
//                 "title": "Sheets Funnel - Top Banner I",
//                 "data": {
//                     "triggers": [
//                         "https://miracle-rebuild.vercel.app/sheets/ksp",
//                         "https://miracle-rebuild.vercel.app/checkout/secure",
//                         "https://miracle-rebuild.vercel.app/sheets/ksp-v15"
//                     ],
//                     "timer": true,
//                     "backgroundColor": "#dcff8e",
//                     "discountCode": "",
//                     "content": "<p>🎃 EARLY HALLOWEEN SALEEEE! 👻 UP TO <strong>46% OFF AUTO-APPLIED</strong></p>",
//                     "redirectFrom": "",
//                     "redirectTo": ""
//                 },
//                 "createdAt": "2023-10-19T20:38:27.018Z",
//                 "updatedAt": "2023-11-29T19:51:00.756Z",
//                 "__v": 0,
//                 "score": 10.794642857142856
//             },
//             {
//                 "_id": "65319332d156ca7be0f739fd",
//                 "id": "sheets-funnel-bottom-banner-i",
//                 "hasStagedChanges": true,
//                 "component": "BottomBanner",
//                 "title": "Sheets Funnel - Bottom Banner I",
//                 "data": {
//                     "triggers": [
//                         "https://miracle-rebuild.vercel.app/sheets/ksp"
//                     ],
//                     "timer": false,
//                     "backgroundColor": "#000000",
//                     "discountCode": "SCARY",
//                     "content": "<p>24H SALE: GET <strong>3 FREE TOWELS + EXTRA 20% OFF</strong> WITH CODE</p>",
//                     "redirectFrom": "",
//                     "redirectTo": ""
//                 },
//                 "createdAt": "2023-10-19T20:36:02.285Z",
//                 "updatedAt": "2023-11-24T15:48:20.808Z",
//                 "__v": 0,
//                 "score": 3.999999999999999
//             }
//         ]
//     },
// 	experimentData: {
// 		experimentType: 'multivariate',
// 		variants: [
// 			{
// 				name: 'Default Selected Color Change', 
// 				variants: ['Color0', 'Color1', 'Color2', 'Color3', 'Color4', 'Color5', 'Color6', 'Color7'],
// 			},
// 			{
// 				name: 'Button Color Change',
// 				variants: ['CheckoutButton1', 'CheckoutButton2', 'CheckoutButton3']
// 			},
// 			{
// 				name: 'Paragraph Text Change',
// 				variants: ['Paragraph1', 'Paragraph2']
// 			},
// 			{
// 				name: 'Another Change',
// 				variants: ['Paragraph0', 'Paragraph1', 'Paragraph2', 'Paragraph3']
// 			}
// 		],
// 		selectedVariant: 145
// 	}
// };

data.experimentData.selectedVariant = assignedVariantId;

const generateVariantIndices = (data) => {
	const { variants, selectedVariant } = data.experimentData;

	const indices = {};

	let remainingVariant = selectedVariant;

	for (let index = 0; index < variants.length; index++) {
		const sectionLength = variants[index].components.length;
		// let newVal = variants.slice(0, index).reduce((acc, val) => acc * val.components.length, 1);
		let currentIndex;

		if (index === 0) {
			currentIndex = selectedVariant % sectionLength < 0 ? 0 : selectedVariant % sectionLength;
		} else if (index === 1) {
			currentIndex = Math.ceil((selectedVariant % (variants[0].components.length * variants[1].components.length)) / variants[0].components.length) === 0 && selectedVariant !== 0 ? sectionLength - 1 : Math.floor((selectedVariant % (variants[0].components.length * variants[1].components.length)) / variants[0].components.length);
		} else if (index === 2) {
			currentIndex = Math.floor((selectedVariant % (variants[0].components.length * variants[1].components.length * variants[2].components.length)) / (variants[0].components.length * variants[1].components.length)) - 1 < 0 ? 0 : Math.floor((selectedVariant % (variants[0].components.length * variants[1].components.length * variants[2].components.length)) / (variants[0].components.length * variants[1].components.length)) - 1;
		} else {
			currentIndex = Math.floor(selectedVariant / variants.slice(0, -`${variants.length - index}`).reduce((acc, obj) => acc * obj.components.length, 1));
		}

		indices[variants[index].name] = currentIndex;
	}

	return indices;
};

const variantIndices = generateVariantIndices(data);

// const variantDistribution = [8, 3, 2, 4, 5];

// let assignedVariant = data.experimentData.selectedVariant;
// let experimentVariables = {};


// let first = assignedVariant % variantDistribution[0];
// let second = 
// let third = 
// let fourth =  (variantDistribution[0] * variantDistribution[1] * variantDistribution[2]));
// let fifth = Math.floor(assignedVariant / (variantDistribution[0] * variantDistribution[1] * variantDistribution[2] * variantDistribution[3]));


onMount(() => {
	$sessionAnalytics.productName = 'sheets';

	setTimeout(() => {
		if (browser) {
			let isDesktop = window.matchMedia(`(min-width: 768px)`);

			const ctaButton = document.querySelector('.atc-button');
			const stickyBar = document.querySelector('.atc-sticky-banner');

			let interactionOptions = {
				root: null,
				rootMargin: '0px',
				threshold: 1
			}

			const ctaObserver = new IntersectionObserver(handleIntersect, interactionOptions);
			ctaObserver.observe(ctaButton);

			function handleIntersect(entries, ctaObserver) {
				if (window.scrollY > ctaButton.getBoundingClientRect().top) {
					if (entries[0].isIntersecting) {
						stickyBar.classList.remove('scrolled');
					} else {
						stickyBar.classList.add('scrolled');
					}
				}
			}
		}
	}, 400);

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;

			document.body.appendChild(script);

			script.addEventListener('load', () => resolve(script));
			script.addEventListener('error', () => reject(script));
		});
	}

	setTimeout(async function() {
		await loadScript('https://cdn.shopmiraclebrand.co/js/cart_loader.js');
		// await loadScript('https://try.miraclebrand.co/pixel.js');
	}, 2400);
});

let title = 'Miracle Made® Sheets | Miracle Made';
let blurArray = [
	"🥺 ",
	"Come ",
	" Back!",
	" 🥺"
]; 

let comeBackAnim;

function onFocus() {
	clearTimeout(comeBackAnim);
	title = 'Miracle Made® Sheets | Miracle Made';
}

function onBlur() {
	title = '🥺';
	let index = 1;

	comeBackAnim = setInterval(function () {
		title += blurArray[index];
		index = (index + 1) % blurArray.length;
		if (index === 1) {
			title = '🥺'; 
		}
	}, 250);
}
</script>
 
<svelte:head>
	<title>{title}</title>

	<meta content="api.shopmiraclebrand.co" name="checkout-api-endpoint">
	<meta content="42536178319510" name="checkout-default-addons">
	<meta content="US" name="checkout-default-shipping-zone">
	<meta content="new" name="custom">
	<!-- <meta content="https://api.shopmiraclebrand.co/v1/cart/{sessionId}/miracle_redirect" name="checkout-next-url"> -->

	<meta content="mb-sheets-lp-ksp-sv-au" name="checkout-landing-page-name">
	<meta content="mb-sheets-lp-ksp-sv-au" name="checkout-funnel-name">
	<meta content="sheets" name="checkout-aux-page-name">

	<meta content="Miracle Made® Sheets" name="description">
</svelte:head>

<svelte:window on:blur={onBlur} on:focus={onFocus} />
 <!-- selectedColorIndex={first} selectedCheckoutIndex={second} selectedHeadlineIndex={third} city={data.city} -->
<ATCSection variantIndices={variantIndices} selectedVariant={data.experimentData.selectedVariant} selectedColorIndex={variantIndices['Default Color Change']} experimentData={data.experimentData} shippingDate={shippingDate} bind:sizeGuideOpened={sizeGuideOpened} city={data.city} />

<CarouselSection />


{#await PropSection}
{:then {default: PropSection}}
<PropSection />
{/await}


{#await ReviewsSection}
{:then {default: ReviewsSection}}
<ReviewsSection reviews={reviews} />
{/await}


{#await FreeTrialSection}
{:then {default: FreeTrialSection}}
<FreeTrialSection />
{/await}


{#await FAQSection}
{:then {default: FAQSection}}
<FAQSection faqs={sheetFAQs} />
{/await}


{#await ATCBanner}
{:then {default: ATCBanner}}
<ATCBanner shippingDate={shippingDate} />
{/await}


{#await SizeGuide}
{:then {default: SizeGuide}}
{#if sizeGuideOpened }
<SizeGuide bind:sizeGuideOpened={sizeGuideOpened} />
{/if}
{/await}
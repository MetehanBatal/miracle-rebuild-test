<script>
import { browser } from '$app/environment';
 
import ATCSection from '$lib/sheets/ATCSection.svelte';
const PropSection = import ('$lib/sheets/PropSection.svelte');
const ReviewsSection = import ('$lib/shared/Reviews.svelte');
const FreeTrialSection = import ('$lib/sheets/FreeTrialSection.svelte');
const FAQSection = import ('$lib/shared/FAQSection.svelte');

import {sheetFAQs} from '../../../stores/static/faqs/sheets';
import {reviews} from '../../../stores/static/reviews/sheets';


export let data;

let pageCrumbs = data.pageCrumbs;

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

	<meta content={pageCrumbs.pageName} name="checkout-landing-page-name">
	<meta content={pageCrumbs.funnelName} name="checkout-funnel-name">
	<meta content={pageCrumbs.pageType} name="checkout-aux-page-name">

	<meta content="Miracle Made® Sheets" name="description">
</svelte:head>

<svelte:window on:blur={onBlur} on:focus={onFocus} />
 <!-- selectedColorIndex={first} selectedCheckoutIndex={second} selectedHeadlineIndex={third} city={data.city} -->


<ATCSection />

<!-- <CarouselSection /> -->


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

<!-- 
{#await ATCBanner}
{:then {default: ATCBanner}}
<ATCBanner shippingDate={shippingDate} />
{/await}


{#await SizeGuide}
{:then {default: SizeGuide}}
{#if sizeGuideOpened }
<SizeGuide bind:sizeGuideOpened={sizeGuideOpened} />
{/if}
{/await} -->

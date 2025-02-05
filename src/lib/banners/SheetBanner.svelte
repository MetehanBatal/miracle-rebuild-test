<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	
	import { remainingTime } from '../../stores/functions';

	export let bannerData;
	export let bannerAttributes;

	// let topBanner = bannerData?.find((item) => item.component === 'TopBanner');
	// let bottomBanner = bannerData?.find((item) => item.component === 'BottomBanner');
	// let podcastBanner = bannerData?.find((item) => item.component === 'PodcastBanner');

	// function setBannerData() {
	// 	topBanner = bannerData?.find((item) => item.component === 'TopBanner');
	// 	bottomBanner = bannerData?.find((item) => item.component === 'BottomBanner');
	// 	podcastBanner = bannerData?.find((item) => item.component === 'PodcastBanner');
	// }

	// setBannerData();

	// console.log('Top Banner Data: ', topBanner);
	// console.log('--------');
	// console.log('Bottom Banner Data: ', bottomBanner);
	// console.log('--------');
	// console.log('Podcast Banner Data: ', podcastBanner);

	// let discountCode = topBanner?.data?.discountCode || '';

	// if ($page.route.id.includes('ksp') && browser) {
	// 	document.body.classList.add('ksp'); }

	onMount(() => {
		// alterElements();
	});

	// function alterElements() {
	// 	if (devAttributes.element.length > 1) {
	// 		// console.log('attribute changed: ', devAttributes);
	// 		if (devAttributes.element === 'TopBanner') {
	// 			if (!topBanner) { return; }
	// 			topBanner.data.backgroundColor = devAttributes.bannerStyling;
	// 			topBanner.data.timer = devAttributes.hasTimer;
	// 			topBanner.data.discountCode = devAttributes.discountCode;
	// 			topBanner.data.content = devAttributes.content;

	// 			topBanner.data = topBanner.data;
	// 		} else if (devAttributes.element === 'BottomBanner') {
	// 			if (!bottomBanner) { return; }
				
	// 			bottomBanner.data.backgroundColor = devAttributes.bannerStyling;
	// 			bottomBanner.data.timer = devAttributes.hasTimer;
	// 			bottomBanner.data.discountCode = devAttributes.discountCode;
	// 		} else {
	// 			if (!podcastBanner) { return; }
				
	// 			podcastBanner.data.backgroundColor = devAttributes.bannerStyling;
	// 			podcastBanner.data.timer = devAttributes.hasTimer;
	// 			podcastBanner.data.discountCode = devAttributes.discountCode;
	// 		}
	// 	}
	// }

	// $: devAttributes, alterElements();

	// $: bannerData, setBannerData();
</script>

<!-- START - Banners -->
<!-- {#if topBanner} -->
<div class="banner top-banner" data-cmp-id="TopBanner" style={`background-color: ${bannerAttributes.stylingData}`}>
	<div class="banner-container">
		<div class="banner-text-holder">
			<!-- {@html topBanner.data.content} -->
			{@html bannerAttributes.content}
		</div>

		{#if bannerAttributes.hasTimer}
		<div class="banner-timer-holder">
			<p>OFFER <br />VALID FOR</p>
			<span class="timer">{ $remainingTime }</span>
		</div>
		{/if}

		<!-- {#if topBanner?.data?.discountCode.length > 0}
		{@html topBanner?.data?.discountCode}
		{/if} -->
	</div>
</div>
<!-- {/if} -->

{#if $page.data.pageId === '8h719c66-a1e6-ag1e-g69dhe59cd88' || $page.url.pathname.includes('sheets')}
<div class="banner bottom-banner" data-cmp-id="BottomBanner" style={`background-color: #000`}>
	<div class="banner-container">
		<div class="banner-text-holder">
			<!-- {@html bottomBanner?.data?.content} <span>{@html bottomBanner?.data?.discountCode}</span> -->

			{@html bannerData}
		</div>
	</div>
</div>
{/if}

<!-- {#if podcastBanner}
<div class="banner bottom-banner" data-cmp-id="PodcastBanner" style={`background-color: ${podcastBanner?.data?.backgroundColor}`}>
	<div class="banner-container">
		<div class="banner-text-holder">
			{@html podcastBanner?.data?.content} <span>{@html podcastBanner?.data?.discountCode}</span>
		</div>
	</div>
</div>
{/if} -->
<!-- END - Banners -->

<style>
	/* START - BANNERS */
	.banner-text-holder {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	:global(.banner-text-holder img ){
		width: 25px;
		height: 15px;

		margin-right: 2px;
	}
	:global(.banner-text-holder p ){
		font-family: "Brandon" !important;
	}
	:global(.banner-text-holder strong ){
		font-family: "Brandon" !important;
	}

	strong {
		margin-left: 2px;
	}

	.banner{
		position:sticky;

		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;

		width:100%;
		height:65px;
		
		padding:0 12px;
		
		z-index:999;
	}

	.banner.top-banner{
		top:0;
		
		background-color: #dcff8e;
		
		color: #000;
	}

	.banner.bottom-banner{
		display: flex;

		top:65px;
		
		background-color:#000;
		color:#fff;
		
		text-align:center;
	}

	:global(.banner.bottom-banner p){
		color:#fff;
	}

	.banner-container{
		display:flex;
		justify-content:center;
		align-items:center
	}

	:global(.banner-text-holder p){
		font-size:14px;
		line-height:1.5;
		font-weight:300
	}

	:global(.bottom-banner .banner-text-holder p){
		font-size:1.5px;
		line-height:20px
	}


	:global(.banner-text-holder span){
		display:inline-block;
		
		background:#fff;
		color:#000;
		
		font-size: 17px;
		font-weight:600;
		
		border-radius:20px;
		
		padding: 5px 10px;
		margin-left: 5px
	}

	.banner-timer-holder{
		display:flex;
		flex-direction:column;
		column-gap: 8px;
		order:-1
	}

	.banner-timer-holder p{
		display:inline-block;

		width:60px;
		
		font-size:10px;
		line-height:9px;
		font-weight:700
	}

	.banner-timer-holder span{
		font-size:20px;
		font-weight:700
	}

	@media screen and (min-width : 768px) {
		.banner.top-banner p {
			display: flex;
			align-items: center;
		}

		:global(.banner-text-holder p){
			font-size:17px!important
		}
		
		.banner-timer-holder{
			flex-direction:row;
			align-items:center;
			order:0
		}

		.banner-timer-holder p{
			text-align:right
		}
	}

	/* END - BANNERS */
</style>
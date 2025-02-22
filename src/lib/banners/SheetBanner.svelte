<script>
	import { page } from '$app/stores';
	
	import { remainingTime } from '../../stores/toolkit/functions';

	export let bannerData;
	export let bannerAttributes;
</script>

<!-- START - Banners -->
<div class="banner top-banner" style={`background-color: ${bannerAttributes.stylingData}`}>
	<div class="banner-container">
		<div class="banner-text-holder">
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

{#if $page.url.pathname.includes('/sheets/')}
<div class="banner bottom-banner" style={`background-color: #000`}>
	<div class="banner-container">
		<div class="banner-text-holder">
			{@html bannerData}
		</div>
	</div>
</div>
{/if}
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
		font-family: "Montserrat", sans-serif !important;
	}
	:global(.banner-text-holder strong ){
		font-family: "Montserrat", sans-serif !important;
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
		font-family: 'Montserrat', sans-serif;

		
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
		align-items:center;
		gap: 1.5rem;
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
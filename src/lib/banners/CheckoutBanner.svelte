<script>
	import { onMount } from 'svelte';
	import { remainingTime } from '../../stores/functions';

	let hasTimer = true;
	let discountCode = false;
</script>

<!-- START - Banners -->
<div class="banner top-banner">
	<div class="banner-container">
		<div class="banner-text-holder">
			<p>🇺🇲 LABOR DAY SALE! <br class="desktop-hidden" /> UP TO <strong> 46% OFF AUTO-APPLIED</strong></p>
		</div>

		{#if hasTimer}
		<div class="banner-timer-holder">
			<p>OFFER <br />VALID FOR</p>
			<span class="timer">{ $remainingTime }</span>
		</div>
		{/if}

		{#if discountCode}
		{discountCode}
		{/if}
	</div>
</div> 
<!-- END - Banners -->
<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let checkingOut = false;

	function handleClick() {
		checkingOut = true;
		dispatch('triggerSubmit');
	}
</script>

<a href="/checkout/secure" data-sveltekit-prefetch on:click|preventDefault={(e) => handleClick} class='cta-button atc-button color-3' class:unclickable={checkingOut}>
	{#if !checkingOut}
	PROCEED TO CHECKOUT
	{:else}
	<span class="loader-v"></span>
	{/if}
</a>
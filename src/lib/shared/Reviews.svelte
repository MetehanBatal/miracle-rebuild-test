<script>
	import { onMount } from 'svelte';
	import lozad from 'lozad';

	import ReviewCard from '$lib/shared/ReviewCard.svelte';

	export let reviews;
	let reviewsExpanded = false;

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

<section class="reviews-section">
	<div class="reviews-container">
		<div class="reviews-top-bar">
			<div class="ratings-holder">
				<img width="92.5" height="15.9" data-src="/assets/icons/rating_stars.svg" alt="Miracle Made - 5 star Rating" class="lozad">

				<p>10,078+ FIVE-STAR REVIEWS</p>
			</div>

			<a href="https://www.miraclebrand.co/a/review/write" target="_blank" class="cta-button">WRITE A REVIEW</a>
		</div>

		<div class="reviews-grid" class:expanded={reviewsExpanded}>
			{#each reviews as review}
			<ReviewCard review={review} />
			{/each}
		</div>

		{#if !reviewsExpanded}
		<div class="cta-button center" on:click={() => reviewsExpanded = true}>Load more reviews</div>
		{/if}
	</div>
</section>
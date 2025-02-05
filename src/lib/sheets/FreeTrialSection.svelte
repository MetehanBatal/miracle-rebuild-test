<script>
	import { onMount } from 'svelte';
	import lozad from 'lozad';

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

<section class="free-trial-section">
	<img data-src="/assets/icons/try-miracle-bg.svg" alt="Miracle Made Sheets - Try Risk Free" class="lozad try-miracle-bg">
	
	<div class="free-trial-section-inner-wrapper">
		<h2>Try it Risk Free</h2>

		<div class="free-trial-items">
			<div class="free-trial-item">
				<img width="64" height="36" data-src="/assets/icons/calendar.svg" alt="try-sc-img" class="lozad">

				<h3>30-night trial</h3>

				<p>Try Miracle for 30 nights. Donʼt like it? <br> Get a 100% refund. No questions.</p>
			</div>

			<div class="free-trial-item">
				<img width="64" height="36" data-src="/assets/icons/shipping.svg" alt="try-sc-img" class="lozad">

				<h3>Fast shipping</h3>

				<p>Fast shipping is included <br> with every order</p>
			</div>

			<div class="free-trial-item">
				<img width="64" height="36" data-src="/assets/icons/shipping.svg" alt="try-sc-img" class="lozad">

				<h3>Free returns</h3>

				<p>Don’t like it? Return it for <br> free, no questions asked</p>
			</div>
		</div>
	</div>
</section>
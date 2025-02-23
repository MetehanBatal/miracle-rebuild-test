<script>
	export let review;

	import { onMount } from 'svelte';
	import lozad from 'lozad';

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

<div class="review">
	<img width="255" height="230" data-src={`/assets/images/testimonials/sheets/${review['imageURL']}.avif`} alt="Miracle Made - Sheets Review" class="author-img lozad">
	{#if review.isPhoto}
		<img class="non-photo lozad" data-src="/assets/icons/no-photo.png" alt="Miracle Made - Sheets Review">
	{/if}
	<div class="review-content">
		<div class="review-content-top">
			<h4 class="review-author">{review['reviewer']}</h4>

			<div class="flex gap-5">
				<svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g id="check-testimonials"><g id="check-testimonials"><path d="M6.5 13C10.0899 13 13 10.0899 13 6.5C13 2.91015 10.0899 0 6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13Z" id="Oval-Copy-6" fill="#77C44F" fill-rule="evenodd" stroke="none" /><g id="002-correct-symbol" transform="translate(2.7083333 4.3333335)"><path d="M6.6664 0.671331L6.07073 0.114606C5.98905 0.0382114 5.88972 0 5.77296 0C5.65609 0 5.55675 0.0382114 5.47507 0.114606L2.60173 2.80413L1.314 1.59649C1.23223 1.52007 1.13296 1.4819 1.01619 1.4819C0.899354 1.4819 0.800081 1.52007 0.718311 1.59649L0.122639 2.15323C0.0408693 2.22964 0 2.32245 0 2.43164C0 2.54074 0.0408693 2.63363 0.122639 2.71003L1.70818 4.19187L2.3039 4.74859C2.38562 4.82505 2.48493 4.86321 2.60173 4.86321C2.7185 4.86321 2.8178 4.82495 2.89957 4.74859L3.49528 4.19187L6.6664 1.2281C6.7481 1.15168 6.78904 1.05888 6.78904 0.949693C6.7891 0.840565 6.7481 0.747753 6.6664 0.671331Z" id="Path" fill="#FFFFFF" fill-rule="evenodd" stroke="none" /></g></g></g></svg>

				<p class="verified-buyer">VERIFIED BUYER</p>
			</div>
		</div>

		<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="81px" height="14px" viewBox="0 0 81 14" version="1.1">
			<title>rating_stars</title>
			<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g id="01_landing_funnel---oriya" transform="translate(-936.000000, -177.000000)" fill="#000000">
					<g id="rating_stars" transform="translate(936.365145, 177.588019)">
						<polygon id="Fill-1" points="9.04563 4.21734012 6.90111 0.000438119688 4.75308 4.21734012 0 4.92928461 3.45231 8.24944324 2.569887 13.0276642 6.901137 10.7891354 11.228877 13.0276642 10.349973 8.24944324 13.798773 4.92928461"/>
						<polygon id="Fill-2" points="25.50573 4.21734012 23.36121 0.000438119688 21.21669 4.21734012 16.46361 4.92928461 19.91241 8.24944324 19.029987 13.0276642 23.361237 10.7891354 27.688977 13.0276642 26.810073 8.24944324 30.258873 4.92928461"/>
						<polygon id="Fill-3" points="41.96583 4.21734012 39.82131 0.000438119688 37.67679 4.21734012 32.92371 4.92928461 36.37251 8.24944324 35.490087 13.0276642 39.821337 10.7891354 44.152587 13.0276642 43.270164 8.24944324 46.718964 4.92928461"/>
						<polygon id="Fill-4" points="58.42593 4.21734012 56.28141 0.000438119688 54.13689 4.21734012 49.38381 4.92928461 52.83261 8.24944324 51.953706 13.0276642 56.281446 10.7891354 60.612696 13.0276642 59.730273 8.24944324 63.179073 4.92928461"/>
						<polygon id="Fill-5" points="79.64253 4.92884649 74.88945 4.216902 72.74142 0 70.5969 4.216902 65.84382 4.92884649 69.29262 8.24900512 68.413716 13.0272261 72.741456 10.7886973 77.072706 13.0272261 76.190283 8.24900512"/>
					</g>
				</g>
			</g>
		</svg>

		<p class="review-content-text">
			{ @html review['content']}
		</p>

		<div class="review-item-type">
			<p class="item-type">ITEM TYPE:</p>
			<p class="review-product-name">{review["productType"]}</p>
		</div>
	</div>
</div>

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

		<svg width="80px" height="14px" viewBox="0 0 80 14" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
			<g id="rating-stars">
			  <g id="Rating-star" transform="translate(0 0.00043749998)">
				<path d="M9.04563 4.21094L6.90111 0L4.75308 4.21094L0 4.92188L3.45231 8.23734L2.56989 13.0088L6.90114 10.7734L11.2289 13.0088L10.35 8.23734L13.7988 4.92188L9.04563 4.21094Z" id="Fill-1" fill="#FFD624" fill-rule="evenodd" stroke="none" />
			  </g>
			  <g id="Rating-star" transform="translate(16.46361 0.00043749998)">
				<path d="M9.04333 4.21094L6.89935 0L4.75187 4.21094L0 4.92188L3.45143 8.23734L2.56923 13.0088L6.89938 10.7734L11.226 13.0088L10.3473 8.23734L13.7953 4.92188L9.04333 4.21094Z" id="Fill-1" fill="#FFD624" fill-rule="evenodd" stroke="none" />
			  </g>
			  <g id="Rating-star" transform="translate(32.92371 0.00043749998)">
				<path d="M9.04332 4.21094L6.89935 0L4.75187 4.21094L0 4.92188L3.45143 8.23734L2.56923 13.0088L6.89938 10.7734L11.226 13.0088L10.3473 8.23734L13.7953 4.92188L9.04332 4.21094Z" id="Fill-1" fill="#FFD624" fill-rule="evenodd" stroke="none" />
			  </g>
			  <g id="Rating-star" transform="translate(49.38381 0.00043749998)">
				<path d="M9.04333 4.21094L6.89935 0L4.75187 4.21094L0 4.92188L3.45143 8.23734L2.56923 13.0088L6.89938 10.7734L11.226 13.0088L10.3473 8.23734L13.7953 4.92188L9.04333 4.21094Z" id="Fill-1" fill="#FFD624" fill-rule="evenodd" stroke="none" />
			  </g>
			  <g id="Rating-star" transform="translate(65.84382 0)">
				<path d="M9.04559 4.21094L6.90108 0L4.75306 4.21094L0 4.92188L3.45229 8.23734L2.56988 13.0088L6.9011 10.7734L11.2288 13.0088L10.3499 8.23734L13.7987 4.92188L9.04559 4.21094Z" id="Fill-1" fill="#FFD624" fill-rule="evenodd" stroke="none" />
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

<script>
	import lozad from 'lozad';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	export let shippingDate;

	onMount(() => {
		const observer = lozad();
		observer.observe();

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
	});

	function scrollToAtc() {
		const scrollTo = document.querySelector('nav');
		scrollTo.scrollIntoView({
			behavior: 'smooth'
		});
	}
</script>

<div class="atc-sticky-banner">
	<div class="cta-button secondary" on:click={scrollToAtc}>
		BUY NOW
	</div>

	<div class="flex gap-5 w-50">
		<img class="hourglass-icon lozad" width="9" height="13" data-src="/assets/images/icons/hourglass.svg" alt="Miracle Made - 16 orders left">
		<p class="font-sm"><strong>16 orders</strong> at this price remaining</p>
	</div>

	<div class="flex gap-5 w-50">
		<div class="green-circle"></div>
		<p class="font-sm">Ships by <strong id="ships-by-date">{shippingDate}</strong></p>
	</div>
</div>
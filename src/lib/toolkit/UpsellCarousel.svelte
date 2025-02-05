<script>
	import { browser } from '$app/environment';

	import lozad from 'lozad';
	import KeenSlider from 'keen-slider';

	import { purchaseLog } from '../../stores/purchaseLog';

	export let imageCount;
	export let slug;
	export let hasVideo;

	let slider;
	let observer;
	let currentActiveThumb = 0;
	let isDesktop = false;

    let hasSlider = imageCount.length > 1;

	if (hasSlider && imageCount > 0 && browser) {
		function initSlider() {
			var innerSlider = new KeenSlider("#hero-slider", { loop: true });
			slider = innerSlider;
			slider.on("slideChanged", function() {
	            currentActiveThumb = slider.track.details.rel;
	        })
		}

		function initLozad() {
			observer = lozad('.lozad', {
				loaded: function(el) {
					el.removeAttribute('data-loaded');
				}
			});
			observer.observe();
		}

		setTimeout(() => {
			initSlider();
			initLozad();
		}, 800);

		isDesktop = window.matchMedia(`(min-width: 768px)`).matches;

		window.addEventListener('resize', () => {
			if (window.innerWidth > 769) {
				isDesktop = true;
			} else {
				isDesktop = false;
			}
		})
	}

	function handleThumbnailClick(el, goto) {
		document.querySelectorAll('.thumbnail').forEach((thumbnail) => thumbnail.classList.remove('active'));
		el.target.classList.add('active');
		slider.moveToIdx(goto);

		setTimeout(() => {
			slider.update();
		}, 300);
	}
</script>

<div class="upsell-slider">
	{#if hasSlider && imageCount > 0}
	<div class="slider-box" id="hero-slider">
		{#each Array(imageCount) as image, index}
		{#if index !== 0}
		<div class="slide keen-slider__slide">
			<img class="lozad" data-src={`/assets/images/upsells/sliders/${slug}/${$purchaseLog.purchase?.[0]?.selectedColor || 'stone'}/${index + 1}.webp`} alt="Miracle Made - Sheets" />
		</div>
		{:else}
		<div class="slide keen-slider__slide">
			<img src={`/assets/images/upsells/sliders/${slug}/${$purchaseLog.purchase?.[0]?.selectedColor || 'stone'}/${index + 1}.webp`} alt="Miracle Made - Sheets" />
		</div>
		{/if}
		{/each}
	</div>

	<div class="thumbnails">
		{#each Array(imageCount) as image, index}
		<img width="50" height="50" class="thumbnail pagination-indicator" class:active={currentActiveThumb === index} on:click={(e) => {handleThumbnailClick(e, index)}} src={`/assets/images/upsells/sliders/${slug}/${$purchaseLog.purchase?.[0]?.selectedColor || 'stone'}/${index + 1}_thumb.webp`} alt="Miracle Made - Sheets">
		{/each}
	</div>

	<div class="slider-button prev-button" on:click={() => slider.prev()}>
		<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Previous</title><g id="design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="01_landing_funnel" transform="translate(-30.000000, -460.000000)"><g id="03_gallery" transform="translate(0.000000, 117.000000)"><g id="Group-7-Copy-3" transform="translate(50.000000, 363.000000) scale(-1, 1) translate(-50.000000, -363.000000) translate(30.000000, 343.000000)"><circle id="Oval" fill="#000000" cx="20" cy="20" r="20"></circle><g id="navigation-arrow" transform="translate(16.551724, 11.034483)" fill="#FFFEF2" fill-rule="nonzero"><polygon id="navigation-arrow-right" transform="translate(4.729064, 8.275862) rotate(-90.000000) translate(-4.729064, -8.275862) " points="11.0531804 3.54679803 4.72906404 9.39515302 -1.59505234 3.54679803 -3.54679803 5.35165468 4.72906404 13.0049261 13.0049261 5.35165468"></polygon></g></g></g></g></g></svg>
	</div>

	<div class="slider-button next-button" on:click={() => slider.next()}>
		<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Next</title><g id="design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="01_landing_funnel" transform="translate(-782.000000, -460.000000)"><g id="03_gallery" transform="translate(0.000000, 117.000000)"><g id="Group-7-Copy" transform="translate(782.000000, 343.000000)"><circle id="Oval" fill="#000000" cx="20" cy="20" r="20"></circle><g id="navigation-arrow" transform="translate(16.551724, 11.034483)" fill="#FFFEF2" fill-rule="nonzero"><polygon id="navigation-arrow-right" transform="translate(4.729064, 8.275862) rotate(-90.000000) translate(-4.729064, -8.275862) " points="11.0531804 3.54679803 4.72906404 9.39515302 -1.59505234 3.54679803 -3.54679803 5.35165468 4.72906404 13.0049261 13.0049261 5.35165468"></polygon></g></g></g></g></g></svg>
	</div>
	{:else if hasVideo}
	<div class="ellen-banner">
		<img src={`/assets/images/upsells/sliders/${slug}/1.webp`} alt="As seen on Ellen">
	</div>

	<script src="https://fast.wistia.com/embed/medias/qt18vov7ls.jsonp" async></script>
	<script src="https://fast.wistia.com/assets/external/E-v1.js" async></script>
	<div class="wistia_responsive_padding" style="padding:100.0% 0 0 0;position:relative;">
		<div class="wistia_responsive_wrapper" style="height:100%;left:0;position:absolute;top:0;width:100%;">
			<div class="wistia_embed wistia_async_qt18vov7ls videoFoam=true" style="height:100%;position:relative;width:100%">&nbsp;</div>
		</div>
	</div>
	{:else if !hasSlider && imageCount === 1}
	<img src={`/assets/images/upsells/sliders/${slug}/1.webp`} alt="Miracle Made - Towel Image">
	{/if}
</div>

<style>
	.slider-box{
		display:flex;

		position:relative;
		max-height:75rem;

		width:100%;
		overflow:hidden;
	}

	.slider-button{
		position: absolute;
		top:50%;
		align-items:center;
		width:2.9rem;
		height:2.9rem;
		background-color:var(--secondary-color);
		border-radius:100%;
		transform:translate3d(0,-50%,0);
		cursor: pointer;
	}

	.slider-button.prev-button{
		left:1%
	}

	.slider-button.next-button{
		right:1%
	}
</style>
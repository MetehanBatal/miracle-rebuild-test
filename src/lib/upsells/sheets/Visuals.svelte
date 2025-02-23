<script>
	import { browser } from '$app/environment';

	import lozad from 'lozad';
	import KeenSlider from 'keen-slider';

	import { purchaseLog } from '../../../stores/writables/purchaseLog';

	export let hasSlider;
	export let imageCount;
	export let slug;
	export let hasVideo;
	export let selectedColor;

	let slider;
	let observer;
	let currentActiveThumb = 0;
	let isDesktop = false;

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
			<img class="lozad" data-src={`/assets/images/upsells/sliders/${slug}/${selectedColor || 'stone'}/${index + 1}.webp`} alt="Miracle Made - Sheets" />
		</div>
		{:else}
		<div class="slide keen-slider__slide">
			<img src={`/assets/images/upsells/sliders/${slug}/${selectedColor || 'stone'}/${index + 1}.webp`} alt="Miracle Made - Sheets" />
		</div>
		{/if}
		{/each}
	</div>

	<div class="thumbnails">
		{#each Array(imageCount) as image, index}
		<img width="50" height="50" class="thumbnail pagination-indicator" class:active={currentActiveThumb === index} on:click={(e) => {handleThumbnailClick(e, index)}} src={`/assets/images/upsells/sliders/${slug}/${selectedColor || 'stone'}/${index + 1}_thumb.webp`} alt="Miracle Made - Sheets">
		{/each}
	</div>

	<div class="slider-button prev-button" on:click={() => slider.prev()}>
		<svg version="1.1" id="navigation-arrow-right_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 13" style="enable-background:new 0 0 8 13;" xml:space="preserve"><polygon points="0.4,1.7 4.8,6.5 0.4,11.2 1.8,12.7 7.5,6.5 1.8,0.3 " fill="#ffffff"></polygon></svg>
	</div>

	<div class="slider-button next-button" on:click={() => slider.next()}>
		<svg version="1.1" id="navigation-arrow-right_1_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 8 13" style="enable-background:new 0 0 8 13;" xml:space="preserve"><polygon points="0.4,1.7 4.8,6.5 0.4,11.2 1.8,12.7 7.5,6.5 1.8,0.3 " fill="#ffffff"></polygon></svg>
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
		top:calc(50% - 3.1rem);
		display:flex;
		justify-content:center;
		align-items:center;
		width:3rem;
		height:3rem;
		background-color:var(--secondary-color);
		border-radius:100%;
		transform:translate3d(0,-50%,0);
		cursor: pointer;
	}

	.slider-button.prev-button{
		left:1.5rem
	}

	.slider-button.prev-button svg{
		transform: translateX(-0.1rem) rotate(180deg);
	}

	.slider-button svg{
		width:.8rem;
		transform:translateX(.1rem);
	} 

	.slider-button.next-button{
		right:1.5rem
	}
</style>
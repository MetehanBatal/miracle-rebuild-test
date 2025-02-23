<script>
	import '../../css/mixed.min.css';
	
	import CarouselSection from '$lib/sheets/LogoCarousel.svelte';
	import SizeGuide from '$lib/sheets/SizeGuide.svelte';
	import ATCBanner from '$lib/sheets/ATCBanner.svelte';
	
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import lozad from 'lozad';
	import { sheetVariants } from '../../stores/static/products/sheets';
	// import 'keen-slider/keen-slider.min.css'
	import KeenSlider from 'keen-slider';

	let sizeGuideOpened = false;

	let date = new Date(Date.now() + 172800000);
	let day = date.toString().split(' ')[0];
	let dayNum = date.getDate();
	let month = date.toString().split(' ')[1];
	let shippingDate = `${day}, ${month} ${dayNum}th`;

	let sizes = [
		'twin',
		'full',
		'queen',
		'king',
		'cali_king'
	];

	let colors = {
		stone: 7,
		white: 7,
		sky_blue: 6,
		navy_blue: 5,
		sand: 5,
		sage: 6,
		terracotta: 7,
		charcoal: 6,
		slate_blue: 7,
		silver_grey: 7,
		rosewood: 7
	};

	let selectedColorIndex = 0;
	let freeGiftVisible = true;
	// // only queen (index: 2) and king (index: 3) are available to select
	// // thus +2 to the returning index...

	let selectedSizeIndex = 2;
	let selectedSize = sizes[selectedSizeIndex];

	let sizeSelectionDropdown;
	
	let observer;

	let isDesktop = false;
	let currentActiveThumb = 0;
	let innerWidth = 0;

	let checkingOut = false;
	let towelImg;

	let quantity = 1;
	let selectedColor = Object.keys(colors)[0];

	let slider = '';

	function closeDropdown(e) {
		if(!e.target.closest(".dropdown-selection-outer-box") && sizeSelectionDropdown.classList.contains("opened")) {
			sizeSelectionDropdown.classList.remove('opened');
		}
	}

	onMount(() => {
		initLozad();
		initSlider();
		
		isDesktop = window.matchMedia(`(min-width: 768px)`).matches;

		window.addEventListener('resize', () => {
			if (window.innerWidth > 769) {
				isDesktop = true;
			} else {
				isDesktop = false;
			}
		})
		document.body.addEventListener("click", closeDropdown);
	});

	onDestroy(() => {
		if (browser) {
			document.body.removeEventListener("click", closeDropdown);
		}
	});


	function toggleSizeGuide() {
		sizeGuideOpened = true;
	}

	function initLozad() {
		observer = lozad('.lozad', {
			loaded: function(el) {
				el.removeAttribute('data-loaded');
			}
		});
		observer.observe();
	}

	function initSlider() {
		var innerSlider = new KeenSlider("#hero-slider", { loop: true });
		slider = innerSlider;
		slider.on("slideChanged", function() {
            currentActiveThumb = slider.track.details.rel;
        })
	}

	function handleSizeSelection(trigger, size) {
		selectedSize = size.replace('_', ' ');

		// $('.dropdown-selection-outer-box').removeClass('opened');

		filterVariants('size');

		if (trigger.target.classList.contains('out-of-stock')) {
			handleOutOfStock('size'); }
	}

	function handleColorSelection(element, value) {
		slider.moveToIdx(0);

		selectedColor = value;

		initLozad();

		observer.observe();

		filterVariants('color');

		document.querySelectorAll('.pagination-indicator').forEach((thumbnail) => thumbnail.classList.remove('active'));
		document.querySelectorAll('.pagination-indicator')[0].classList.add('active');

		sizeSelectionDropdown.classList.remove('opened');

		if (element.target.classList.contains('out-of-stock')) {
			handleOutOfStock('color');
		}

		setTimeout(() => {
			slider.update();
			slider.moveToIdx(0);
		}, 0);
	}

	function handleQuantitySelection(value) {
		quantity = value;
	}

	function handleSubmit(e) {
		e.preventDefault();

		checkingOut = true;

		const clearCart = async () => {
			const updateRec = {};
			checkout.cart.localCart.lineItems.forEach(x => {
				if (x.variantId != '34937177702550') {
					updateRec[x.variantId] = 0;
				}
			});
			const newCart = await checkout.apiClient.setVariantQuantities(updateRec);
			checkout.setCart(newCart);
		}

		clearCart().then(x => {
			let cartObject = {};
			cartObject[sheetVariants[selectedSize][selectedColor]['variantId']] = quantity;

			window.checkout.apiClient.setVariantQuantities(cartObject).then(x => {
				window.checkout.setCart(x);
				window.checkout.drawCart(x);
				goto('/sheets/checkout/');
				// setTimeout(() => {goto('/checkout')}, 8000);
			});
		});

	}

	function handleThumbnailClick(el, goto) {
		document.querySelectorAll('.thumbnail').forEach((thumbnail) => thumbnail.classList.remove('active'));
		el.target.classList.add('active');
		slider.moveToIdx(goto);

		setTimeout(() => {
			slider.update();
		}, 300);
	}

	function filterVariants(filtration) {
		if (filtration === 'size') {
			document.querySelectorAll('.colors label').forEach((label) => label.classList.remove('out-of-stock'));
			Object.keys(colors).forEach(function(colorChoice) {
				if (sheetVariants[selectedSize][colorChoice] === undefined) {
					document.querySelectorAll(`[data-color="${colorChoice}"`).forEach((colorInner) => colorInner.classList.add('out-of-stock'));
				}
			})
		}

		if (filtration === 'color') {
			document.querySelectorAll('.size-selection-box .dropdown-option').forEach((dropdown) => dropdown.classList.remove('out-of-stock'));
			Object.keys(sheetVariants).forEach(function(key) {
				if ( !Object.keys(sheetVariants[key]).includes(selectedColor) ) {
					document.querySelectorAll(`.size-option[data-value="${key}"`).forEach((sizeInner) => sizeInner.classList.add('out-of-stock'));
				}
			});
		}
	}

	function handleOutOfStock(type) {
		if (type === 'color') {
			let matchingSize = Object.keys(sheetVariants).find(function(key) {
				return Object.keys(sheetVariants[key]).includes(selectedColor) === true
			});

			size = matchingSize;

			
			filterVariants('size');

			if (event.target.parentNode.classList.contains('out-of-stock')) {
				self.handleOutOfStock('color');
			}
		}

		if (type === 'size') {
			const value = 'stone';
			selectedColor = value;
			document.querySelector('input[value=stone]').checked = true;
			filterVariants('color');
		}
	}

	$: selectedColor, selectedColor === "stone" || selectedColor === "sky_blue" || selectedColor === "white" || selectedColor === "charcoal"  ? towelImg = selectedColor : towelImg = "white";
	$: selectedColor, console.log('Color changed to: ', selectedColor, colors);
</script>


<svelte:window bind:innerWidth={innerWidth} />

<section class="atc-section">
	<div class="slider-box">
		<span class="hidden">{selectedColor}</span>
		<div class="slider-box" id="hero-slider">
			{#each Array(colors[selectedColor]) as image, index}
			{#if index !== 0}
			<div class="slide keen-slider__slide">
				<img data-tag-name="heroImage" style="object-fit: cover;" class="lozad" data-src={`/assets/images/sliders_avif/${selectedColor}/${index + 1}.webp`} width={Math.floor(parseInt(innerWidth) * 0.55)} alt="Miracle Made - Sheets" />
			</div>
			{:else}
			<div class="slide keen-slider__slide">
				<img data-tag-name="heroImage" style="object-fit: cover;" src={`/assets/images/sliders_avif/${selectedColor}/${index + 1}.webp`} width={Math.floor(parseInt(innerWidth) * 0.55)} alt="Miracle Made - Sheets" />
			</div>
			{/if}
			{/each}
		</div>

		<div class="thumbnails">
			{#each Array(colors[selectedColor]) as image, index}
			{#if isDesktop}
			<img data-tag-name="heroThumbnail" style="object-fit: cover;" width="50" height="50" class="thumbnail pagination-indicator" class:active={currentActiveThumb === index} on:click={(e) => {handleThumbnailClick(e, index)}} src={`/assets/images/sliders_avif/${selectedColor}/${index + 1}_thumb.webp`} alt="Miracle Made - Sheets">
			{:else}
			<div data-tag-name="paginationBullet" class="bullet-point pagination-indicator" class:active={currentActiveThumb === index}></div>
			{/if}
			{/each}
		</div>

		<div data-tag-name="soldOutBadge" class="sold-out-badge">
			<svg width="16px" height="24px" viewBox="0 0 16 24" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M3.97216 23.9685C4.20659 24.0931 4.45389 23.8232 4.31036 23.5998C3.5313 22.3873 2.79357 20.347 3.96894 17.7194C5.92902 13.3375 7.12173 11.068 7.12173 11.068C7.12173 11.068 7.75612 13.7165 9.47581 16.0714C11.1309 18.3377 12.0368 21.1881 10.5764 23.5627C10.4393 23.7856 10.681 24.0485 10.9139 23.9293C12.7217 23.0045 14.7494 21.1495 14.9782 17.4581C15.0625 16.3301 14.936 14.7508 14.3035 12.758C13.4901 10.2323 12.4902 9.05375 11.9116 8.54763C11.7386 8.39622 11.4694 8.53042 11.4836 8.75991C11.6522 11.4852 10.6269 12.1767 10.0434 10.6182C9.81032 9.99567 9.67439 8.91897 9.67439 7.60775C9.67439 5.42481 9.04106 3.17767 7.64479 1.35163C7.28169 0.87677 6.85683 0.433045 6.36937 0.0546527C6.1929 -0.0823669 5.9371 0.0553585 5.95326 0.278182C6.06047 1.75802 5.96334 5.99916 2.24251 11.066C-1.13117 15.766 0.176121 19.3756 0.640003 20.3533C1.52691 22.2262 2.764 23.3261 3.97216 23.9685Z" id="Path" fill="#FFFFFF" stroke="none"></path></svg>

			<p>SOLD OUT 4X</p>
		</div>

		<div data-tag-name="sliderPrevButton" class="slider-button prev-button" on:click={() => slider.prev()}>
			<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Previous</title><g id="design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="01_landing_funnel" transform="translate(-30.000000, -460.000000)"><g id="03_gallery" transform="translate(0.000000, 117.000000)"><g id="Group-7-Copy-3" transform="translate(50.000000, 363.000000) scale(-1, 1) translate(-50.000000, -363.000000) translate(30.000000, 343.000000)"><circle id="Oval" fill="#000000" cx="20" cy="20" r="20"></circle><g id="navigation-arrow" transform="translate(16.551724, 11.034483)" fill="#FFFEF2" fill-rule="nonzero"><polygon id="navigation-arrow-right" transform="translate(4.729064, 8.275862) rotate(-90.000000) translate(-4.729064, -8.275862) " points="11.0531804 3.54679803 4.72906404 9.39515302 -1.59505234 3.54679803 -3.54679803 5.35165468 4.72906404 13.0049261 13.0049261 5.35165468"></polygon></g></g></g></g></g></svg>
		</div>

		<div data-tag-name="sliderNextButton" class="slider-button next-button" on:click={() => slider.next()}>
			<svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg"><title>Next</title><g id="design" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="01_landing_funnel" transform="translate(-782.000000, -460.000000)"><g id="03_gallery" transform="translate(0.000000, 117.000000)"><g id="Group-7-Copy" transform="translate(782.000000, 343.000000)"><circle id="Oval" fill="#000000" cx="20" cy="20" r="20"></circle><g id="navigation-arrow" transform="translate(16.551724, 11.034483)" fill="#FFFEF2" fill-rule="nonzero"><polygon id="navigation-arrow-right" transform="translate(4.729064, 8.275862) rotate(-90.000000) translate(-4.729064, -8.275862) " points="11.0531804 3.54679803 4.72906404 9.39515302 -1.59505234 3.54679803 -3.54679803 5.35165468 4.72906404 13.0049261 13.0049261 5.35165468"></polygon></g></g></g></g></g></svg>
		</div>
	</div>

	<div class="atc-content">
		<div class="container">
			<div data-tag-name="ratingsHolder" class="ratings-holder align-left">
				<!-- <img width="81" height="14" src="https://try.miraclebrand.co/sheets/assets/images/icons/rating_stars.svg" alt="Miracle Made - 5 star Rating" /> -->
				<svg width="81px" height="14px" viewBox="0 0 81 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title>rating_stars</title><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="01_landing_funnel---oriya" transform="translate(-936.000000, -177.000000)" fill="#000000"><g id="rating_stars" transform="translate(936.365145, 177.588019)"><polygon id="Fill-1" points="9.04563 4.21734012 6.90111 0.000438119688 4.75308 4.21734012 0 4.92928461 3.45231 8.24944324 2.569887 13.0276642 6.901137 10.7891354 11.228877 13.0276642 10.349973 8.24944324 13.798773 4.92928461"></polygon><polygon id="Fill-2" points="25.50573 4.21734012 23.36121 0.000438119688 21.21669 4.21734012 16.46361 4.92928461 19.91241 8.24944324 19.029987 13.0276642 23.361237 10.7891354 27.688977 13.0276642 26.810073 8.24944324 30.258873 4.92928461"></polygon><polygon id="Fill-3" points="41.96583 4.21734012 39.82131 0.000438119688 37.67679 4.21734012 32.92371 4.92928461 36.37251 8.24944324 35.490087 13.0276642 39.821337 10.7891354 44.152587 13.0276642 43.270164 8.24944324 46.718964 4.92928461"></polygon><polygon id="Fill-4" points="58.42593 4.21734012 56.28141 0.000438119688 54.13689 4.21734012 49.38381 4.92928461 52.83261 8.24944324 51.953706 13.0276642 56.281446 10.7891354 60.612696 13.0276642 59.730273 8.24944324 63.179073 4.92928461"></polygon><polygon id="Fill-5" points="79.64253 4.92884649 74.88945 4.216902 72.74142 0 70.5969 4.216902 65.84382 4.92884649 69.29262 8.24900512 68.413716 13.0272261 72.741456 10.7886973 77.072706 13.0272261 76.190283 8.24900512"></polygon></g></g></g></svg>

				<p class="text-sm">10,078+ FIVE-STAR REVIEWS</p>
			</div>

			<h1 data-tag-name="headline">
				Temp-regulating and self-cleaning sheets. 
				<br class="mobile-hidden">
				Hotel-quality sleep, every night.
			</h1>

			<p data-tag-name="mainParagraph" class="mb-20">Infused with silver that helps prevent up to 99.7% of bacteria growth and helps keep you at the perfect temperature all night long.</p>

			<p data-tag-name="secondParagraph" class="mb-20">Set of <span class="non-twin">2 pillowcases</span>, 1 fitted sheet, and 1 flat sheet, plus a free 3-piece towel set.</p>

			<form data-tag-name="atcForm" class="atc-form" on:submit|preventDefault={(e) => handleSubmit(e)}>
				<!-- <div class="atc-banner">
					<div class="free-badge">
						<svg width="36px" height="37px" viewBox="0 0 36 37" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
							<g id="Group-7-Copy-3">
							  <path d="M12.5338 34.317C13.0048 34.317 13.3857 34.3607 13.7334 34.455C14.4306 34.6444 15.0465 35.0693 15.6988 35.5189C16.5189 36.0842 17.2267 36.5723 18.0001 36.5723C18.7731 36.5723 19.4807 36.0844 20.3001 35.5193C20.9539 35.069 21.5702 34.6444 22.2649 34.4554C22.9933 34.2581 23.7517 34.3117 24.5545 34.3682C25.4482 34.4315 26.3678 34.4974 27.0019 34.1247C27.6474 33.7451 28.0167 32.9726 28.4442 32.0779C28.7959 31.3419 29.1269 30.6496 29.6485 30.12C30.1712 29.589 30.8519 29.2534 31.5723 28.8983C32.4548 28.4631 33.2169 28.0873 33.5907 27.4309C33.9565 26.7885 33.8986 25.9393 33.8313 24.9556C33.775 24.1334 33.722 23.3569 33.9167 22.6185C34.1015 21.9146 34.5186 21.29 34.9601 20.6285C35.518 19.7927 36 19.0712 36 18.2859C36 17.5024 35.5208 16.7842 34.9657 15.9522C34.5212 15.286 34.1021 14.6586 33.9165 13.9529C33.7214 13.2134 33.775 12.4393 33.8313 11.6202C33.8929 10.7165 33.9565 9.78381 33.5909 9.14164C33.2171 8.48518 32.4567 8.11003 31.5758 7.67576C30.8507 7.31731 30.1686 6.9804 29.6485 6.45207C29.1265 5.92154 28.7959 5.22948 28.4459 4.49698C28.0178 3.60097 27.6481 2.82715 27.0017 2.44694C26.3709 2.07641 25.5354 2.13465 24.5695 2.20278C23.7552 2.2597 22.9913 2.31354 22.2662 2.11662C21.572 1.9285 20.9563 1.50434 20.3045 1.05535C19.4824 0.488773 18.7731 0 18.0001 0C17.2287 0 16.5217 0.486795 15.7027 1.05051C15.0472 1.50214 14.4298 1.9274 13.7347 2.11641C13.0085 2.31332 12.2483 2.26014 11.4433 2.20343C10.5092 2.13838 9.6285 2.07707 8.99811 2.44716C8.35257 2.82671 7.98329 3.59921 7.55582 4.49412C7.20299 5.2308 6.87135 5.92396 6.35129 6.45207C5.83122 6.98084 5.15151 7.31643 4.43199 7.67158C3.54676 8.10805 2.78311 8.48474 2.40929 9.14098C2.04304 9.78381 2.10686 10.7159 2.16873 11.6172C2.22476 12.4402 2.27754 13.2153 2.08392 13.9518C1.89745 14.6599 1.47928 15.2856 1.03666 15.9482C0.480257 16.7814 0 17.5005 0 18.2859C0 19.0694 0.478959 19.7878 1.03407 20.6197C1.47863 21.2856 1.89788 21.9133 2.08371 22.6192C2.27776 23.3569 2.22497 24.1312 2.16873 24.9509C2.10145 25.9382 2.04347 26.7889 2.40864 27.43C2.78246 28.0867 3.54243 28.4614 4.42204 28.8954C5.14697 29.2528 5.82971 29.5895 6.3515 30.1198C6.87243 30.649 7.20277 31.3399 7.55258 32.0716C7.98178 32.9704 8.35171 33.7447 8.99832 34.1247C9.63001 34.4967 10.5451 34.4315 11.4297 34.3693C11.7968 34.3433 12.1706 34.317 12.5338 34.317" id="Fill-1" fill="#f29869" fill-rule="evenodd" stroke="none" />
							</g>
						  </svg>
						<p>FREE</p>
					</div>

					<img class="lozad towel-img" width="74.7" height="36" data-src={`https://miracle-rebuild.vercel.app/assets/images/towels/${towelImg}.webp`} alt="Free Towel">

					<div>
						<p>GET A FREE TOWEL SET (3 PIECES)</p>
						<p><span>Sale is live!</span> Ends in <span>24H</span></p>
					</div>
				</div> -->

				<div class="form-selection">
					<div class="color-selection-box">
						<div class="ratings-holder align-left color-holder">
							<p data-tag-name="colorText" class="color-text">COLOR: </p>
							<div data-tag-name="selectedColorText" class="color-name">
								<p id="selected-color-name">{selectedColor.replace('_', ' ')}</p>
								{#if selectedColor === "terracotta" || selectedColor === "sage"}
									<div data-tag-name="limitedEditionMark" class="limited-edition-mark">    
										<svg width="139px" height="23px" viewBox="0 0 139 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink">
											<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
												<g id="badge_1">
													<rect id="Rectangle-Copy-11" fill="#FFF69A" x="0" y="0" width="139" height="23" rx="11.5"></rect>
													<g id="Group-2-Copy-6" transform="translate(5.000000, 4.000000)" fill="#FF935F">
														<path d="M5.57059329,15.0133285 C5.77990638,15.0133285 5.94922211,15.032462 6.10373112,15.0737095 C6.41361448,15.1565891 6.68734639,15.3424434 6.97723107,15.5391623 C7.34172621,15.7864551 7.6563208,16 8.00004807,16 C8.34358306,16 8.6580815,15.7865513 9.02228819,15.5393546 C9.31284591,15.3423472 9.58677011,15.1565891 9.8954997,15.0739018 C10.2192283,14.9875608 10.5563214,15.011021 10.9131247,15.035731 C11.31031,15.0634217 11.719033,15.0922661 12.0008413,14.929199 C12.2877454,14.7631513 12.4518692,14.4251908 12.6418566,14.033772 C12.7981924,13.7117721 12.9452981,13.4089057 13.1771097,13.1771889 C13.409402,12.9448951 13.7119782,12.798077 14.0321493,12.6427018 C14.4243349,12.4523286 14.7630625,12.2879154 14.9292054,12.0007211 C15.0917908,11.7196803 15.0660233,11.3481642 15.0361214,10.9178054 C15.0111231,10.5581155 14.9875669,10.2184244 15.0740997,9.89536686 C15.1562096,9.5874046 15.341582,9.31415179 15.537819,9.02474611 C15.7857834,8.65909501 16,8.3434409 16,7.99990385 C16,7.65713599 15.7870333,7.3429241 15.5403188,6.97890752 C15.3427358,6.68748272 15.1564981,6.41297999 15.0740035,6.10424854 C14.9872785,5.78071029 15.0111231,5.4420768 15.0361214,5.08373295 C15.0635234,4.68837209 15.0917908,4.28031969 14.9293015,3.99937504 C14.7631587,3.71218076 14.4252003,3.54805601 14.0336877,3.35806742 C13.7114013,3.20124992 13.4082483,3.05385494 13.1771097,2.82271498 C12.9451058,2.59061354 12.7981924,2.28784328 12.6426258,1.96738177 C12.4523499,1.57538609 12.2880338,1.23684875 12.0007451,1.07051259 C11.7203791,0.908406947 11.3490575,0.933886185 10.9197589,0.963692086 C10.5578598,0.988594435 10.218363,1.01215071 9.89607658,0.926002043 C9.58753929,0.843699297 9.31390353,0.658133526 9.02421114,0.461703023 C8.65885068,0.213833303 8.34358306,0 8.00004807,0 C7.65718612,0 7.34297613,0.212967971 6.97896173,0.459587765 C6.68763483,0.657172045 6.41322989,0.843218557 6.10430801,0.925905895 C5.78154088,1.01205456 5.4436786,0.988786732 5.08591379,0.96398053 C4.67074893,0.935520702 4.2793325,0.908695391 3.99915871,1.07060874 C3.7122546,1.23665645 3.54813083,1.57461691 3.35814339,1.96613184 C3.20132684,2.28842017 3.05393273,2.59167117 2.82279417,2.82271498 C2.5916556,3.05404723 2.28956019,3.20086533 1.96977363,3.35624061 C1.5763381,3.54719067 1.23693746,3.71198846 1.0707946,3.99908659 C0.908016898,4.28031969 0.936380408,4.68808365 0.96387859,5.08238688 C0.98878079,5.44246139 1.01224078,5.78157563 0.926188774,6.1037678 C0.843309637,6.41355688 0.657456538,6.68729043 0.460738773,6.97717685 C0.213447428,7.34167418 0,7.65627066 0,7.99990385 C0,8.34267171 0.212870543,8.65697975 0.459585003,9.02090019 C0.657168096,9.31222883 0.843501932,9.58682771 0.926092626,9.89565531 C1.01233692,10.2184244 0.988876937,10.557154 0.96387859,10.9157863 C0.93397672,11.3476834 0.908209193,11.7198726 1.07050616,12.0003365 C1.23664902,12.2876269 1.57441515,12.4515594 1.96535085,12.6414518 C2.28754109,12.7977886 2.59098257,12.9450874 2.82289031,13.1770927 C3.05441347,13.4086173 3.20123069,13.7109068 3.35670118,14.0309837 C3.5474578,14.4242293 3.71187001,14.762959 3.99925486,14.929199 C4.28000553,15.0919776 4.68670941,15.0634217 5.0798565,15.0362118 C5.24301879,15.0248663 5.40916165,15.0133285 5.57059329,15.0133285" id="Fill-1"></path>
													</g>
													<g id="Limited-Edition-Drop-Copy-2" transform="translate(26.837200, 8.168000)" fill="#000000" fill-rule="nonzero">
														<path d="M0,6.3572 C0,6.4492 0.0736,6.532 0.1748,6.532 L3.542,6.532 C3.6432,6.532 3.7168,6.4492 3.7168,6.3572 L3.7168,5.6028 C3.7168,5.5108 3.6432,5.428 3.542,5.428 L1.196,5.428 L1.196,0.2668 C1.196,0.1748 1.1132,0.092 1.0212,0.092 L0.1748,0.092 C0.0736,0.092 0,0.1748 0,0.2668 L0,6.3572 Z" id="Path"></path>
														<path d="M4.646,6.3572 C4.646,6.4492 4.7288,6.532 4.8208,6.532 L5.6764,6.532 C5.7684,6.532 5.8512,6.4492 5.8512,6.3572 L5.8512,0.2668 C5.8512,0.1748 5.7684,0.092 5.6764,0.092 L4.8208,0.092 C4.7288,0.092 4.646,0.1748 4.646,0.2668 L4.646,6.3572 Z" id="Path"></path>
														<path d="M7.1024,6.3204 C7.084,6.4492 7.1576,6.532 7.2772,6.532 L8.1052,6.532 C8.188,6.532 8.2616,6.4584 8.2708,6.394 L8.8044,2.9072 C8.8136,2.9072 8.832,2.9072 8.832,2.9072 L10.4604,6.5228 C10.488,6.578 10.534,6.624 10.6168,6.624 L10.7824,6.624 C10.8652,6.624 10.9204,6.578 10.9388,6.5228 L12.5488,2.9072 C12.5488,2.9072 12.5672,2.9072 12.5764,2.9072 L13.1192,6.394 C13.1376,6.4584 13.2112,6.532 13.294,6.532 L14.1312,6.532 C14.2508,6.532 14.3244,6.4492 14.2968,6.3204 L13.2112,0.138 C13.202,0.0644 13.1468,0 13.0456,0 L12.8984,0 C12.8156,0 12.7696,0.0368 12.742,0.092 L10.718,4.4344 C10.7088,4.4344 10.7088,4.4344 10.6904,4.4344 L8.6664,0.092 C8.6388,0.0368 8.5836,0 8.51,0 L8.3628,0 C8.2616,0 8.2064,0.0644 8.1972,0.138 L7.1024,6.3204 Z" id="Path"></path>
														<path d="M15.5572,6.3572 C15.5572,6.4492 15.64,6.532 15.732,6.532 L16.5876,6.532 C16.6796,6.532 16.7624,6.4492 16.7624,6.3572 L16.7624,0.2668 C16.7624,0.1748 16.6796,0.092 16.5876,0.092 L15.732,0.092 C15.64,0.092 15.5572,0.1748 15.5572,0.2668 L15.5572,6.3572 Z" id="Path"></path>
														<path d="M19.3016,6.3572 C19.3016,6.4492 19.3844,6.532 19.4764,6.532 L20.332,6.532 C20.424,6.532 20.5068,6.4492 20.5068,6.3572 L20.5068,1.196 L21.9144,1.196 C22.0156,1.196 22.0892,1.1132 22.0892,1.0212 L22.0892,0.2668 C22.0892,0.1748 22.0156,0.092 21.9144,0.092 L17.894,0.092 C17.7928,0.092 17.7192,0.1748 17.7192,0.2668 L17.7192,1.0212 C17.7192,1.1132 17.7928,1.196 17.894,1.196 L19.3016,1.196 L19.3016,6.3572 Z" id="Path"></path>
														<path d="M23.046,6.3572 C23.046,6.4492 23.1196,6.532 23.2208,6.532 L26.9652,6.532 C27.0664,6.532 27.14,6.4492 27.14,6.3572 L27.14,5.6028 C27.14,5.5108 27.0664,5.428 26.9652,5.428 L24.242,5.428 L24.242,3.818 L26.5144,3.818 C26.6064,3.818 26.6892,3.7444 26.6892,3.6432 L26.6892,2.8796 C26.6892,2.7876 26.6064,2.7048 26.5144,2.7048 L24.242,2.7048 L24.242,1.196 L26.9652,1.196 C27.0664,1.196 27.14,1.1132 27.14,1.0212 L27.14,0.2668 C27.14,0.1748 27.0664,0.092 26.9652,0.092 L23.2208,0.092 C23.1196,0.092 23.046,0.1748 23.046,0.2668 L23.046,6.3572 Z" id="Path"></path>
														<path d="M28.4556,6.3572 C28.4556,6.4492 28.5292,6.532 28.6212,6.532 L30.8016,6.532 C32.5772,6.532 34.0308,5.0876 34.0308,3.3028 C34.0308,1.5364 32.5772,0.092 30.8016,0.092 L28.6212,0.092 C28.5292,0.092 28.4556,0.1748 28.4556,0.2668 L28.4556,6.3572 Z M29.6424,5.4096 L29.6424,1.2052 L30.6912,1.2052 C31.8872,1.2052 32.7612,2.1068 32.7612,3.3028 C32.7612,4.508 31.8872,5.4096 30.6912,5.4096 L29.6424,5.4096 Z" id="Shape"></path>
														<path d="M37.2784,6.3572 C37.2784,6.4492 37.352,6.532 37.4532,6.532 L41.1976,6.532 C41.2988,6.532 41.3724,6.4492 41.3724,6.3572 L41.3724,5.6028 C41.3724,5.5108 41.2988,5.428 41.1976,5.428 L38.4744,5.428 L38.4744,3.818 L40.7468,3.818 C40.8388,3.818 40.9216,3.7444 40.9216,3.6432 L40.9216,2.8796 C40.9216,2.7876 40.8388,2.7048 40.7468,2.7048 L38.4744,2.7048 L38.4744,1.196 L41.1976,1.196 C41.2988,1.196 41.3724,1.1132 41.3724,1.0212 L41.3724,0.2668 C41.3724,0.1748 41.2988,0.092 41.1976,0.092 L37.4532,0.092 C37.352,0.092 37.2784,0.1748 37.2784,0.2668 L37.2784,6.3572 Z" id="Path"></path>
														<path d="M42.688,6.3572 C42.688,6.4492 42.7616,6.532 42.8536,6.532 L45.034,6.532 C46.8096,6.532 48.2632,5.0876 48.2632,3.3028 C48.2632,1.5364 46.8096,0.092 45.034,0.092 L42.8536,0.092 C42.7616,0.092 42.688,0.1748 42.688,0.2668 L42.688,6.3572 Z M43.8748,5.4096 L43.8748,1.2052 L44.9236,1.2052 C46.1196,1.2052 46.9936,2.1068 46.9936,3.3028 C46.9936,4.508 46.1196,5.4096 44.9236,5.4096 L43.8748,5.4096 Z" id="Shape"></path>
														<path d="M49.4776,6.3572 C49.4776,6.4492 49.5604,6.532 49.6524,6.532 L50.508,6.532 C50.6,6.532 50.6828,6.4492 50.6828,6.3572 L50.6828,0.2668 C50.6828,0.1748 50.6,0.092 50.508,0.092 L49.6524,0.092 C49.5604,0.092 49.4776,0.1748 49.4776,0.2668 L49.4776,6.3572 Z" id="Path"></path>
														<path d="M53.222,6.3572 C53.222,6.4492 53.3048,6.532 53.3968,6.532 L54.2524,6.532 C54.3444,6.532 54.4272,6.4492 54.4272,6.3572 L54.4272,1.196 L55.8348,1.196 C55.936,1.196 56.0096,1.1132 56.0096,1.0212 L56.0096,0.2668 C56.0096,0.1748 55.936,0.092 55.8348,0.092 L51.8144,0.092 C51.7132,0.092 51.6396,0.1748 51.6396,0.2668 L51.6396,1.0212 C51.6396,1.1132 51.7132,1.196 51.8144,1.196 L53.222,1.196 L53.222,6.3572 Z" id="Path"></path>
														<path d="M56.9664,6.3572 C56.9664,6.4492 57.0492,6.532 57.1412,6.532 L57.9968,6.532 C58.0888,6.532 58.1716,6.4492 58.1716,6.3572 L58.1716,0.2668 C58.1716,0.1748 58.0888,0.092 57.9968,0.092 L57.1412,0.092 C57.0492,0.092 56.9664,0.1748 56.9664,0.2668 L56.9664,6.3572 Z" id="Path"></path>
														<path d="M59.386,3.3212 C59.386,5.1612 60.8488,6.624 62.6888,6.624 C64.5288,6.624 66.0008,5.1612 66.0008,3.3212 C66.0008,1.4812 64.5288,0 62.6888,0 C60.8488,0 59.386,1.4812 59.386,3.3212 Z M60.582,3.3212 C60.582,2.162 61.5296,1.196 62.6888,1.196 C63.848,1.196 64.8048,2.162 64.8048,3.3212 C64.8048,4.4804 63.848,5.428 62.6888,5.428 C61.5296,5.428 60.582,4.4804 60.582,3.3212 Z" id="Shape"></path>
														<path d="M67.206,6.3572 C67.206,6.4492 67.2888,6.532 67.3808,6.532 L68.218,6.532 C68.3192,6.532 68.3928,6.4492 68.3928,6.3572 L68.3928,2.4012 L68.402,2.4012 L72.2476,6.624 L72.4684,6.624 C72.5604,6.624 72.6432,6.5504 72.6432,6.4584 L72.6432,0.2668 C72.6432,0.1748 72.5604,0.092 72.4684,0.092 L71.622,0.092 C71.5208,0.092 71.4472,0.1748 71.4472,0.2668 L71.4472,4.0664 L71.438,4.0664 L67.6108,0 L67.3808,0 C67.2888,0 67.206,0.0736 67.206,0.1656 L67.206,6.3572 Z" id="Path"></path>
														<path d="M76.3508,6.3572 C76.3508,6.4492 76.4244,6.532 76.5164,6.532 L78.6968,6.532 C80.4724,6.532 81.926,5.0876 81.926,3.3028 C81.926,1.5364 80.4724,0.092 78.6968,0.092 L76.5164,0.092 C76.4244,0.092 76.3508,0.1748 76.3508,0.2668 L76.3508,6.3572 Z M77.5376,5.4096 L77.5376,1.2052 L78.5864,1.2052 C79.7824,1.2052 80.6564,2.1068 80.6564,3.3028 C80.6564,4.508 79.7824,5.4096 78.5864,5.4096 L77.5376,5.4096 Z" id="Shape"></path>
														<path d="M83.1404,6.3572 C83.1404,6.4492 83.214,6.532 83.3152,6.532 L84.1616,6.532 C84.2536,6.532 84.3364,6.4492 84.3364,6.3572 L84.3364,4.0112 L85.3576,4.0112 L86.5812,6.4492 C86.5996,6.486 86.6456,6.532 86.7284,6.532 L87.6944,6.532 C87.8508,6.532 87.9152,6.3848 87.8508,6.2652 L86.5904,3.9284 C87.3908,3.6064 87.952,2.9164 87.952,2.07 C87.952,0.9752 87.0504,0.092 85.9464,0.092 L83.3152,0.092 C83.214,0.092 83.1404,0.1748 83.1404,0.2668 L83.1404,6.3572 Z M84.3456,3.0268 L84.3456,1.196 L85.8452,1.196 C86.3328,1.196 86.756,1.6008 86.756,2.0884 C86.756,2.6036 86.3328,3.0268 85.8452,3.0268 L84.3456,3.0268 Z" id="Shape"></path>
														<path d="M88.8076,3.3212 C88.8076,5.1612 90.2704,6.624 92.1104,6.624 C93.9504,6.624 95.4224,5.1612 95.4224,3.3212 C95.4224,1.4812 93.9504,0 92.1104,0 C90.2704,0 88.8076,1.4812 88.8076,3.3212 Z M90.0036,3.3212 C90.0036,2.162 90.9512,1.196 92.1104,1.196 C93.2696,1.196 94.2264,2.162 94.2264,3.3212 C94.2264,4.4804 93.2696,5.428 92.1104,5.428 C90.9512,5.428 90.0036,4.4804 90.0036,3.3212 Z" id="Shape"></path>
														<path d="M96.6276,6.3572 C96.6276,6.4492 96.7012,6.532 96.8024,6.532 L97.6488,6.532 C97.7408,6.532 97.8236,6.4492 97.8236,6.3572 L97.8236,4.1952 L98.9736,4.1952 C100.096,4.1952 101.0252,3.266 101.0252,2.1252 C101.0252,1.012 100.096,0.092 98.9644,0.092 L96.8024,0.092 C96.7012,0.092 96.6276,0.1748 96.6276,0.2668 L96.6276,6.3572 Z M97.8236,3.0728 L97.8236,1.2236 L98.8908,1.2236 C99.406,1.2236 99.8384,1.61 99.8384,2.116 C99.8384,2.6588 99.406,3.0728 98.8908,3.0728 L97.8236,3.0728 Z" id="Shape"></path>
													</g>
													<polygon id="Fill-5-Copy" fill="#FFFFFF" points="17 10.5943976 14.2443337 10.2196513 12.9989825 8 11.7556663 10.2196513 9 10.5943976 10.9994913 12.34203 10.4899341 14.8571429 12.9990034 13.6788482 15.5101077 14.8571429 14.9985103 12.34203"></polygon>
												</g>
											</g>
										</svg>
									</div>
								{/if}
							</div>
						</div>

						<div class="colors">
							{#each Object.keys(colors) as color, index}
							<label class:selected={color === selectedColor} for={color} data-color={color} on:click|self={(e) => handleColorSelection(e, color)}>
								<input type="radio" aria-label={color} id={color} name="color" value={color} checked={color === selectedColor}>
							</label>
							{/each}
						</div>
					</div>
					<div class="size-quantity-box">
						<div class="size-selection-box">
							<div class="ratings-holder size-holder" on:click={ (e) => {toggleSizeGuide()} }>
									<div class="ratings-holder mobile-hidden">
										<p class="size-text">SIZE: </p> 
									</div>
									<img width="31.2" height="11.5" data-src="/assets/images/icons/ruler.webp" alt="f" class="size-icon lozad" />
									<p class="size-guide-text">Size Guide</p>
							</div>

							<div class="dropdown-selection-outer-box size-selector" bind:this={sizeSelectionDropdown}>
								<div class="dropdown-selection lg" on:click|self={(e) => sizeSelectionDropdown.classList.toggle('opened')}>
									<p id="selected-size-name">{selectedSize.replace('_', ' ')}</p>
								</div>

								<div class="dropdown-list">
									{#each sizes as size}
									<p class="dropdown-option size-option" on:click={(e) => {handleSizeSelection(e, size); sizeSelectionDropdown.classList.toggle('opened')}}>{size.replace('_', ' ')}</p>
									{/each}
								</div>
							</div>					
							<div class="ratings-holder desktop-hidden">
								<p class="size-text">SIZE: </p>							
							</div>
						</div>

						<div class="quantity-selection-box mobile-hidden">
							<p class="mb-10">QUANTITY: </p>

							<div class="quantity-input">
								<p class="quantity-changer" data-role="decrease" on:click={() => parseInt(quantity) > 1 ? quantity = parseInt(quantity) - 1 : 1}>-</p>

								<input type="text" id="quantity" value={parseInt(quantity)} min="1" />

								<p class="quantity-changer" data-role="increase" on:click={() => quantity = parseInt(quantity) + 1}>+</p>
							</div>
						</div>
					</div>
				</div>
				{#if sheetVariants.selectedSize?.selectedColor?.left}
					<div class="high-demand-notification">
						<svg width="32px" height="22px" viewBox="0 0 32 22" version="1.1" xmlns="http://www.w3.org/2000/svg">
							<title>delivery-truck</title>
							<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="01_landing_funnel-" transform="translate(-946.000000, -551.000000)" fill="#DA522B" fill-rule="nonzero">
								<g id="delivery-truck" transform="translate(946.000000, 551.000000)">
								<path d="M32,12.6734698 L32,11.0334266 C32,10.8346727 31.9209833,10.6440579 31.7803154,10.5035223 L28.2138002,6.94000021 C28.073157,6.79947062 27.8824009,6.720517 27.6834948,6.72050768 L21.8370099,6.72050768 L21.8370099,4.54213019 C21.8355289,3.24257758 20.7814809,2.18945107 19.4807911,2.18797135 L10.9072799,2.18797135 C9.15641944,0.12100828 6.26271934,-0.566436986 3.7680839,0.491939851 C1.27344847,1.55031669 -0.241061764,4.10799423 0.0315579839,6.80211738 C0.304177732,9.49624053 2.30042777,11.6992833 4.9566089,12.2373572 L4.9566089,17.1978883 C4.95812428,18.4974267 6.01215216,19.5505331 7.31282763,19.5520472 L8.87618188,19.5520472 C9.17419496,20.9781895 10.4324736,22 11.8906419,22 C13.3488101,22 14.6070888,20.9781895 14.9051019,19.5520472 L23.1540549,19.5520472 C23.452068,20.9781895 24.7103467,22 26.1685149,22 C27.6266831,22 28.8849618,20.9781895 29.1829749,19.5520472 L31.25001,19.5520472 C31.664218,19.5520472 32,19.2165587 32,18.8027128 L32,12.6734698 Z M30.5000199,11.3437759 L30.5000199,11.9245101 L25.254527,11.9245101 L25.254527,8.21936378 L27.3728114,8.21936378 L30.5000199,11.3437759 Z M1.50040477,6.1789887 C1.50040477,4.28499006 2.64218613,2.5774446 4.39352204,1.85259019 C6.14485794,1.12773579 8.16077044,1.5283228 9.50122838,2.8675553 C10.8416863,4.20678779 11.2427045,6.22092188 10.5172859,7.97075571 C9.79186734,9.72058955 8.08287346,10.8615168 6.18721757,10.8615168 C3.60004907,10.8585919 1.50343569,8.7638953 1.50040477,6.1789887 L1.50040477,6.1789887 Z M6.45658899,17.1978883 L6.45658899,12.3539411 C8.4976983,12.2654687 10.3634151,11.1756846 11.4418549,9.44199677 C12.5202947,7.70830891 12.6723229,5.55438857 11.8480799,3.68664011 L19.4807286,3.68664011 C19.953402,3.68715634 20.3364506,4.06987006 20.3369673,4.54213019 L20.3369673,18.0535033 L14.8439777,18.0535033 C14.4580947,16.7452143 13.2560008,15.8470455 11.8908919,15.8470455 C10.5257829,15.8470455 9.32368901,16.7452143 8.93780606,18.0535033 L7.31282763,18.0535033 C6.84013405,18.0529183 6.45710554,17.6701687 6.45658899,17.1978883 L6.45658899,17.1978883 Z M11.8907044,20.5015163 C11.2519406,20.5015163 10.6760736,20.1170706 10.4316292,19.5274458 C10.1871849,18.9378209 10.3223024,18.2591333 10.7739766,17.8078539 C11.2256508,17.3565746 11.9049323,17.2215752 12.4950731,17.4658058 C13.0852139,17.7100365 13.4699959,18.2854 13.4699959,18.9236054 C13.4689282,19.794668 12.7624043,20.5005185 11.8905794,20.5015163 L11.8907044,20.5015163 Z M26.1686399,20.5015163 C25.2964213,20.5015163 24.5893483,19.7950615 24.5893483,18.9236054 C24.5893483,18.0521493 25.2964213,17.3456945 26.1686399,17.3456945 C27.0408585,17.3456945 27.7479314,18.0521493 27.7479314,18.9236054 C27.7468641,19.7945463 27.0405302,20.5003465 26.1688274,20.5015163 L26.1686399,20.5015163 Z M29.1216632,18.0536906 C28.7357802,16.7454016 27.5336863,15.8472328 26.1685774,15.8472328 C24.8034685,15.8472328 23.6013745,16.7454016 23.2154916,18.0536906 L21.8370099,18.0536906 L21.8370099,8.21936378 L23.7545469,8.21936378 L23.7545469,12.6740942 C23.7545469,13.0879402 24.0903289,13.4234286 24.504537,13.4234286 L30.5000199,13.4234286 L30.5000199,18.0535033 L29.1216632,18.0536906 Z M8.17456619,7.80242164 L5.57778816,7.80242164 C5.16499563,7.79902697 4.83119575,7.46551891 4.82779811,7.05308726 L4.82779811,3.32827094 C4.82779811,2.91442499 5.16358009,2.57893656 5.57778816,2.57893656 C5.99199622,2.57893656 6.3277782,2.91442499 6.3277782,3.32827094 L6.3277782,6.30381532 L8.17450369,6.30381532 C8.44244934,6.30381531 8.69004133,6.44663764 8.82401415,6.6784825 C8.95798698,6.91032737 8.95798698,7.19597203 8.82401415,7.4278169 C8.69004133,7.65966177 8.44244934,7.80248408 8.17450369,7.80248408 L8.17456619,7.80242164 Z" id="Shape"></path>
								</g>
							</g>
							</g>
						</svg>

						<p>
							<span class="high-demand-highlighted font-bold">HIGH DEMAND:</span> Only <span class="high-demand-highlighted"> {sheetVariants[selectedSize][selectedColor]['left']} </span>left in stock - order soon
						</p>
					</div>
				{/if}

				<div class="flex border-block">
					<p id="strikethrough-price">${sheetVariants[selectedSize][selectedColor].regularPrice}</p>
					<p id="product-price">${sheetVariants[selectedSize][selectedColor].price}</p>

					<div class="lozenge">
						<p><span id="saving-percentage">{ sheetVariants[selectedSize][selectedColor].productSavings }%</span> OFF - YOU SAVE $<span>{parseInt(sheetVariants[selectedSize][selectedColor].regularPrice) - parseInt(sheetVariants[selectedSize][selectedColor].price)}</span></p>
					</div>
				</div>

				{#if freeGiftVisible}
				<div class="free-towel-selection">
					<div class="bonus-badge">
						<div class="bonus-badge-style"></div>
						<span>BONUS</span>
					</div>
					<div class="free-towel-content">
						<div class="free-towel-input">
							<input type="checkbox" id="free-gift-check">
							<label for="free-gift-check"></label>
						</div>
						<div class="free-towel-description">
							<p class="bold">GET 3x FREE TOWELS</p>
							<p class="low-text">Offer ends at midnight</p>
						</div>
					</div>
					<div class="free-towel-image">
						<img src={`/assets/images/towels/${towelImg}.webp`} alt="Miracle Made Free Towels">
						<div class="free-badge">
							<svg width="36px" height="37px" viewBox="0 0 36 37" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
								<g id="Group-7-Copy-3">
								  <path d="M12.5338 34.317C13.0048 34.317 13.3857 34.3607 13.7334 34.455C14.4306 34.6444 15.0465 35.0693 15.6988 35.5189C16.5189 36.0842 17.2267 36.5723 18.0001 36.5723C18.7731 36.5723 19.4807 36.0844 20.3001 35.5193C20.9539 35.069 21.5702 34.6444 22.2649 34.4554C22.9933 34.2581 23.7517 34.3117 24.5545 34.3682C25.4482 34.4315 26.3678 34.4974 27.0019 34.1247C27.6474 33.7451 28.0167 32.9726 28.4442 32.0779C28.7959 31.3419 29.1269 30.6496 29.6485 30.12C30.1712 29.589 30.8519 29.2534 31.5723 28.8983C32.4548 28.4631 33.2169 28.0873 33.5907 27.4309C33.9565 26.7885 33.8986 25.9393 33.8313 24.9556C33.775 24.1334 33.722 23.3569 33.9167 22.6185C34.1015 21.9146 34.5186 21.29 34.9601 20.6285C35.518 19.7927 36 19.0712 36 18.2859C36 17.5024 35.5208 16.7842 34.9657 15.9522C34.5212 15.286 34.1021 14.6586 33.9165 13.9529C33.7214 13.2134 33.775 12.4393 33.8313 11.6202C33.8929 10.7165 33.9565 9.78381 33.5909 9.14164C33.2171 8.48518 32.4567 8.11003 31.5758 7.67576C30.8507 7.31731 30.1686 6.9804 29.6485 6.45207C29.1265 5.92154 28.7959 5.22948 28.4459 4.49698C28.0178 3.60097 27.6481 2.82715 27.0017 2.44694C26.3709 2.07641 25.5354 2.13465 24.5695 2.20278C23.7552 2.2597 22.9913 2.31354 22.2662 2.11662C21.572 1.9285 20.9563 1.50434 20.3045 1.05535C19.4824 0.488773 18.7731 0 18.0001 0C17.2287 0 16.5217 0.486795 15.7027 1.05051C15.0472 1.50214 14.4298 1.9274 13.7347 2.11641C13.0085 2.31332 12.2483 2.26014 11.4433 2.20343C10.5092 2.13838 9.6285 2.07707 8.99811 2.44716C8.35257 2.82671 7.98329 3.59921 7.55582 4.49412C7.20299 5.2308 6.87135 5.92396 6.35129 6.45207C5.83122 6.98084 5.15151 7.31643 4.43199 7.67158C3.54676 8.10805 2.78311 8.48474 2.40929 9.14098C2.04304 9.78381 2.10686 10.7159 2.16873 11.6172C2.22476 12.4402 2.27754 13.2153 2.08392 13.9518C1.89745 14.6599 1.47928 15.2856 1.03666 15.9482C0.480257 16.7814 0 17.5005 0 18.2859C0 19.0694 0.478959 19.7878 1.03407 20.6197C1.47863 21.2856 1.89788 21.9133 2.08371 22.6192C2.27776 23.3569 2.22497 24.1312 2.16873 24.9509C2.10145 25.9382 2.04347 26.7889 2.40864 27.43C2.78246 28.0867 3.54243 28.4614 4.42204 28.8954C5.14697 29.2528 5.82971 29.5895 6.3515 30.1198C6.87243 30.649 7.20277 31.3399 7.55258 32.0716C7.98178 32.9704 8.35171 33.7447 8.99832 34.1247C9.63001 34.4967 10.5451 34.4315 11.4297 34.3693C11.7968 34.3433 12.1706 34.317 12.5338 34.317" id="Fill-1" fill="#f29869" fill-rule="evenodd" stroke="none" />
								</g>
							  </svg>
							<p>FREE</p>
						</div>
					</div>
				</div>
				{/if}

				<div class="button-holder quantity-selection">
					<div class="dropdown-selection-outer-box desktop-hidden">
						<div class="dropdown-selection" on:click|self={(e) => e.target.parentNode.classList.toggle('opened')}>
							<p id="quantity-number">{quantity}</p>
						</div>

						<div class="dropdown-list">
							{#each Array(10) as _, index}
								<p class="dropdown-option" on:click={(e) => {handleQuantitySelection(index + 1); e.target.parentNode.parentNode.classList.toggle('opened')}} data-value={index + 1}>{index + 1}</p>
							{/each}
						</div>
					</div>

					<div data-tag-name="ctaButton" on:click|preventDefault={(e) => handleSubmit(e)} class={`cta-button atc-button color-1`} class:unclickable={checkingOut}>
						{#if !checkingOut}
						PROCEED TO CHECKOUT
						{:else}
						<span class="loader-v"></span>
						{/if}
					</div>
					<!-- <input type="submit" value="" class=""> -->
				</div>
			</form>

			<div class="ships-by">
				<div>
					<div class="green-circle"></div>
					<p>Ships by <span id="ships-by-date">{shippingDate}</span></p>
				</div>

				<div class="hourglass">
					<svg width="9px" height="13px" viewBox="0 0 9 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<title>hourglass copy@1x</title>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="hourglass-copy" fill="#000000" fill-rule="nonzero">
								<path d="M4.46875,8.60742188 C4.32364706,8.60742188 4.20588235,8.72117187 4.20588235,8.86132812 C4.20588235,9.00148438 4.32364706,9.11523438 4.46875,9.11523438 C4.61385294,9.11523438 4.73161765,9.00148438 4.73161765,8.86132812 C4.73161765,8.72117187 4.61385294,8.60742188 4.46875,8.60742188 Z" id="Path"></path>
								<path d="M7.88602941,11.5019277 L7.88602941,10.1308594 C7.88602941,8.70664844 6.9434386,7.39479102 5.59374467,6.9406543 C5.38936507,6.87197266 5.25735294,6.69901172 5.25735294,6.5 C5.25735294,6.29943945 5.39341324,6.12673242 5.59382353,6.05932031 C6.96486232,5.59799805 7.88602941,4.34657031 7.88602941,2.9453125 L7.88602941,1.49807227 C8.48018915,1.3820625 8.9375,0.873539062 8.9375,0.25390625 C8.9375,0.113699219 8.81978787,0 8.67463235,0 L0.262867647,0 C0.117712132,0 0,0.113699219 0,0.25390625 C0,0.866988281 0.452263787,1.37992969 1.05147059,1.49789453 L1.05147059,2.9453125 C1.05147059,4.34657031 1.97263768,5.59799805 3.34375533,6.0593457 C3.54813493,6.12802734 3.68014706,6.30098828 3.68014706,6.5 C3.68014706,6.70056055 3.54408676,6.87326758 3.34367647,6.94067969 C1.9940614,7.39479102 1.05147059,8.70664844 1.05147059,10.1308594 L1.05147059,11.5021055 C0.452263787,11.6200703 0,12.1329863 0,12.7460938 C0,12.8863008 0.117712132,13 0.262867647,13 L8.67463235,13 C8.81978787,13 8.9375,12.8863008 8.9375,12.7460938 C8.9375,12.4071543 8.80075625,12.0884004 8.55242518,11.8484844 C8.36731379,11.6696836 8.13675257,11.5508809 7.88602941,11.5019277 Z M0.570790809,0.505273438 L8.36705092,0.505273438 C8.25677794,0.806888672 7.96496857,1.015625 7.62316176,1.015625 L1.31433824,1.015625 C0.971637684,1.015625 0.679276287,0.800845703 0.570790809,0.505273438 Z M1.57720588,10.1308594 C1.57720588,8.9190918 2.37474632,7.80446875 3.5166171,7.42023242 C3.92692721,7.28218359 4.20588235,6.91836133 4.20588235,6.5 C4.20588235,6.08813867 3.92887243,5.71834961 3.51664338,5.57976758 C2.35658217,5.1894375 1.57720588,4.13075 1.57720588,2.9453125 L1.57720588,1.5234375 L7.36029412,1.5234375 L7.36029412,2.9453125 C7.36029412,4.13075 6.58091783,5.1894375 5.4208829,5.57976758 C5.01057279,5.71781641 4.73161765,6.08163867 4.73161765,6.5 C4.73161765,6.91186133 5.00862757,7.28165039 5.42085662,7.42023242 C6.56275368,7.80446875 7.36029412,8.9190918 7.36029412,10.1308594 L7.36029412,11.4765625 L6.81815588,11.4765625 C6.70075919,10.5742559 5.95305846,10.2444063 5.24788971,10.0070293 C5.02592426,9.93260938 4.82080864,9.80837305 4.65478143,9.64777734 C4.60546746,9.60009375 4.53854136,9.57328125 4.46877629,9.57328125 C4.39901121,9.57328125 4.33208511,9.60009375 4.28277114,9.64777734 C4.11458842,9.81045508 3.91507187,9.93136523 3.68966287,10.0071309 C2.98462555,10.2443809 2.23679338,10.5742051 2.11939669,11.4765625 L1.57720588,11.4765625 L1.57720588,10.1308594 Z M6.2862432,11.4765625 L2.65123051,11.4765625 C2.74930643,10.9611328 3.16758143,10.7205313 3.86249835,10.486709 C4.08083621,10.4133047 4.28684559,10.3040234 4.46872371,10.166 C4.65086471,10.3042266 4.85697923,10.4135078 5.07515938,10.4866836 C5.76999743,10.7205566 6.18819357,10.9611582 6.2862432,11.4765625 Z M0.570790809,12.4921875 C0.679276287,12.1966152 0.971637684,11.984375 1.31433824,11.984375 L7.62316176,11.984375 C7.83366618,11.984375 8.03165809,12.0636445 8.18067776,12.2075586 C8.26532114,12.2893418 8.3283568,12.3863594 8.36702463,12.4921875 L0.570790809,12.4921875 Z" id="Shape"></path>
								<path d="M6.7098807,2.72931445 C6.63238732,2.68307812 6.53559945,2.67888867 6.45413676,2.71819336 C5.84110313,3.01429883 5.15457169,3.17078125 4.46875,3.17078125 C3.78292831,3.17078125 3.09639688,3.01429883 2.48336324,2.71821875 C2.40190055,2.67886328 2.30513897,2.68305273 2.2276193,2.72933984 C2.15009963,2.77562695 2.10294118,2.85730859 2.10294118,2.9453125 C2.10294118,3.91487891 2.74044779,4.78087695 3.68961029,5.10039258 C3.91157574,5.1748125 4.11669136,5.29904883 4.28271857,5.45964453 C4.33203254,5.50732812 4.39895864,5.53414062 4.46872371,5.53414062 C4.53848879,5.53414062 4.60541489,5.50732812 4.65472886,5.45964453 C4.82291158,5.2969668 5.02242813,5.17605664 5.24783713,5.10029102 C5.71361232,4.94360547 6.11104191,4.65539648 6.39712077,4.26676758 C6.68330478,3.87803711 6.83455882,3.42110742 6.83455882,2.9453125 C6.83455882,2.85730859 6.78737408,2.77557617 6.7098807,2.72931445 Z M5.96869908,3.97249023 C5.74618162,4.27474023 5.43710184,4.49888867 5.07500165,4.62071289 C4.85666379,4.69411719 4.65065441,4.80342383 4.46877629,4.94142188 C4.28663529,4.80319531 4.08052077,4.69391406 3.86234062,4.62073828 C3.26184577,4.41862891 2.82172647,3.93514063 2.67864761,3.35587891 C3.24804522,3.56786523 3.85866048,3.67859375 4.46877629,3.67859375 C5.07899724,3.67859375 5.68977022,3.56778906 6.25924669,3.35572656 C6.20506967,3.57563477 6.10723033,3.78432031 5.96869908,3.97249023 Z" id="Shape"></path>
								<path d="M4.46875,7.0078125 C4.32359449,7.0078125 4.20588235,7.12151172 4.20588235,7.26171875 L4.20588235,7.84570312 C4.20588235,7.98591016 4.32359449,8.09960938 4.46875,8.09960938 C4.61390551,8.09960938 4.73161765,7.98591016 4.73161765,7.84570312 L4.73161765,7.26171875 C4.73161765,7.12151172 4.61390551,7.0078125 4.46875,7.0078125 Z" id="Path"></path>
							</g>
						</g>
					</svg>

					<p>
						<span>16 orders</span> at this price remaining
					</p>
				</div>
			</div>

			<div class="free-shipping">
				<div>
					<svg width="21px" height="18px" viewBox="0 0 21 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<title>truck@1x</title>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="truck" transform="translate(0.000000, 1.000000)" fill="#000000">
								<path d="M15.2276792,3.51724138 L15.2276792,5.56115948 L17.7009749,5.56115948 C19.6699023,5.5613665 20.9525927,7.21709439 21,9.75431759 L21,9.75431759 L21,15.3695028 L19.2369783,15.3695028 C19.1224844,16.3015112 18.4122563,17 17.5651852,17 C16.7181141,17 16.007886,16.3015112 15.8933921,15.3695028 L15.8933921,15.3695028 L9.00040577,15.3695028 C8.88591194,16.3015112 8.17568383,17 7.3286127,17 C6.48154157,17 5.77131346,16.3015112 5.65681964,15.3695028 L5.65681964,15.3695028 L3.45817178,15.3695028 L3.45817178,12.1084049 L1.16829501,12.1084049 L1.16829501,11.2542363 L3.45817178,11.2542363 L3.45817178,9.52064267 L0.619182616,9.52064267 L0.619182616,8.66647412 L3.45817178,8.66647412 L3.45817178,6.93288046 L0,6.93288046 L0,6.07871192 L3.45817178,6.07871192 L3.45817178,3.51724138 L5.81167605,3.51675452 C5.78750545,3.70631952 5.775,3.9000219 5.775,4.09692342 C5.775,4.19786924 5.77828683,4.29797422 5.78474728,4.39711195 L4.18987893,4.39671824 L4.18987893,14.5404873 L5.70156383,14.5404873 C5.93055148,13.7641586 6.5719001,13.2203145 7.3044774,13.2203145 C8.06031985,13.2203145 8.67840333,13.7904503 8.90739098,14.5404873 L8.90739098,14.5404873 L14.4487548,14.5404873 L14.4487548,4.39671824 L13.1035656,4.39711195 C13.110026,4.29797422 13.1133128,4.19786924 13.1133128,4.09692342 C13.1133128,3.9000219 13.1008074,3.70631952 13.0766368,3.51675452 L15.2276792,3.51724138 Z M7.3044774,14.1007747 C6.80088775,14.1007747 6.38852679,14.566779 6.38852679,15.1358796 C6.38852679,15.7049803 6.80088775,16.1709845 7.3044774,16.1709845 C7.80806705,16.1709845 8.22042802,15.7049803 8.22042802,15.1358796 C8.22042802,14.566779 7.80806705,14.1007747 7.3044774,14.1007747 Z M17.5175558,14.1007747 C17.0139661,14.1007747 16.6016051,14.566779 16.6016051,15.1358796 C16.6016051,15.7049803 17.0139661,16.1709845 17.5175558,16.1709845 C18.0211454,16.1709845 18.4335064,15.7049803 18.4335064,15.1358796 C18.4335064,14.566779 18.0211454,14.1007747 17.5175558,14.1007747 Z M17.6768854,6.41543153 L15.2035897,6.41543153 L15.2035897,14.5404873 L15.9138178,14.5404873 C16.1428055,13.7641586 16.760889,13.2203145 17.5167314,13.2203145 C18.2725739,13.2203145 18.8906573,13.7904503 19.119645,14.5404873 L19.119645,14.5404873 L20.1510741,14.5404873 L20.150181,9.7795224 C20.150181,7.70931263 19.2109195,6.41543153 17.6768854,6.41543153 L17.6768854,6.41543153 Z" id="Combined-Shape"></path>
								<g id="clock" transform="translate(5.775000, 0.000000)" fill-rule="nonzero" stroke="#000000" stroke-width="0.5">
									<path d="M3.66915642,0 C1.64601926,0 0,1.8379197 0,4.09692342 C0,6.35592715 1.64601926,8.19384685 3.66915642,8.19384685 C5.69229358,8.19384685 7.33831284,6.35592715 7.33831284,4.09692342 C7.33831284,1.8379197 5.69229358,0 3.66915642,0 Z M3.66915642,7.68172911 C1.89884932,7.68172911 0.458646622,6.073621 0.458646622,4.09692342 C0.458646622,2.12022585 1.89884932,0.512117738 3.66915642,0.512117738 C5.43946351,0.512117738 6.87966622,2.12022585 6.87966622,4.09692342 C6.87966622,6.073621 5.43946351,7.68172911 3.66915642,7.68172911 Z" id="Shape"></path>
									<polygon id="Path" points="3.89847973 1.53635322 3.43983311 1.53635322 3.43983311 4.20294765 4.88294932 5.81430895 5.20722669 5.45222585 3.89847973 3.99089919"></polygon>
								</g>
							</g>
						</g>
					</svg>

					<p>FREE Shipping & Returns</p>
				</div>

				<div class="separator"></div>

				<div class="date-badge">
					<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve">
					<style type="text/css">
						.st0{fill-rule:evenodd;clip-rule:evenodd;}
						.st1{fill:#FFFFFF;}
						.st2{font-family:'BrandonGrotesque-Black';}
						.st3{font-size:6.1865px;}
						.st4{font-size:4.4992px;}
						.st5{fill:none;stroke:#FFFEF2;stroke-width:0.605;}
					</style>
					<title>date badge@1x</title>
					<g id="Page-1">
						<g id="date-badge">
							<path id="Fill-1" class="st0" d="M8.4,22.5c0.3,0,0.6,0,0.8,0.1c0.5,0.1,0.9,0.4,1.3,0.7c0.5,0.4,1,0.7,1.5,0.7
								c0.5,0,1-0.3,1.5-0.7c0.4-0.3,0.8-0.6,1.3-0.7c0.5-0.1,1-0.1,1.5-0.1c0.6,0,1.2,0.1,1.6-0.2c0.4-0.2,0.7-0.8,1-1.3
								c0.2-0.5,0.5-0.9,0.8-1.3c0.3-0.3,0.8-0.6,1.3-0.8c0.6-0.3,1.1-0.5,1.3-1c0.2-0.4,0.2-1,0.2-1.6c0-0.5-0.1-1,0.1-1.5
								c0.1-0.5,0.4-0.9,0.7-1.3c0.4-0.5,0.7-1,0.7-1.5c0-0.5-0.3-1-0.7-1.5C23,10,22.7,9.6,22.6,9.2c-0.1-0.5-0.1-1-0.1-1.5
								c0-0.6,0.1-1.2-0.2-1.6c-0.2-0.4-0.8-0.7-1.3-1c-0.5-0.2-0.9-0.5-1.3-0.8C19.4,3.9,19.2,3.4,19,3c-0.3-0.6-0.5-1.1-1-1.3
								c-0.4-0.2-1-0.2-1.6-0.2c-0.5,0-1.1,0.1-1.5-0.1C14.4,1.3,14,1,13.5,0.7C13,0.3,12.5,0,12,0c-0.5,0-1,0.3-1.5,0.7
								C10,1,9.6,1.3,9.2,1.4c-0.5,0.1-1,0.1-1.5,0.1C7,1.4,6.4,1.4,6,1.6C5.6,1.9,5.3,2.4,5,2.9C4.8,3.4,4.6,3.9,4.2,4.2
								C3.9,4.6,3.4,4.8,3,5C2.4,5.3,1.9,5.6,1.6,6C1.4,6.4,1.4,7,1.4,7.6c0,0.5,0.1,1-0.1,1.5C1.3,9.6,1,10,0.7,10.5C0.3,11,0,11.5,0,12
								c0,0.5,0.3,1,0.7,1.5C1,14,1.3,14.4,1.4,14.8c0.1,0.5,0.1,1,0.1,1.5c0,0.6-0.1,1.2,0.2,1.6c0.2,0.4,0.8,0.7,1.3,1
								c0.5,0.2,0.9,0.5,1.3,0.8C4.6,20.1,4.8,20.6,5,21c0.3,0.6,0.5,1.1,1,1.3c0.4,0.2,1,0.2,1.6,0.2C7.9,22.5,8.1,22.5,8.4,22.5"/>
							<g>
								<text transform="matrix(1 0 0 1 8.4813 11.2129)" class="st1 st2 st3">30</text>
								<text transform="matrix(1 0 0 1 7.5201 16.8728)" class="st1 st2 st4">DAY</text>
							</g>
							<ellipse id="Oval" class="st5" cx="11.9" cy="12" rx="8.6" ry="8.6"/>
						</g>
					</g>
					</svg>

					<p>30 day money-back guarantee</p>
				</div>
			</div>

			<div class="accepted-cards">
				<img class="lozad" width="40" height="26" data-src="/assets/images/icons/paypal.webp" alt="Miracle Made - Accepts Paypal" />
				<img class="lozad" width="40" height="26" data-src="/assets/images/icons/visa.webp" alt="Miracle Made - Accepts Visa" />
				<img class="lozad" width="40" height="26" data-src="/assets/images/icons/mastercard.webp" alt="Miracle Made - Accepts Mastercard" />
				<img class="lozad" width="40" height="26" data-src="/assets/images/icons/discover.webp" alt="Miracle Made - Accepts Discover" />
				<img class="lozad" width="40" height="26" data-src="/assets/images/icons/ae.webp" alt="Miracle Made - Accepts American Express" />
			</div>
		</div>
	</div>
</section>

<CarouselSection />

<ATCBanner shippingDate={shippingDate} />

{#if sizeGuideOpened }
<SizeGuide bind:sizeGuideOpened={sizeGuideOpened} />
{/if}

<!-- <style>
	.atc-section {
		display: grid;
		grid-template-columns: 1fr;
	}

	.slider-box {
		display: flex;

		width: 100%;
		height: 32.7rem;
		
		overflow: hidden;
	}

	.slider-box,
	.slider-outer-box {
		position: relative;
		max-height: 75rem;
	}

	.atc-content {
		display: flex;
		justify-content: center;

		padding: 3.5rem 1.5rem;
	}

	.thumbnails {
		display: flex;
		justify-content: center;
		gap: .8rem;

		position: absolute;
		bottom: 3.4%;
		left: 50%;

		width: 39.8rem;
		
		transform: translate3d(-50%, 0, 0);
	}

	.sold-out-badge {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: .4rem;

		position: absolute;
		top: 3rem;
		right: 0;
		
		width: 11.2rem;
		height: 3.3rem;

		background-color: #ff935f;
		color: #fff;

		border-top-left-radius: 6rem;
		border-bottom-left-radius: 6rem;
		
		z-index: 9;
	}

	.slider-button {
		align-items: center;

		top: 50%;
		
		width: 2.9rem;
		height: 2.9rem;
		
		background-color: var(--secondary-color);
		
		border-radius: 100%;
		
		transform: translate3d(0, -50%, 0);
	}

	.close-popup, .colors label, .cta-button, .faq-question, .quantity-changer, .slider-button, .thumbnail {
		cursor: pointer;
	}

	.pagination-bullets, .slider-button {
		display: flex;
		justify-content: center;
		
		position: absolute;
	}

	.slider-button.next-button {
		right: 1%;
	}

	.slider-button.prev-button {
		left: 1%;
	}

	.atc-content .container {
		max-width: 48rem;
	}

	.ratings-holder {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: .5rem;
	}

	.ratings-holder .text-sm {
		font-size: 1.2rem;
    	line-height: 1.4rem;
	}

	.ships-by {
		justify-content: space-between;
		align-items: center;
		height: 5rem;
		padding: 0 2.5rem;
		margin: 1.6rem 0;
		background-color: #fcf9cd;
		border-radius: 5rem;
	}

	.cta-button, .quantity-input, .ships-by {
		display: flex;
		width: 100%;
	}



	@media screen and (min-width: 768px) {
		.atc-section {
			max-height: none;
		}

		.slider-box {
			max-height: 100% !important;
		}
	}

	@media screen and (min-width: 991px) {
		.atc-section {
			grid-template-columns: 5.5fr 4.5fr;
		}

		.slider-box {
			height: auto;
		}

		.slider-button {
			width: 4rem;
			height: 4rem;
		}

		.slider-button.next-button {
			right: 3%;
		}

		.slider-button.prev-button {
			left: 3%;
		}

		.atc-content {
			padding: 5.6rem 2rem 2.4rem;
		}

		.sold-out-badge {
			top: 8%;
			right: 0;
			
			gap: .8rem;
			
			width: 15rem;
			height: 4.4rem;
		}
	}
</style> -->
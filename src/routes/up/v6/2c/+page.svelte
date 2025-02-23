<script>
	import { purchaseLog } from '../../../../stores/writables/purchaseLog';
	import { variants } from '../../../../stores/variants/2c'
	import { onMount } from 'svelte';

	console.log($purchaseLog);

	import Banner from '$lib/banners/UpsellBanner.svelte';
	import Visuals from '$lib/upsells/sheets/Visuals.svelte';
	import ColorSelection from '$lib/upsells/sheets/ColorSelection.svelte';
	import SizeSelection from '$lib/upsells/sheets/SizeSelection.svelte';
	import VariantSelection from '$lib/upsells/sheets/VariantSelection.svelte';
    import Timer from '$lib/shared/Timer.svelte';

	const bannerContent = {
		h4: 'WAIT! WE HAVE SOMETHING SPECIAL FOR YOU!',
		h3: `Get some extra sheets for  <br class="desktop-hidden"> <span class="color-green">up to 55% OFF!</span>`,
		p: `<p>Note: This is a one-time-only offer that <br class="desktop-hidden" />you will never see again.</p>`
	};

	console.log(variants);

	let sizeOptions = [
		'twin', 'full', 'queen', 'king', 'split_king', 'cali_king'
	];
	let selectedQuantity = 2;
	let selectedSize = 'queen';
	let selectedColor = 'stone';
	let variantOptions = [
		{
			value: '1',
			label: 'Add 1 Sheet for $92.00* each (40% OFF)',
			id: 1
		},
		{
			value: '2',
			label: 'Add 2 Sheets Sets for $84.50* each (45% OFF)',
			id: 2,
		},
		{
			value: '3',
			label: 'Add 3 Sheets Sets for $77.00* each (50% OFF)',
			id: 3,
		},
		{
			value: '4',
			label: 'Add 4 Sheets Sets for $69.25* each (55% OFF)',
			id: 4,
		}
	];

	let colorOptions = [
		'stone', 'white', 'sky_blue', 'navy', 'sand', 'sage', 'terracotta', 'charcoal', 'silver_grey', 'rosewood'
	];

	const hasSlider = true;
	const imageCount = 5;
	const slug = '2c';

    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD ";
        }
    })

	$: selectedSize, console.log('Size changed: ', selectedSize);
	$: selectedColor, console.log('Color changed: ', selectedColor);
	$: selectedQuantity, console.log('Quantity changed: ', selectedQuantity);
</script>

<Banner {bannerContent} />

<div class="upsell-box">
	<Visuals {selectedColor} {hasSlider} {imageCount} {slug} />

	<div class="upsell-content up-2c">
		<div class="trusted-by">
			<img src="/assets/images/icons/stars.svg" alt="5-star Experience - Miracle Made">

			<p>10,078+ FIVE-STAR COMPANY REVIEWS</p>
		</div>

		<div class="callout-box">
			<img src="/assets/images/icons/tip.svg" alt="Limited Time Offer - Miracle Made">

			<p><strong>TIP: </strong>Load up on sheets now, because you'll never see this deal again!</p>
		</div>

		<p class="upsell-description">
			Thousands of our customers come back for more once they feel the life-changing differences in their sleep. Enjoy the silver-infused benefits of Miracle Made® Sheets throughout every bedroom in your home, or even keep an extra set on hand since you have this huge discount opportunity!
		</p>

		<div class="form">
			<SizeSelection bind:selectedSize={selectedSize} sizeOptions={sizeOptions} />
	
			<ColorSelection bind:selectedColor={selectedColor} colorOptions={colorOptions} />
	
			<VariantSelection bind:selectedVariant={selectedQuantity} variantOptions={variantOptions} />
	
			<div class="price-container">
				<div class="deal-endtime">
					*Plus any applicable taxes
					<div class="timer-wrapper">
						<div class="flashing-circle"></div>
						<p>Deal reserved for: <Timer/> min</p>
					</div>
				</div>
			</div>
		</div>

		<a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="37856216318102" data-next-url='https://try.miraclebrand.co/up/v6/3b?upsell=true'>
			Yes, Add To My Order with 1-Click-buy!
		</a>

		<a href="/up/v6/3b" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

		<hr>

		<div class="money-back-text">
			<img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made">

			<p>30 day money-back guarantee</p>
		</div>
	</div>
</div>
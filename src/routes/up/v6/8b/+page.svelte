<script>
    import { purchaseLog } from "../../../../stores/writables/purchaseLog";
    import { browser } from "$app/environment";
    import { onMount } from 'svelte';

    import Banner from "$lib/banners/UpsellBanner.svelte";
    import Visuals from "$lib/upsells/sheets/Visuals.svelte";
    import ColorSelection from '$lib/upsells/sheets/ColorSelection.svelte';
	import SizeSelection from '$lib/upsells/sheets/SizeSelection.svelte';
    import Timer from "$lib/shared/Timer.svelte";

    const bannerContent = {
        h4: `Wait! COMPLETE YOUR ULTIMATE SLEEP SET`,
        h3: `Add a self-cleaning & self-cooling Mattress Protector for <span class="color-green">50% off!</span>`,
        p: `Note: This is a one-time-only offer that you will never see again.`,
    };

    let sizeOptions = [
		'twin', 'full', 'queen', 'king', 'cali_king'
	];
	let selectedSize = 'queen';
	let selectedColor = 'white';

	let colorOptions = [
		'white'
	];

    const hasSlider = true;
    const imageCount = 5;
    const slug = "8b";

    export let data;
    console.log('Data: ', data);
    
    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD ";
        }
    })
</script>

<Banner {bannerContent} />

<div class="upsell-box ">
    <Visuals {selectedColor} {hasSlider} {imageCount} {slug} />

    <div class="upsell-content">
        <div class="trusted-by">
            <img
                src="/assets/images/icons/stars.svg"
                alt="5-star Experience - Miracle Made"
            />

            <p>10,078+ FIVE-STAR COMPANY REVIEWS</p>
        </div>

        <div class="callout-box">
			<img src="/assets/images/icons/hourglass.svg" alt="Limited Time Offer - Miracle Made">

			<p><strong class="uppercase">One-time Offer – Only available with this current order.</strong><span> You will never see this again.</span></p>
		</div>

        <p class="upsell-description">
            Sleep cool and keep your mattress cleaner for longer with our silver-infused and leak-proof mattress protector that prevents up to 99.7% of bacteria growth.
        </p>

        <ul>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p><strong>Cooling comfort</strong></p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p><strong>Liquid-proof to protect from spills and stains</strong></p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p><strong>Prevents up to 99.7% bacteria-growth</strong></p>
			</li>
		</ul>
        
        <SizeSelection bind:selectedSize={selectedSize} sizeOptions={sizeOptions} />

        <div class="price-container">
            <div>
                <h4 class="price"><span class="non-usa">{usdPrefix}</span>$99* <span class="color-green">(44% OFF)</span></h4>
                <p><strong>Special Price</strong></p>
            </div>

            <div class="deal-endtime">
                *Plus any applicable taxes
                <div class="timer-wrapper">
                    <div class="flashing-circle" />
                    <p>
                        Deal reserved for: <Timer/> min
                    </p>
                </div>
            </div>
        </div>

        <a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="39509018149014" data-next-url="/receipt">
            Yes, Add To My Order with 1-Click-buy!
        </a>

        <a href="/receipt" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

        <hr />

        <div class="money-back-text">
            <img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made" />

            <p>30 day money-back guarantee</p>
        </div>
    </div>
</div>

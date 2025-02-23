<script>
    import { purchaseLog } from "../../../../stores/writables/purchaseLog";
    import { browser } from "$app/environment";
    import { onMount } from 'svelte';

    console.log($purchaseLog);

    import Banner from "$lib/banners/UpsellBanner.svelte";
    import Visuals from "$lib/upsells/sheets/Visuals.svelte";
    import ColorSelection from '$lib/upsells/sheets/ColorSelection.svelte';
    import VariantSelection from '$lib/upsells/sheets/VariantSelection.svelte';
    import Timer from "../../../../lib/shared/Timer.svelte";

    const bannerContent = {
        h4: `Your Antibacterial Bedroom Isn't Complete Without a Comforter!`,
        h3: `Get our newest silver infused comforter <span class="color-green">25% OFF!</span>`,
        p: `We are offering our premium comforter to new customers only!`,
    };

	let selectedColor = 'white';
	let variantOptions = [
        {
			value: '1',
			label: 'White - King/Cali King - $105*',
			id: 1,
		},
		{
			value: '2',
			label: 'White - Queen - $97*',
			id: 2
		}
	];
    let selectedVariant = 1;

	let colorOptions = [
		'white', 'stone'
	];

    const hasSlider = true;
    const imageCount = 5;
    const slug = "5b-cooling";

    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD ";
        }
    })
</script>

<Banner {bannerContent} />

<div class="upsell-box">
    <Visuals {hasSlider} {imageCount} {slug} />

    <div class="upsell-content up-5b">
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

        <p class="heading">Less sweat, ultra-breathable, <br /> luxurious comfort all in one</p>

        <p class="upsell-description">
            Designed to keep you at the perfect temperature all night long. To top it off, the silver-infused fibers prevent up to 99.7% of bacteria growth, helping you sleep in clean comfort.
        </p>
        
        <ul>
            <li>
                <div class="icon-holder">
                    <img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
                </div>
                <p><strong>Makes you feel up to 4° cooler upon contact</strong></p>
            </li>
            <li>
                <div class="icon-holder">
                    <img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
                </div>
                <p><strong>Silvadur™ Antimicrobial Technology</strong></p>
            </li>
            <li>
                <div class="icon-holder">
                    <img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
                </div>
                <p><strong>Hypoallergenic</strong></p>
            </li>
        </ul>

        <div class="form">
			<ColorSelection bind:selectedColor={selectedColor} colorOptions={colorOptions} />

            <VariantSelection bind:selectedSize={selectedVariant} variantOptions={variantOptions} />
    
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

        <a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="37673238298774" data-next-url="/up/v6/8b?upsell=true">
            Yes, Add To My Order with 1-Click-buy!
        </a>

        <a href="/up/v6/8b" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

        <hr />

        <div class="money-back-text">
            <img
                src="/assets/images/icons/30-day-guarantee.svg"
                alt="30-day money back guarantee - Miracle Made"
            />

            <p>30 day money-back guarantee</p>
        </div>
    </div>
</div>

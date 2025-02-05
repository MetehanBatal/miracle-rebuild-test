<script>
    import { purchaseLog } from "../../../../stores/purchaseLog";
    import { browser } from "$app/environment";
import { onMount } from 'svelte';

    console.log($purchaseLog);

    import Banner from "$lib/banners/UpsellBanner.svelte";
    import Visuals from "$lib/upsells/sheets/Visuals.svelte";
    import Timer from "../../../../lib/shared/Timer.svelte";

    const bannerContent = {
        h4: `Bonus: You Qualify For An Exclusive Offer!`,
        h3: `Try our revolutionary new laundry detergent sheets for <span class="color-green">35% OFF!`,
        p: `Save space, money, and the planet while doubling down on stains with our detergent sheets!`,
    };

    const hasSlider = false;
    const hasVideo = true;
    const imageCount = 0;
    const slug = "4b";

    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD";
        }
    })
</script>

<Banner {bannerContent} />

<div class="upsell-box">
    <Visuals {hasSlider} {imageCount} {slug} {hasVideo} />

    <div class="upsell-content up-4b">
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
            Still, hoarding bulky detergent bottles in the pantry? Say goodbye to plastic waste and detergent spills, and say hello to more shelf space, better skin health, and cleaner laundry without the harsh chemicals.
        </p>

        <ul>
            <li>
            	<div class="icon-holder">
            		<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
            	</div>
            	<p>Removes even the toughest stains</p>
            </li>
            <li>
            	<div class="icon-holder">
            		<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
            	</div>
            	<p>No toxic ingredients</p>
            </li>
            <li>
            	<div class="icon-holder">
            		<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
            	</div>
            	<p>Crafted for sensitive skin</p>
            </li>
            <li>
            	<div class="icon-holder">
            		<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
            	</div>
            	<p>Less space, less waste</p>
            </li>
            <li>
            	<div class="icon-holder">
            		<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
            	</div>
            	<p>No more messy spills</p>
            </li>
		</ul>

        <div class="form">
            <div class="variant-selection">
                <p class="form-heading">Choose Your Deal:</p>
    
                <select class="variants">
                    <option value="1">Buy 1 Box, Get 1 FREE (64 Loads) – {usdPrefix}$29*</option>
                    <option value="2">Buy 2 Boxes, Get 2 FREE (128 Loads) – {usdPrefix}$54*</option>
                    <option value="3">Buy 3 Boxes, Get 3 FREE (192 Loads) – {usdPrefix}$79*</option>
                </select>
            </div>
    
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

        <a
            href="#"
            class="checkout-accept-upsell button---yes-upsell cta-button"
            data-upsell-type="upgrade-variant"
            data-upsell-param1="39858439422102"
            data-next-url="https://try.miraclebrand.co/up/v5/7b?upsell=true"
        >
            Yes, Upgrade My Order with 1-Click-buy!
        </a>

        <a href="/up/v5/7b" class="link"
            >No, thank you! I don’t want to get this one-time-only offer.</a
        >

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

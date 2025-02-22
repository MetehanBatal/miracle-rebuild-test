<script>
    import { purchaseLog } from "../../../../stores/writables/purchaseLog";
    import { browser } from "$app/environment";
    import { onMount } from 'svelte';

    console.log($purchaseLog);

    import Banner from "$lib/banners/UpsellBanner.svelte";
    import Visuals from "$lib/upsells/sheets/Visuals.svelte";
    import Timer from "../../../../lib/shared/Timer.svelte";

    const bannerContent = {
        h3: `Your order isn't complete without pillowcases!`,
        p: `As a special Thank You for joining the Miracle family we want to offer you our premium Pillowcases for <span class="color-green">20% OFF!</span></p>`,
    };

    const hasSlider = true;
    const imageCount = 5;
    const slug = "3b";

    export let data;
    console.log('Data: ', data);
    
    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD";
        }
    })
</script>

<Banner {bannerContent} />

<div class="upsell-box ">
    <Visuals {hasSlider} {imageCount} {slug} />

    <div class="upsell-content up-3b">
        <div class="trusted-by">
            <img
                src="/assets/images/icons/stars.svg"
                alt="5-star Experience - Miracle Made"
            />

            <p>10,078+ FIVE-STAR COMPANY REVIEWS</p>
        </div>

        <p class="upsell-description font-bg">
            Our premium pillowcases are infused with silver to help prevent up to 99.7% of bacterial growth, keeping your bedding cleaner for longer. Say goodbye to bacteria build-up and rest easy on pillowcases that stay fresh and inviting—night after night.
        </p>
        
        <ul>
            <li>
                <div class="icon-holder">
                    <img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
                </div>
                <p class="font-description-bg">3x less laundry</p>
            </li>
            <li>
                <div class="icon-holder">
                    <img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
                </div>
                <p class="font-description-bg">Designed for a Cleaner Sleep</p>
            </li>
            <li>
                <div class="icon-holder">
                    <img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
                </div>
                <p class="font-description-bg">Luxuriously soft sleep, every. single. night.</p>
            </li>
        </ul>

        <div class="form">
            <p class="sm">
                <strong class="uppercase"
                    >Select your deal below for your 2 pillowcases!</strong
                >
            </p>
            <div class="fabric-selection">
                <p class="form-heading">1. Choose a Fabric</p>
    
                <div class="selections selection-fabric">
                    <label class="selection selected">
                        <input
                            type="radio"
                            name="fabric"
                            value="signature"
                            checked
                        />
    
                        <div>
                            <p class="sm"><strong>2x Standard</strong></p>
                        </div>
                    </label>
    
                    <label class="selection">
                        <input type="radio" name="fabric" value="luxe" />
    
                        <div>
                            <div class="badge-holder">
                                <p class="sm">
                                    <strong>2x Extra Luxe</strong>
                                </p>
    
                                <div class="best-seller-badge">BEST SELLER</div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
    
            <div class="size-selection">
                <p class="form-heading">2. Choose a Size</p>
    
                <div class="selections">
                    <label class="selection selected">
                        <input type="radio" name="size" value="standard" checked />
                        <p class="size-selector">Standard</p>
                    </label>
    
                    <label class="selection">
                        <input type="radio" name="size" value="king" />
                        <p class="size-selector">King</p>
                    </label>
                </div>
            </div>
    
            <div class="color-selection">
                <p class="form-heading">
                    3. Choose color: <span id="color-name">Stone</span>
                </p>
    
                <div class="colors">
                    <label class="color stone">
                        <input type="radio" name="color" value="stone" checked />
                    </label>
    
                    <label class="color white">
                        <input type="radio" name="color" value="white" />
                    </label>
    
                    <label class="color sky_blue">
                        <input type="radio" name="color" value="sky_blue" />
                    </label>
    
                    <label class="color navy">
                        <input type="radio" name="color" value="navy" />
                    </label>
    
                    <label class="color sand">
                        <input type="radio" name="color" value="sand" />
                    </label>
                    <label class="color sage">
                        <input type="radio" name="color" value="sage" />
                    </label>
    
                    <label class="color terracotta">
                        <input type="radio" name="color" value="terracotta" />
                    </label>
    
                    <label class="color charcoal">
                        <input type="radio" name="color" value="charcoal" />
                    </label>
                </div>
            </div>
    
            <hr />
    
            <div class="price-container">
                <div>
                    <h4 class="price"><span class="non-usa">{usdPrefix}</span>$44*</h4>
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
        </div>

        <a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="39509018149014" data-next-url="/up/v6/6b?upsell=true">
            Yes, Upgrade My Order with 1-Click-buy!
        </a>

        <a href="/up/v6/6b" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

        <hr />

        <div class="money-back-text">
            <img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made" />

            <p>30 day money-back guarantee</p>
        </div>
    </div>
</div>

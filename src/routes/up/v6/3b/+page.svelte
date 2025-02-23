<script>
    import { purchaseLog } from "../../../../stores/writables/purchaseLog";
    import { browser } from "$app/environment";
    import { onMount } from 'svelte';

    import Banner from "$lib/banners/UpsellBanner.svelte";
    import Visuals from "$lib/upsells/sheets/Visuals.svelte";
    import ColorSelection from '$lib/upsells/sheets/ColorSelection.svelte';
	import SizeSelection from '$lib/upsells/sheets/SizeSelection.svelte';
    import FabricSelection from '$lib/upsells/sheets/FabricSelection.svelte';
    import Timer from "$lib/shared/Timer.svelte";

    const bannerContent = {
        h3: `Your order isn't complete without pillowcases!`,
        p: `As a special Thank You for joining the Miracle family we want to offer you our premium Pillowcases for <span class="color-green">20% OFF!</span></p>`,
    };

    let fabricOptions = [
        {
            label: '2x Signature',
            value: 'signature'
        },
        {
            label: '2x Extra Luxe',
            value: 'luxe',
            bestSeller: true
        }
    ];
    let sizeOptions = [
		'standard', 'king'
	];
    let selectedFabric = 'signature';
	let selectedSize = 'standard';
	let selectedColor = 'white';

	let colorOptions = [
		'stone', 'white', 'sky_blue', 'navy', 'sand', 'sage', 'terracotta', 'charcoal', 'silver_grey', 'rosewood'
	];

    const hasSlider = true;
    const imageCount = 5;
    const slug = "3b";

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
            
            <FabricSelection bind:selectedFabric={selectedFabric} fabricOptions={fabricOptions} />
    
            <SizeSelection bind:selectedSize={selectedSize} sizeOptions={sizeOptions} />
	
			<ColorSelection bind:selectedColor={selectedColor} colorOptions={colorOptions} />
    
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
            Yes, Add To My Order with 1-Click-buy!
        </a>

        <a href="/up/v6/6b" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

        <hr />

        <div class="money-back-text">
            <img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made" />

            <p>30 day money-back guarantee</p>
        </div>
    </div>
</div>

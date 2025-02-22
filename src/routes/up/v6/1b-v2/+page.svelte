<script>
	import { purchaseLog } from '../../../../stores/writables/purchaseLog';
	import { browser } from "$app/environment";
	import { onMount } from 'svelte';
	console.log($purchaseLog);

	import Banner from '$lib/banners/UpsellBanner.svelte';
	import Visuals from '$lib/upsells/sheets/Visuals.svelte';
    import Timer from '../../../../lib/shared/Timer.svelte';
    

	const bannerContent = {
		h4: 'Hold Up! We Really Want You To <br class="desktop-hidden" />Try These Extra Luxe Sheets!',
		h3: `Upgrade your sheets to extra luxe for <span class="color-green">50% OFF!</span>`,
		p: `<p>Everyone deserves to have ultra-luxurious, smooth, and silky feeling sheets, so try them now 100% Risk Free</p>`
	};

	const hasSlider = true;
	const imageCount = 5;
	const slug = '1b';
    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD";
        }
    })
</script>

<Banner {bannerContent} />

<div class="upsell-box">
	<Visuals {hasSlider} {imageCount} {slug} />

	<div class="upsell-content up-1b">
		<div class="trusted-by">
			<img src="/assets/images/icons/stars.svg" alt="5-star Experience - Miracle Made">

			<p>10,078+ FIVE-STAR COMPANY REVIEWS</p>
		</div>

		<div class="callout-box">
			<img src="/assets/images/icons/hourglass.svg" alt="Limited Time Offer - Miracle Made">

			<p><strong class="uppercase">One-time Offer – Only available with this current order.</strong><span> You will never see this again.</span></p>
		</div>

		<p class="upsell-description">
			These are just some of the amazing benefits of our Extra Luxe sheets: You will absolutely come back wishing that you had the Extra Luxe sheets. Now you can take advantage of the Extra Luxe sheets for only <strong>$30 each.</strong>
		</p>

		<ul> 
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Latest Gen 3 of Miracle Clean & Cool™ Fabrics</p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Our Most Premium Eucalyptus Blend with Sateen Weave</p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Enhanced Breathability</p>
			</li>
		</ul>

		<div class="price-container">
			<div>
				<h4 class="price"><span class="non-usa">{usdPrefix}</span>$30*</h4>
				<p><strong>Per Upgrade</strong></p>
			</div>

			<div class="deal-endtime">
				*Plus any applicable taxes
				<div class="timer-wrapper">
					<div class="flashing-circle"></div>
					<p>Deal reserved for: <Timer/> min</p>
				</div>
			</div>
		</div>

		<a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="39767106650262" data-next-url='https://try.miraclebrand.co/up/v6/2c?upsell=true'>
			Yes, Upgrade My Order with 1-Click-buy!
		</a>

		<a href="/up/v6/2c" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

		<hr>

		<div class="money-back-text">
			<img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made">

			<p>30 day money-back guarantee</p>
		</div>
	</div>
</div>
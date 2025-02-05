<script>
	import { purchaseLog } from "../../../../stores/purchaseLog";
	import { onMount } from "svelte";
	console.log($purchaseLog);

	import Banner from "$lib/banners/UpsellBanner.svelte";
	import Visuals from "$lib/upsells/sheets/Visuals.svelte";
    import Timer from "../../../../lib/shared/Timer.svelte";
    

	const bannerContent = {
		h4: `Bonus: You Qualify For An Exclusive Offer!`,
		h3: `Try our anti-bacterial kitchen towels for <span class="color-green">40% OFF!</span>`,
		p: `Ditch the musty odors! These antibacterial kitchen towels dry up to 2x faster and stay fresh up to 3x longer.`,
	};

	const hasSlider = false;
	const imageCount = 1;
	const slug = "7b";

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
			Help keep your kitchen hygienic and your family safe from the kinds of mess that ordinary towels will only spread around. <br class="mobile-hidden"/> <strong>Buy 3 Get 3 Free for only <span class="non-usa">{usdPrefix}</span> $29.99*</strong> <br>
			<span>*Plus any applicable taxes</span>
		</p>

		<ul>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Quick drying</p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Absorbent and heavy weight</p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Supports a healthier and cleaner environment</p>
			</li>
		</ul>

		<div class="price-container">
			<div class="deal-endtime">
				<div class="timer-wrapper">
					<div class="flashing-circle"></div>
					<p>Deal reserved for: <Timer/> min</p>
				</div>
			</div>
		</div>

		<a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="39917283475606" data-next-url="/receipt">
			Yes, Upgrade My Order with 1-Click-buy!
		</a>

		<a href="/receipt" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

		<hr />

		<div class="money-back-text">
			<img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made" />

			<p>30 day money-back guarantee</p>
		</div>
	</div>
</div>

<script>
	import { purchaseLog } from '../../../../stores/writables/purchaseLog';
	import { browser } from "$app/environment";
	import { onMount } from 'svelte';

	console.log($purchaseLog);

	import Banner from '$lib/banners/UpsellBanner.svelte';
	import Visuals from '$lib/upsells/sheets/Visuals.svelte';
    import Timer from '../../../../lib/shared/Timer.svelte';

	const bannerContent = {
		h4: 'WAIT! WE HAVE SOMETHING SPECIAL FOR YOU!',
		h3: `Get some extra sheets for  <br class="desktop-hidden"> <span class="color-green">up to 55% OFF!</span>`,
		p: `<p>Note: This is a one-time-only offer that <br class="desktop-hidden" />you will never see again.</p>`
	};

	const hasSlider = true;
	const imageCount = 5;
	const slug = '2d';
	
    let usdPrefix = "";
       
    onMount(() => {
        if($purchaseLog.shippingAddress?.country !== "US") {
            usdPrefix = "USD";
        }
    })
</script>

<Banner {bannerContent} />

<div class="upsell-box up-2c">
	<Visuals {hasSlider} {imageCount} {slug} />

	<div class="upsell-content">
		<div class="trusted-by">
			<img src="/assets/images/icons/stars.svg" alt="5-star Experience - Miracle Made">

			<p>10,078+ FIVE-STAR COMPANY REVIEWS</p>
		</div>

		<div class="callout-box">
			<img src="/assets/images/icons/hourglass.svg" alt="Limited Time Offer - Miracle Made">

			<p><strong class="uppercase">One-time Offer – Only available with this current order.</strong><span> You will never see this again.</span></p>
		</div>

		<p class="upsell-description">
			Thousands of our customers come back for more once they feel the life-changing differences in their sleep. Enjoy the silver-infused benefits of Miracle Made® Sheets throughout every bedroom in your home, or even keep an extra set on hand since you have this huge discount opportunity!
		</p>

		<div class="form">
			<div class="size-selection">
				<p class="form-heading">1. Select Size</p>
	
				<div class="selections selections-5fr">
					<label class="selection">
						<input type="radio" name="size" value="twin">
						<p>Twin</p>
					</label>
	
					<label class="selection">
						<input type="radio" name="size" value="full">
						<p>Full</p>
					</label>
	
					<label class="selection selected">
						<input type="radio" name="size" value="queen" checked>
						<p>Queen</p>
					</label>
	
					<label class="selection">
						<input type="radio" name="size" value="king">
						<p>King</p>
					</label>
					<label class="selection">
						<input type="radio" name="size" value="cali_king">
						<p>Cali King</p>
					</label>
				</div>
			</div>
	
			<div class="color-selection"> 
				<p class="form-heading">2. Choose a color: <span id="color-name">Stone</span></p>
	
				<div class="colors">
					<label class="color stone">
						<input type="radio" name="color" value="stone" checked>
					</label>
	
					<label class="color white">
						<input type="radio" name="color" value="white">
					</label>
	
					<label class="color sky_blue">
						<input type="radio" name="color" value="sky_blue">
					</label>
	
					<label class="color navy">
						<input type="radio" name="color" value="navy">
					</label>
	
					<label class="color sand">
						<input type="radio" name="color" value="sand">
					</label>
					<label class="color sage out-of-stock">
						<input type="radio" name="color" value="sage">
					</label>
	
					<label class="color terracotta">
						<input type="radio" name="color" value="terracotta">
					</label>
	
					<label class="color charcoal">
						<input type="radio" name="color" value="charcoal">
					</label>
				
				</div>
			</div>
	
			<div class="variant-selection">
				<p class="form-heading">3. Choose Quantity</p>
	
				<select class="variants">
					<option value="1">Add 1 Sheet for {usdPrefix}$92.00* each (40% OFF)</option>
					<option value="2" selected>Add 2 Sheets Sets for {usdPrefix}$84.50* each (45% OFF)</option>
					<option value="3">Add 3 Sheets Sets for {usdPrefix}$77.00* each (50% OFF)</option>
					<option value="4">Add 4 Sheets Sets for {usdPrefix}$69.25* each (55% OFF)</option>
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

		<a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="37856216318102" data-next-url='https://try.miraclebrand.co/up/v6/3b?upsell=true'>
			Yes, Upgrade My Order with 1-Click-buy!
		</a>

		<a href="/up/v6/3b" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

		<hr>

		<div class="money-back-text">
			<img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made">

			<p>30 day money-back guarantee</p>
		</div>
	</div>
</div>
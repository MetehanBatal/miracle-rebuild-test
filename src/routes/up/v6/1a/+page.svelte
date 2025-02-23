<script>
	import { purchaseLog } from '../../../../stores/writables/purchaseLog';
	import { sessionAnalytics } from '../../../../stores/writables/sessionAnalytics';
	import { browser } from "$app/environment";
	import { onMount } from 'svelte';

	import Banner from '$lib/banners/UpsellBanner.svelte';
	import Visuals from '$lib/upsells/sheets/Visuals.svelte';
	import Timer from '../../../../lib/shared/Timer.svelte';

	const bannerContent = {
		h4: 'Bonus: You Qualify For An Extra Luxe Upgrade!',
		h3: `Upgrade your sheets to extra luxe for <span class="color-green">30% OFF!</span>`,
		p: `Want an ultra-luxurious, smooth, and extra silky feel with your silver infused sheets? 
		<br class="mobile-hidden">
		With the Extra Luxe you'll upgrade your sleep even further.`
	};

	const hasSlider = true;
	const imageCount = 5;
	const slug = '1a';

	
	let usdPrefix = '';
	   
	onMount(() => {
		window.checkoutReadyCallbacks = window.checkoutReadyCallbacks || [];
		window.checkoutReadyCallbacks.push(async function() {
			$purchaseLog.billingAddress = checkout.cart.billingAddress;
			$purchaseLog.cartCurrency = checkout.cart.cartCurrency;
			$purchaseLog.checkedOut = checkout.cart.checkedOut;

			console.log($purchaseLog, checkout.cart);

			const pageViewSchema = {
				eventName: 'Purchase',
				pageSlug: visitedSlug,
				timestamp: Date.now()
			}
		    $sessionAnalytics.events.push(pageViewSchema);
		});

		if($purchaseLog.shippingAddress?.country !== "US") {
			usdPrefix = "USD ";
		}
	});
</script>

<svelte:head>
	<title>Special Offer | Miracle</title>
	
	<meta content="api.shopmiraclebrand.co" name="checkout-api-endpoint">
</svelte:head>

<Banner {bannerContent} />

<div class="upsell-box">
	<Visuals {hasSlider} {imageCount} {slug} />

	<div class="upsell-content up-1a">
		<div class="trusted-by">
			<img src="/assets/images/icons/stars.svg" alt="5-star Experience - Miracle Made">

			<p>10,078+ FIVE-STAR COMPANY REVIEWS</p>
		</div>

		<div class="callout-box">
			<img src="/assets/images/icons/hourglass.svg" alt="Limited Time Offer - Miracle Made">

			<p><strong class="uppercase">One-time Offer – Only available with this current order.</strong><span> You will never see this again.</span></p>
		</div>

		<p class="upsell-description">
			Almost all of our customers eventually upgrade to the Extra Luxe sheets because they are truly irresistable! Now you can take advantage of the Extra Luxe sheets for <strong>only $50 per set.</strong>
		</p>

		<ul> 
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Premium Miracle Clean & Cool™ Fabrics</p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Enhanced High Thread Count Sateen Weave</p>
			</li>
			<li>
				<div class="icon-holder">
					<img src="/assets/images/icons/tick.svg" alt="Upsell - Miracle Made">
				</div>
				<p>Additional Silver Infused Protection</p>
			</li>
			<li>
				<div class="stardust-wrapper">
					<img src="/assets/images/icons/stardust.svg" alt="Upsell - Miracle Made">
				</div>
				<div class="text-wrapper">
					<p><span class="font-bold">BONUS:</span> Exclusive access to 20% OFF future purchases <br class="mobile-hidden"> including luxury sheets, towels, and hundreds of gift items <br class="mobile-hidden"> for 1 year</p>
				</div>
			</li>
		</ul>

		<div class="price-container">
			<div>
				<h4 class="price"><span class="non-usa">{usdPrefix}</span>$50*</h4>
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

		<a href="#" class="checkout-accept-upsell button---yes-upsell cta-button" data-upsell-type="upgrade-variant" data-upsell-param1="39767106617494" data-next-url='/up/v6/2d?upsell=true'>
			Yes, Upgrade My Order with 1-Click-buy!
		</a>

		<a href="/up/v6/1b-v2" class="link">No, thank you! I don’t want to get this one-time-only offer.</a>

		<hr>

		<div class="money-back-text">
			<img src="/assets/images/icons/30-day-guarantee.svg" alt="30-day money back guarantee - Miracle Made">

			<p>30 day money-back guarantee</p>
		</div>
	</div>
</div>
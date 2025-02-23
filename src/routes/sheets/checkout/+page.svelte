<script>
// import Banner from '$lib/banners/CheckoutBanner.svelte';
import CheckoutSection from '$lib/checkout/sheets/CheckoutSection.svelte';
import SummarySection from '$lib/checkout/sheets/SummarySection.svelte';
import intlTelInput from 'intl-tel-input';
import '../../../css/intlTelInput.min.css';
	
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { onMount } from 'svelte';

let checkoutHench = {
	initCustomSelect() {
		let selects = document.querySelectorAll('.select-box');

		selects.forEach(function(select) {
			const choices = new Choices(select, {
				searchEnabled: false,
				itemSelectText: ''
			});
		});
	},

	checkSafari: function() {
		const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

		// To remove the outline on radio buttons
		// as they are not getting rounded
		// ..like every other browser..
		if (isSafari) {
			document.body.classList.add('is-safari');
		}
	},

	removeExtraPixels: function() {
		let extraImages = document.querySelectorAll('img[height="1"]');
		extraImages.forEach(function(image) {
			image.style.position = 'absolute';
		});
	},

	listenSelection: function() {
		let selects = document.querySelectorAll('.select-box');
		selects.forEach(function(select) {
			select.addEventListener('change', function(e) {
				select.classList.add('selected');
			});
		})
	},

	handleSubmit: function() {
		const button = document.querySelector('.checkout-submit-combo');
		let topScrollValue = document.querySelector('.form-box').getBoundingClientRect().top;

		button.addEventListener('click', function(e) {
			setTimeout(function() {
				if (document.querySelectorAll('.checkout-combo-form .checkout-invalid-field').length > 0) {
					var new_position = document.querySelector('.checkout-combo-form .checkout-invalid-field').offsetTop - 80;
					window.scroll({
						top: new_position,
						behavior: 'smooth'
					});
				} else {
					goto('/up/v6/1a-v5');
					// $(".checkout-submit-combo").addClass("submitting");

					// $(document).on("checkout_failed", (e)=> {
					// 	$(".checkout-submit-combo").removeClass("submitting");
					// 	$("#overlay").css("opacity",1);
					// });
				}
			}, 200);
		});
	},

	listenPromoCodeAddup: function() {
		document.querySelector('.checkout-discount-value').addEventListener('DOMSubtreeModified', function(){
			if (checkoutData.cart.localCart.state.discountTotal > 0) {
				document.querySelector(".discount-success").classList.remove("hidden");
				document.querySelector('form[name="coupon_form_desktop"]').classList.add('hidden');
			} else {
				document.querySelector(".discount-success").classList.add("hidden");
				document.querySelector('form[name="coupon_form_desktop"]').classList.remove('hidden');
			}
		});
	}
}

onMount(() => {
	// checkout.apiClient.setVariantQuantities(checkout.apiClient.setVariantQuantities({42536178319510 : 1}))
	document.body.removeAttribute('class');
	document.body.classList.add('checkout');

	checkoutHench.listenSelection();
	checkoutHench.handleSubmit();

	function loadScript(src) {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;

			document.body.appendChild(script);

			script.addEventListener('load', () => resolve(script));
			script.addEventListener('error', () => reject(script));
		});
	}

	// setTimeout(async function() {
	// 	await loadScript('https://cdn.shopmiraclebrand.co/js/cart_loader.js');
	// 	await loadScript('https://try.miraclebrand.co/pixel.js');
	// }, 40);

	setTimeout(() => {
		checkoutHench.removeExtraPixels();
	}, 2400);

	checkoutHench.checkSafari();


	///////// Phone Intl ////////////////
	window.checkoutReadyCallbacks = window.checkoutReadyCallbacks || [];
	window.checkoutReadyCallbacks.push(() => {
		Checkout.setNextUrlFn((cart) => {
			return '/up/v6/1a-v5';
		});

		//$(".skeleton-load").fadeOut();
		const shipInput = document.getElementById("ship_field_intl");
		const billInput = document.getElementById("billing_field_intl");
		const shipPhoneField = intlTelInput(shipInput, {
			utilsScript: "https://try.miraclebrand.co/checkout_v8/js/utils.js",
			initialCountry: window.checkout.cart.shippingZone
		});
		const billPhoneField = intlTelInput(billInput, {
			utilsScript: "https://try.miraclebrand.co/checkout_v8/js/utils.js",
			initialCountry: window.checkout.cart.shippingZone
		});
		shipInput.addEventListener("change", (e) => {
			document.getElementById("shipping_phone").value = shipPhoneField.getNumber();
		});
		billInput.addEventListener("change", (e) => {
			document.getElementById("billing_phone").value = billPhoneField.getNumber();
		});

		checkoutHench.listenPromoCodeAddup();
	});

	return () => {
		document.body.removeAttribute('class');
	}
});

// Refer to +error.svelte
// decide whether redirect or a static page here
//
</script>

<svelte:head>
	<title>Secure Checkout | Miracle Made</title>
	<meta content="Checkout" property="og:title" />
	<meta content="Checkout" property="twitter:title" />
	<meta content="../assets/scripts/custom_translation.json" name="checkout-translations-url">
	<meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0" name="viewport" />
	
	<meta content="api.shopmiraclebrand.co" name="checkout-api-endpoint" />
	<meta content="42558763532438" name="checkout-default-variant-id" />
	<meta content="42536178319510" name="checkout-default-addons" />
	<meta content="US" name="checkout-default-shipping-zone" />
	
	<meta content="checkout_v5" name="checkout-funnel-name" />
	<meta content="mb-sheets-checkout-v8-au" name="checkout-page-name">
	<meta content="sheets" name="checkout-aux-page-name">
	<meta content="/up/v6/1a-v5" name="checkout-next-url" />

	{#if browser}
	<!-- <script src="https://cdn.shopmiraclebrand.co/js/cart_loader.js" defer></script> -->
	<!-- <script src="https://try.miraclebrand.co/pixel.js" defer></script> -->
	{/if}
</svelte:head>

<!-- <Banner /> -->

<div class="checkout-holder">
	<CheckoutSection />

	<SummarySection />
</div>

<style>
:global(.hidden) {
	display: none!important;
}
.checkout-holder {
	padding: 24px 18px;
}

:global(.choices__list--dropdown),
:global(.choices__list[aria-expanded]),
:global(.iti__country-list ){
	z-index: 12 !important;
}

:global(.checkout-validation-help-text ){
	font-weight: 400;
	font-size: 14px;

	margin-top: 12px;
	color: red;
}

/* Typography */

:global(.uppercase ){
	text-transform: uppercase;
}

:global(.sm ){
	font-size: 12px;
}

@media screen and (min-width:980px) {
	.checkout-holder {
		display: grid;
		grid-template-columns: 5.5fr 4.5fr;
		padding: 0;
	}
}
</style>
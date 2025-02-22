<script>
	import { remainingTime } from '../../../stores/toolkit/functions';
	import { purchaseLog } from '../../../stores/writables/purchaseLog';
	import { sessionAnalytics } from '../../../stores/writables/sessionAnalytics';
	import { onMount } from 'svelte';

	let toggled = false;	

	async function inferGender(event) {
		let firstName = event.target.value;
        if (firstName.trim() !== '') {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ firstName: firstName })
            });

            const data = await res.json();
            $sessionAnalytics.gender = data.gender;
        }
    }

	function logPurchaseDetails(value, topLevelKey, innerLevelKey) {
		if (innerLevelKey) { 
			if (!$purchaseLog[topLevelKey]) {
				$purchaseLog[topLevelKey] = {}; }

			$purchaseLog[topLevelKey][innerLevelKey] = value;
		} else {
			$purchaseLog[topLevelKey] = value;
		}
	}

	onMount(() => {
		setTimeout(() => {

			// let totalValue = document.querySelector('.total-line .checkout-money').innerHTML;
			// let mobileTotalValue = document.querySelector(".checkout-total-value").innerHTML;
			// window.checkoutReadyCallbacks = window.checkoutReadyCallbacks || [];
			// window.checkoutReadyCallbacks.push(() => {
			// 	if (checkoutData.cart.shippingZone !== "US") {
			// 		document.querySelectorAll('.total-line .checkout-money').forEach((el) => {
			// 			el.innerHTML = `<span class="non-usa">USD </span> ${totalValue}`
			// 		});
			// 		document.querySelector(".checkout-total-value").innerHTML = `<span class="non-usa">USD </span> ${totalValue}`;
			// 	}
			// });
		},1200)
	})
</script>

<section class="checkout-box">
	<div class="container">
		<div class="navbar">
			<img src="/assets/icons/miracle-logo-black.svg" alt="Miracle Made | Logo" class="logo" />
			<div>
				<img src="/assets/icons/secure-icon.svg" alt="Secure Payment by Miracle Made" class="secure-icon" />
				<p>
					<strong class="uppercase">Secure <br />Checkout</strong>
				</p>
			</div>
		</div>
		
		<div class="mobile-order-summary-box" class:revealed={toggled} on:click={ () => { if (toggled) {toggled = false;} else {toggled = true;} } }>
			<h3 class="heading" id="mobile-summary-heading">
				<span>Hide </span>Order Summary
			</h3>
			<p class="checkout-total-value"></p>
			<div class="accordion-menu">
				<div data-show-compare-pricing="true" data-show-product-images="true" data-currency-symbol="$" class="checkout-cart-display mobile-display"></div>
				<div class="plus-text">*Plus applicable taxes</div>
			</div>
		</div>

		<div class="callout-box">
			<img src="/assets/icons/discount.png" alt="Discount Icon" />
			<p>
				<strong class="uppercase">Sale ends soon!</strong> Your cart is
				reserved for:
				<strong class="timer time-remaining">{ $remainingTime }</strong>
			</p>
		</div>

		<div class="steps">
			<p class="step"><strong>Checkout</strong></p>
			<svg width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<title>Path Copy</title>
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="8" transform="translate(-248.000000, -238.000000)" fill="#000000" fill-rule="nonzero">
						<polygon id="Path-Copy" transform="translate(252.000000, 244.000000) rotate(-90.000000) translate(-252.000000, -244.000000) " points="256.584984 240 252 244.946734 247.415016 240 246 241.526608 252 248 258 241.526608"></polygon>
					</g>
				</g>
			</svg>
			<p class="step">Special Offers</p>
			<svg width="8px" height="12px" viewBox="0 0 8 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
				<title>Path Copy</title>
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="8" transform="translate(-248.000000, -238.000000)" fill="#000000" fill-rule="nonzero">
						<polygon id="Path-Copy" transform="translate(252.000000, 244.000000) rotate(-90.000000) translate(-252.000000, -244.000000) " points="256.584984 240 252 244.946734 247.415016 240 246 241.526608 252 248 258 241.526608"></polygon>
					</g>
				</g>
			</svg>
			<p class="step">Order Receipt</p>
		</div>

		<div class="discount-box">
			<form name="coupon_form_desktop">
				<input type="text" class="input checkout-coupon-field" maxlength="256" name="coupon_desktop_field" placeholder="Promo code (optional)" id="coupon_desktop_field" />
				<a href="#" class="checkout-coupon-button">Redeem</a>
			</form>
			<div class="discount-success hidden">
				<div class="discount-message">
					<span class="discount-applied">Discount Applied! You're saving</span>
					<span class="checkout-discount-value">0.00</span>
				</div>
			</div>
			<div class="w-form-fail discount-warning">
				<div>This discount code cannot be used</div>
			</div>
		</div>
		<div class="warranty-addon">
			<form>
				<label data-variant-id="42536178319510" class="w-checkbox checkout-addon-toggle">
					<input type="checkbox" checked name="checkout-addon-toggle" id="checkout-addon-toggle" />
					<span for="checkout-addon-toggle" class="checkbox-detail">
						<span>Yes, Add 2-Year Wear &amp; Tear Warranty For Only
							$19.99</span>
					</span>
				</label>
			</form>
		</div>
		<div class="express-checkout-box">
			<p class="express-checkout_text">Express Checkout</p>
			<div class="checkout-paypal-form">
				<div class="skeleton-load"></div>
				<div id="form_paypal" class="form-paypal w-form">
					<form id="form_paypal" data-name="form_paypal" class="checkout-paypal-form">
						<a href="#" class="checkout-submit-paypal">
							<svg width="86px" height="22px" viewBox="0 0 86 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<title>paypal</title>
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="8" transform="translate(-392.000000, -452.000000)" fill-rule="nonzero">
										<g id="express-checkout-cta" transform="translate(188.000000, 437.000000)">
											<g id="paypal" transform="translate(204.000000, 15.000000)">
												<path d="M66.4793651,5.73913043 L61.8380952,5.73913043 C61.5650794,5.73913043 61.2920635,6.01242236 61.1555556,6.28571429 L59.2444444,18.310559 C59.2444444,18.5838509 59.3809524,18.7204969 59.6539683,18.7204969 L62.1111111,18.7204969 C62.384127,18.7204969 62.5206349,18.5838509 62.5206349,18.310559 L63.0666667,14.8944099 C63.0666667,14.621118 63.3396825,14.3478261 63.7492063,14.3478261 L65.2507937,14.3478261 C68.3904762,14.3478261 70.1650794,12.8447205 70.5746032,9.83850932 C70.847619,8.60869565 70.5746032,7.51552795 70.0285714,6.83229814 C69.2095238,6.14906832 67.9809524,5.73913043 66.4793651,5.73913043 M67.0253968,10.2484472 C66.752381,11.8881988 65.5238095,11.8881988 64.2952381,11.8881988 L63.4761905,11.8881988 L64.0222222,8.74534161 C64.0222222,8.60869565 64.1587302,8.47204969 64.431746,8.47204969 L64.7047619,8.47204969 C65.5238095,8.47204969 66.3428571,8.47204969 66.752381,9.01863354 C67.0253968,9.1552795 67.0253968,9.56521739 67.0253968,10.2484472" id="Shape" fill="#139AD6"></path>
												<g id="Group" transform="translate(25.800000, 5.739130)" fill="#263B80">
													<path d="M7.23492063,0 L2.59365079,0 C2.32063492,0 2.04761905,0.273291925 1.91111111,0.546583851 L0,12.5714286 C0,12.8447205 0.136507937,12.9813665 0.40952381,12.9813665 L2.59365079,12.9813665 C2.86666667,12.9813665 3.13968254,12.7080745 3.27619048,12.4347826 L3.82222222,9.1552795 C3.82222222,8.88198758 4.0952381,8.60869565 4.5047619,8.60869565 L6.00634921,8.60869565 C9.14603175,8.60869565 10.9206349,7.10559006 11.3301587,4.09937888 C11.6031746,2.86956522 11.3301587,1.77639752 10.784127,1.0931677 C9.96507937,0.409937888 8.87301587,0 7.23492063,0 M7.78095238,4.50931677 C7.50793651,6.14906832 6.27936508,6.14906832 5.05079365,6.14906832 L4.36825397,6.14906832 L4.91428571,3.00621118 C4.91428571,2.86956522 5.05079365,2.73291925 5.32380952,2.73291925 L5.5968254,2.73291925 C6.41587302,2.73291925 7.23492063,2.73291925 7.64444444,3.27950311 C7.78095238,3.41614907 7.91746032,3.82608696 7.78095238,4.50931677" id="Shape"></path>
													<path d="M21.2952381,4.37267081 L19.1111111,4.37267081 C18.9746032,4.37267081 18.7015873,4.50931677 18.7015873,4.64596273 L18.5650794,5.32919255 L18.4285714,5.05590062 C17.8825397,4.37267081 16.9269841,4.09937888 15.8349206,4.09937888 C13.3777778,4.09937888 11.1936508,6.01242236 10.784127,8.60869565 C10.5111111,9.97515528 10.9206349,11.2049689 11.6031746,12.0248447 C12.2857143,12.8447205 13.2412698,13.1180124 14.4698413,13.1180124 C16.5174603,13.1180124 17.6095238,11.8881988 17.6095238,11.8881988 L17.4730159,12.5714286 C17.4730159,12.8447205 17.6095238,12.9813665 17.8825397,12.9813665 L19.9301587,12.9813665 C20.2031746,12.9813665 20.4761905,12.7080745 20.6126984,12.4347826 L21.8412698,4.7826087 C21.7047619,4.64596273 21.431746,4.37267081 21.2952381,4.37267081 M18.1555556,8.74534161 C17.8825397,9.97515528 16.9269841,10.931677 15.5619048,10.931677 C14.8793651,10.931677 14.3333333,10.6583851 14.0603175,10.3850932 C13.7873016,9.97515528 13.6507937,9.42857143 13.6507937,8.74534161 C13.7873016,7.51552795 14.8793651,6.55900621 16.1079365,6.55900621 C16.7904762,6.55900621 17.2,6.83229814 17.6095238,7.10559006 C18.0190476,7.51552795 18.1555556,8.19875776 18.1555556,8.74534161" id="Shape"></path>
												</g>
												<path d="M80.4031746,10.1118012 L78.2190476,10.1118012 C78.0825397,10.1118012 77.8095238,10.2484472 77.8095238,10.3850932 L77.6730159,11.068323 L77.5365079,10.7950311 C76.9904762,10.1118012 76.0349206,9.83850932 74.9428571,9.83850932 C72.4857143,9.83850932 70.3015873,11.7515528 69.8920635,14.3478261 C69.6190476,15.7142857 70.0285714,16.9440994 70.7111111,17.7639752 C71.3936508,18.5838509 72.3492063,18.8571429 73.5777778,18.8571429 C75.6253968,18.8571429 76.7174603,17.6273292 76.7174603,17.6273292 L76.5809524,18.310559 C76.5809524,18.5838509 76.7174603,18.7204969 76.9904762,18.7204969 L79.0380952,18.7204969 C79.3111111,18.7204969 79.584127,18.447205 79.7206349,18.173913 L80.9492063,10.5217391 C80.8126984,10.3850932 80.6761905,10.1118012 80.4031746,10.1118012 M77.2634921,14.484472 C76.9904762,15.7142857 76.0349206,16.6708075 74.6698413,16.6708075 C73.9873016,16.6708075 73.4412698,16.3975155 73.168254,16.1242236 C72.8952381,15.7142857 72.7587302,15.1677019 72.7587302,14.484472 C72.8952381,13.2546584 73.9873016,12.2981366 75.215873,12.2981366 C75.8984127,12.2981366 76.3079365,12.5714286 76.7174603,12.8447205 C77.2634921,13.2546584 77.4,13.9378882 77.2634921,14.484472" id="Shape" fill="#139AD6"></path>
												<path d="M58.9714286,10.1118012 L56.6507937,10.1118012 C56.3777778,10.1118012 56.2412698,10.2484472 56.1047619,10.3850932 L53.1015873,15.0310559 L51.7365079,10.6583851 C51.6,10.3850932 51.4634921,10.2484472 51.0539683,10.2484472 L48.8698413,10.2484472 C48.5968254,10.2484472 48.4603175,10.5217391 48.4603175,10.7950311 L50.9174603,18.0372671 L48.5968254,21.3167702 C48.4603175,21.5900621 48.5968254,22 48.8698413,22 L51.0539683,22 C51.3269841,22 51.4634921,21.863354 51.6,21.7267081 L59.1079365,10.931677 C59.5174603,10.5217391 59.2444444,10.1118012 58.9714286,10.1118012" id="Path" fill="#263B80"></path>
												<path d="M82.9968254,6.14906832 L81.0857143,18.447205 C81.0857143,18.7204969 81.2222222,18.8571429 81.4952381,18.8571429 L83.4063492,18.8571429 C83.6793651,18.8571429 83.952381,18.5838509 84.0888889,18.310559 L86,6.28571429 C86,6.01242236 85.8634921,5.8757764 85.5904762,5.8757764 L83.4063492,5.8757764 C83.2698413,5.73913043 83.1333333,5.8757764 82.9968254,6.14906832" id="Path" fill="#139AD6"></path>
												<path d="M15.6984127,1.63975155 C14.7428571,0.546583851 12.968254,4.85463981e-15 10.5111111,4.85463981e-15 L3.68571429,4.85463981e-15 C3.27619048,4.85463981e-15 2.86666667,0.409937888 2.73015873,0.819875776 L0,18.7204969 C0,19.1304348 0.273015873,19.4037267 0.546031746,19.4037267 L4.77777778,19.4037267 L5.86984127,12.7080745 L5.86984127,12.9813665 C6.00634921,12.5714286 6.41587302,12.1614907 6.82539683,12.1614907 L8.87301587,12.1614907 C12.831746,12.1614907 15.8349206,10.5217391 16.7904762,6.01242236 C16.7904762,5.8757764 16.7904762,5.73913043 16.7904762,5.60248447 C16.6539683,5.60248447 16.6539683,5.60248447 16.7904762,5.60248447 C16.9269841,3.82608696 16.6539683,2.73291925 15.6984127,1.63975155" id="Path" fill="#263B80"></path>
												<path d="M16.6539683,5.60248447 L16.6539683,5.60248447 C16.6539683,5.73913043 16.6539683,5.8757764 16.6539683,6.01242236 C15.6984127,10.6583851 12.6952381,12.1614907 8.73650794,12.1614907 L6.68888889,12.1614907 C6.27936508,12.1614907 5.86984127,12.5714286 5.73333333,12.9813665 L4.36825397,21.3167702 C4.36825397,21.5900621 4.5047619,21.863354 4.91428571,21.863354 L8.46349206,21.863354 C8.87301587,21.863354 9.28253968,21.5900621 9.28253968,21.1801242 L9.28253968,21.0434783 L9.96507937,16.8074534 L9.96507937,16.5341615 C9.96507937,16.1242236 10.3746032,15.8509317 10.784127,15.8509317 L11.3301587,15.8509317 C14.7428571,15.8509317 17.4730159,14.484472 18.1555556,10.3850932 C18.4285714,8.74534161 18.2920635,7.24223602 17.4730159,6.28571429 C17.3365079,6.01242236 17.0634921,5.73913043 16.6539683,5.60248447" id="Path" fill="#139AD6"></path>
												<path d="M15.6984127,5.19254658 C15.5619048,5.19254658 15.4253968,5.05590062 15.2888889,5.05590062 C15.152381,5.05590062 15.015873,5.05590062 14.8793651,4.91925466 C14.3333333,4.7826087 13.7873016,4.7826087 13.1047619,4.7826087 L7.78095238,4.7826087 C7.64444444,4.7826087 7.50793651,4.7826087 7.37142857,4.91925466 C7.0984127,5.05590062 6.96190476,5.32919255 6.96190476,5.60248447 L5.86984127,12.7080745 L5.86984127,12.9813665 C6.00634921,12.5714286 6.41587302,12.1614907 6.82539683,12.1614907 L8.87301587,12.1614907 C12.831746,12.1614907 15.8349206,10.5217391 16.7904762,6.01242236 C16.7904762,5.8757764 16.7904762,5.73913043 16.9269841,5.60248447 C16.6539683,5.46583851 16.5174603,5.32919255 16.2444444,5.32919255 C15.8349206,5.19254658 15.8349206,5.19254658 15.6984127,5.19254658" id="Path" fill="#232C65"></path>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</a>
					</form>
				</div>
			</div>
		</div>
		<p class="express-checkout_text">Or Pay with Credit Card</p>
		<div class="form-box">
			<form method="post" redirect="https://try.javycoffee.com/up5/" data-redirect="https://try.javycoffee.com/up5/" class="form checkout-combo-form">
				<div class="form-group">
					<h3 class="heading">Contact Information</h3>
					<div class="form-group">
						<input type="email" class="input" autocomplete="email" maxlength="256" name="email" data-name="email" placeholder="E-Mail*" id="email" required on:blur={(e) => logPurchaseDetails(e.target.value, 'email')} />
					</div>
					<label class="accepts_marketing">
						<input type="checkbox" id="accepts_marketing" name="accepts_marketing" checked />
						<span for="accepts_marketing" class="checkbox-detail w-form-label">
							Keep me up to date on news and exclusive offers
						</span>
					</label>
				</div>
				<div class="form-group">
					<h3 class="heading">Shipping Address</h3>
					<div class="shipping-details">
						<div class="form-group">
							<input type="text" class="input" autocomplete="given-name" maxlength="256" name="shipping_first_name" placeholder="First Name*" id="shipping_first_name" on:blur={(e) => { inferGender(e) }} required />
						</div>
						<div class="form-group">
							<input type="text" class="input" autocomplete="family-name" maxlength="256" name="shipping_last_name" placeholder="Last Name*" id="shipping_last_name" on:blur={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'last_name')} required />
						</div>
						<div class="form-group">
							<input type="text" class="input full-width" autocomplete="address-line1" maxlength="256" name="shipping_address1" placeholder="Address*" id="shipping_address_1" on:blur={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'address1')} required />
						</div>
						<div class="form-group">
							<input type="text" class="input full-width" autocomplete="address-line2" maxlength="256" name="shipping_address2" placeholder="Apartment, suite, etc. (optional)" id="shipping_address_2" on:blur={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'address2')} />
						</div>
						<div class="form-group">
							<select id="shipping_country" name="shipping_country" autocomplete="country-name" class="select-box" on:change={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'country')} required></select>
						</div>
						<div class="form-group">
							<select id="shipping_state" name="shipping_state" autocomplete="address-level1" class="select-box"  on:change={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'province')} required></select>
						</div>
						<div class="form-group">
							<input type="text" class="input" autocomplete="address-level2" maxlength="256" name="shipping_city" placeholder="City*" id="shipping_city" on:blur={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'city')} required />
						</div>
						<div class="form-group">
							<input type="text" class="input" autocomplete="postal-code" maxlength="256" name="shipping_postal_code" placeholder="Zip Code*" id="shipping_postal_code" on:blur={(e) => logPurchaseDetails(e.target.value, 'shippingAddress', 'zip')} required />
						</div>
						<div class="form-group iti-holder">
							<input type="tel" maxlength="256" name="ship_field_intl" id="ship_field_intl" autocomplete="tel-full" class="input full-width" />
						</div>
						<div class="form-group">
							<input type="hidden" name="shipping_phone" id="shipping_phone" value="" />
						</div>
					</div>
					<div class="attentive-form">
						<label id="accepts_attentive">
							<input type="checkbox" id="accepts_attentive" name="accepts_attentive" />
							<span for="accepts_attentive" class="checkbox-detail">
								<strong>Get 10% Off Your Next Order</strong>
								<span>By checking this box you agree to receive recurring
									automated promotional and personalized marketing text
									messages <strong>(e.g. cart reminders)</strong> from
									Shine at the cell number used when signing up. Joining
									is not a condition of any purchase.
									<strong>Reply HELP for help and STOP to cancel.</strong>
									Msg frequency varies & Msg data rates may apply. View
									<a href="https://www.miraclebrand.co/pages/terms-and-conditions" target="_blank">Terms & Privacy.</a></span>
							</span>
						</label>
					</div>
				</div>
				<div class="form-group">
					<h3 class="heading">Billing Address</h3>
					<p class="form-description">
						Select the address that matches your card or payment method.
					</p>
					<div class="billing-address-selection">
						<label class="same-shipping">
							<input type="radio" value="true" name="billing_use_shipping" checked />
							<span>Same as shipping address</span>
						</label>
						<label class="different-shipping">
							<input type="radio" value="false" name="billing_use_shipping" />
							<span>Use a different billing address</span>
						</label>
					</div>
					<div class="shipping-details different-billing-address">
						<div class="form-group"><input type="text" class="input" autocomplete="given-name" maxlength="256" name="billing_first_name" placeholder="First Name*" id="billing_first_name" on:blur={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'first_name')} /></div>
						<div class="form-group"><input type="text" class="input" autocomplete="family-name" maxlength="256" name="billing_last_name" placeholder="Last Name*" id="billing_last_name" on:blur={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'last_name')} /></div>
						<div class="form-group"><input type="text" class="input" autocomplete="address-line1" maxlength="256" name="billing_address1" placeholder="Address*" id="billing_address_1" on:blur={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'address1')} /></div>
						<div class="form-group"><input type="text" class="input" autocomplete="address-line2" maxlength="256" name="billing_address2" placeholder="Apartment, suite, etc. (optional)" id="billing_address_2" on:blur={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'address2')} /></div>
						<div class="form-group"><select id="billing_country" name="billing_country" autocomplete="country-name" class="select-box" on:change={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'country')}></select></div>
						<div class="form-group"><select id="billing_state" name="billing_state" autocomplete="address-level1" class="select-box" on:change={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'province')}></select></div>
						<div class="form-group"><input type="text" class="input" autocomplete="address-level2" maxlength="256" name="billing_city" placeholder="City*" id="billing_city" on:blur={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'city')} /></div>
						<div class="form-group"><input type="text" class="input" autocomplete="postal-code" maxlength="256" name="billing_postal_code" placeholder="Zip Code*" id="billing_postal_code" on:blur={(e) => logPurchaseDetails(e.target.value, 'billingAddress', 'zip')} /></div>
						<div class="form-group iti-holder"><input type="tel" maxlength="256" name="billing_field_intl" id="billing_field_intl" autocomplete="tel-full" class="input" /></div>
						<input type="hidden" name="billing_phone" id="billing_phone" value="" />
					</div>
				</div>
				<div class="form-group">
					<h3 class="heading">Payment Method</h3>
					<p class="form-description">
						All transactions are secure and encrypted.
					</p>
					<div class="payment-method-selection">
						<div class="top">
							<label combo_mode="credit">
								<input type="radio" value="credit" id="combo_mode_credit" name="combo_mode" checked />
								<span for="credit">Credit Card</span>
							</label>
							<svg width="143px" height="21px" viewBox="0 0 143 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
								<title>ccs</title>
								<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
									<g id="8" transform="translate(-532.000000, -1670.000000)" fill-rule="nonzero">
										<g id="ccs" transform="translate(532.000384, 1670.000000)">
											<g id="mastercard" transform="translate(36.188000, 0.000000)">
												<path d="M30.3733683,0.00036830628 L2.60036831,0.00036830628 C1.90726806,-0.0113886563 1.23909486,0.258762081 0.748928472,0.748928472 C0.258762081,1.23909486 -0.0113886563,1.90726806 0.00036830628,2.60036831 L0.00036830628,18.2243683 C0.00639468223,19.657805 1.16693158,20.8183419 2.60036831,20.8243683 L30.3703683,20.8243683 C31.0634686,20.8361253 31.7316417,20.5659745 32.2218081,20.0758081 C32.7119745,19.5856417 32.9821253,18.9174686 32.9703683,18.2243683 L32.9703683,2.60036831 C32.9643547,1.16809539 31.8056333,0.008035497 30.3733683,0.00036830628 Z" id="Path_1" fill="#000000" opacity="0.07"></path>
												<path d="M30.3743683,0.868368306 C31.3319948,0.871114599 32.107622,1.64674184 32.1103683,2.60436831 L32.1103683,18.2243683 C32.107622,19.1819948 31.3319948,19.957622 30.3743683,19.9603683 L2.60436831,19.9603683 C1.64674184,19.957622 0.871114599,19.1819948 0.868368306,18.2243683 L0.868368306,2.60436831 C0.871114599,1.64674184 1.64674184,0.871114599 2.60436831,0.868368306 L30.3743683,0.868368306" id="Path_2" fill="#FFFFFF"></path>
												<circle id="Ellipse_3" fill="#EB001B" cx="13.0173683" cy="10.4143683" r="6.075"></circle>
												<circle id="Ellipse_4" fill="#F79E1B" cx="19.9603683" cy="10.4143683" r="6.075"></circle>
												<path d="M19.0923683,10.4143683 C19.1052869,8.4331719 18.1269377,6.57667261 16.4853683,5.46736831 C14.8781327,6.60628891 13.9119235,8.44468783 13.8853683,10.4143683 C13.8914943,12.3891802 14.8623205,14.2363637 16.4853683,15.3613683 C18.1268003,14.2519408 19.1051076,12.395521 19.0923683,10.4143683 L19.0923683,10.4143683 Z" id="Path_3" fill="#FF5F00"></path>
											</g>
											<g id="visa" transform="translate(-0.000000, 0.000000)">
												<path d="M30.3733683,0.00036830628 L2.60036831,0.00036830628 C1.90726806,-0.0113886563 1.23909486,0.258762081 0.748928472,0.748928472 C0.258762081,1.23909486 -0.0113886563,1.90726806 0.00036830628,2.60036831 L0.00036830628,18.2243683 C0.00639468223,19.657805 1.16693158,20.8183419 2.60036831,20.8243683 L30.3703683,20.8243683 C31.0634686,20.8361253 31.7316417,20.5659745 32.2218081,20.0758081 C32.7119745,19.5856417 32.9821253,18.9174686 32.9703683,18.2243683 L32.9703683,2.60036831 C32.9643547,1.16809539 31.8056333,0.008035497 30.3733683,0.00036830628 Z" id="Path_4" fill="#000000" opacity="0.07"></path>
												<path d="M30.3743683,0.868368306 C31.3319948,0.871114599 32.107622,1.64674184 32.1103683,2.60436831 L32.1103683,18.2243683 C32.107622,19.1819948 31.3319948,19.957622 30.3743683,19.9603683 L2.60436831,19.9603683 C1.64674184,19.957622 0.871114599,19.1819948 0.868368306,18.2243683 L0.868368306,2.60436831 C0.871114599,1.64674184 1.64674184,0.871114599 2.60436831,0.868368306 L30.3743683,0.868368306" id="Path_5" fill="#FFFFFF"></path>
												<path d="M24.5593683,8.76436831 L24.2993683,8.76436831 C23.9060617,9.59278675 23.6146035,10.4658183 23.4313683,11.3643683 L25.0803683,11.3643683 C24.9668687,10.4867238 24.7927865,9.617983 24.5593683,8.76436831 Z M27.0763683,13.8843924 L25.6003683,13.8843924 C25.5133683,13.8843924 25.5133683,13.8843924 25.4263683,13.7973683 L25.2523683,13.0163683 L25.1653683,12.8423683 L23.0843683,12.8423683 C22.9973683,12.8423683 22.9103683,12.8423683 22.9103683,13.0163683 L22.6503683,13.7973683 C22.6509219,13.8206074 22.6419337,13.8430593 22.6254965,13.8594965 C22.6090593,13.8759337 22.5866074,13.8849219 22.5633683,13.8843924 L20.7393683,13.8843924 L20.9133683,13.4503683 L23.4303683,7.55036831 C23.4303683,7.11636831 23.6903683,6.94336831 24.1243683,6.94336831 L25.4243683,6.94336831 C25.5113683,6.94336831 25.5983683,6.94336831 25.5983683,7.11736831 L26.8133683,12.7583683 C26.9131583,13.0676533 26.9716641,13.388763 26.9873683,13.7133683 C27.0763683,13.7983683 27.0763683,13.7983683 27.0763683,13.8843924 Z M15.4473683,13.6243683 L15.7943683,12.0623683 C15.8604219,12.0712359 15.9216421,12.101846 15.9683683,12.1493683 C16.5322443,12.4303593 17.1626823,12.5504262 17.7903683,12.4963683 C18.0022082,12.4790299 18.2085137,12.4198912 18.3973683,12.3223683 C18.8313683,12.1483683 18.8313683,11.7153683 18.4843683,11.3673683 C18.2656939,11.2033806 18.033532,11.0581957 17.7903683,10.9333683 C17.4419004,10.7828825 17.1195502,10.577996 16.8353683,10.3263683 C16.4320279,10.0024027 16.1903026,9.51843133 16.1735796,9.001365 C16.1568567,8.48429868 16.3668043,7.98571931 16.7483683,7.63636831 C17.2693683,7.28936831 17.5303683,6.94236831 18.2243683,6.94236831 C19.1247543,6.89493617 20.027596,6.9533356 20.9143683,7.11636831 L21.0013683,7.11636831 C20.9270045,7.61684515 20.8109337,8.11022972 20.6543683,8.59136831 C20.2463883,8.3958545 19.8055119,8.27817441 19.3543683,8.24436831 C19.0910232,8.23026146 18.8271535,8.25965539 18.5733683,8.33136831 C18.4373815,8.33407642 18.3098797,8.39801104 18.2263683,8.50536831 C18.1432759,8.58445667 18.0962433,8.69415424 18.0962433,8.80886831 C18.0962433,8.92358237 18.1432759,9.03327995 18.2263683,9.11236831 L18.6603683,9.45936831 C18.9884259,9.61458416 19.3072857,9.78853801 19.6153683,9.98036831 C20.0901592,10.2333351 20.4367263,10.6742557 20.5703683,11.1953683 C20.7586873,11.9600822 20.4460712,12.7606355 19.7893683,13.1953683 C19.4803008,13.5387138 19.036153,13.7291673 18.5743683,13.7163683 C17.5874824,13.8027766 16.5932614,13.7441542 15.6233683,13.5423683 C15.5343683,13.7113683 15.5343683,13.7113683 15.4473683,13.6243683 L15.4473683,13.6243683 Z M12.4103683,13.8843683 C12.4317252,13.5888812 12.4901845,13.2972565 12.5843683,13.0163683 C13.0183683,11.1073683 13.4523683,9.11136831 13.7993683,7.20236831 C13.8863683,7.02836831 13.8863683,6.94236831 14.0593683,6.94236831 L15.6213683,6.94236831 C15.4696651,7.87838068 15.2670309,8.80542377 15.0143683,9.71936831 C14.7543683,11.0193683 14.4933683,12.3193683 14.1463683,13.6243683 C14.1463683,13.7983683 14.0593683,13.7983683 13.8863683,13.7983683 M4.33936831,7.11636831 C4.33936831,7.02936831 4.51336831,6.94236831 4.59936831,6.94236831 L7.55036831,6.94236831 C7.97252511,6.92413681 8.34325281,7.22054814 8.41836831,7.63636831 L9.19936831,11.4543683 C9.19936831,11.5413683 9.19936831,11.5413683 9.28636831,11.6283683 C9.28581476,11.6051292 9.29480293,11.5826773 9.31124013,11.5662401 C9.32767732,11.5498029 9.35012919,11.5408148 9.37336831,11.5413683 L11.1953683,7.11536831 C11.1083683,7.02836831 11.1953683,6.94136831 11.2823683,6.94136831 L13.1043683,6.94136831 C13.1043683,7.02836831 13.1043683,7.02836831 13.0173683,7.11536831 L10.3273683,13.4503683 C10.2403683,13.6243683 10.2403683,13.7103683 10.1533683,13.7973683 C10.0663683,13.8843683 9.89336831,13.7973683 9.71936831,13.7973683 L8.41936831,13.7973683 C8.33236831,13.7973683 8.24536831,13.7973683 8.24536831,13.6233683 L6.85636831,8.24236831 C6.64784387,8.00137903 6.37796263,7.82134302 6.07536831,7.72136831 C5.55020013,7.49591687 4.9944793,7.34965681 4.42636831,7.28736831 L4.33936831,7.11636831 Z" id="Path_6" fill="#142688"></path>
											</g>
											<g id="amex" transform="translate(72.809000, 0.000000)">
												<path d="M30.3733683,0.00036830628 L2.60036831,0.00036830628 C1.90726806,-0.0113886563 1.23909486,0.258762081 0.748928472,0.748928472 C0.258762081,1.23909486 -0.0113886563,1.90726806 0.00036830628,2.60036831 L0.00036830628,18.2243683 C0.00639468223,19.657805 1.16693158,20.8183419 2.60036831,20.8243683 L30.3703683,20.8243683 C31.0634686,20.8361253 31.7316417,20.5659745 32.2218081,20.0758081 C32.7119745,19.5856417 32.9821253,18.9174686 32.9703683,18.2243683 L32.9703683,2.60036831 C32.9643547,1.16809539 31.8056333,0.008035497 30.3733683,0.00036830628 Z" id="Path_7" fill="#000000" opacity="0.07"></path>
												<path d="M30.3743683,0.868368306 C31.3319948,0.871114599 32.107622,1.64674184 32.1103683,2.60436831 L32.1103683,18.2243683 C32.107622,19.1819948 31.3319948,19.957622 30.3743683,19.9603683 L2.60436831,19.9603683 C1.64674184,19.957622 0.871114599,19.1819948 0.868368306,18.2243683 L0.868368306,2.60436831 C0.871114599,1.64674184 1.64674184,0.871114599 2.60436831,0.868368306 L30.3743683,0.868368306" id="Path_8" fill="#006FCF"></path>
												<path d="M7.81036831,8.94236831 L8.50436831,10.5913683 L7.20436831,10.5913683 L7.81036831,8.94236831 Z M21.7823683,8.94236831 L19.1823683,8.94236831 L19.1823683,9.63636831 L21.6993683,9.63636831 L21.6993683,10.6773683 L19.1823683,10.6773683 L19.1823683,11.4583683 L21.7823683,11.4583683 L21.7823683,12.0653683 L23.6043683,10.1563683 L21.7823683,8.24236831 L21.7823683,8.94236831 L21.7823683,8.94236831 Z M9.54636831,6.94236831 L13.0173683,6.94236831 L13.7983683,8.59136831 L14.4923683,6.94236831 L23.5173683,6.94236831 L24.4723683,7.98336831 L25.4273683,6.94236831 L29.5923683,6.94236831 L26.5583683,10.3263683 L29.5953683,13.6263683 L25.4303683,13.6263683 L24.4753683,12.5853683 L23.5203683,13.6263683 L8.76536831,13.6263683 L8.33136831,12.5853683 L7.37636831,12.5853683 L6.94236831,13.6263683 L3.55836831,13.6263683 L6.33536831,6.94236831 L9.54636831,6.94236831 Z M17.0963683,7.89736831 L15.1873683,7.89736831 L13.8873683,10.9343683 L12.4963683,7.89736831 L10.4963683,7.89736831 L10.4963683,12.0623683 L8.67836831,7.89736831 L6.94236831,7.89736831 L4.85836831,12.6703683 L6.24836831,12.6703683 L6.68236831,11.6293683 L8.93836831,11.6293683 L9.37236831,12.6703683 L11.7153683,12.6703683 L11.7153683,9.28536831 L13.2773683,12.6693683 L14.3183683,12.6693683 L15.7933683,9.28536831 L15.7933683,12.6693683 L17.0933683,12.6693683 L17.0933683,7.89736831 L17.0963683,7.89736831 Z M25.1673683,10.3273683 L27.3373683,7.89736831 L25.7753683,7.89736831 L24.3873683,9.37236831 L23.0873683,7.89736831 L17.9673683,7.89736831 L17.9673683,12.6703683 L23.0003683,12.6703683 L24.3883683,11.1953683 L25.6883683,12.6703683 L27.3373683,12.6703683 L25.1673683,10.3273683 Z" id="Path_9" fill="#FFFFFF"></path>
											</g>
											<g id="visa" transform="translate(109.518000, 0.000000)">
												<path d="M30.3733683,0.00036830628 L2.60036831,0.00036830628 C1.90726806,-0.0113886563 1.23909486,0.258762081 0.748928472,0.748928472 C0.258762081,1.23909486 -0.0113886563,1.90726806 0.00036830628,2.60036831 L0.00036830628,18.2243683 C0.00639468223,19.657805 1.16693158,20.8183419 2.60036831,20.8243683 L30.3703683,20.8243683 C31.0634686,20.8361253 31.7316417,20.5659745 32.2218081,20.0758081 C32.7119745,19.5856417 32.9821253,18.9174686 32.9703683,18.2243683 L32.9703683,2.60036831 C32.9643547,1.16809539 31.8056333,0.008035497 30.3733683,0.00036830628 Z" id="Path_10" fill="#000000" opacity="0.07"></path>
												<path d="M30.3743683,0.868368306 C31.3319948,0.871114599 32.107622,1.64674184 32.1103683,2.60436831 L32.1103683,18.2243683 C32.107622,19.1819948 31.3319948,19.957622 30.3743683,19.9603683 L2.60436831,19.9603683 C1.64674184,19.957622 0.871114599,19.1819948 0.868368306,18.2243683 L0.868368306,2.60436831 C0.871114599,1.64674184 1.64674184,0.871114599 2.60436831,0.868368306 L30.3743683,0.868368306" id="Path_11" fill="#FFFFFF"></path>
												<path d="M32.1093683,14.7533683 L32.1093683,18.2243683 C32.106622,19.1819948 31.3309948,19.957622 30.3733683,19.9603683 L20.1333683,19.9603683 C26.9893683,18.3983683 30.5473683,15.9683683 32.1093683,14.7533683 Z" id="Path_12" fill="#EDA024"></path>
												<polygon id="Path_13" fill="#494949" points="7.81036831 9.54636831 25.1663683 9.54636831 25.1663683 11.2823683 7.81036831 11.2823683"></polygon>
												<path d="M19.0923683,10.4103683 C19.1041253,11.1034686 18.8339745,11.7716417 18.3438081,12.2618081 C17.8536417,12.7519745 17.1854686,13.0221253 16.4923683,13.0103683 C15.0589316,13.0043419 13.8983947,11.843805 13.8923683,10.4103683 C13.928477,8.99235666 15.0674592,7.85029973 16.4853683,7.81036831 C17.1796714,7.79668868 17.8496766,8.06598996 18.341378,8.55637107 C18.8330794,9.04675218 19.1041811,9.71603098 19.0923683,10.4103683 L19.0923683,10.4103683 Z" id="Path_14" fill="#EDA024"></path>
											</g>
										</g>
									</g>
								</g>
							</svg>
						</div>
						<div class="bottom">
							<div class="field">
								<p class="field-title">Credit Card Number</p>
								<div class="input" id="braintree-cc-number"></div>
							</div>
							<div class="field">
								<p class="field-title">Valid Through</p>
								<div class="input" id="braintree-expiry"></div>
							</div>
							<div class="field">
								<p class="field-title">CVV</p>
								<div class="input" id="braintree-cvv"></div>
							</div>
							<div>
								<img src="/assets/icons/protect.svg" alt="Protect Icon" />
								<p>
									We protect your payment information using encryption to
									provide bank-level security.
								</p>
							</div>
						</div>
					</div>
				</div>
				<p class="legal-term">By clicking the <span>"Complete Purchase"</span> button, you hereby agree to and accept Pattern Brands LLC's <a target="_blank" href="https://www.miraclebrand.co/pages/privacy-policy">Privacy Policy</a> and <a target="_blank" href="https://www.miraclebrand.co/pages/terms-and-conditions">Terms of Use</a></p>
				<a href="#" class="checkout-submit-combo">
					<div class="loader-wrapper">
						<div class="loader"></div>
					</div>
					<div class="button-text">
						<svg width="14px" height="18px" viewBox="0 0 14 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
							<title>locker</title>
							<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
								<g id="8" transform="translate(-317.000000, -2019.000000)" fill="#000000" fill-rule="nonzero">
									<g id="Group" transform="translate(164.000000, 2018.000000)">
										<g id="locker" transform="translate(153.000000, 1.000000)">
											<path d="M11.9411765,6.609375 L10.7046127,6.609375 L10.7046127,3.71847656 C10.7046127,1.66809375 9.04214706,0 6.99873039,0 C4.95531373,0 3.29284804,1.66809375 3.29284804,3.71847656 L3.29284804,6.609375 L2.05882353,6.609375 C0.923588235,6.609375 0,7.55564062 0,8.71875 L0,15.890625 C0,17.0537344 0.923588235,18 2.05882353,18 L11.9411765,18 C13.0764118,18 14,17.0537344 14,15.890625 L14,8.71875 C14,7.55564062 13.0764118,6.609375 11.9411765,6.609375 Z M4.66539706,3.71847656 C4.66539706,2.4435 5.71213725,1.40625 6.99873039,1.40625 C8.28532353,1.40625 9.33206373,2.4435 9.33206373,3.71847656 L9.33206373,6.609375 L4.66539706,6.609375 L4.66539706,3.71847656 Z M12.627451,15.890625 C12.627451,16.2783281 12.3195882,16.59375 11.9411765,16.59375 L2.05882353,16.59375 C1.68041176,16.59375 1.37254902,16.2783281 1.37254902,15.890625 L1.37254902,8.71875 C1.37254902,8.33104688 1.68041176,8.015625 2.05882353,8.015625 L11.9411765,8.015625 C12.3195882,8.015625 12.627451,8.33104688 12.627451,8.71875 L12.627451,15.890625 Z" id="Shape"></path>
											<path d="M7,10.0546875 C6.29879902,10.0546875 5.73039216,10.6370508 5.73039216,11.3554688 C5.73039216,11.8141875 5.96235294,12.2171484 6.31245588,12.4487578 L6.31245588,13.9921875 C6.31245588,14.3804883 6.61970098,14.6953125 6.99873039,14.6953125 C7.37772549,14.6953125 7.6850049,14.3804883 7.6850049,13.9921875 L7.6850049,12.4504102 C8.03651471,12.219082 8.26960784,11.8153125 8.26960784,11.3554688 C8.26960784,10.6370508 7.70120098,10.0546875 7,10.0546875 Z" id="Path"></path>
										</g>
									</g>
								</g>
							</g>
						</svg>
						<div class="complete-purchase-text ct">COMPLETE PURCHASE</div>
					</div>
					<p>TRY IT RISK FREE! - 30 DAY MONEY BACK GUARANTEE!</p>
				</a>
			</form>
			<div class="guarantee-box">
				<img src="/assets/icons/money-back.png" alt="Money Back Guarantee by Miracle Made" />
				<p>
					<strong>30-Day Guarantee:</strong> Miracle offers a 30-Day Money
					Back Guarantee in case you don't fall in love with our product.
				</p>
			</div>
			<div class="checkout-note hidden is-mobile">
				<strong>
					<svg width="21px" height="23px" viewBox="0 0 21 23" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<title>protect</title>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="8" transform="translate(-197.000000, -1923.000000)" fill="#000000" fill-rule="nonzero">
								<g id="protect" transform="translate(197.000000, 1923.000000)">
									<path d="M10.2037897,12.9538006 C10.6975323,12.9538006 11.0977897,12.5535432 11.0977897,12.0598006 C11.0977897,11.5660581 10.6975323,11.1658006 10.2037897,11.1658006 C9.71004713,11.1658006 9.3097897,11.5660581 9.3097897,12.0598006 C9.3097897,12.2969042 9.40397872,12.5242966 9.57163624,12.6919541 C9.73929376,12.8596116 9.96668616,12.9538006 10.2037897,12.9538006 L10.2037897,12.9538006 Z M10.2037897,7.13680063 C9.86899261,7.12848226 9.54543114,7.25782137 9.30862079,7.49463172 C9.07181043,7.73144208 8.94247132,8.05500354 8.9507897,8.38980063 L8.9507897,9.46380063 L11.5417897,9.46380063 L11.5417897,8.38980063 C11.4266775,7.71811352 10.8777852,7.20562316 10.1997897,7.13680063 L10.2037897,7.13680063 Z" id="Path_30"></path>
									<path d="M20.1377897,3.55780063 L18.8847897,3.55780063 C15.7527897,3.55780063 13.3357897,1.94680063 10.5607897,0.0668006347 C10.3932233,-0.0222668782 10.1923561,-0.0222668782 10.0247897,0.0668006347 C7.3387897,1.94680063 4.8327897,3.55780063 1.7007897,3.55780063 L0.447789701,3.55780063 C0.327124383,3.55041288 0.209084952,3.59512982 0.123601919,3.68061285 C0.0381188855,3.76609589 -0.00659805027,3.88413532 0.000789701049,4.00480063 L0.000789701049,4.36280063 C0.000789701049,8.12180063 0.000789701049,18.0558006 10.0247897,22.2628006 C10.1836415,22.3818008 10.4019379,22.3818008 10.5607897,22.2628006 C20.6737897,18.0568006 20.5847897,8.12180063 20.5847897,4.36280063 L20.5847897,4.00480063 C20.5921775,3.88413532 20.5474605,3.76609589 20.4619775,3.68061285 C20.3764945,3.59512982 20.258455,3.55041288 20.1377897,3.55780063 L20.1377897,3.55780063 Z M13.9627897,14.6578006 L6.3547897,14.6578006 L6.3547897,9.46380063 L7.5187897,9.46380063 L7.5187897,8.38980063 C7.59974379,7.01563252 8.7377391,5.94270502 10.1142897,5.94270502 C11.4908403,5.94270502 12.6288356,7.01563252 12.7097897,8.38980063 L12.7097897,9.46380063 L13.8737897,9.46380063 L13.8737897,14.6558006 L13.9627897,14.6558006 L13.9627897,14.6578006 Z" id="Path_31"></path>
								</g>
							</g>
						</g>
					</svg>
					Taxes for this order will be charged when you receive the package
				</strong>
				<p>
					Shipments from the USA pay taxes/duty upon receipt instead of when paying online. Depending on your province, the rate will be between 5% to 20%. This is set by the Canadian government.
				</p>
			</div>
		</div>
		<hr />
		<footer>
			<div>
				<img src="/assets/icons/rtc-logo.png" alt="RTC Logo" />
				<p>Powered by RTC</p>
			</div>
			<div>
				<a href="https://www.miraclebrand.co/pages/terms-and-conditions" target="_blank">Terms of Service</a>
				<a href="https://www.miraclebrand.co/pages/privacy-policy" target="_blank">Privacy Policy</a>
			</div>
		</footer>
	</div>
</section>

<style>
:global(html, body) {
	font-size: 62.5%;
}

input:focus-visible {
	outline: 0;
}

input {
	font-family: 'Brandon', sans-serif;
}

strong {
	font-weight: 700;
}

hr {
	border: 0.05rem solid #000;
	margin: 2.4rem 0;
}
/* Typography */

.uppercase {
	text-transform: uppercase;
}

p {
	font-weight: 400;
	font-size: 1.4rem;
	line-height: 1.3;
}

span {
	font-weight: 400;
	font-size: 1.4rem;
}

.sm {
	font-size: 1.2rem;
}

/* Checkout Box */

.checkout-box {
	background-color: #fff;
}

.navbar {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;

	margin-bottom: 4.8rem;
}

.logo {
	height: 3.2rem;
}

.navbar div {
	display: flex;
	align-items: center;
	gap: 0.8rem;
}

.callout-box,
.checkout-addon-toggle {
	display: flex;
	align-items: center;
	gap: 1.4rem;

	padding: 1.2rem 1.6rem;

	background-color: #fcf8cd;
	border-radius: 0.6rem;
}

.callout-box img {
	width: 3rem;
}

.steps {
	display: flex;
	gap: 2.4rem;

	margin: 1.2rem 0;
}

.discount-success {
	padding: 1.2rem;
	background-color: #bae474;
	text-align: center;
}

.discount-success .checkout-discount-value {
	font-weight: 700;
}

.warranty-addon {
	margin: 1.2rem 0;
}

.warranty-addon span {
	font-weight: 500;
}

.checkout-submit-paypal {
	display: flex;
	justify-content: center;
	align-items: center;

	width: 100%;

	padding: 1.4rem;

	background-color: #ffc33a;
	border-radius: 0.4rem;
}

.express-checkout-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1.2rem;

	padding: 2rem 2.4rem 2.4rem;
	margin-bottom: 2rem;

	border: 0.1rem solid #000000;
	border-radius: 0.6rem;
}

.express-checkout_text {
	font-weight: 700;
	font-size: 1.2rem;
	text-transform: uppercase;
	text-align: center;
}

.checkout-paypal-form {
	width: 100%;
}

/* TAX Notification */

.checkout-note {
	padding: 2.5rem;
	margin-top: 1rem;
	color: #000;
	border: none;
	background: #FCF8CD;
	border-radius: .8rem;

	font-size: 1.8rem;
	text-align: left;
}

.checkout-note img {
	height: 36px;
	width: 28px;
}

.checkout-note strong {
	display: flex;
	align-items: center;
	gap: 1rem ;
	text-transform: uppercase;
	font-size: 1.4rem;
	margin-bottom: .6rem;
}

.heading {
	text-align: left;
	color: #000;
}

/* Order Summary */

.mobile-order-summary-box {
	display: grid;
	align-items: center;
	grid-template-columns: auto auto;

	margin-bottom: 2.4rem;
}

.mobile-order-summary-box .heading {
	margin-bottom: 0;
	white-space: nowrap;
}

.mobile-order-summary-box .heading span {
	display: none;

	font-family: inherit;
	font-size: inherit;
}

.mobile-order-summary-box.revealed .heading span {
	display: initial;
}

.complete-purchase-text {
	white-space: nowrap;
}


.mobile-order-summary-box .checkout-total-value {
	font-size: 1.6rem;
	font-weight: 700;
	text-align: right;
}

.mobile-order-summary-box .checkout-total-value::after {
	display: inline-block;

	width: 1.2rem;
	height: 0.8rem;

	background-image: url("/assets/icons/down-arrow-black.svg");
	background-size: contain;
	background-repeat: no-repeat;
	background-position: 50% 50%;

	content: "";

	margin-left: 0.4rem;

	transition: transform 0.36s ease-in-out;
}

.mobile-order-summary-box.revealed .checkout-total-value::after {
	transform: rotate(180deg);
}

.accordion-menu {
	grid-area: 2/1/2/3;
	max-height: 0;

	visibility: hidden;
	opacity: 0;

	overflow: hidden;

	transition: all 0.36s ease-in-out;
}

.mobile-order-summary-box.revealed .accordion-menu {
	max-height: 60rem;
	opacity: 1;
	visibility: visible;
}

/* Form */

.form-box {
	padding-top: 6rem;
}

.form {
	display: flex;
	flex-direction: column;
	gap: 3rem;
}

.shipping-details {
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: 1.2rem 3rem;
}

.different-billing-address {
	display: none;

	padding: 2.4rem;

	border: 0.1rem solid #000;
	border-top: 0;
	border-bottom-right-radius: 0.4rem;
	border-bottom-left-radius: 0.4rem;
}

:global(.checkout-use-billing-address .different-billing-address) {
	display: grid!important;
}

:global(.checkout-invalid-field input),
:global(.checkout-invalid-field select) {
	border-color: red!important;
}

.checkout-validation-help-text {
	font-weight: 400;
	font-size: 1.4rem;
	margin-top: 0.2rem;
	color: red;
}

.input {
	width: 100%;

	font-weight: 400;
	font-size: 1.6rem;

	padding: 0.8rem 1.4rem;

	border: 0.1rem solid #b4b4b4;
	border-radius: 0.4rem;
}

.input:focus {
	border-color: #000000;
}

input[type="radio"] {
	position: relative;

	min-width: 1.6rem;
	min-height: 1.6rem;
}

input[type="radio"]:after {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	box-sizing: border-box;

	width: 100%;
	height: 100%;

	content: "";

	background-color: transparent;
	outline: 0.1rem solid #b9b9b9;
	border-radius: 100%;
	z-index: 2;
}

.is-safari input[type="radio"]:after {
	outline: 0;
}

input[type="radio"]:checked:after {
	background-color: #000;
	border: 0.3rem solid #fff;
}

input[type="checkbox"] {
	flex-shrink: 0;

	position: relative;

	min-width: 2rem;
	min-height: 2rem;
}

input[type="checkbox"]:after {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	content: "";

	background-color: #fff;
	border: 0.1rem solid #000;
	border-radius: 0.4rem;

	z-index: 9;
}

input[type="checkbox"]:checked:after {
	background-image: url("/assets/icons/checkbox-mark.svg");
	background-size: 1rem 0.7rem;
	background-repeat: no-repeat;
	background-position: 50% 50%;
	background-color: #000;
}

.accepts_marketing {
	display: flex;
	align-items: center;
	gap: 1.2rem;

	margin-top: 1.4rem;
}

.discount-box form {
	display: flex;
}

.discount-box .input {
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
}

.discount-warning {
  display: none;
  margin-top: 10px;
  padding: 10px;
  background-color: #fede16 !important;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
	font-weight: 700;
  font-size: 1.4rem;
}

.checkout-coupon-button {
	font-weight: 700;
	font-size: 1.6rem;
	text-decoration: none;
	text-transform: uppercase;

	padding: 0.8rem 3.6rem;

	background-color: #303030;
	color: #fff;

	border-top-right-radius: 0.6rem;
	border-bottom-right-radius: 0.6rem;
}

.checkout-coupon-button:hover {
	background-color: #000000;
	transition: all 0.3s ease-in-out;
}

.heading {
	font-family: "Ellenluff larken";
	font-size: 2.2rem;

	margin-bottom: 1.2rem;
}

select:focus-visible {
	outline: 0;
}

.select-box {
	display: inline-block;

	vertical-align: top;

	width: 100%;

	background-color: #f9f9f9;

	padding: 7.5px 7.5px 3.75px;
	border: 1px solid #ddd;
	border-radius: 2.5px;

	font-size: 14px;

	min-height: 44px;

	overflow: hidden;

	padding: 0.8rem 1.4rem;

	background-color: #fff;
	border-color: #b4b4b4;
	border-radius: 0.6rem;
	color: rgba(0, 0, 0, 0.5);

	font-weight: 400;
}

.select-box:focus {
	border-color: #000000;
}

.select-box.selected {
	color: rgba(0, 0, 0, 1);
}

.attentive-form {
	margin-top: 2rem;
}

.attentive-form #accepts_attentive {
	display: flex;
	align-items: flex-start;
	gap: 1.2rem;
}

.checkbox-detail strong {
	display: block;

	font-family: "Ellenluff larken";
	font-size: 1.6rem;
}

.checkbox-detail span {
	display: block;

	font-size: 1.2rem;
	line-height: 1.1;
}

.checkbox-detail span strong {
	display: initial;

	font-weight: 700;
	font-size: inherit;

	color: initial;
	text-decoration: none;
}

.billing-address-selection,
.payment-method-selection {
	margin-top: 1.6rem;

	border: 0.1rem solid #000000;
	border-radius: 0.4rem;
}

.billing-address-selection label,
.payment-method-selection .top {
	display: flex;
	align-items: center;
	gap: 1rem;

	padding: 1.4rem 1.6rem;
}

.payment-method-selection .top label {
	display: flex;
	align-items: center;
	gap: 1rem;
}

.billing-address-selection label:first-child,
.payment-method-selection .top {
	border-bottom: 0.1rem solid #000000;
}

.payment-method-selection .top {
	justify-content: space-between;
}

.payment-method-selection .bottom {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto auto;
	grid-gap: 2rem 1.4rem;

	padding: 1.6rem 3rem;
}

.payment-method-selection .bottom div:first-child,
.payment-method-selection .bottom div:last-child {
	grid-column: 1/3;
}

.payment-method-selection .bottom div:last-child {
	display: flex;
	align-items: center;
	gap: 1.2rem;
}

.payment-method-selection .bottom div:last-child p {
	font-size: 1.2rem;
}

.payment-method-selection .bottom .input {
	height: 4.2rem;
}

.field-title {
	margin-bottom: 1rem;
}

.checkout-submit-combo {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 0.4rem;

	width: 100%;

	padding: 1.2rem 0.9rem;

	font-weight: 700;
	font-size: 1.8rem;
	text-decoration: none;

	background-color: #ffd814;
	color: #000000;

	border: 0.1rem solid #f0c14b;
	border-radius: 0.6rem;
}

.checkout-submit-combo:hover {
	background-color: #f0c14b;
	transition: all 0.3s ease-in-out;
}

.button-text {
	display: flex;
	gap: 1rem;
}

.checkout-submit-combo p {
	font-weight: 700;
	font-size: 1.2rem;
}

.guarantee-box {
	display: flex;
	align-items: center;
	gap: 2.4rem;

	margin-top: 2rem;
}

.guarantee-box img {
	width: 7.2rem;
}

/* Footer */

footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

footer div {
	display: flex;
	gap: 0.6rem;
}

footer a {
	font-weight: 400;
	font-size: 1.2rem;
	text-decoration: none;
	color: #000;
}

footer a:hover {
	text-decoration: underline;
	transition: all 0.3s ease-in-out;
}

/* Order Summary */

.summary-box {
	display: none;

	padding-top: 6.4rem;
}

:global(.checkout-cart-display table) {
	font-weight: 400;
	font-size: 1.4rem;
}

:global(.checkout-cart-display tbody) {
	display: flex;
	flex-direction: column;
}

:global(.checkout-cart-display tbody tr) {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 100%;

	padding: 0.8rem 0;

	border-bottom: 0.1rem solid #000000;
}

:global(.checkout-cart-display tbody tr:last-child) {
	border-bottom: 0;
}

:global(.checkout-cart-display .product-line td:not(.checkout-money)) {
	display: flex;
	align-items: center;
}

:global(.checkout-cart-display .product-line img) {
	width: 7.2rem;
}

:global(.checkout-cart-display .checkout-money) {
	font-weight: 700;
}

:global(.checkout-cart-display .checkout-money .compare-at-price) {
	font-weight: 400;
	text-decoration: line-through;
}

:global(.checkout-cart-display .total-line) {
	font-weight: 700;
	font-size: 2rem;
}

.summary-content {
	margin-top: 4rem;
}

.inner-headline-box {
	display: flex;
	align-items: center;
	gap: 1.6rem;

	margin-bottom: 3rem;
}

.inner-headline-box div {
	flex: 1;
	height: 0.1rem;

	background-color: #000000;
}

.inner-headline-box h5 {
	font-family: "Ellenluff larken";
	font-size: 1.2rem;
	text-transform: uppercase;
}

.flex {
	display: flex;
	align-items: flex-start;
	gap: 1.2rem;

	margin-bottom: 3rem;
}

.flex img {
	width: 5.4rem;
}

.flex-sm {
	display: flex;
	align-items: center;
	gap: 0.6rem;
}

.flex-sm .checkmark-icon {
	width: 1.2rem;
}

.review {
	margin-top: 1.2rem;
}

.review-author {
	margin-top: 1.2rem;
}

.icon-holder {
	display: flex;
	justify-content: center;
	align-items: center;

	min-width: 6.4rem;
	min-height: 6.4rem;

	border: 0.1rem solid #000000;
	border-radius: 100%;
}

.icon-holder img {
	width: 3rem;
}

@media screen and (min-width: 980px) {
	.logo {
		height: 4.6rem;
	}

	.checkout-box .container {
		max-width: 55rem;
	}

	.summary-box .container {
		max-width: 45rem;
	}

	.checkout-box {
		display: flex;
		justify-content: flex-end;

		padding: 2.4rem 8rem 2.4rem;
	}

	.shipping-details {
		grid-template-columns: 1fr 1fr;
	}

	.shipping-details .iti-holder {
		grid-column: 1 / 3;
	}

	:global(.shipping-details .full-width),
	:global(.iti) {
		width: 100%;
	}

	.summary-box {
		display: block;

		background-color: #fffef2;

		padding-left: 8rem;
		padding-right: 2.4rem;

		border-left: 0.1rem solid #000000;
	}

	.mobile-order-summary-box {
		display: none;
	}

	.checkout-note.is-mobile {
		display: none!important;
	}
}


/* LEGAL TERM */
	
.legal-term {
	margin-block: -1rem !important;
	font-size: 1.2rem !important;
	font-family: "Brandon";
}

.legal-term a {
	color: #000;
	text-decoration: underline;
	font-weight: 700;
}

.legal-term span {
	font-size: 1.2rem;
	font-weight: 700;
}

/* LEGAL TERM */

.plus-text {
	font-size: 14px; 
	margin-top: -12px; 
	padding-left: 3px;
	font-family: 'Brandon';
}


/* For smaller screen sizes */
@media screen and (max-width: 400px) {
	.callout-box {
		padding: 1.2rem;
		gap: 1rem;
	}

	.callout-box p {
		font-size: 1.2rem;
	}
}
/* END - Fonts*/
</style>
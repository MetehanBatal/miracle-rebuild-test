import { writable } from 'svelte/store';

export const purchaseLog = writable(
	{
		// billingAddress: {
		// 	address1: "",
		// 	address2: "",
		// 	city: "",
		// 	country: "",
		// 	first_name: "",
		// 	last_name: "",
		// 	phone: "",
		// 	province: "",
		// 	zip: ""
		// },
		// shippingAddress: {
		// 	address1: "",
		// 	address2: "",
		// 	city: "",
		// 	country: "",
		// 	first_name: "",
		// 	last_name: "",
		// 	phone: "",
		// 	province: "",
		// 	zip: ""
		// },
		
		userId: "",
		purchaseId: "",
		
		cartCurrency: "USD",
		productName: "kit",

		purchase: {}
		
		// date: "",
		// cartCurrency: "USD",
		// checkedOut: false,
		// testPurchase: false,
		// email: "",
		// productName: "kit",
		
		// purchase: {
		// 	subTotal: 0,
		// 	tax: 0,
		// 	primaryVariantId: 0,
		// 	couponCode: "",
		// 	discount: 0,
		// 	products: [
		// 		{
		// 			productImage: "",
		// 			displayName: "",
		// 			productTitle: "",
		// 			variantId: 0,
		// 			title: "",
		// 			subtitle: "",
		// 			price: 0,
		// 			quantity: 1,
		// 			isSubscription: true,
		// 			renewalPeriodDays: null
		// 		}
		// 	]
		// }
	}
);
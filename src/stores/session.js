import { writable } from "svelte/store";

export const sessionAnalytics = writable({
	userId: '',
	sessionId: '',
	purchaseId: '',

	gender: null,
	referrer: 'direct',

	advertorialPageName: '',

	hsValues: {},

	checkoutAmount: 0,
	upsellAmount: 0
});
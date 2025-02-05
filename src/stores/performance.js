import { writable } from "svelte/store";

export const userPerformance = writable({
	userId: '',
	sessionId: '',
	
	requestReceivedAt: '',
	fcpCompletedAt: '',
	lcpCompletedAt: '',
	lcpSubject: '',
	docsLoadedAt: '',
	clsReceivedAt: '',
	clsValue: '',

	pageName: '',
	pageType: '',
	
	country: ''
});
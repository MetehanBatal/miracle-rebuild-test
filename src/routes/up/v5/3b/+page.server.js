export const prerender = false;

export async function load(event) {
	const route = event.route.id;

	const pageCrumbs = {
		landingPageName: 'mb-sheets-up-v5-3b',
		funnelName: 'mb-sheets-up-v5-3b',
		pageType: 'upsell',
		productType: 'sheets'
	};
	
	const pageDetailsReq = await fetch(`http://localhost:3030/prod/mExperiments/getPageDetails?url=https://miracle-rebuild.vercel.app${route}&status=in-progress`);
	const pageDetailsRes = await pageDetailsReq.json();

	let assignedVariantId;
	let experimentId;
	if (pageDetailsRes.data?.experimentData?.variants) {
		experimentId = pageDetailsRes.data.experimentData.id;
		assignedVariantId = event.url.searchParams.get('variantId') ? event.url.searchParams.get('variantId') : event.cookies.get('assignedVariant') ? event.cookies.get('assignedVariant') : pageDetailsRes.data.experimentData.selectedVariant.variantId;
	}

	let returningVisitor = false;

	if (!event.cookies.get('assignedVariant')) {
		event.cookies.set('assignedVariant', assignedVariantId);
	} else {
		returningVisitor = true;
	}

	const requestTime = new Date().getTime();
	
	// const url = event.url.params;
	// const params = event.params;
	// const keys = Object.keys(event);

	return { pageDetailsRes, experimentId, assignedVariantId, returningVisitor, pageCrumbs, requestTime, route };
};
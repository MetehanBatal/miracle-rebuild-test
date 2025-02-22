
export const prerender = true;

export async function load(event) { 
	const pageCrumbs = {
		funnelName: 'sheets',
		pageName: 'mb-sheets-up-v5-4b',
		pageType: 'upsell',
		productType: 'sheets'
	};

	return {
		pageCrumbs
	}
}
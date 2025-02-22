
export const prerender = true;

export async function load(event) { 
	const pageCrumbs = {
		funnelName: 'sheets',
		pageName: 'mb-sheets-up-v5-2c',
		pageType: 'upsell',
		productType: 'sheets'
	};

	return {
		pageCrumbs
	}
}
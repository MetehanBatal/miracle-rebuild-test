
export const prerender = false;

export async function load(event) { 
	const layoutData = await event.parent();
	const returningVisitor = event.locals.returningVisitor;

	const pageCrumbs = {
		funnelName: 'mve-kit-v1',
		pageName: `mve-a-s6-reasons-infra`,
		pageType: 'advertorial',
		productType: 'kit'
	};

	return {
		layoutData,
		returningVisitor,
		pageCrumbs,
	};
}
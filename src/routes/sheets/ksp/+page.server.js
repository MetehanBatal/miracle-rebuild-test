export const prerender = true;

export async function load(event) {
	const returningVisitor = event.locals.returningVisitor;

	const pageCrumbs = {
		funnelName: `mb-sheets-v1`,
		pageName: `mb-sheets-ksp-infra`,
		pageType: 'lander',
		productType: 'sheets'
	};

	const locals = event.locals;

	return {
		returningVisitor,
		pageCrumbs,
		locals
	};
}
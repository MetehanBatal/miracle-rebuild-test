export const prerender = false;

import { validateAudience } from '../../../../stores/functions';

export async function load(event) {
	const layoutData = await event.parent();
	let forceVariant = event.url.searchParams.get('forceVariant');
	const route = event.route.id;
	const existingIndices = event.locals?.userExperiments && event.locals?.userExperiments?.length > 0 ? event.locals.userExperiments : [];
	const returningVisitor = event.locals.returningVisitor;

	let passOverIndice;

	const pageDetailsReq = await fetch('https://api.mtrix.io/storefront/getPageDetails?url=' + route);
	const pageDetailsRes = await pageDetailsReq.json();

	let experimentData = pageDetailsRes.data.experimentData;
	let eventsData = pageDetailsRes.data.eventsData;
	let indices = [];

	if (event.cookies.get('passOver')) {
		passOverIndice = JSON.parse(event.cookies.get('passOver'));
		indices.push(passOverIndice[0]);
		event.cookies.delete('passOver', { path: '/kit/ksp' });
	}

	if (experimentData) {
		for (const experiment of experimentData) {
			let withinAudience = true;

			if (experiment.audiences?.length > 0) {
				for (const condition of experiment.audiences) {
					if (condition.name === 'country' || condition.name === 'city') {
						withinAudience = validateAudience(layoutData?.[condition.name], condition.values, condition.condition);
					}

					if (condition.name === 'utm_source' || condition.name === 'utm_campaign' || condition.name === 'utm_medium' || condition.name === 'utm_keyword') {
						withinAudience = validateAudience(event.url.searchParams.get(condition.name), condition.values, condition.condition);
					}

					if (!withinAudience) break;
				}
			}

			if (!withinAudience) {
				continue;
			}

			let matchingData = existingIndices?.length > 0 ? existingIndices.find(item => item.variantIndices.experimentId === experiment.experimentId) : undefined;

			let returningExperimentVisitor = false;

			if (matchingData !== undefined) {
				returningExperimentVisitor = true;
			}

			let experimentId = experiment.experimentId;
			let variantId = returningExperimentVisitor ? matchingData.variantIndices.variantId : experiment.selectedVariant.variantId;
			let variants = returningExperimentVisitor ? matchingData.variantIndices.variants : experiment.variants[0].arms;
			let order = returningExperimentVisitor ? matchingData.variantIndices.order : experiment.selectedVariant.order;

			if (forceVariant && experimentId === 350095693703) {
				try {
					const response = await fetch(`https://api.mtrix.io/experiments/view?url=${route}`);

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const experimentDetails = await response.json();
					const saidExperiment = experimentDetails.data.docs.find(e => e.id === 350095693703);

					if (!saidExperiment) {
						throw new Error(`Experiment with id ${experimentId} not found.`);
					}

					let selectedVariant = saidExperiment.variants.find(v => v.id === parseInt(forceVariant));
					// let fallbackVariant = {};

					if (!selectedVariant) {
						selectedVariant = saidExperiment.variants.find(v => v.id === 0);

						// throw new Error(`Variant with id ${forceVariant} not found.`);
					}

					console.log('Selected variant: ', selectedVariant);

					variantId = parseInt(selectedVariant.id);
					order = 0;
					variants = selectedVariant.arms;

				} catch (error) {
					console.error('Error fetching experiment details:', error);
				}
			}

			indices.push({
				experimentId,
				variants,
				variantId,
				order,
				returningExperimentVisitor
			});
		}
	}

	const pageCrumbs = {
		funnelName: 'mb-sheets-v1',
		pageName: `mb-sheets-up-v5-1a`,
		pageType: 'upsell',
		productType: 'sheets',
		firstUpsell: true
	};

	const locals = event.locals;

	return {
		passOverIndice,
		existingIndices,
		returningVisitor,
		experimentData,
		pageCrumbs,
		locals,
		indices
	};
}

export const prerender = false;

import { redirect } from '@sveltejs/kit';
import { validateAudience } from '../../../stores/functions';

export async function load(event) { 
	const layoutData = await event.parent();
	let forceVariant = event.url.searchParams.get('forceVariant');
	const route = event.route.id;
	const existingIndices = event.locals?.userExperiments && event.locals?.userExperiments?.length > 0 ? event.locals.userExperiments : [];
	const returningVisitor = event.locals.returningVisitor;

	const pageDetailsReq = await fetch(`https://api.mtrix.io/storefront/getPageDetails?url=${route}`);
	const pageDetailsRes = await pageDetailsReq.json();

	let experimentData = pageDetailsRes.data.experiments;

	let indices = []

	console.log('EXP: ', experimentData);
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

			let matchingData = existingIndices.length > 0 ? existingIndices.find(item => item.variantIndices.experimentId === experiment.experimentId) : undefined;

			let returningExperimentVisitor = false;

			if (matchingData !== undefined) {
				returningExperimentVisitor = true;
			}

			let experimentId = experiment.experimentId;
			let variantId = returningExperimentVisitor ? matchingData.variantIndices.variantId : experiment.selectedVariantId;
			let variants = returningExperimentVisitor ? matchingData.variantIndices.variants : experiment.variants[0].arms;

			indices.push({
				experimentId,
				variants,
				variantId,
				returningExperimentVisitor,
			});
		}
	}

	const pageCrumbs = {
		funnelName: 'mve-kit-v1',
		pageName: `mve-a-s6-reasons-${indices.find(indice => indice['experimentId'] === 303494641168)?.variantId}`,
		pageType: 'advertorial',
		productType: 'kit'
	};

	const locals = event.locals;
	const eventNames= Object.keys(event);

	return {
		eventNames,
		layoutData,
		returningVisitor,
		experimentData,
		pageCrumbs,
		locals,
		existingIndices,
		indices
	};
}
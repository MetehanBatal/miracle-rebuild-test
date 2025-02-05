
export const prerender = false;

import { redirect } from '@sveltejs/kit';
import { validateAudience } from '../../../stores/functions';

export async function load(event) { 
	const layoutData = await event.parent();
	const route = event.route.id;
	const existingIndices = event.locals?.userExperiments && event.locals?.userExperiments?.length > 0 ? event.locals.userExperiments : [];
	const returningVisitor = event.locals.returningVisitor;

	const pageDetailsReq = await fetch(`http://localhost:3030/prod/mExperiments/getPageDetails?url=${route}&status=in-progress`);
	const pageDetailsRes = await pageDetailsReq.json();

	let experimentData = pageDetailsRes.data;

	let indices = []

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

			let matchingData = existingIndices.length > 0 ? existingIndices.find(item => item.variantIndices.experimentId === experiment.id) : undefined;

			let returningExperimentVisitor = false;

			if (matchingData !== undefined) {
				returningExperimentVisitor = true;
			}

			let experimentId = experiment.id;
			let variantId = returningExperimentVisitor ? matchingData.variantIndices.variantId : experiment.selectedVariant.variantId;
			let variants = returningExperimentVisitor ? matchingData.variantIndices.variants : experiment.variants[0].arms;
			let order = returningExperimentVisitor ? matchingData.variantIndices.order : experiment.selectedVariant.order;

			indices.push({
				experimentId,
				variants,
				variantId,
				order,
				returningExperimentVisitor,
			});
		}
	}

	return {
		layoutData,
		returningVisitor,
		experimentData,
		existingIndices,
		indices
	};
}

export const prerender = false;

import { redirect } from '@sveltejs/kit';
import { validateAudience } from '../../../stores/functions';

export async function load(event) { 
	const layoutData = await event.parent();
	let forceVariant = event.url.searchParams.get('forceVariant');
	const route = event.route.id;
	const existingIndices = event.locals?.userExperiments && event.locals?.userExperiments?.length > 0 ? event.locals.userExperiments : [];
	const returningVisitor = event.locals.returningVisitor;

	const pageDetailsReq = await fetch(`http://localhost:3030/prod/mExperiments/getPageDetails?url=https://miracle-rebuild.vercel.app${route}&status=in-progress`);
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

			if (experimentId === 849643329910) {
				if (variants[0].component === 'DirectToLander') {
					indices = [{ experimentId, variants, variantId, order, returningExperimentVisitor }];
					event.cookies.set('passOver', JSON.stringify(indices), { path: '/kit/ksp', httpOnly: true, secure: true });

					redirect(302, '/kit/ksp')
				} else if (variants[0].component === 'ToQuiz') {
					indices = [{ experimentId, variants, variantId, order, returningExperimentVisitor }];
					event.cookies.set('passOver', JSON.stringify(indices), { path: '/quiz', httpOnly: true, secure: true });

					redirect(302, '/quiz')
				}
			}


			if (forceVariant && experimentId === 303494641168) {
				try {
					const response = await fetch(`http://localhost:3030/prod/mExperiments/view?url=${route}&status=in-progress`);

					if (!response.ok) {
						throw new Error(`HTTP error! status: ${response.status}`);
					}

					const experimentDetails = await response.json();
					const saidExperiment = experimentDetails.data.docs.find(e => e.id === 303494641168);

					if (!saidExperiment) {
						throw new Error(`Experiment with id ${experimentId} not found.`);
					}

					const selectedVariant = saidExperiment.variants.find(v => v.id === parseInt(forceVariant));

					if (!selectedVariant) {
						throw new Error(`Variant with id ${forceVariant} not found.`);
					}

					variantId = parseInt(forceVariant);
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
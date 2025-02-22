import CryptoJS from 'crypto-js';

import { page } from '$app/stores';
import { writable, readable, get } from 'svelte/store';

import platform from 'platform';
import Cookies from 'js-cookie';

import { sessionAnalytics } from '../writables/sessionAnalytics';
import { purchaseLog } from '../writables/purchaseLog';
import { events } from '../writables/events';
import { actions } from '../writables/actions';

let rtcScript;

const configureAnalytics = () => {
	const currentPage = get(page);

	let userStatus = 'new';

    if (Cookies.get('nvsuid') === 'undefined' || !Cookies.get('nvsuid') || Cookies.get('nvsuid').length < 1) {
        let generatedId = generateRandomString();

        sessionAnalytics.update(state => ({ ...state, userId: generatedId }));
        purchaseLog.update(state => ({ ...state, userId: generatedId }));

        Cookies.set('nvsuid', generatedId, { expires: 30 });
    } else {
        const savedUserId = Cookies.get('nvsuid');
        sessionAnalytics.update(state => ({ ...state, userId: savedUserId }));
        purchaseLog.update(state => ({ ...state, userId: savedUserId }));

		userStatus = 'returning';
    }

    if (sessionStorage.getItem('nvsSes')) {
        const savedSession = JSON.parse(sessionStorage.getItem('nvsSes'));
        sessionAnalytics.set(savedSession);
		userStatus = 'in-session'
    } else {
        sessionAnalytics.update(state => ({
            ...state,
            sessionId: generateRandomString(),
            sessionStarted: Date.now(),
            country: currentPage.country,
            city: currentPage.city,
            productName: currentPage.pageCrumbs?.productType,
            funnelName: currentPage.pageCrumbs?.funnelName,
            ipAddress: currentPage.ipAddress,
            browserLocales: {
                deviceType: window.innerWidth < 769 ? 'mobile' : 'desktop',
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                languagePreferences: navigator.languages || navigator.language,
                connection: navigator.connection?.effectiveType,
                browser: platform.description,
                device: platform.product
            },
            referrer: document?.referrer.length > 2 ? document.referrer : 'direct'
        }));

        if (currentPage.url.searchParams.size > 0) {
            sessionAnalytics.update(state => ({
                ...state,
                queryParams: Object.fromEntries(currentPage.url.searchParams)
            }));
        }
    }

	return userStatus;
}

const generateVariantIndices = (experiment, selectedVariant) => {
	const experimentVariants = experiment.variants;

	let expIndices = {
		experimentId: '',
		variants: {},
		variantId: ''
	};

	expIndices.experimentId = experiment.experimentId;
	expIndices.variantId = selectedVariant;

	for (let index = 0; index < experimentVariants.length; index++) {
		const sectionLength = experimentVariants[index].components.length;
		let currentIndex;

		if (index === 0) {
			currentIndex = selectedVariant % sectionLength < 0 ? 0 : selectedVariant % sectionLength;
		} else if (index === 1) {
			currentIndex = Math.ceil((selectedVariant % (experimentVariants[0].components.length * experimentVariants[1].components.length)) / experimentVariants[0].components.length) === 0 && selectedVariant !== 0 ? 0 : Math.floor((selectedVariant % (experimentVariants[0].components.length * experimentVariants[1].components.length)) / experimentVariants[0].components.length);
		} else if (index === 2) {
			currentIndex = Math.floor((selectedVariant % (experimentVariants[0].components.length * experimentVariants[1].components.length * experimentVariants[2].components.length)) / (experimentVariants[0].components.length * experimentVariants[1].components.length)) < 0 ? 0 : Math.floor((selectedVariant % (experimentVariants[0].components.length * experimentVariants[1].components.length * experimentVariants[2].components.length)) / (experimentVariants[0].components.length * experimentVariants[1].components.length));
		} else {
			currentIndex = Math.floor(selectedVariant / experimentVariants.slice(0, -`${experimentVariants.length - index}`).reduce((acc, obj) => acc * obj.components.length, 1));
		}

		expIndices.variants[experimentVariants[index].name] = currentIndex;
	}

	return expIndices;
};

const findVariant = (indices, componentId) => {
	console.log('Indices: ', indices);
	console.log('Comp: ', componentId);
	// Try to find matching variant
	for (const index of indices) {
	  const variant = index.variants.find(({component}) => component === componentId);
	  console.log(index, variant);
	  if (variant) return variant.id;
	}
	
	// If no match found, return first variant's component from first index
	return indices[0]?.variants[0]?.id;
};

const generateJWT = async (cart) => {
	const response = await fetch('/api/generate-jwt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: cart
	});

	const data = await response.json();
	let jwtToken = data.token;

	return jwtToken;
};

const sendCartDetails = async function(rtcEndpoint, jwtToken) {
	const response = await fetch(rtcEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			action: 'update_lineitems',
			actionData: {
				localCart: JSON.stringify({
					jwt: jwtToken
				})
			}
		})
	});

	const data = await response.json();

	return data;
}

const validateAudience = (value, params, condition) => {
	let validationPassed = false;

	if (condition === 'matches_exactly') {
		validationPassed = params[0] === value ? true : false;
	} 
	if (condition === "contains") {
		validationPassed = params.includes(value) ? true : false;
	}
	
	return validationPassed;
}

// const analyticReqCount = writable('0');

const remainingTime = readable('15:00', function start(set) {
	let timerMin = '15';
	let timerSec = '00';

	let timer = setInterval(() => {
		0 >= timerSec ? 0 >= timerMin ? clearInterval(timer) : (timerMin--, timerSec = 59) : timerSec--;
		if (timerSec.toString().length < 2) {
			timerSec = '0' + timerSec; }
		if (timerMin.toString().length < 2) {
			timerMin = '0' + timerMin; }

		set(`${timerMin}:${timerSec}`)
	}, 1000)
});

const createTimer = (initialTime) => {
    return readable(initialTime, function start(set) {
        let timerMin = 15;
        let timerSec = 0;

        const updateTimer = () => {
            if (timerSec <= 0) {
                if (timerMin <= 0) {
                    clearInterval(timer);
                } else {
                    timerMin--;
                    timerSec = 59;
                }
            } else {
                timerSec--;
            }

            const formattedMin = timerMin.toString().padStart(2, '0');
            const formattedSec = timerSec.toString().padStart(2, '0');
            set(`${formattedMin}:${formattedSec}`);
        };

        let timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    });
}

const generateRandomString = () => {
	function generateRandomSegment(length) {
		let result = '';
		const characters = 'abcdefgh0123456789';

		for (let i = 0; i < length; i++) {
			const randomIndex = Math.floor(Math.random() * characters.length);
			result += characters.charAt(randomIndex);
		}
		return result;
  	}

	const segment1 = generateRandomSegment(8);
	const segment2 = generateRandomSegment(4);
	const segment3 = generateRandomSegment(4);
	const segment4 = generateRandomSegment(12);

	return `${segment1}-${segment2}-${segment3}-${segment4}`;
};

const generateRandomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min)
};

function loadScript(src) {
	return new Promise((resolve, reject) => {
		rtcScript = document.createElement('script');
		rtcScript.src = src;
		rtcScript.defer = true;

		rtcScript.onload = () => resolve(rtcScript);
		rtcScript.onerror = () => reject(new Error(`Failed to load script: ${src}`));

		document.body.appendChild(rtcScript);
	});
}

function removeScript() {
	if (rtcScript && rtcScript.parentNode) {
		rtcScript.parentNode.removeChild(rtcScript);
		rtcScript = null;
	}
}

const logAction = (type, action, traits) => {
	let values = [];

	if ( !traits.timestamp || traits.timestamp === null ) {
		traits.timestamp = Date.now(); }

	// traits = type === 'scroll' || type === 'mousemove' ? [...values, traits] : traits;

	// let action = {
	// 	name: type,
	// 	traits: traits,
	// 	...additionalKey
	// };

	// sessionAnalytics.update((value) => {
	// 	value.sessionEnded = new Date().getTime()

	// 	return value;
	// });

	actions.update(currentActions => {
		currentActions[type][action].push(traits);
		// if (type === 'scroll' || type === 'mousemove') {
		// 	let existingEvent = currentActions.find((action) => action.name === type);

		// 	if (existingEvent) {
		// 		if (additionalKey) {
		// 			existingEvent.highestScrollLevel = additionalKey.highestScrollLevel };
		// 		existingEvent.traits.values.push(traits[0])
		// 	} else {
		// 		action.traits = { values: traits };
		// 		currentActions.push(action)
		// 	}
		// } else {
		// 	currentActions.push(action);
		// }

		return currentActions;
	});

	// reportEvents('POST', action, 'mEvents');
};

const clickOutside = (node, ignoreById) => {
	const handleClick = (event) => {
		if (node && !node.contains(event.target) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

const logEvent = (type, traits, overwrites) => {
	let values = [];

	let pageData = '';
	let sessionId = '';
	let sessionStart = '';
	page.subscribe((value) => pageData = value);
	sessionAnalytics.subscribe((value) => {sessionId = value.sessionId; sessionStart = value.sessionStarted});

	let event = {
		sessionId: sessionId,
		variantIndices: pageData?.data?.indices,

		eventName: type,
		traits: {},

		pageSlug: pageData?.route?.id,
		pageName: pageData?.data?.pageCrumbs?.pageName,
		pageType: pageData?.data?.pageCrumbs?.pageType,
		productName: pageData?.data?.pageCrumbs?.productType,
		productType: pageData?.data?.pageCrumbs?.productType,

		productId: 0,
		amount: 0,

		timestamp: Date.now()
	};

	const directKeys = new Set([
        'sessionId',
        'variantIndices',
        'eventName',
        'traits',
        'pageSlug',
        'pageName',
        'pageType',
        'productName',
        'productType',
        'productId',
        'amount',
        'timestamp',
    ]);

	// this looks like unnecessarry anymore
	// we're only sending one single event at a time
	// no need to keep the $events(?)
	events.update(currentEvents => {
		currentEvents.push(event);

		return currentEvents;
	});

	event.traits = traits;

	if (overwrites) {
		Object.entries(overwrites).forEach(([overwrite, value]) => {
            if (directKeys.has(overwrite)) {
                event[overwrite] = value;
            } else {
                event.traits[overwrite] = value;
            }
        });
	}

	console.log('Report event');

	reportEvents('POST', event, 'events');
}

const reportEvents = async (method, content, category) => {
	var apiHeaders = new Headers();
		apiHeaders.append("Content-Type", "application/json");

	let urlPrefix = method === 'UPSERT' ? '/upsert' : '/create';

	console.log(method, content, category, urlPrefix);

	const bodyText = JSON.stringify({ data: encryptData(content) });

	var requestOptions = {
		method: method === 'UPSERT' ? 'POST' : method,
		headers: apiHeaders,
		body: bodyText,
		redirect: 'follow'
	};

	try {
		const response = await fetch(`http://localhost:3030/prod/${category}${urlPrefix}`, requestOptions);
		const result = await response.json();

		return result;
	} catch (error) {
		console.error('error', error);
		throw error;
	}
};

function checkFrequentClickEvents(clickEvents) {
	let consecutiveClicks = [];

	for (let event of clickEvents) {
		const x = event.value[0];
		const y = event.value[1];

		if (
			consecutiveClicks.length === 0 ||
			(Math.abs(consecutiveClicks[0].value[0] - x) <= coordinateRange &&
			Math.abs(consecutiveClicks[0].value[1] - y) <= coordinateRange)
		) {
			consecutiveClicks.push(event);
		} else {
			consecutiveClicks = [event];
		}

		if (consecutiveClicks.length > rageClickThreshold) {
			return consecutiveClicks[0];
		}
	}

	return false;
}

const mergeArrays = (oldArray, newArray) => {
	let shaped = oldArray.map((exp) => {
		return {
			experimentId: exp?.variantIndices?.experimentId,
			order: exp?.variantIndices?.order,
			variantId: exp?.variantIndices?.variantId,
			variants: exp?.variantIndices?.variants
		}
	});
	const oldMap = new Map(shaped.map(obj => [obj.experimentId, obj]));
	newArray.forEach(obj => oldMap.set(obj.experimentId, obj));
	
	return Array.from(oldMap.values());
};

function encryptData(data) {
	const SECRET_KEY = "al@^0v@TVtdd^QIYkZSDdfiPIdJk*D";

	const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();

	return ciphertext;
}

export {
	createTimer,
	generateVariantIndices,
	generateRandomString,
	generateRandomNumber,
	logEvent,
	logAction,
	reportEvents,
	validateAudience,
	clickOutside,
	sendCartDetails,
	remainingTime,
	findVariant,
	loadScript,
	removeScript,
	mergeArrays,
	configureAnalytics,
	generateJWT
};
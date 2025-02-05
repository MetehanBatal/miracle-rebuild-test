import { redirect } from '@sveltejs/kit';

export async function handle({ event, resolve }) {
	const nvsUid = event.cookies.get('nvsuid') || '';
	event.locals.returningVisitor = false;
	event.locals.fromCache = '';
	event.locals.uid = nvsUid;
	// event.locals.userExperiments = [];

	if (nvsUid && nvsUid.length > 0) {
		// if (!cache.has(nvsUid)) {

			// Fetch data from the API only if it's not already cached
			const userDataReq = await fetch(`http://localhost:3030/prod/mSessions/getUserDetails?userId=${nvsUid}`);
			const userDataRes = await userDataReq.json();
			
			// cache.set(nvsUid, userDataRes.data);

		// 	event.locals.fromCache = false;
		// } else {
		// 	event.locals.fromCache = true;
		// }
		// event.locals.userExperiments = cache.get(nvsUid);
		event.locals.userExperiments = userDataRes.data;		
		event.locals.returningVisitor = nvsUid;
	};

	if (event.url.pathname.includes('/undefined')) {
		console.log('!!!Undefined page hit!!!: ', event.url.pathname);
		throw redirect(303, '/up/1a')
	}

	const response = await resolve(event);

	return response;
}
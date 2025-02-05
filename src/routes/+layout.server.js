export async function load(event) {
	if (!event.route.id?.includes('/a') && !event.route.id?.includes('/sheets') && !event.route.id?.includes('/checkout')) {
		return; }
	const city = decodeURIComponent(event.request.headers.get('x-vercel-ip-city') ?? 'unknown');
	const country = decodeURIComponent(event.request.headers.get('x-vercel-ip-country') ?? 'unknown');
	const ipAddress = event.getClientAddress();

	let editMode = false;
	let journeyMode = false;

	if (event.url.searchParams.get('editMode') && event.url.searchParams.get('editMode') === 'true') {
		editMode = true;
	}

	if (event.url.searchParams.get('journeyMode') && event.url.searchParams.get('journeyMode') === 'true') {
		journeyMode = true;
	}

	return {
		editMode,
		journeyMode,
		country,
		city,
		ipAddress
	};
};
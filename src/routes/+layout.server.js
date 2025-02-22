export async function load(event) {
	if (!event.route.id?.includes('/a') && !event.route.id?.includes('/sheets') && !event.route.id?.includes('/checkout')) {
		return; }
	const city = decodeURIComponent(event.request.headers.get('x-vercel-ip-city') ?? 'unknown');
	const country = decodeURIComponent(event.request.headers.get('x-vercel-ip-country') ?? 'unknown');
	
	return {
		country,
		city
	};
};
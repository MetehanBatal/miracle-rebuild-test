// +page.server.js

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, fetch }) {
    const pageId = url.searchParams.get('pageId');

    console.log('Page ID:', pageId); // Logs on the server

    if (!pageId) {
        throw new Error('The "pageId" query parameter is required.');
    }

    const apiUrl = `https://api.mtrix.io/prod/contentModeling/pageContent?pageId=${encodeURIComponent(pageId)}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch content: ${response.statusText}`);
        }

        const data = await response.json(); // Parse JSON
        const pageContent = data.message; // Extract 'message' key
        const components = data.components;
        const cssData = data.cssData;

        return { pageContent, components, cssData, pageId };
    } catch (error) {
        console.error('Error in load function:', error);
        throw new Error('An error occurred while fetching the page content.');
    }
}

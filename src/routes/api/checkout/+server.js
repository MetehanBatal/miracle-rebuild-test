// src/routes/api/checkout/+server.js
import { json } from '@sveltejs/kit';
import gender from 'gender-detection';

export async function POST({ request }) {
    const { firstName } = await request.json();

    // Infer gender from the first name
    const inferredGender = gender.detect(firstName);

    // Return the inferred gender as a JSON response
    return json({ gender: inferredGender });
}

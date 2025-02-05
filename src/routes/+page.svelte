<script>
	import { browser } from '$app/environment';

	// Refer to +error.svelte
	// decide whether redirect or a static page here
	//
	if (browser) {
		window.location.replace('/sheets/ksp?utm_source=home')
	}
</script>

<h2>Main Page</h2>
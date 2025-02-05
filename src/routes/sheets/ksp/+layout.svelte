<script>
	import '../../../css/mixed.min.css';

	import Navbar from '$lib/shared/Navbar.svelte';
	import Footer from '$lib/shared/Footer.svelte';
</script>

<Navbar />

<main>
	<slot />
</main>
 
<Footer />
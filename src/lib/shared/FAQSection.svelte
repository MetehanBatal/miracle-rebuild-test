<script>
	export let faqs;

	import { onMount } from 'svelte';
	import lozad from 'lozad';

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>
 
<section class="faq-section">
	
	<div class="faq-section-wrapper">
		<h2>Frequently asked questions</h2>

		{#each faqs as faq, _index}
		<details class="faq-question">
			<summary>
				<div>{faq['question']}</div>
				<img class="arrow-icon lozad" data-src="/assets/icons/faq-down-arrow.svg" alt="Dropdown Icon">
			</summary>
			<div class="faq-answer" id={`faq-${_index}`}>
				<p>{@html faq['answer']}</p>
			</div>
		</details>
		{/each}
	</div>
</section>
<script>
	export let bannerContent;
</script>

<div class="upgrade-ban">
	{#if bannerContent.h4}
	<h4>{@html bannerContent.h4}</h4>
	{/if}

	<h3>{@html bannerContent.h3}</h3>

	<p>
		{@html bannerContent.p}
	</p>
</div>
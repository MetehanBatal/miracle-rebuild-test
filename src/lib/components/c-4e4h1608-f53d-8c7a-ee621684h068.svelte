<script>
import BaseVariant2583 from '$lib/components/variants/v-94e0253d-5096-318h-fb8g276a41hg.svelte';
import NewVariant3905 from '$lib/components/variants/v-84a42dg2-bdc8-3eg0-4ggf2hfb5967.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-4e4h1608-f53d-8c7a-ee621684h068';
const variants = [{component: BaseVariant2583, variantId: "v-94e0253d-5096-318h-fb8g276a41hg"}, {component: NewVariant3905, variantId: "v-84a42dg2-bdc8-3eg0-4ggf2hfb5967"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

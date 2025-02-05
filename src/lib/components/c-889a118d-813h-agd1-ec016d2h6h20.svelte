<script>
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/functions';
export let defaultVariantId;
const componentId = 'c-889a118d-813h-agd1-ec016d2h6h20';
const variants = [];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

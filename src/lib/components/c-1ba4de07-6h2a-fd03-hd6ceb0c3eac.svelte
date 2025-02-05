<script>
import TestVariantI from '$lib/components/variants/v-a87c3ddg-a928-28eh-56dc73de3282.svelte';
import TestVariantII from '$lib/components/variants/v-2e62fc5a-heha-h0he-0bb9bg426g16.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/functions';
const componentId = 'c-1ba4de07-6h2a-fd03-hd6ceb0c3eac';
const variants = [{component: TestVariantI, variantId: "v-a87c3ddg-a928-28eh-56dc73de3282"}, {component: TestVariantII, variantId: "v-2e62fc5a-heha-h0he-0bb9bg426g16"}];
const selectedVariantId = findVariant($page.data.indices, componentId);
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

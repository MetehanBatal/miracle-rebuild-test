<script>
import BaseVariant6816 from '$lib/components/variants/v-hb4ah6fc-40cd-e49g-38f5a7049871.svelte';
import NewVariant7394 from '$lib/components/variants/v-487fg65h-276a-8a67-ge7fdf3b6c56.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-bc0fd0ae-474c-69e7-ghda601bdacd';
const variants = [{component: BaseVariant6816, variantId: "v-hb4ah6fc-40cd-e49g-38f5a7049871"}, {component: NewVariant7394, variantId: "v-487fg65h-276a-8a67-ge7fdf3b6c56"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

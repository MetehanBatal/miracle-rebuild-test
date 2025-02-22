<script>
import BaseVariant8924 from '$lib/components/variants/v-dh10ch8e-5eh5-447b-b3g1dcgfeg88.svelte';
import NewVariant9991 from '$lib/components/variants/v-397gdc24-h77e-8e10-473cc1093d14.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-7ea958f1-945a-04d3-b6883e196b60';
const variants = [{component: BaseVariant8924, variantId: "v-dh10ch8e-5eh5-447b-b3g1dcgfeg88"}, {component: NewVariant9991, variantId: "v-397gdc24-h77e-8e10-473cc1093d14"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

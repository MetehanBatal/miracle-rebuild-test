<script>
import BaseVariant8541 from '$lib/components/variants/v-cc50h971-d10e-9398-03a3gb9egb3b.svelte';
import NewVariant1827 from '$lib/components/variants/v-dhh65g52-g618-f4c9-dc09h7f97ba7.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-0ba59a2e-4e71-22d3-cbh5881gg793';
const variants = [{component: BaseVariant8541, variantId: "v-cc50h971-d10e-9398-03a3gb9egb3b"}, {component: NewVariant1827, variantId: "v-dhh65g52-g618-f4c9-dc09h7f97ba7"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

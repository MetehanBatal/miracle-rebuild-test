<script>
import BaseVariant6115 from '$lib/components/variants/v-a58g395b-403g-eceb-6ca6c8h9361e.svelte';
import NewVariant2755 from '$lib/components/variants/v-be01c580-ebg5-bb6c-efc60057651d.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/functions';
export let defaultVariantId;
const componentId = 'c-a6h655c7-5egc-2ehh-2a29c7h08g5g';
const variants = [{component: BaseVariant6115, variantId: "v-a58g395b-403g-eceb-6ca6c8h9361e"}, {component: NewVariant2755, variantId: "v-be01c580-ebg5-bb6c-efc60057651d"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

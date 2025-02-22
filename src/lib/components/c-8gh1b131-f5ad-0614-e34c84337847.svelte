<script>
import BaseVariant1281 from '$lib/components/variants/v-6a9ffhf9-0fbe-85bc-ebh3fghe85b5.svelte';
import NewVariant5454 from '$lib/components/variants/v-09ec2d6e-6458-fhdc-hfe503bc176f.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-8gh1b131-f5ad-0614-e34c84337847';
const variants = [{component: BaseVariant1281, variantId: "v-6a9ffhf9-0fbe-85bc-ebh3fghe85b5"}, {component: NewVariant5454, variantId: "v-09ec2d6e-6458-fhdc-hfe503bc176f"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

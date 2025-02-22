<script>
import BaseVariant7056 from '$lib/components/variants/v-gdbbc146-c2a3-cf42-9a811a729241.svelte';
import NewVariant2199 from '$lib/components/variants/v-f24g7fhd-h544-d39f-a54gb1h8754c.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-3hb80624-gc18-2489-fb9fab77bd9c';
const variants = [{component: BaseVariant7056, variantId: "v-gdbbc146-c2a3-cf42-9a811a729241"}, {component: NewVariant2199, variantId: "v-f24g7fhd-h544-d39f-a54gb1h8754c"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

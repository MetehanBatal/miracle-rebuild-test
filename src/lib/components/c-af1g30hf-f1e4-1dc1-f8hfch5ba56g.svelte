<script>
import BaseVariant4072 from '$lib/components/variants/v-5c6b468e-ahf6-bb73-4h8g42cfhbg8.svelte';
import NewVariant9199 from '$lib/components/variants/v-4e3bgc87-af51-5ea9-5h15e73fb0h8.svelte';
import NewVariant8793 from '$lib/components/variants/v-c0c57g67-9479-97bg-0ab7b6f13751.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/toolkit/functions';
export let defaultVariantId;
const componentId = 'c-af1g30hf-f1e4-1dc1-f8hfch5ba56g';
const variants = [{component: BaseVariant4072, variantId: "v-5c6b468e-ahf6-bb73-4h8g42cfhbg8"}, {component: NewVariant9199, variantId: "v-4e3bgc87-af51-5ea9-5h15e73fb0h8"}, {component: NewVariant8793, variantId: "v-c0c57g67-9479-97bg-0ab7b6f13751"}];
const selectedVariantId = findVariant($page.data.indices, componentId) || defaultVariantId;
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

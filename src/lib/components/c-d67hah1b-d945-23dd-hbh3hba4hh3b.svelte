<script>
import BaseVariant from '$lib/components/variants/v-5405e62b-191c-5b14-4617e53gd90c.svelte';
import NewVariant from '$lib/components/variants/v-0hg22b7b-737c-0e9b-e1032192g65f.svelte';
import { page } from '$app/stores';
import { findVariant } from '$lib/../stores/functions';
const componentId = 'c-d67hah1b-d945-23dd-hbh3hba4hh3b';
const variants = [{component: BaseVariant, variantId: "v-5405e62b-191c-5b14-4617e53gd90c"}, {component: NewVariant, variantId: "v-0hg22b7b-737c-0e9b-e1032192g65f"}];
const selectedVariantId = findVariant($page.data.indices, componentId);
</script>

<svelte:component this={variants.find(({ variantId }) => variantId === selectedVariantId).component} />

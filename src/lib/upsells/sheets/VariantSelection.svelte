<script>
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';
    let Choices;
    let choicesInstance;
    let selectElement;

    export let selectedVariant;
    export let variantOptions;

    onMount(async () => {
        if (browser) {
            const ChoicesModule = await import('choices.js');
            Choices = ChoicesModule.default;
            
            await import('choices.js/public/assets/styles/choices.css');

            choicesInstance = new Choices(selectElement, {
                searchEnabled: false,
                itemSelectText: '',
                shouldSort: false
            });

            selectElement.addEventListener('change', (event) => {
                
            });

            return () => {
                if (choicesInstance) {
                    selectElement.removeEventListener('change')
                    choicesInstance.destroy();
                }
            };
        }
    });
</script>

<div class="variant-selection">
    <p class="form-heading">3. Choose Quantity</p>

    <select bind:this={selectElement} on:change={(event) => selectedVariant = event.target.value} class="variants">
        {#each variantOptions as variant}
        <option value={variant.value} selected={variant.value === selectedVariant}>
            {variant.label}
        </option>
        {/each}
    </select>
</div>
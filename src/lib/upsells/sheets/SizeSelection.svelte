<script>
	export let selectedSize;
    export let sizeOptions;

    function alterSizeSelection(size) {
        selectedSize = size;
    }

    $: selectedSize, console.log('but its changed: ', selectedSize);
</script>

<div class="size-selection">
    <p class="form-heading">1. Select Size</p>

    <div class="selections selections-5fr">
        {#each sizeOptions as size}
        <label class="selection" class:selected={size === selectedSize}>
            <input type="radio" name="size" value={size} checked={size === selectedSize} on:change={alterSizeSelection(size)}>
            <p>{size.replaceAll('_', ' ')}</p>
        </label>
        {/each}
    </div>

</div>
<script>
	export let selectedFabric;
    export let fabricOptions;
</script>

<div class="fabric-selection">
    <p class="form-heading">1. Choose a Fabric</p>
    
    <div class="selections selection-fabric">
        {#each fabricOptions as fabric}
        <label class="selection selected" class:selected={fabric.value === selectedFabric}>
            <input type="radio" name="fabric" value={fabric.value} checked={fabric.value === selectedFabric} />

            <div>
                <p class="sm"><strong>{fabric.label}</strong></p>
            </div>

            {#if fabric.bestSeller}
            <div class="best-seller-badge">BEST SELLER</div>
            {/if}
        </label>
        {/each}
    </div>
</div>
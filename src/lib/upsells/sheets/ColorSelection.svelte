<script>
	export let selectedColor;
    export let colorOptions;

    function alterColorSelection(color) {
        selectedColor = color;
    }
</script>

<div class="color-selection"> 
	<p class="form-heading">2. Choose a color: <span id="color-name">{selectedColor.replaceAll('_', ' ')}</span></p>

	<div class="colors">
        {#each colorOptions as color}
		<label class={`color ${color}`} class:selected={color === selectedColor}>
			<input type="radio" name="color" value={color} checked={color === selectedColor} on:change={alterColorSelection(color)}>
		</label>
        {/each}
	</div>
</div>
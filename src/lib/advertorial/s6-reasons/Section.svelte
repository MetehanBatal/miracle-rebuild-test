<script>
	export let data;
	export let index;
</script>

<div class="section" id={`section-${index}`}>
	<img src={data.img} alt="Miracle Made - Sheets">

	<div class="section-description">
		<div class="max-w-640">
			<h2>{@html data.heading}</h2>

			<p>{@html data.description}</p>
		</div>
	</div>
</div>

<style>
	img {
		width: 100%;
	}

	p {
		font-size: 16px;
		line-height: 1.5;
		color: #d3d3d3;
	}
	
	.section {
		display: grid;
		grid-template-columns: 1fr;
		align-items: center;
		
		background-color: var(--accent-color);
		color: #d3d3d3;
	}

	.section:nth-child(even) {
		background-color: #e4f3fb;
	}

	.section:nth-child(even) h2 {
		color: var(--accent-color);
	}

	.section:nth-child(even) p {
		color: #333;
	}

	:global(.section h2 span) {
		font-size: 100px;
		line-height: 80px;
	}

	img {
		width: 100%;
	}

	h2 {
		font-family: "Brandon", sans-serif;
		font-weight: 700;
		font-size: 32px;
		line-height: 1.2;
		letter-spacing: -0.054px;
		margin-bottom: 28px;
		text-align: left;
	}

	.section-description {
		padding: 32px;
	}

	.section-description p {
		font-weight: 400 !important;
	}

	.max-w-500 {
		max-width: 640px;
	}

	@media screen and (min-width: 768px) {
		h2 {
			font-size: 36px;
		}

		p {
			font-size: 18px;
		}

		.section {
			grid-template-columns: 1fr 1fr;
		}

		.section:nth-child(even) img {
			order: 1;
		}

		.section-description {
			display: flex;
			justify-content: center;

			padding: 32px 60px;
		}
	}
</style>
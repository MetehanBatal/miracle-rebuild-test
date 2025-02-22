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
	@font-face {
		font-family: "PTSans";
		src: url("/assets/fonts/PTSans/Regular.woff2");
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	p {
		font-size: 1.6rem;
		line-height: 2.4rem;
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

	:global(.section-description a) {
		color: #0000ee;
	}

	img {
		width: 100%;
	}

	h2 {
		font-family: "Brandon", sans-serif;
		font-weight: 700;
		font-size: 2.6rem;
		line-height: 3.4rem;
		margin-bottom: 4rem;
		margin-left: 1.4rem;
		text-align: left;
	}

	.section-description {
		padding: 4rem 2rem 5.4rem;
	}

	.section-description p {
		font-family: 'PTSans';
	}

	.max-w-500 {
		max-width: 640px;
	}

	@media screen and (min-width: 768px) {
		h2 {
			font-size: 3.1rem;
			line-height: 3.6rem;
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

			padding: 3.2rem 7.8rem;
		}
	}
</style>
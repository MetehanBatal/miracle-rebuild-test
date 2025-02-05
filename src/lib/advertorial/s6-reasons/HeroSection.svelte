<script>
	export let data;
</script>

<div>
	<img src={data.desktopImg} alt={data.headline} class="hero-img">
	<!-- <img src={data.mobileImg} alt={data.headline} class="hero-img mobile lozad"> -->

	<div class="hero-description-box">
		<h1>{data.headline}</h1>

		<p>{data.description}</p>

		<a href="#section-0">
			<img src="/assets/images/icons/advertorial-down-arrow.svg" alt="To Next Section">
		</a>
	</div>
</div>


<style>
	.desktop {
		display: none;
	}

	.hero-img {
		max-height: 45rem;
		min-height: 45rem;

		background-color: #fff;
		object-fit: cover;
	}

	img {
		width: 100%;
		vertical-align: bottom;
	}

	p {
		font-size: 16px;
		line-height: 1.5;
		color: #000000;
	}
	
	h1 {
		max-width: 1100px;

		font-family: 'Brandon' ,sans-serif;
		font-weight: 700;
		font-size: 30px;
		line-height: 1.2;
		letter-spacing: -0.054px;
		color: #fff;

		margin-bottom: 18px;
		margin-left: auto;
		margin-right: auto;
	}

	p {
		font-size: 18px;
		color: #ffffff;
	
		margin-bottom: 24px;
	}

	.hero-description-box {
		padding: 36px 32px;
		
		background-color: var(--accent-color);
		color: var(--accent-text-color);
		text-align: center;
	}

	a img {
		width: auto;
	}

	@media screen and (min-width: 768px) {
		.hero-description-box {
			padding: 55px 32px;
		}

		.desktop {
			display: block;
		}

		.mobile {
			display: none;
		}

		h1 {
			font-size: 50px;
		}

		p {
			font-size: 22px;
			margin-bottom: 36px;
		}
	}
</style>
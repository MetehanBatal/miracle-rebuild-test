<script>
	export let data;
</script>

<div>
	<picture class="hero-img-block">
		<source media="(min-width: 641px)" srcset={data.desktopImg}>
		<img src={data.mobileImg} alt="hero image" class="hero-img">
	</picture>

	<!-- <img src={data.mobileImg} alt={data.headline} class="hero-img mobile lozad"> -->

	<div class="hero-description-box">
		<h1>{data.headline}</h1>

		<p>{data.description}</p>

		<a href="#section-0">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="14px" viewBox="0 0 24 14" version="1.1">
				<title>arrow white</title>
				<g id="landing-page-update" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					<g id="01_desktop" transform="translate(-708.000000, -730.000000)" fill="#FFFDE7" fill-rule="nonzero">
						<g id="arrow-white" transform="translate(720.000000, 737.000000) rotate(-90.000000) translate(-720.000000, -737.000000) translate(713.000000, 725.000000)">
							<path d="M0.000288114752,12.0254035 C0.00459772663,12.5627681 0.216916095,13.0776138 0.59242764,13.4606119 L10.4776008,23.3901907 C10.8634535,23.7795056 11.3871986,23.9988429 11.9339722,24 C12.4807164,24.0011497 13.0056015,23.7841231 13.3929178,23.3968252 C13.7804917,23.0092392 13.9988481,22.4831414 14,21.9339116 C14.0011428,21.3846818 13.7850886,20.8574684 13.3995227,20.4684121 L4.96917632,12.0001954 L13.3995227,3.53197867 L13.3995227,3.53169009 C13.9189723,3.00759451 14.1206622,2.24453888 13.928453,1.53055488 C13.7362437,0.81627535 13.1794158,0.259288036 12.4678157,0.0694143924 C11.7558699,-0.120481415 10.9973962,0.0855758163 10.4776155,0.609955842 L0.59244235,10.5395347 C0.204294847,10.9352033 -0.00917782116,11.4710977 0.000302824831,12.0263857 L0.000288114752,12.0254035 Z" id="Path"/>
						</g>
					</g>
				</g>
			</svg>
		</a>
	</div>
</div>


<style>
	@font-face {
		font-family: "Merriweather";
		src: url("/assets/fonts/Merriweather/Regular.woff2");
		font-weight: 400;
		font-style: normal;
		font-display: swap;
	}

	.hero-img {
		min-height: 24rem;
		object-fit: cover;
		object-position: 64%;
		
		background-color: #fff;
	}

	img {
		width: 100%;
		vertical-align: bottom;
	}

	p {
		font-family: 'Merriweather';
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

	a svg {
		width: 3.6rem;
	}

	@media screen and (min-width: 768px) {
		.hero-description-box {
			padding: 55px 32px;
		}

		h1 {
			font-size: 50px;
		}

		p {
			font-size: 1.9rem;
			line-height: 2.3rem;
			
			margin-bottom: 4.2rem;
		}
	}
</style>
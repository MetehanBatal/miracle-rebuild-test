<script>
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { preloadData } from '$app/navigation';

	import { remainingTime } from '../../../stores/toolkit/functions';

	export let data;

	let ctaSection;

	async function onSectionVisible(entries, observer) {
		if (entries[0].isIntersecting) {
			await preloadData('/sheets/ksp');

			observer.unobserve( entries[0].target );
		}
	};

	onMount(() => {
		if (browser) {
			const sectionObserver = new IntersectionObserver(onSectionVisible, { root: null, rootMargin: '0px 0px' });
			sectionObserver.observe(ctaSection);
		}
	});
</script>

<div class="cta-section" bind:this={ctaSection}>
	<div class="cta-box">
		<img width="274" src={data.img} class="cta-img" alt="CTA Image">

		<div class="cta-description">
			<h3>{@html data.heading}</h3>

			<p class="cta-text">{@html data.text}</p>

			<a href='/sheets/ksp' class="cta-button">
				<img width="22" height="22" src="/assets/images/icons/tick_n.png" alt="Try Miracle Made Now">
				{data.ctaText}
			</a>

			<div class="countdown-box">
				<span>Deal Ending in:</span>
				<p class="countdown-timer">{ $remainingTime }</p>
			</div>

			<div class="callout-box">
				<div>
					<p>Sell-Out Risk: </p><strong class="color-red">High</strong>
				</div>
				
				<span class="mobile-hidden"></span>
				
				<div class="shipping-icon">
					<svg width="24px" height="24px" viewBox="0 0 64 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<title>Page 1 Copy 4</title>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g id="01_landing_funnel---oriya" transform="translate(-687.000000, -3627.000000)" fill="#001a6f">
								<path d="M740.945828,3632.45742 L733.408165,3632.45742 L733.408165,3627 L697.53919,3627 L697.53919,3633.83932 L687,3633.83932 L687,3636.12002 L697.53919,3636.12002 L697.53919,3640.74885 L688.887033,3640.74885 L688.887033,3643.02954 L697.53919,3643.02954 L697.53919,3647.65837 L690.560518,3647.65837 L690.560518,3649.93907 L697.53919,3649.93907 L697.53919,3658.64645 L704.239831,3658.64645 C704.588765,3661.13498 706.75327,3663 709.33482,3663 C711.91637,3663 714.080874,3661.13498 714.429808,3658.64645 L735.437005,3658.64645 C735.785938,3661.13498 737.950443,3663 740.531993,3663 C743.113543,3663 745.278048,3661.13498 745.626981,3658.64645 L751,3658.64645 L751,3643.65347 C750.855521,3636.87889 746.946369,3632.45797 740.946526,3632.45797 L740.945828,3632.45742 Z M709.261264,3660.78647 C707.726515,3660.78647 706.469796,3659.5422 706.469796,3658.02266 C706.469796,3656.50311 707.726515,3655.25885 709.261264,3655.25885 C710.796014,3655.25885 712.052733,3656.50311 712.052733,3658.02266 C712.052733,3659.5422 710.796014,3660.78647 709.261264,3660.78647 Z M731.0343,3656.43291 L714.146334,3656.43291 C713.448467,3654.43026 711.564784,3652.90795 709.261264,3652.90795 C707.028648,3652.90795 705.074062,3654.36006 704.376195,3656.43291 L699.769155,3656.43291 L699.769155,3629.34827 L731.0343,3629.34827 L731.0343,3656.43291 Z M740.386837,3660.78647 C738.852087,3660.78647 737.595368,3659.5422 737.595368,3658.02266 C737.595368,3656.50311 738.852087,3655.25885 740.386837,3655.25885 C741.921586,3655.25885 743.178305,3656.50311 743.178305,3658.02266 C743.178305,3659.5422 741.921586,3660.78647 740.386837,3660.78647 Z M748.4807,3656.43291 L745.269394,3656.43291 C744.571527,3654.43026 742.687844,3652.90795 740.384324,3652.90795 C738.080804,3652.90795 736.197121,3654.36006 735.499254,3656.43291 L733.33475,3656.43291 L733.33475,3634.73839 L740.872413,3634.73839 C745.547564,3634.73839 748.410075,3638.19315 748.410075,3643.72077 L748.412797,3656.43291 L748.4807,3656.43291 Z" id="Page-1-Copy-4"></path>
							</g>
						</g>
					</svg>

					<p>FREE SHIPPING</p>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.mobile-hidden {
		display: none;
	}
	p {
		font-size: 14px;
		line-height: 1.5;
		color: #00237e;
	}
	
	.cta-section {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		background-color: var(--main-color);
		padding: 4.8rem 2rem 6rem;

		cursor: default;

		text-decoration: none;
		color: initial;
	}

	.prefetch-link {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 100%;
		height: 100%;

		z-index: 9;
	}

	.cta-box {
		display: grid;
		align-items: center;
		justify-items: center;
		grid-template-columns: 1fr;

		max-width: 1000px;

		padding: 2.8rem 1.4rem;

		border-radius: 15px;
		box-shadow: 1px 0 20px -3px rgba( 0, 0, 0, .48 );
	}

	.cta-description {
		text-align: center;
		background-color: #fff;
	}

	h3 {
		font-family: 'Montserrat', sans-serif;
		font-weight: 600;
		font-size: 1.9rem;
		line-height: 2.8rem;
		text-transform: uppercase;
		color: #00237e;
	
		margin: 0;
		margin-bottom: 18px;
	}

	:global(h3 strong) {
		font-weight: 900;
	}

	.cta-text {
		font-family: 'Montserrat', sans-serif;
		font-size: 1.5rem;

		margin-bottom: 2rem;
	}

	.cta-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.7rem;

		font-family: 'Montserrat', sans-serif;
		font-weight: 700;
		font-size: 1.7rem;
		line-height: 2.3rem;

		padding: 1.5rem 1.2rem;

		background: linear-gradient(180deg, #85bb01, #19973d);
		color: #fff;

		border-style: solid;
		border-width: 2px;
		border-color: #19973d;
		border-radius: 1rem;
		background-color: #206b2e;

		text-decoration: none;

		z-index: 2;
	}

	.countdown-box {
		display: flex;
		flex-direction: column;
		align-items: center;

		margin-top: 2rem;
	}

	.countdown-box span {
		font-size: 1.8rem;
		line-height: 2rem;
		letter-spacing: .1rem;
		color: #00237e;
	
		margin-bottom: .6rem;
	}

	.countdown-timer {
		font-size: 4rem;
		font-weight: 500;
		line-height: 1;
	}

	.callout-box {
		display: flex;
		grid-gap: 1rem;
		justify-content: space-around;
		align-items: center;

		padding: .7rem 1rem;

		margin-top: .8rem;
		
		border-radius: 1rem;
		background-color: var(--callout-bg-color);
	}

	.callout-box div {
		display: flex;
		align-items: center;
		grid-gap: 3px;
	}

	.callout-box p {
		font-family: 'Montserrat', sans-serif;
		font-size: 14px;
	}

	.callout-box img {
		width: auto;
		height: 17px;
	}

	a.prefetch-link {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		display: block;

		cursor: default;
	}

	.color-red {
		font-family: 'Montserrat', sans-serif;
		font-size: 1.6rem;
		color: #ec2222;
		font-weight: 800;
	}

	.cta-img {
		width: 100%;
	}

	@media screen and (min-width: 768px) {
		.mobile-hidden {
			display: block;
		}

		h3 {
			font-size: 2.6rem;
			line-height: 3.4rem;
		}

		p {
			font-size: 1.6rem;
		}

		.callout-box p,
		.color-red {
			font-size: 1.7rem;
		}

		.cta-box {
			grid-template-columns: 2fr 3fr;
			padding: 2.6rem 2.4rem;
		}

		.cta-section {
			padding: 6rem 3.2rem;
		}

		.cta-description {
			display: flex;
			flex-direction: column;
			justify-content: center;
		
			padding: 0 1rem;
		}

		.cta-text {
			font-size: 1.6rem;
			line-height: 2.2rem;
		}

		.callout-box {
			grid-gap: 20px;
			justify-content: center;
		}

		.countdown-box span {
			font-size: 1.9rem;
			line-height: 2.3rem;
		}

		.cta-button {
			font-size: 2.2rem;
			line-height: 1.5rem;
			padding: 1.8rem 1.2rem;
		}
	}
</style>
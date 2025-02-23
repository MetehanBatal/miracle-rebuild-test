<script>
	import { onMount } from 'svelte';
	import lozad from 'lozad';

	onMount(() => {
		const observer = lozad();
		observer.observe();
	});
</script>

<section class="prop-section">
	<div class="sticky-section-container">
		<div>
			<h2>The best sheets <br /> you will ever own</h2>

			<ul>
				<li class="prop-item">
					<div class="prop-img-holder">
						<img width="51" height="51" data-src="/assets/icons/bacteria.svg" alt="" class="lozad" loading="lazy">
					</div>

					<div class="prop-item-content">
						<h3>Antibacterial</h3>

						<p>Helps fight odors and prevents up to 99.7% of bacteria growth.</p>
					</div>
				</li>

				<li class="prop-item">
					<div class="prop-img-holder">
						<img width="29" height="52" data-src="/assets/icons/temperature.svg" alt="" class="lozad" loading="lazy">
					</div>

					<div class="prop-item-content">
						<h3>Self-cooling</h3>

						<p>NASA-inspired fabrics help keep you perfectly cool and sweat-free.</p>
					</div>
				</li>

				<li class="prop-item">
					<div class="prop-img-holder">
						<img width="58" height="37" data-src="/assets/icons/laundry.svg" alt="" class="lozad" loading="lazy">
					</div>

					<div class="prop-item-content">
						<h3>Self-cleaning</h3>

						<p>Stays fresh up to 3x longer. Up to 3x less laundry needed.</p>
					</div>
				</li>

				<li class="prop-item">
					<div class="prop-img-holder">
						<img width="45" height="50" data-src="/assets/icons/skin.svg" alt="" class="lozad" loading="lazy">
					</div>

					<div class="prop-item-content">
						<h3>Cleaner Sleep</h3>

						<p>Fabrics that minimize bacteria build-up, helping you rest on fresher, cleaner bedding every night.</p>
					</div>
				</li>
			</ul>
		</div>
	</div>

	<div class="prop-section-container">
		<div class="prop-list">
			<div class="video-holder">
				<h3>
					Advanced temperature regulation.<br class="mobile-hidden"> Wake up refreshed, not sweaty.
				</h3>

				<p>NASA-inspired silver-infused fabrics help keep you at a temperature perfectly suited to your body. All night long.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/01.jpg">
					<source data-src="/assets/videos/01.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					Helps prevent up to 99.7% of bacteria growth, naturally.
				</h3>

				<p>Infused with anti-bacterial silver that prevents up to 99.7% of bacteria growth through a natural process called ionization.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/02.jpg">
					<source data-src="/assets/videos/02.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					Self-cleaning: Fewer odors. Up to 3x less laundry.
				</h3>

				<p>Miracle Made® Sheets stay fresh for up to 3x longer thanks to anti-bacterial silver. That means up to 3x less laundry needed and fewer odors!</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/03.jpg">
					<source data-src="/assets/videos/03.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					Premium quality. Luxurious feeling.
				</h3>

				<p>Sleep like royalty thanks to premium, silky soft Miracle Clean & Cool™ fabrics that get even softer with every wash.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/04.jpg">
					<source data-src="/assets/videos/04.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					Designed to support healthier skin.
				</h3>

				<p>Stop sleeping on bacteria that gives you acne. Silver has been proven to help prevent bacteria growth. Upgrade to a cleaner sleep.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/05.jpg">
					<source data-src="/assets/videos/05.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					Goodbye morning stuffiness.
				</h3>

				<p>Our OKEO-TEX Certified fabrics are designed for hypoallergenic sleep while our silver-infused fabrics help prevent up to 99.7% of bacteria growth, helping you wake up breathing clearly.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/06.jpg">
					<source data-src="/assets/videos/06.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					87% of customers report better rest.*
				</h3>

				<p>Don't let overheating, cold sweats, and morning stuffiness ruin your sleep. Wake up feeling rested.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/07.jpg">
					<source data-src="/assets/videos/07.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					On a mission to bring small Miracles to daily life.
				</h3>

				<p>We believe the world needs more Miracles, so we made it our mission to design thoughtful, remarkable products that improve people's daily lives.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/08.jpg">
					<source data-src="/assets/videos/08.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					Better for the planet! Over 14M gallons of water saved since 2019.
				</h3>

				<p>Thanks to our anti-bacterial fabrics, Miracle Made® Sheets have helped prevent waste from over 1M loads of laundry, amounting to 14M gallons of water saved since 2019.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/09.jpg">
					<source data-src="/assets/videos/09.mp4" type="video/mp4">
				</video>
			</div>

			<div class="video-holder">
				<h3>
					30-Night Money Back Guarantee
				</h3>

				<p>We take great pride in delivering quality products. Try Miracle Made® Sheets for 30 nights. If you don't love them, get your money back.</p>

				<video class="lozad" playsinline autoplay muted loop data-poster="/assets/videos/10.jpg">
					<source data-src="/assets/videos/10.mp4" type="video/mp4">
				</video>
			</div>
		</div>
	</div>
</section>
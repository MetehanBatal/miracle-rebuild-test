<script>
	import HeroSection from '$lib/advertorial/s6-reasons/HeroSection.svelte';
	import AdvertorialSection from '$lib/advertorial/s6-reasons/Section.svelte';
	import CTASection from '$lib/advertorial/s6-reasons/CTA.svelte';

	export let data;

	console.log(data);
	
	let heroSectionData = {
		desktopImg: `/assets/images/advertorial/hero.webp`,
		mobileImg: `/assets/images/advertorial/hero_mobile.webp`,
		headline: '6 Reasons Americans are Switching to these NASA-Inspired Sheets',
		description: 'Combining comfort with breathability and softness.'
	};

	const props = [
		{
			img: '/assets/images/advertorial/01.webp',
			heading: "1. Temperature-Regulating Comfort",
			description: `Night sweats are the absolute worst! Especially if you are waking up next to a significant other, it can be really embarrassing. Waking up feeling like you just wet the bed makes everything such a hassle. Your sleep was ruined, and now you have to wash your sheets again. <a href="/sheets/ksp/">Miracle Made® Sheets are infused with silver</a> and made with NASA-inspired temperature-regulating fabrics to help you sleep at the perfect temperature. All year round you can enjoy the perfect cooling temperature that keeps you in a deep dreamy sleep all night long.`
		},
		{
			img: '/assets/images/advertorial/02.webp',
			heading: "2. Up to 3x Less Laundry And Big Savings",
			description: "According to research by Amerisleep, after just one week of use, bedsheets had more bacteria than a bathroom doorknob. After just two weeks, that number multiplied to have more bacteria than a pet toy. Let's face it… no one has time to wash their sheets regularly! Each wash is not only a huge hassle, but it's expensive and those costs add up quickly. Miracle Made® Sheets help prevent up to 99.7% of bacteria growth due to their unique silver-infused fiber technology. This helps you eliminate the need to wash your sheets as much as traditional sheets, helping save you time and money on laundry supplies, water, and electricity. This is an easy way to save hundreds and hundreds of dollars every year!"
		},
		{
			img: '/assets/images/advertorial/03.webp',
			heading: "3. Your Sheets Are Damaging Your Skin",
			description: `Do you know what's living in your sheets with you? Trust us, it's not a pretty sight! You might be surprised to learn that your bed could be harboring more bacteria than a toilet seat. So, each night after washing your face and brushing your teeth, you could be tucking yourself up in a world of bacteria. This bacteria can cause your skin's immune system to become overwhelmed with acne and other problems. If not washed regularly, traditional sheets can also clog your pores, leading to even more breakouts and skin problems. Miracle Made® Sheets use a high-quality silver-infused fiber that helps prevent up to 99.7% of bacteria growth that is harmful to your skin. <a href="/sheets/ksp/">Silver-infused sheets can help support clear skin</a> by limiting how much bacteria build-up you are sleeping on.`
		},
		{
			img: '/assets/images/advertorial/04.webp',
			heading: "4. Odor Fighting",
			description: `You spend about ⅓ of your life on your sheets, which can attract some gross odors. Humans shed around 15 million skin cells each night. These provide the perfect setting for bacteria to multiply and trap odors. The silver-infused fibers in Miracle Made® Sheets help prevent odor-causing bacteria growth. Finally, you can start your days off smelling fresh and clean. Wake up knowing that you slept on the cleanest sheets you've likely ever owned.`
		},
		{
			img: '/assets/images/advertorial/05.webp',
			heading: "5. Luxury Comfort Without The Price Tag",
			description: `It’s no secret now that Miracle Made® Sheets are becoming a staple for high-end Airbnbs and hotels after getting a lot of attention all over the internet. Miracle Made® Sheets use premium fabrics for a luxuriously soft feeling. Many traditional luxury sheets are also not typically antibacterial, designed for your skin, or temperature regulating—yet they charge a premium for them. It’s now easier than ever to stop wasting money on overhyped and overpriced sheets when <a href="/sheets/ksp/" style="text-decoration: underline;">Miracle Made® Sheets are a fraction of the price with more benefits!</a>`
		},
		{
			img: '/assets/images/advertorial/06.webp',
			heading: "6. Try it 100% Risk Free!",
			description: "Many luxury sheets don't allow returns if the sheets have been used. At Miracle Made®, we know how comfortable, clean, and cool our bed sheets are, so if you aren't 100% satisfied with your purchase in the first 30 days, we will refund all of your money with hassle-free returns! We can easily be reached by phone, email, or Facebook messenger."
		}
	];

	const ctaData = {
		img: '/assets/images/advertorial/cta_image.webp',
		heading: 'GET AN EXTRA <br/><strong class="cta-bold-text">20% OFF</strong> FOR A LIMITED TIME ONLY!',
		text: 'This limited-time deal is in high demand and stock keeps <br class="mobile-hidden"/>selling out.',
		ctaText: 'GET YOUR MIRACLE NOW!'
	}
</script>

<svelte:head>
	<title>6 Reasons Why Americans Are Ditching Their Traditional Sheets | Miracle Brand</title>
	<meta content="Miracle Sheets" name="description">

	<meta content="api.shopmiraclebrand.co" name="checkout-api-endpoint">
	<meta content="US" name="checkout-default-shipping-zone">
	<!-- <meta content="https://api.shopmiraclebrand.co/v1/cart/{sessionId}/miracle_redirect" name="checkout-next-url"> -->

	<meta content="mb-sheets-a-sv-au" name="checkout-landing-page-name">
	<meta content="mb-sheets-a-sv-au" name="checkout-funnel-name">
	<meta content="sheets" name="checkout-aux-page-name">

	<!-- Begin: Northbeam Pixel -->
	<script async type="text/javascript" src="//j.northbeam.io/ota-sp/d6b41dbb-ce9e-4e1e-bdc2-36492a0d7ac1.js"></script>
	<!-- End: Northbeam Pixel -->
</svelte:head>

<HeroSection data={heroSectionData} />

<!-- {#await AdvertorialSection}
{:then {default: AdvertorialSection}} -->
	{#each props as sectionData, _i}
	<AdvertorialSection data={sectionData} index={_i} />
	{/each}
<!-- {/await} -->

<CTASection data={ctaData} />

<style scoped>
	:root {
		--main-color: #fff;
		--accent-color: #00237E;
		--accent-text-color: #ffffff;
		--cta-bg-color: #BAE474;
		--callout-bg-color: #f5f5f5;
	}

	:global(body, nav) {
		background-color: var(--main-color);
		scroll-behavior: smooth !important;
	}
</style>

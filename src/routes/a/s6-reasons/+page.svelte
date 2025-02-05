<script>
	import HeroSection from '$lib/advertorial/s6-reasons/HeroSection.svelte';
	import AdvertorialSection from '$lib/advertorial/s6-reasons/Section.svelte';
	import CTASection from '$lib/advertorial/s6-reasons/CTA.svelte';

	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	export let data;
	let pageCrumbs = data.pageCrumbs;
	let returningExperimentVisitor = data.returningExperimentVisitor;
	

	let advertorialExperiment = $page.data.indices.find(indice => indice['experimentId'] === 303494641168);
	let heroImageVariant = advertorialExperiment?.variants?.find((v) => v.name === 'Hero Image Change')?.component;
	let headlineVariant = advertorialExperiment?.variants?.find((v) => v.name === 'Headline Copy')?.component;

	const headlineOptions = [
		'6 Reasons Why Americans Are Ditching Their Traditional Sheets',
		'6 Reasons Why Americans Are Abandoning Their Traditional Bed-Sheets',
		'6 Reasons Why Americans Are Saying Farewell to Traditional Sheets and Welcoming Change in Bedding Trends',
		'6 Reasons You Need to Switch to Toxic-Free Hygiene Products for your Testosterone'
	];

	// data = data.pageDetailsRes.data;

	let heroSectionData = {
		desktopImg: `/assets/images/advertorial/hero_${heroImageVariant === 'ImageII' ? 1 : heroImageVariant === 'ImageIII' ? 2 : 0}.webp`,
		mobileImg: `/assets/images/advertorial/hero_${heroImageVariant === 'ImageII' ? 1 : heroImageVariant === 'ImageIII' ? 2 : 0}.webp`,
		headline: headlineOptions[headlineVariant === 'HeadlineII' ? 1 : headlineVariant === 'HeadlineIII' ? 2 : headlineVariant === 'HeadlineIV' ? 3 : 0],
		description: 'Your choice of deodorant, toothpaste, and body wash may have a bigger impact on your health and masculanity than you realize.'
	};

	const props = [
		{
			img: '/assets/images/advertorial/01.webp',
			heading: "<span>1.</span> Your Sheets Are Damaging Your Skin",
			description: "Do you know what’s living in your sheets with you? Trust us, It’s not a pretty sight! You might be surprised to learn that your bed could be harbouring more bacteria than a toilet seat. So, each night after washing your face and brushing your teeth, you could be tucking yourself up in a world of bacteria. This bacteria can cause your skin's immune system to become overwhelmed with acne and other problems. Traditional sheets, if not washed regularly, can also clog your pores, leading to even more breakouts and skin problems. Miracle Sheets use a high quality natural silver infused fiber that fights bacteria that is harmful to your skin. Silver infused sheets not only help improve your skin's wellness but it also gives your skin a nice glowing complexion."
		},
		{
			img: '/assets/images/advertorial/02.webp',
			heading: "<span>2.</span> 3x Less Laundry And Big Savings",
			description: "According to research by Amerisleep, after just one week of use, bedsheets had more bacteria than a bathroom doorknob. After just two weeks that number multiplied to have more bacteria than a pet toy. Let's face it… No one has time to wash their sheets regularly! Each wash is not only a huge hassle, but it’s expensive and those costs add up quickly. Miracle Sheets prevents 99.9% of bacteria growth due to its unique natural silver infused fiber technology. This helps you eliminate the need to wash your sheets as much as traditional sheets, saving you time and money on laundry supplies, water, and electricity. This is the easiest way to save hundreds and hundreds of dollars every year!"
		},
		{
			img: '/assets/images/advertorial/03.webp',
			heading: "<span>3.</span> Temperature Regulating Comfort",
			description: "Night sweats are the absolute worst! Especially if you are waking up next to a significant other, it can be really embarrassing. Waking up feeling like you just wet the bed makes everything such a hassle. Your sleep was ruined, and now you have to wash your sheets again. Miracle sheets natural silver is thermoregulating, meaning you sleep at the perfect temperature all night long. All year round you can enjoy the perfect cooling temperature that keeps you in a deep dreamy sleep all night long."
		},
		{
			img: '/assets/images/advertorial/04.webp',
			heading: "<span>4.</span> Odor Fighting",
			description: "You spend about ⅓ of your life on your sheets, and that can attract some gross odors. Humans shed around 15 million skin cells each night, these provide the perfect setting for bacteria to multiply and trap odors. The natural silver infused fibers in Miracle Sheets help prevent odor causing bacteria. Finally, you can start your days off smelling fresh and clean. Wake up knowing that you slept on the cleanest sheets ever invented."
		},
		{
			img: '/assets/images/advertorial/05.webp',
			heading: "<span>5.</span> Luxury Comfort Without The Price Tag",
			description: "It’s no secret now that Miracle sheets are becoming a staple for high-end Airbnbs and Hotels after getting a lot of attention all over the internet. Miracle sheets use a premium 620-thread count sateen weave that’s made with USA-grown Supima cotton, which is one of the highest quality cottons in the world. Many traditional luxury sheets are still sourced from China and come with a hefty price tag. These traditional luxury sheets are also not antimicrobial, skin beneficial, or temperature regulating - yet they charge a premium for them. It’s now easier than ever to stop wasting money on overhyped and overpriced sheets when Miracle Brand is a fraction of the price with more benefits!"
		},
		{
			img: '/assets/images/advertorial/06.webp',
			heading: "<span>6.</span> Try it 100% Risk Free!",
			description: "Most luxury sheets don’t allow returns if you aren’t 100% satisfied because the sheets have been used. At Miracle Brand, we know that our sheets are the worlds most clean, hassle free, and comfortable sheets ever made -- so if you aren’t over the top thrilled with your purchase we will refund all of your money, no questions asked! We are extremely easy to reach through phone, email, or FB messenger."
		}
	];

	const ctaData = {
		img: '/assets/images/advertorial/cta_image.png',
		heading: 'Get <strong class="cta-bold-text">free towels</strong> and an extra <br /><strong class="cta-bold-text">20% off</strong> for a limited time only!',
		text: 'This limited time deal is in high demand and stock keeps selling out.',
		ctaText: 'Try Miracle Now'
	}
</script>

<svelte:head>
	<title>6 Reasons Why Americans Are Ditching Their Traditional Sheets | Miracle Brand</title>
	<meta content="Miracle Sheets" name="description">

	<!-- <link rel="preload" as="image" href="https://miracle-rebuild.vercel.app/assets/images/advertorial/hero.webp" fetchpriority="high" /> -->

	<meta content="api.shopmiraclebrand.co" name="checkout-api-endpoint">
	<meta content="US" name="checkout-default-shipping-zone">
	<!-- <meta content="https://api.shopmiraclebrand.co/v1/cart/{sessionId}/miracle_redirect" name="checkout-next-url"> -->

	<meta content="mb-sheets-a-sv-au" name="checkout-landing-page-name">
	<meta content="mb-sheets-a-sv-au" name="checkout-funnel-name">
	<meta content="sheets" name="checkout-aux-page-name">

	{#if browser}
	<!-- <script src="https://cdn.shopmiraclebrand.co/js/cart_loader.js" defer></script> -->
	<!-- <script src="https://try.miraclebrand.co/pixel.js" defer></script> -->
	{/if}
</svelte:head>

<HeroSection data={heroSectionData} />

<!-- {#await AdvertorialSection}
{:then {default: AdvertorialSection}} -->
	{#each props as sectionData, _i}
	<AdvertorialSection data={sectionData} index={_i} />
	{/each}
<!-- {/await} -->

<CTASection data={ctaData} />

<style>
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

<script>
	export let sizeGuideOpened;
	function closeSizeGuide() {
		sizeGuideOpened = false;
	}

	function backDropSizeGuide() {
		if(!event.target.closest(".popup-size-block")) {
			sizeGuideOpened = false;
		}
	}
</script>

<div class="popup-size" on:click={(event) => backDropSizeGuide()}>
	<div class="popup-size-wrapper">
		<div class="popup-size-block">
			<h1 class="size-guide-title">Size Guide</h1>
			<div class="size-guide-head">
				<div></div>
				<div class="sg-head-wrapper">
					<img src="/assets/size-guide/sg-1.png" loading="lazy" alt=""
						class="sg-img1" />
					<div>Fitted Sheet (W x L x D)</div>
				</div>
				<div class="sg-head-wrapper">
					<img src="/assets/size-guide/sg-2.png" loading="lazy" alt=""
						class="sg-img3" />
					<div>Flat Sheet (W x L)</div>
				</div>
				<div class="sg-head-wrapper">
					<img src="/assets/size-guide/sg-5.png" loading="lazy" alt=""
						class="sg-img1" />
					<div>Pillow Cases (W x L)</div>
				</div>
				<div class="sg-head-wrapper">
					<img src="/assets/size-guide/sg-2.png" loading="lazy" alt=""
						class="sg-img3" />
					<div>Duvet Cover (W x L)</div>
				</div>
				<div class="sg-head-wrapper">
					<img src="/assets/size-guide/sg-4.png" loading="lazy" alt=""
						class="sg-img2" />
					<div>Comforter (W x L)</div>
				</div>
			</div>
			<div class="size-guide-content">
				<div class="row-1-lef">
					<div>Twin</div>
				</div>
				<div class="row-heading">
					<div>39” x 75” x 16”</div>
				</div>
				<div class="row-heading">
					<div>71” x 98”</div>
				</div>
				<div class="row-heading">
					<div>20” x 27”</div>
				</div>
				<div class="row-heading">
					<div>64” x 90”</div>
				</div>
				<div class="row-heading">
					<div>64” X 90”</div>
				</div>
			</div>
			<div class="size-guide-content">
				<div class="row-1-lef">
					<div>Full</div>
				</div>
				<div class="row-heading">
					<div>54” x 75” x 16”</div>
				</div>
				<div class="row-heading">
					<div>86” x 98”</div>
				</div>
				<div class="row-heading">
					<div>20” x 27”</div>
				</div>
				<div class="row-heading">
					<div>90” x 94”</div>
				</div>
				<div class="row-heading">
					<div>90” X 92”</div>
				</div>
			</div>
			<div class="size-guide-content">
				<div class="row-1-lef">
					<div>Queen</div>
				</div>
				<div class="row-heading">
					<div>60” x 80” x 16”</div>
				</div>
				<div class="row-heading">
					<div>94” x 102”</div>
				</div>
				<div class="row-heading">
					<div>20” x 27”</div>
				</div>
				<div class="row-heading">
					<div>90” x 94”</div>
				</div>
				<div class="row-heading">
					<div>90” X 92”</div>
				</div>
			</div>
			<div class="size-guide-content">
				<div class="row-1-lef">
					<div>King</div>
				</div>
				<div class="row-heading">
					<div>76” x 80” x 16”</div>
				</div>
				<div class="row-heading">
					<div>112” x 104”</div>
				</div>
				<div class="row-heading">
					<div>20” x 27”</div>
				</div>
				<div class="row-heading">
					<div>104” x 94”</div>
				</div>
				<div class="row-heading">
					<div>104” X 92”</div>
				</div>
			</div>
			<div class="size-guide-content border-0">
				<div class="row-1-lef">
					<div>Cali King</div>
				</div>
				<div class="row-heading">
					<div>72” x 84” x 16”</div>
				</div>
				<div class="row-heading">
					<div>110” x 104”</div>
				</div>
				<div class="row-heading">
					<div>20” x 37”</div>
				</div>
				<div class="row-heading">
					<div>104” x 94”</div>
				</div>
				<div class="row-heading">
					<div>104” X 92”</div>
				</div>
			</div>
			<div class="bg-blue"></div>
			<div class="close-popup" on:click={(e) => {closeSizeGuide()}}>
				<img src="/assets/icons/close.svg" loading="lazy" alt="" />
			</div>
		</div>
		<div class="popup-size-block-mobile">
			<div class="size-g-heading">
				<h1 class="size-guide-title">Size Guide</h1>
			</div>
			<div class="close-popup" on:click={(e) => {closeSizeGuide()}}>
				<img src="/assets/icons/close.svg" loading="lazy" alt="" />
			</div>
			<div class="size-list">
				<div class="size-item">
					<div class="sg-head-wrapper">
						<img src="/assets/size-guide/sg-1.png" loading="lazy" alt=""
							class="sg-img1" />
						<div>Fitted Sheet (W x L x D)</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Twin</div>
						<div class="sg-value">39” x 75” x 16”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Full</div>
						<div class="sg-value">54” x 75” x 16”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Queen</div>
						<div class="sg-value">60” x 80” x 16”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">King</div>
						<div class="sg-value">76” x 80” x 16”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Cali King</div>
						<div class="sg-value">72” x 84” x 16”</div>
					</div>
				</div>
				<div class="size-item">
					<div class="sg-head-wrapper">
						<img src="/assets/size-guide/sg-2.png" loading="lazy" alt=""
							class="sg-img3" />
						<div>Flat Sheet (W x L)</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Twin</div>
						<div class="sg-value">71” x 98”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Full</div>
						<div class="sg-value">86” x 98”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Queen</div>
						<div class="sg-value">94” x 102”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">King</div>
						<div class="sg-value">112” x 104”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Cali King</div>
						<div class="sg-value">110” x 104”</div>
					</div>
				</div>
				<div class="size-item">
					<div class="sg-head-wrapper">
						<img src="/assets/size-guide/sg-2.png" loading="lazy" alt=""
							class="sg-img3" />
						<div>Duvet Cover (W x L)</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Twin</div>
						<div class="sg-value">64” x 90”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Full</div>
						<div class="sg-value">90” x 94”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Queen</div>
						<div class="sg-value">90” x 94”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">King</div>
						<div class="sg-value">104” x 94”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Cali King</div>
						<div class="sg-value">104” x 94”</div>
					</div>
				</div>
				<div class="size-item">
					<div class="sg-head-wrapper">
						<img src="/assets/size-guide/sg-5.png" loading="lazy" alt=""
							class="sg-img4" />
						<div>Pillow Cases (W x L)</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Twin</div>
						<div class="sg-value">20” x 27”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Full</div>
						<div class="sg-value">20” x 27”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Queen</div>
						<div class="sg-value">20” x 27”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">King</div>
						<div class="sg-value">20” x 27”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Cali King</div>
						<div class="sg-value">20” x 27”</div>
					</div>
				</div>
				<div class="size-item">
					<div class="sg-head-wrapper">
						<img src="/assets/size-guide/sg-4.png" loading="lazy" alt=""
							class="sg-img5" />
						<div>Comforter (W x L)</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Twin</div>
						<div class="sg-value">64” x 90”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Full</div>
						<div class="sg-value">90” x 92”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Queen</div>
						<div class="sg-value">90” x 92”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">King</div>
						<div class="sg-value">104” x 92”</div>
					</div>
					<div class="sg-row">
						<div class="sg-type">Cali King</div>
						<div class="sg-value">104” x 92”</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
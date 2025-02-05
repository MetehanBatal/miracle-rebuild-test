<script>
	/*import {
		handleKeydown,
		handleBlur,
		handleFocus,
		handleResize,
		handleClick,
		handleChange,
		handleSubmit,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleMousemove,
	} from '../../stores/tracker';*/

	import { logAction } from '../../stores/functions';

	export let innerWidth;
	export let innerHeight;
	let scrollY;

	function handleKeydown(event) {
		// logAction()

		// logEvent(event.type, {
		// 	value: event.keyCode,
		// 	target: document?.activeElement,
		// 	targetName: document?.activeElement?.getAttribute('el-name'),
		// 	timestampDiff: event.timeStamp
		// });
		// let eventName = event.type;
		// let traits = {
		// 	element: document?.activeElement,
		// 	timestamp: 0,
		// }
	};

	function handleBlur(event) {

		logEvent(event.type, {
			timestampDiff: event.timeStamp
		});
	};

	function handleFocus(event) {
		logEvent(event.type, {
			timestampDiff: event.timeStamp
		});
	};

	function handleResize(event) {
		logEvent(event.type, {
			el: event.target,
			x: innerWidth,
			y: innerHeight,
			timestampDiff: event.timeStamp
		})
	};

	function handleClick(event) {
		logEvent(event.type, {
			el: event.target,
			x: event.clientX,
			y: event.clientY,
			timestampDiff: event.timeStamp
		})
	};

	function handleChange(event) {
		// console.log('handleChange: ', event);
	};

	function handleSubmit(event) {
		// console.log('handleSubmit: ', event);
	};

	function handleTouchStart(event) {
		// console.log('handleTouchStart: ', event);
	};

	function handleTouchMove(event) {
		// console.log('handleTouchMove: ', event);
	};

	function handleTouchEnd(event) {
		// console.log('handleTouchEnd: ', event);
	};

	// function handleMousemove(event) {
	// 	logEvent(event.type, {
	// 		el: event.target,
	// 		x: event.x,
	// 		y: event.y,
	// 		timestampDiff: event.timeStamp
	// 	})
	// };

	// function handleScroll(event) {
	// 	if (!scrollY || scrollY === undefined) {
	// 		return; }

	// 	logEvent(event.type, {
	// 		el: event.target,
	// 		value: scrollY,
	// 		timestampDiff: event.timeStamp
	// 	});
	// };

	// function handleResizeX(event) {
	// 	if (!innerWidth || innerWidth === undefined) {
	// 		return; }
	// 	console.log('handleResizeX: ', innerWidth);

	// 	logEvent('resizex', {
	// 		el: 'document',
	// 		value: innerWidth,
	// 		timestampDiff: Date.now()
	// 	});
	// };

	// function handleResizeY(event) {
	// 	if (!innerHeight || innerHeight === undefined) {
	// 		return; }
	// 	console.log('handleResizeY: ', innerHeight);
	// };

	// $: scrollY, handleScroll();
	// $: innerWidth, handleResizeX();
	// $: innerHeight, handleResizeY();
</script>

<!-- on:scroll={handleScroll}
on:blur={handleBlur}
	on:focus={handleFocus}
	
	on:resize={handleResize}
	bind:scrollY={scrollY}
	bind:innerWidth={innerWidth}
	bind:innerHeight={innerHeight} 
-->
<svelte:window
	on:keydown={handleKeydown}
/> 

<!-- on:selectionchange={handleSelectionChange} -->
<!-- on:mousemove={handleMousemove} -->
<!-- <svelte:document
	on:click={handleClick}
/> -->
<!-- 	on:change={handleChange}
	on:submit={handleSubmit}
	
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
 -->
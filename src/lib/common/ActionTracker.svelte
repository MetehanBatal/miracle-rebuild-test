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

	export let highestScrollLevel;

	function handleKeydown(event) {
		logAction('keyboardEvents', 'keydown', {
			value: event.key,
			// target: document?.activeElement,
			// targetName: document?.activeElement?.getAttribute('el-name'),
			timestamp: Date.now()
		});
	};

	function handleBlur(event) {
		logAction('windowEvents', 'blur', {
			value: '',
			timestamp: Date.now()
		});
	};

	function handleFocus(event) {
		logAction('windowEvents', 'focus', {
			value: '',
			timestamp: Date.now()
		});
	};

	function handleResize(event) {
		logAction('windowEvents', 'resize', {
			value: [innerWidth, innerHeight],
			// target: event.target,
			timestamp: Date.now()
		});
	};

	function handleClick(event) {
		console.log('Logged click event for: ', event.target?.closest('[data-tag-name]'))
		// logAction('mouseEvents', 'click', {
		// 	value: [event.clientX, event.clientY],
		// 	// target: event.target,
		// 	targetName: event.target?.closest('[data-tag-name]').getAttribute('data-tag-name'),
		// 	timestamp: Date.now()
		// });
	};

	function handleSelectionChange(event) {
		let selection = document.getSelection();

		logAction('windowEvents', 'selection', {
			value: selection.toString(),
			// target: selection.focusNode?.parentNode,
			// targetName: selection.focusNode?.parentNode?.getAttribute('el-name'),
			timestamp: Date.now()
		})
	}

	function handleChange(event) {
	};

	function handleSubmit(event) {
	};

	function handleTouchStart(event) {
		logAction('touchEvents', 'touchstart', {
			value: [event.changedTouches[0]?.clientX, event.changedTouches[0]?.clientY],
			// target: event.target,
			// targetName: event.target?.getAttribute('el-name'),
			timestamp: Date.now()
		})
	};

	function handleTouchMove(event) {
		logAction('touchEvents', 'touchmove', {
			value: [event.changedTouches[0]?.clientX, event.changedTouches[0]?.clientY],
			// target: event.target,
			// targetName: event.target?.getAttribute('el-name'),
			timestamp: Date.now()
		})
	};

	function handleTouchEnd(event) {
		logAction('touchEvents', 'touchend', {
			value: [event.changedTouches[0]?.clientX, event.changedTouches[0]?.clientY],
			// target: event.target,
			// targetName: event.target?.getAttribute('el-name'),
			timestamp: Date.now()
		})
	};

	function handleMousemove(event) {
		logAction('mouseEvents', 'mousemove', {
			value: [event.x, event.y],
			// target: event.target,
			timestamp: Date.now()
		});
	};

	function handleScroll(event) {
		if (!scrollY || scrollY === undefined) {
			return; }

		if (scrollY > highestScrollLevel) {
			highestScrollLevel = scrollY;
		}

		logAction('windowEvents', 'scroll', {
			value: scrollY,
			// target: event.target,
			timestamp: Date.now()
		});
	};

	// function handleResizeX(event) {
	// 	if (!innerWidth || innerWidth === undefined) {
	// 		return; }

	// 	logEvent('resizex', {
	// 		el: 'document',
	// 		value: innerWidth,
	// 		timestampDiff: Date.now()
	// 	});
	// };

	// function handleResizeY(event) {
	// 	if (!innerHeight || innerHeight === undefined) {
	// 		return; }
	// };

	// $: scrollY, handleScroll();
	// $: innerWidth, handleResizeX();
	// $: innerHeight, handleResizeY();
</script>

<svelte:window
	bind:innerWidth={innerWidth}
	bind:innerHeight={innerHeight}
	bind:scrollY={scrollY}
	
	on:scroll={handleScroll}
	on:resize={handleResize}
	
	on:focus={handleFocus}
	on:blur={handleBlur}
	
	on:keydown={handleKeydown}
/> 

<!--  -->
<svelte:document
	on:selectionchange={handleSelectionChange}
	on:click={handleClick}

	on:mousemove={handleMousemove}
	on:touchstart={handleTouchStart}
	on:touchmove={handleTouchMove}
	on:touchend={handleTouchEnd}
/>
<!-- 	on:change={handleChange}
	on:submit={handleSubmit}
	
	
	
 -->
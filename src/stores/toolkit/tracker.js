const handleKeydown = (event) => {
	console.log('handleKeydown: ', event);
};

	// function handleKeyup = (event) => {
	// 	console.log('handleKeyup: ', event);
	// };

	// function handleKeypress = (event) => {
	// 	console.log('handleKeypress: ', event);
	// };

const handleBlur = (event) => {
	console.log('handleBlur: ', event);
};

const handleFocus = (event) => {
	console.log('handleFocus: ', event);
};

const handleResize = (event) => {
	console.log('handleResize: ', event);
};

// function handleSelectionChange = (event) => {
// 	if (!document.getSelection()) {
// 		return; }

// 	console.log('handleSelectionChange: ', document.getSelection());
// 	selection = document.getSelection();
// 	console.log('handleSelectionChange II: ', selection);
// };

const handleClick = (event) => {
	console.log('handleClick: ', event);
};

const handleChange = (event) => {
	console.log('handleChange: ', event);
};

const handleSubmit = (event) => {
	console.log('handleSubmit: ', event);
};

const handleTouchStart = (event) => {
	console.log('handleTouchStart: ', event);
};

const handleTouchMove = (event) => {
	console.log('handleTouchMove: ', event);
};

const handleTouchEnd = (event) => {
	console.log('handleTouchEnd: ', event);
};

const handleMousemove = (event) => {
	// console.log('handleMousemove: ', event);
};

// function handleRatioChange = (event) => {
// 	console.log('handleRatioChange: ', devicePixelRatio);
// };

// function handleMouseleave = (event) => {
// 	console.log('handleMouseleave: ', event);
// };


export {
	handleKeydown,
	handleBlur,
	handleFocus,
	handleResize,
	handleClick,
	handleChange,
	handleSubmit,
	handleTouchStart,
	// handleTouchMove,
	handleTouchEnd,
	// handleMousemove
}
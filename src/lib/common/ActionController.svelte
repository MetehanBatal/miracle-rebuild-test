<script>
    import { onMount } from 'svelte';

    export let actions;
    
    let mouseX = 0;
    let mouseY = 0;

    let currentIndex = 0;
    let startTime = null;
    let touchVisible = false;
    let isPlaying = false;
    let elapsedTime = 0;
    let totalTime = 0;
    let animationFrameId = null;
    let playerReady = false;

    // Watch the actions and calculate total time when they are updated
    $: if (actions && actions.length > 0) {
        playerReady = true;
        totalTime = actions[actions.length - 1].timestamp - actions[0].timestamp;
        window.top.postMessage({playerReady}, '*');
    }

    function performClick(x, y, target) {
        touchVisible = [x, y]; // Visual indication of the click (optional handling)

       if (target) {
            console.log('Target: ', target);
        }
        // Create a new click event with the specified coordinates
        const clickEvent = new MouseEvent('click', {
            clientX: x,
            clientY: y,
            bubbles: true, // Allows the event to bubble up through the DOM
            cancelable: true, // Allows the event to be canceled if necessary
            view: window // Specifies the window object, typically required for mouse events
        });

        // Find the element at the specified coordinates
        const targetElement = document.elementFromPoint(x, y);

        if (targetElement) {
            // Dispatch the click event on the found element
            targetElement.dispatchEvent(clickEvent);
        } else {
            console.warn('No element found at the specified coordinates:', x, y);
        }

        // Hide the visual indication after 300ms (if applicable)
        setTimeout(() => {
            touchVisible = false;
        }, 300);
    }

    function performScroll(value) {
        window.scrollTo(0, value);
    }

    function performKeypress(key) {
        const keypressEvent = new KeyboardEvent('keydown', {
            key: key,
            bubbles: true,
            cancelable: true,
        });
        document.dispatchEvent(keypressEvent);
    }

    function performMouseMove(x, y) {
        mouseX = x;
        mouseY = y;
    }

    function replayActions() {
        if (!actions || actions.length === 0 || !isPlaying) return;

        let currentTime = performance.now();
        // Calculate the elapsed time since the start of replay
        elapsedTime = (currentTime - startTime);

        // Check if the current action should be performed based on the elapsed time
        while (currentIndex < actions.length && actions[currentIndex].timestamp <= elapsedTime) {
            const action = actions[currentIndex];

            // Execute the action based on its type
            switch (action.type) {
                case 'click':
                    let targetName = action.targetName || null;
                    performClick(action.value[0], action.value[1], targetName);
                    break;
                case 'scroll':
                    performScroll(action.value);
                    break;
                case 'mousemove':
                    performMouseMove(action.value[0], action.value[1]);
                    break;
                case 'keypress':
                    performKeypress(action.value);
                    break;
            }

            // Move to the next action
            currentIndex++;
        }

        // Continue the animation frame loop if there are more actions and playback is ongoing
        if (currentIndex < actions.length && isPlaying) {
            animationFrameId = requestAnimationFrame(replayActions);
        }
    }

    function play() {
        isPlaying = true;
        startTime = performance.now() - elapsedTime;
        animationFrameId = requestAnimationFrame(replayActions);
        freezeStuff();
    }

    function pause() {
        isPlaying = false;
        cancelAnimationFrame(animationFrameId);
        freezeStuff();
        
    }

    function freezeStuff() {
        let state = isPlaying ? 'running' : 'paused';

        document.querySelectorAll('video').forEach((video) => {isPlaying ? video.play() : video.pause()});
        document.querySelector('.logos-wrap').style.animationPlayState = state;
        document.querySelector('.hourglass svg').style.animationPlayState = state;
        document.querySelectorAll('.green-circle').forEach((circle) => { circle.style.animationPlayState = state });
    }

    function rewind() {
        pause();
        // Rewind 10 seconds
        elapsedTime = Math.max(0, elapsedTime - 10000);
        // Adjust the current index to match the rewound time
        currentIndex = actions.findIndex(action => action.timestamp > elapsedTime);
        play();
    }

    function forward() {
        pause();
        // Rewind 10 seconds
        elapsedTime = Math.max(0, elapsedTime + 10000);
        // Adjust the current index to match the rewound time
        currentIndex = actions.findIndex(action => action.timestamp > elapsedTime);
        play();
    }

    function changeTime() {
        pause();
        // Rewind 10 seconds
        elapsedTime = Math.max(0, elapsedTime + 10000);
        // Adjust the current index to match the rewound time
        currentIndex = actions.findIndex(action => action.timestamp > elapsedTime);
        play();
    }

    // Cleanup animation frame on component destroy
    onMount(() => {
        setTimeout(() => {
            freezeStuff();
        }, 1600);

        freezeStuff();
        window.addEventListener('message', function(event) {
			if (event.origin !== 'https://miracle.mtrix.io' && event.origin !== 'https://preview-miracle.mtrix.io' && event.origin !== 'http://localhost:5173') {
				return; }
            
            if (event.data?.action) {
                let action = event.data.action;
                let value = event.data.value;
                if (action === 'play') {
                    value === true ? play() : pause();
                } else if (action === 'rewind') {
                    rewind();
                } else if (action === 'forward') {
                    forward();
                } else if (action === 'change') {
                    changeTime(value);
                }
            }
        });
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    });
</script>

<!-- Visual representation of the mouse cursor for mousemove events -->
<div style={`transform: translate3d(${mouseX}px, ${mouseY}px, 0);`} class="cursor"></div>

{#if touchVisible !== false}
<div style={`transform: translate3d(calc(${touchVisible[0]}px - 16px), calc(${touchVisible[1]}px - 16px), 0);`} class="click-bubble"></div>
{/if}

{#if playerReady}
<!-- Playback controls -->
<!-- <div class="nvs-controls">
    <button class="control-button" on:click={rewind}>
        
    </button>

    <div class="divider"></div>

    <button class="control-button" on:click={togglePlayPause}>
        {#if isPlaying}
        
        {:else}
        
        {/if}
    </button>

    <div class="divider"></div>

    <button class="control-button" on:click={forward}>
        
    </button>
</div> -->
{/if}

<style scoped>
    .cursor {
        width: 1.8rem;
        height: 2.5rem;
        position: fixed;
        z-index: 999999;
        background: url('/assets/icons/cursor.png') left top/100% no-repeat;
    }

    .click-bubble {
        position: fixed;
        width: 3.2rem;
        height: 3.2rem;
        background-color: rgba(148, 122, 240, .72);
        border-radius: 100%;
        z-index: 999998;
    }

    .nvs-controls {
        display: flex;
		justify-content: center;
		align-items: center;

		position: fixed;
		bottom: 4rem;
		left: 50%;

        max-width: 0;
        opacity: 0;

		padding: .6rem;

		background-color: rgba(0, 0, 0, 0.8);
		border: .1rem solid rgba(255, 255, 255, 0.2);
		border-radius: 99rem;
		backdrop-filter: blur(5rem);

		transform: translate3d(-50%, 0, 0);

        animation: opacityAnimation 100ms ease forwards, maxWidthAnimation 250ms ease 50ms forwards; /* Combined animations */

		z-index: 9999999;
    }

    @keyframes maxWidthAnimation {
        0% {
            max-width: 0;
        }
        100% {
            max-width: 100%; /* Start with full width */
        }
    }

    @keyframes opacityAnimation {
        0% {
            opacity: 0; /* Start fully visible */
        }
        100% {
            opacity: 1; /* End fully transparent */
        }
    }

    button {
		background: transparent;
		border: none;
		outline: 0;
	}

	.control-button {
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;

		width: 3rem;
		height: 3rem;

		border-radius: 100%;

		color: #fff;

		cursor: pointer;
	}

	.control-button:hover {
		background: rgba(255, 255, 255, 0.1);
	}

	.divider {
		width: .1rem;
		height: 2.4rem;

		background-color: rgba(255, 255, 255, 0.4);

		margin: 0 .6rem;
	}

	.divider:last-child {
		display: none;
	}

    .time-elapsed {
        position: fixed;
        left: 30%;
        right: 30%;
        bottom: 8.4rem;

        max-width: 72rem;

        text-align: center;
    }

    .progress-bar {
        position: fixed;
        left: 30%;
        right: 30%;
        bottom: 10rem;

        max-width: 0;
        height: .6rem;

        opacity: 0;

        background-color: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(5rem);

        animation: opacityAnimation 100ms ease forwards, maxWidthAnimation 250ms ease 50ms forwards; /* Combined animations */
        
        border-radius: 120rem;
        overflow: hidden;

        z-index: 999999;
    }

    .progress {
        height: 100%;

        background-color: #7351eb;
        
        transition: width 0.1s;
    }
</style>

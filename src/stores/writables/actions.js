import { writable } from "svelte/store";

export const actions = writable(
	{
		id: '',
		mouseEvents: {
			click: [],
            mousemove: [],
			mousedown: [],
			mouseup: [],
			mouseout: [],
		},
		keyboardEvents: {
			keydown: [],
			keyup: [],
			keypress: []
		},
		formEvents: {
			focus: [],
			blur: [],
			change: [],
			submit: [] 
		},
		windowEvents: {
			resize: [],
			scroll: [],
			load: [],
            blur: [],
            focus: [],
            selection: []
		},
		touchEvents: {
			touchstart: [],
			touchend: [],
			touchmove: []
		},
        // Page change
        // RageClick
        // Error
        logs: {
            rageclick: [],
            pagechange: []
        }
	}
);
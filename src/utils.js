(function () {

	if (typeof window.CustomEvent === 'function') {
		return false;
	}

	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;

	window.CustomEvent = CustomEvent;
}());

export const STATE = {
	IDLE: -1,
	READY: 0,
	MOVING: 1,
};

export function createDockQuery(typeName, data = {}) {
	return new CustomEvent(typeName, {
		bubbles: true,
		cancelable: true,
		detail: data
	});
}
export const CustomEvent = (function () {

	if (typeof window.CustomEvent === 'function') {
		return CustomEvent;
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

	return CustomEvent;

}());
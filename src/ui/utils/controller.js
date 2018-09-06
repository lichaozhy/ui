export default class Controller {
	constructor(element, defaultOptions) {
		this.$element = element;
		this.$options = Object.assign({}, defaultOptions);
	}

	get element() {
		return this.$element;
	}

	$ensureHasOption(name) {
		if (!this.$options.hasOwnProperty(name)) {
			throw new Error(`Invalid option item named ${name}.`);
		}
	}

	setOption(name, value) {
		this.$ensureHasOption(name);

		return this.$options[name] = value;
	}

	getOption(name) {
		this.$ensureHasOption(name);

		return this.$options[name];
	}
}
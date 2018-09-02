export default class Controller {
	constructor(ui, defaultOptions) {
		this.$ui = ui;
		this.$options = Object.assign({}, defaultOptions);
	}

	get $element() {
		return this.$ui.$element;
	}

	setOption(name, value) {
		if (!this.$options.hasOwnProperty(name)) {
			throw new Error(`Invalid option item named ${name}.`);
		}

		return this.$options[name] = value;
	}
}
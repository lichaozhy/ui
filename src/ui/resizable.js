import Controller from './utils/controller';

const DEFAULT_OPTIONS = {
	constraint: null,
	handle: {
		top: true,
		bottom: true,
		left: true,
		right: true
	}
};

export default class ResizableController extends Controller {
	constructor(ui) {
		super(ui, DEFAULT_OPTIONS);

		this.$handle = Object.assign({}, DEFAULT_OPTIONS, handle);
		
	}

}
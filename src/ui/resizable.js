import Controller from './utils/controller';

const DEFAULT_OPTIONS = {
	constraint: null,
	handle: [ true, true, true, true ]
};



function HandleFactory([ top, right, bottom, left ]) {

}

export default class ResizableController extends Controller {
	constructor(element) {
		super(element, DEFAULT_OPTIONS);

	}

	get size() {
		
	}

}
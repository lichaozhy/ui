function createEvent() {
	
}

export const STATE = {
	IDLE: -1,
	READY: 0,
	MOVING: 1,
};

export function createDockQuery() {
	return new Event('dock-query', {
		bubbles: true,
		cancelable: true
	});
}
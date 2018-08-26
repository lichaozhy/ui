export default {
	bind(el) {
		el.addEventListener('mousedown', event => {
			event.__VD_HANDLE__ = true;
		});
	}
};
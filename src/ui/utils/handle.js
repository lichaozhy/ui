export default function asHandle(element) {
	element.addEventListener('mousedown', function(event) {
		event.__VD_HANDLE__ = true;
	});
}
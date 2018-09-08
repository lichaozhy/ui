import Vue from 'vue';
import vdUiCore from '../';

Vue.use(vdUiCore);

import App from './src/App';

const $app = new Vue(App);

$app.$mount('#app');

import DraggableController from '../src/ui/draggable';
import ResizableController from '../src/ui/resizable';

import asHandle from '../src/ui/utils/handle';
const test = document.createElement('div');
const test2 = document.createElement('div');

const iframe = document.createElement('iframe');

test.appendChild(iframe)
iframe.style.width = '100%';
iframe.style.height = '100%';

iframe.src = 'http://baidu.com';

test.style.position = 'absolute';
test.style.width = '200px';
test.style.height = '200px';
test.style.backgroundColor = 'yellow';
document.body.appendChild(test);

test2.style.position = 'absolute';
test2.style.width = '200px';
test2.style.height = '200px';
test2.style.backgroundColor = 'green';
document.body.appendChild(test2);

// test2.addEventListener('vd-dragover', function (event) {
// 	console.log(event)
// });

test2.addEventListener('vd-dragleave', function (event) {
	console.log(event)
});

test2.addEventListener('vd-dragenter', function (event) {
	console.log(event)
});

test2.addEventListener('vd-drop', function (event) {
	console.log(event)
});

new ResizableController(test);


const handle = document.createElement('div');

asHandle(handle);
test.appendChild(handle);

handle.style.width = '20px';
handle.style.height = '20px';
handle.style.backgroundColor = 'blue';

const handle2 = document.createElement('div');

asHandle(handle2);
test.appendChild(handle2);

handle2.style.width = '20px';
handle2.style.height = '20px';
handle2.style.backgroundColor = 'red';

const dc = new DraggableController(test, {
	droppable: true
});
dc.setOption('axis', null);
// dc.setOption('constraint', 'parent');
dc.setOption('handled', true);

const dc2 = new DraggableController(test2, {
	droppable: true
});
// dc2.setOption('axis', 'x');
dc2.setOption('constraint', 'parent');

import Vue from 'vue';
import App from './src/App';
import { vdUiCore } from '../';

Vue.use(vdUiCore);

const app = new Vue(App);

app.$mount('#app');


import DraggableController from '../src/ui/draggable';
import asHandle from '../src/ui/utils/handle';
const test = document.createElement('div');
const test2 = document.createElement('div');

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

const dc = new DraggableController(test);
dc.setOption('axis', null);
dc.setOption('constraint', 'parent');
dc.setOption('handleRequired', true);

const dc2 = new DraggableController(test2);
dc2.setOption('axis', null);
dc2.setOption('constraint', 'parent');

document.addEventListener('drag-start', console.log)
document.addEventListener('drag-move', console.log)
document.addEventListener('drag-end', console.log)
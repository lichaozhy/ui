<template>
  <div id="test-app">
    <ul>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
      <li>fdafasfsafsafaffsafa</li>
    </ul>
    {{pos}}

    <vd-ui
      style="background-color: #f0f0f0"
      v-model="pos"
      axis="null"
      constraint
      :direction="direction"
      resizable
      handled
      :droppable="droppable"
      :draggable="draggable">牛逼<a v-vd-handle>口巴</a></vd-ui>
  </div>
</template>

<script>
import mockWS from '../mock/workspace.json';

export default {
  data() {
    return {
      pos: {
        x: 0,
        y: 0
      },
      draggable: true,
      droppable: false,
      direction: [1, 1, 1, 1]
    }
  },
  methods: {
    start(event) {
      console.log('start', event);
    },
    move(event) {
      console.log('move', event);
    },
    end(event) {
      console.log('end', event);
    },
    query({ response, detail }) {
      console.log('query', response, detail);

      response.test = detail.abc + 5;
    },
    dock({ response, detail }) {
      console.log('dock', response, detail);

      response.test = detail.abc + 5;
    },
    dockRes(response) {
      console.log('dock-res', response)
    },
    dockQueryRes(response) {
      console.log('dock-query-res', response)
    }
  },
  mounted() {
    console.log(this)
  }
}
</script>

<style>
.element {
  position: absolute;
}

html, body {
  height: 100%;
  margin: 0;
}
</style>



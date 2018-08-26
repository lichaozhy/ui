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

    <test
      vd-handle-required
      v-model="pos"
      @vd-dock="dock($event)"
      @vd-dock-query="query($event)"
      @vd-drag-start="start($event)"
      @vd-drag-move="move($event)"
      @vd-drag-end="end($event)" />

    <test
      class="request"
      :vd-drag-data="{abc:1}"
      @vd-dock-query-respond="dockQueryRes($event)"
      @vd-dock-respond="dockRes($event)"
      @vd-drag-start="start($event)"
      @vd-drag-move="move($event)"
      @vd-drag-end="end($event)" />
  </div>
</template>

<script>
import Test from './Element';
import mockWS from '../mock/workspace.json';

export default {
  data() {
    return {
      pos: {
        x: 0,
        y: 0
      }
    }
  },
  components: {
    Test
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



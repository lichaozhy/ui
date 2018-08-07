<template>
  <div id="test-app">
    {{start}}
    {{move}}
    {{end}}
    <vd-ui-droppable
      style="position:relative"
      @vd-dock-query="move++"
      @vd-dock="end++"
      id="docker">
      <div style="height:100%;width:100%"></div>
      
    </vd-ui-droppable>

    <div class="element"
      :style="{
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }">
      <vd-ui-draggable
        v-model="pos"
        is-handle
        id="content"
        ref="drag"
        @vd-dock-allow=""
        @vd-dock="">
        <slot />
        <input type="number" v-model="pos.x" />
        <input type="number" v-model="pos.y" />
      </vd-ui-draggable>
    </div>
    <!-- <div id="content"
      style="position:relative"
      :style="{
        left: `${pos.x}px`,
        top: `${pos.y}px`
      }">
    </div> -->
<!--     
    <vd-ui-draggable
      id="content"
      ref="drag"
      @vd-dock-allow=""
      @vd-dock=""
      @vd-drag-start="start++"
      @vd-drag-move="move++"
      @vd-drag-end="setPos($event)">
      APP-TEST
    </vd-ui-draggable> -->

    <!-- <test
      @vd-drag-start="start++"
      @vd-drag-move="move++">test</test> -->
  </div>
</template>

<script>
import Test from './Element';
import mockWS from '../mock/workspace.json';

export default {
  data() {
    return {
      start: 0,
      move: 0,
      end: 0,
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
    test() {
      console.log('start drag')
    }
  }
}
</script>

<style>
.element {
  position: absolute;
}
</style>



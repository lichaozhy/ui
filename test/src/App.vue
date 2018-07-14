<template>
  <div id="test-app">
    <vd-ui-droppable id="docker">

    </vd-ui-droppable>

    <div id="content">
      <vd-ui-draggable
        @vd-drag-start="test()">
        APP-TEST
      </vd-ui-draggable>
    </div>
  </div>
</template>

<script>
import mockWS from '../mock/workspace.json';

export default {
  data() {
    return {
      mockWS,
      haha: 1
    }
  },
  methods: {
    test() {
      console.log('start drag')
    }
  }
}
</script>

<style lang="less">
#docker {
  background: #f0f0f0;
  width: 1024px;
  height: 768px;
  top: 0;
  left: 0;
}

#content {
  width: 64px;
  height: 64px;
  background: red;
  opacity: .4;
}
</style>

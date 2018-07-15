<template>
  <vd-ui-draggable
    v-model="pos"
    id="content"
    ref="drag"
    @vd-dock-allow=""
    @vd-dock=""
    @vd-drag-end="setPos($event)">
    <slot />
    <input type="number" v-model="pos.x" />
    <input type="number" v-model="pos.y" />
  </vd-ui-draggable>
</template>

<script>
export default {
  data() {
    return {
      pos: {
        x: 0,
        y: 0
      }
    }
  },
  methods: {
    setPos({ x, y }) {
      this.pos.x = x;
      this.pos.y = y;
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
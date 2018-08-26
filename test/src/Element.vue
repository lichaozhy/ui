<template>

<div id="content">
  <p v-vd-handle>hei</p>
</div>

</template>

<script>
import { vdDraggable, vdDroppable } from '../../';

export default {
  mixins: [
    vdDraggable,
    vdDroppable
  ]
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
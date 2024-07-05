<script setup lang="ts">

import {computed, inject} from "vue";
import type {Point2D} from "../types.ts";

const canvasSize = inject('canvas-size') as Point2D;

const viewBox = computed(() => {
  return `0 0 ${canvasSize.x} ${canvasSize.y}`;
});
</script>

<template lang="pug">
  svg.operation(:width="canvasSize.x" :height="canvasSize.y" :viewBox="viewBox")
    rect(x="50" y="50" width="50" height="50" fill="pink" stroke="black" stroke-width="2")
</template>

<style scoped lang="less">
@import "../styles/funcs";

svg.operation {
  .canvas_svg();
}

</style>
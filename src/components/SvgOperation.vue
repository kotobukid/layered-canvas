<script setup lang="ts">
import {computed, inject} from "vue";
import type {Point2D} from "../types.ts";
import {useStrokeStore} from "../stores/stroke.ts";

const strokeStore = useStrokeStore();

const canvasSize = inject('canvas-size') as Point2D;

const viewBox = computed(() => {
  return `0 0 ${canvasSize.x} ${canvasSize.y}`;
});
</script>

<template lang="pug">
  svg.operation(
    :width="canvasSize.x" :height="canvasSize.y" :viewBox="viewBox"
    @pointerdown="strokeStore.start_drawing"
    @pointerup="strokeStore.stop_drawing"
    @pointerleave="strokeStore.stop_drawing"
    @pointermove="strokeStore.move_drawing"
  )
    g.no_events.preview(v-if="strokeStore.points_raw.length > 1")
      g.circles
        circle(v-for="p in strokeStore.points_reduced" :cx="p.x" :cy="p.y" r="2" fill="white" stroke="red" stroke-width="1")
      path(:d="strokeStore.d" stroke-width="1" stroke="blue" fill="transparent")
</template>

<style scoped lang="less">
@import "../styles/funcs";

svg.operation {
  .canvas_svg();
}

g.no_events {
  pointer-events: none;
}
</style>
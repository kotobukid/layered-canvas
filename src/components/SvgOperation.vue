<script setup lang="ts">
import {computed, inject, ref, type Ref} from "vue";
import type {Point2D} from "../types.ts";

const canvasSize = inject('canvas-size') as Point2D;

const viewBox = computed(() => {
  return `0 0 ${canvasSize.x} ${canvasSize.y}`;
});

let drawing = false;
let points: Point2D[] = [];
const points_to_draw: Ref<Point2D[]> = ref([]);

const start_drawing = (e: PointerEvent) => {
  drawing = true;
  points = [{x: e.offsetX, y: e.offsetY}];
};

const stop_drawing = (e: PointerEvent) => {
  if (drawing) {
    drawing = false;
    points.push({
      x: e.offsetX,
      y: e.offsetY
    });
    points_to_draw.value = [...points];
  }
};

const move_draw = (e: PointerEvent) => {
  if (drawing) {
    points.push({
      x: e.offsetX,
      y: e.offsetY
    });
  }
};

const d = computed(() => {
  return points_to_draw.value.map((point, index) => {
    const prefix = index === 0 ? 'M' : 'L';
    return `${prefix}${point.x},${point.y}`;
  }).join(' ');
});
</script>

<template lang="pug">
  svg.operation(
    :width="canvasSize.x" :height="canvasSize.y" :viewBox="viewBox"
    @pointerdown="start_drawing"
    @pointerup="stop_drawing"
    @pointerleave="stop_drawing"
    @pointermove="move_draw"
  )
    g.no_events.preview
      g.circles
        circle(v-for="p in points_to_draw" :cx="p.x" :cy="p.y" r="2" fill="white" stroke="red" stroke-width="1")
      path(:d="d" stroke-width="1" stroke="blue" fill="transparent")
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
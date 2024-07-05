<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import type {Point2D} from "../types.ts";
import {useStroke} from "../composables/stroke.ts";

const epsilon = inject('epsilon') as Ref<number>;

const {
  d,
  start_drawing,
  stop_drawing,
  move_drawing,
  points_raw,
  points_reduced
} = useStroke(epsilon);

const canvasSize = inject('canvas-size') as Point2D;

const viewBox = computed(() => {
  return `0 0 ${canvasSize.x} ${canvasSize.y}`;
});
</script>

<template lang="pug">
  svg.operation(
    :width="canvasSize.x" :height="canvasSize.y" :viewBox="viewBox"
    @pointerdown="start_drawing"
    @pointerup="stop_drawing"
    @pointerleave="stop_drawing"
    @pointermove="move_drawing"
  )
    g.no_events.preview(v-if="points_raw.length > 1")
      g.circles
        circle(v-for="p in points_reduced" :cx="p.x" :cy="p.y" r="2" fill="white" stroke="red" stroke-width="1")
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
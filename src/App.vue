<script setup lang="ts">
import type {BrushColor, Point2D} from "./types.ts";
import CanvasBackground from "./components/CanvasBackground.vue";
import SvgOperation from "./components/SvgOperation.vue";
import ColorOption from "./components/ColorOption.vue";
import {provide, ref, type Ref} from "vue";

const brushColor: Ref<BrushColor> = ref({
  fill: "#ff000088",
  stroke: "#0000ffff",
  strokeWidth: 5
});


provide('brush-color', brushColor);

const canvasSize: Point2D = {
  x: 1000,
  y: 800
};

provide('canvas-size', canvasSize);

</script>

<template lang="pug">
  ColorOption
  .container
    CanvasBackground
    SvgOperation
</template>

<style scoped>
.container {
    position: relative;
}
</style>

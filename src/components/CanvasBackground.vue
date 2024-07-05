<script setup lang="ts">
import {onMounted, ref, inject, type Ref} from "vue";
import type {BrushColor} from "../types.ts";

const canvas = ref(null);
let ctx: CanvasRenderingContext2D = null;

const brushColor = inject('brush-color') as Ref<BrushColor>;

let painting = false;

onMounted(() => {
  ctx = canvas.value.getContext("2d");

  ctx.fillStyle = brushColor.value.stroke;
  ctx.strokeStyle = 'transparent';
  // ctx.strokeStyle = brushColor.value.fill;
  ctx.lineWidth = brushColor.value.strokeWidth;

  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
});

const start_painting = (e: PointerEvent) => {
  painting = true;

  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, brushColor.value.strokeWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
};

const stop_painting = (e: PointerEvent) => {
  painting = false;
};

const paint_move = (e: PointerEvent) => {
  if (painting) {
    ctx.beginPath();
    ctx.arc(e.offsetX, e.offsetY, brushColor.value.strokeWidth / 2, 0, 2 * Math.PI);
    ctx.fill();
  }
};
</script>

<template lang="pug">
  canvas.background(
    ref="canvas" width="1000" height="600"
    @pointerdown="start_painting"
    @pointerleave="stop_painting"
    @pointerup="stop_painting"
    @pointermove="paint_move"
  )
</template>

<style scoped>
canvas.background {
  outline: 1px solid grey;
}
</style>
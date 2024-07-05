<script setup lang="ts">
import {onMounted, ref, inject, type Ref} from "vue";
import type {BrushColor, Point2D} from "../types.ts";

const canvas = ref(null);
let ctx: CanvasRenderingContext2D = null;

const brushColor = inject('brush-color') as Ref<BrushColor>;

let painting = false;
let lastPoint: Point2D = {
  x: 0,
  y: 0
};

const update_brush = () => {
  ctx.fillStyle = brushColor.value.stroke;
  ctx.strokeStyle = brushColor.value.stroke;
  ctx.lineWidth = brushColor.value.strokeWidth;
  ctx.lineCap = 'round';
};

onMounted(() => {
  ctx = canvas.value.getContext("2d");

  update_brush();
});

const start_painting = (e: PointerEvent) => {
  painting = true;

  lastPoint = {
    x: e.offsetX,
    y: e.offsetY
  };

  update_brush();

  ctx.beginPath();
  ctx.arc(e.offsetX, e.offsetY, brushColor.value.strokeWidth / 2, 0, 2 * Math.PI);
  ctx.fill();
};

const stop_painting = () => {
  painting = false;
};

const paint_move = (e: PointerEvent) => {
  if (painting) {
    const nextPoint: Point2D = {
      x: e.offsetX,
      y: e.offsetY
    };

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(nextPoint.x, nextPoint.y);

    ctx.stroke();

    lastPoint = {...nextPoint};
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
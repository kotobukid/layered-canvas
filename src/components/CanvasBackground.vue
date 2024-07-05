<script setup lang="ts">
import {onMounted, ref, inject, type Ref} from "vue";
import type {BrushColor} from "../types.ts";

const canvas = ref(null);
const brushColor = inject('brush-color') as Ref<BrushColor>;

onMounted(() => {
  const ctx: CanvasRenderingContext2D = canvas.value.getContext("2d");

  ctx.fillStyle = brushColor.value.fill;
  ctx.strokeStyle = brushColor.value.stroke;
  ctx.lineWidth = brushColor.value.strokeWidth;

  ctx.fillRect(25, 25, 100, 100);
  ctx.clearRect(45, 45, 60, 60);
  ctx.strokeRect(50, 50, 50, 50);
});
</script>

<template lang="pug">
  canvas.background(ref="canvas" width="1000" height="600")
</template>

<style scoped>
canvas.background {
  outline: 1px solid grey;
}
</style>
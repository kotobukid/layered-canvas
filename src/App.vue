<script setup lang="ts">
import type {BrushColor} from "./types.ts";
import CanvasBackground from "./components/CanvasBackground.vue";
import ColorOption from "./components/ColorOption.vue";
import {provide, ref, type Ref} from "vue";

const brushColor: Ref<BrushColor> = ref({
  fill: "#ff000088",
  stroke: "#0000ffff",
  strokeWidth: 5
});

provide('brush-color', brushColor);
</script>

<template lang="pug">
  ColorOption
  CanvasBackground
</template>

<style scoped>
</style>

<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import type {BrushColor} from "../types.ts";
import {useStrokeStore} from "../stores/stroke.ts";

const brushColor = inject('brush-color') as Ref<BrushColor>;

const stroke = computed(() => {
  return `background-color: ${brushColor.value.stroke};`;
});

const fill = computed(() => {
  return `background-color: ${brushColor.value.fill};`;
});

const width_changed = (e: InputEvent) => {
  brushColor.value.strokeWidth = Number((<HTMLInputElement>e.target).value);
};

const strokeStore = useStrokeStore();

const ep_changed = (e: InputEvent) => {
  strokeStore.set_epsilon(Number((<HTMLInputElement>e.target).value));
};
</script>

<template lang="pug">
  .color_option
    label.content
      span.name Width
      input.width(
        type="number"
        :value="brushColor.strokeWidth"
        @change="width_changed"
      )
    label.content
      span.name Stroke
      span.stroke.preview(:style="stroke")
    label.content
      span.name Fill
      span.fill.preview(:style="fill")
    label.content
      span.name 間引き
      input(type="range" :value="strokeStore.epsilon" @input="ep_changed" step="0.05" min="0.1" max="10")
      span {{ strokeStore.epsilon.toFixed(2) }}

</template>

<style scoped lang="less">
.color_option {
  padding: 5px;
  margin-bottom: 5px;
}

label.content {
  display: inline-block;
  margin: 0 5px;
}

span.name {
  display: inline-block;
  margin-right: 5px;
}

input[type="number"].width {
  width: 3rem;
  text-align: right;
}

input[type="range"] {
  width: 200px;
}

.preview {
  width: 1rem;
  height: 1rem;
  display: inline-block;;

  &:after {
    content: ' ';
  }
}

</style>
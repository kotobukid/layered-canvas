<script setup lang="ts">
import {computed, inject, type Ref} from "vue";
import type {BrushColor} from "../types.ts";

const brushColor = inject('brush-color') as Ref<BrushColor>;

const stroke = computed(() => {
  return `background-color: ${brushColor.value.stroke};`;
});

const fill = computed(() => {
  return `background-color: ${brushColor.value.fill};`;
});

const width_changed = (e: Event) => {
  const width = e.target.value;
  brushColor.value.strokeWidth = Number(width);
};
</script>

<template lang="pug">
  .color_option
    label.content
      span.name Width
      input.width(type="number"
        :value="brushColor.strokeWidth"
        @change="width_changed"
      )
    label.content
      span.name Stroke
      span.stroke.preview(:style="stroke")
    label.content
      span.name Fill
      span.fill.preview(:style="fill")

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

input.width {
  width: 3rem;
  text-align: right;
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
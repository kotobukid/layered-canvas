import type {Point2D} from "../types.ts";
import {computed, type Ref, ref, watch} from "vue";
import {useInterpolation} from "./interpolation.ts";

export const useStroke = (epsilon: Ref<number>) => {
    const points_raw: Ref<Point2D[]> = ref([]);
    const drawing: Ref<boolean> = ref(false);
    const points_reduced: Ref<Point2D[]> = ref([]);

    const {douglasPeucker} = useInterpolation();

    const start_drawing = (e: PointerEvent): void => {
        drawing.value = true;
        points_raw.value = [{
            x: e.offsetX,
            y: e.offsetY
        }];
    };

    const stop_drawing = (e: PointerEvent): void => {
        if (drawing.value) {
            drawing.value = false;
            points_raw.value.push({
                x: e.offsetX,
                y: e.offsetY
            });

            points_reduced.value = douglasPeucker(points_raw.value, 0, points_raw.value.length, epsilon.value);
        }
    };

    const move_drawing = (e: PointerEvent): void => {
        if (drawing.value) {
            points_raw.value.push({
                x: e.offsetX,
                y: e.offsetY
            });
        }
    };

    const d = computed(() => {
        return points_reduced.value.map((point: Point2D, index: number): string => {
            const prefix: string = index === 0 ? 'M' : 'L';
            return `${prefix}${point.x},${point.y}`;
        }).join(' ');
    });

    watch(epsilon, (next: number, old: number): void => {
        points_reduced.value = douglasPeucker(points_raw.value, 0, points_raw.value.length, next);
    });

    return {
        d,
        drawing: computed(() => drawing.value),
        points_raw: computed(() => points_raw.value),
        points_reduced: computed(() => points_reduced.value),
        start_drawing,
        stop_drawing,
        move_drawing,
    };
};
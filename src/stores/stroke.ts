import {defineStore} from "pinia";
import {Point2D} from "../types.ts";
import {useInterpolation} from "../composables/interpolation.ts";

const {douglasPeucker} = useInterpolation();

type State = {
    drawing: boolean,
    epsilon: number,
    points_raw: Point2D[],
    points_reduced: Point2D[]
};

type Actions = {
    set_epsilon: (ep: number) => void,
    start_drawing: (e: PointerEvent) => void,
    stop_drawing: (e: PointerEvent) => void,
    move_drawing: (e: PointerEvent) => void,
};

type Getters = {
    d: () => string
};

export const useStrokeStore = defineStore<'stroke', State, Actions, Getters>('stroke', {
    state() {
        return {
            drawing: false,
            epsilon: 1.5,
            points_raw: [] as Point2D[],
            points_reduced: [] as Point2D[]
        }
    },
    actions: {
        set_epsilon(ep: number): void {
            this.epsilon = ep;
            this.points_reduced = douglasPeucker(this.points_raw, 0, this.points_raw.length, this.epsilon);
        },
        start_drawing(e: PointerEvent): void {
            this.drawing = true;
            this.points_raw = [{
                x: e.offsetX,
                y: e.offsetY
            }];
        },
        stop_drawing(e: PointerEvent): void {
            if (this.drawing) {
                this.drawing = false;
                this.points_raw.push({
                    x: e.offsetX,
                    y: e.offsetY
                });

                this.points_reduced = douglasPeucker(this.points_raw, 0, this.points_raw.length, this.epsilon);
            }
        },
        move_drawing(e: PointerEvent): void {
            if (this.drawing) {
                this.points_raw.push({
                    x: e.offsetX,
                    y: e.offsetY
                });
            }
        }
    },
    getters: {
        d(): string {
            return this.points_reduced.map((point: Point2D, index: number): string => {
                const prefix: string = index === 0 ? 'M' : 'L';
                return `${prefix}${point.x},${point.y}`;
            }).join(' ');
        }
    }
});
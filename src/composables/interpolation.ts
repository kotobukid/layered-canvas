import type {Point2D} from "../types.ts";

function perpendicularDistance(point: Point2D, p: Point2D, q: Point2D) {
    const a: number = q.y - p.y
    const b: number = p.x - q.x
    const c: number = p.x * (p.y - q.y) - p.y * (p.x - q.x)
    return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b)
}

// Ramer-Douglas-Peucker algorithm.
// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
function douglasPeucker(pointList: Point2D[], start: number, end: number, epsilon: number): Point2D[] {
    // Find the point with the maximum distance.
    const n: number = end - start
    let dmax: number = 0
    let index: number = (n >> 1) + start
    for (let i: number = start; ++i < end - 1;) {
        let d: number = perpendicularDistance(pointList[i], pointList[start], pointList[end - 1])
        if (d > dmax) {
            index = i
            dmax = d
        }
    }

    // If max distance is greater than epsilon, recursively simplify
    if (dmax > epsilon) {
        // Recursive call
        const recResults1: Point2D[] = douglasPeucker(pointList, start, index + 1, epsilon)
        const recResults2: Point2D[] = douglasPeucker(pointList, index, end, epsilon)

        // Build the result list
        for (let i: number = 1; i < recResults2.length; ++i)
            recResults1.push(recResults2[i])

        // Check the validity of the result and return
        return recResults1.every(point => point !== undefined) ? recResults1 : []
    } else {
        const results: Point2D[] = [pointList[start], pointList[end - 1]]

        // Check the validity of the result and return
        return results.every((point: Point2D): boolean => point !== undefined) ? results : []
    }
}

export const useInterpolation = () => {
    return {
        douglasPeucker
    };
};
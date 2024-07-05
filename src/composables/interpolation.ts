function perpendicularDistance(point, p, q) {
  const a = q.y - p.y
  const b = p.x - q.x
  const c = p.x * (p.y - q.y) - p.y * (p.x - q.x)
  return Math.abs(a * point.x + b * point.y + c) / Math.sqrt(a * a + b * b)
}

// Ramer-Douglas-Peucker algorithm.
// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
function douglasPeucker(pointList, start, end, epsilon) {
    // Find the point with the maximum distance.
    const n = end - start
    let dmax = 0
    let index = (n >> 1) + start
    for (let i = start; ++i < end - 1;) {
        let d = perpendicularDistance(pointList[i], pointList[start], pointList[end - 1])
        if (d > dmax) {
            index = i
            dmax = d
        }
    }

    // If max distance is greater than epsilon, recursively simplify
    if (dmax > epsilon) {
        // Recursive call.
        const recResults1 = douglasPeucker(pointList, start, index + 1, epsilon)
        const recResults2 = douglasPeucker(pointList, index, end, epsilon)

        // Build the result list.
        for (let i = 1; i < recResults2.length; ++i)
            recResults1.push(recResults2[i])
        return recResults1
    } else {
        return [pointList[start], pointList[end - 1]]
    }
}

export const useInterpolation = () => {
    return {
        douglasPeucker
    };
};
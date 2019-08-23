
/**
 * Rotates point around given center.
 * 
 * @param {Vector3} point 
 * @param {Vector3} center 
 * @param {number} angle 
 */
export function rotatePoint(point, center, angle) {
    let radians = (Math.PI / 180) * angle,
        cos = Math.cos(radians),
        sin = Math.sin(radians),
        nx = (cos * (point.x - center.x)) + (sin * (point.z - center.z)) + center.x,
        nz = (cos * (point.z - center.z)) - (sin * (point.x - center.x)) + center.z,
        ny = point.y;
    return new Engine.Vector3(nx, ny, nz);
}
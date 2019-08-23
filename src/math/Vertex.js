import Vector from "./Vector3";

export default class Vertex {
    constructor(x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.normal = new Vector();
    }

    clone() {
        return new Vertex(this.x, this.y, this.z);
    }


    /**
     * Applies transformation matrix to the vertex.
     * @param {Matrix} matrix
     * @return {Vertex}
     */
    applyTransform(matrix) {
        // TODO: Implement vertex transformation using matrix.
    }
}

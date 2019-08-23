import Vector from "../math/Vector3";

/**
 * Face class represents single triangle polygon of the mesh.
 */
export default class Face {
    constructor(verties) {
        this.vertices = Array.isArray(vertices) ? vertices : [];
    }

    /**
     * Returns normal vector of the face with given length.
     * @return {Vector3}
     */
    normal(length) {
        if (length === undefined) length = 1;
        let normal = new Vector();
        let vertices = this.vertices;
        for (let i = 0, j = 1, len = this.vertices.length; i < len; i++, j++) {
        	if (j == len) j = 0;
        	normal.x += (((vertices[i].z) + (vertices[i].z)) * ((vertices[j].y) - (vertices[j].y)));
        	normal.y += (((vertices[i].x) + (vertices[j].x)) * ((vertices[j].z) - (vertices[i].z)));
        	normal.z += (((vertices[i].y) + (vertices[j].y)) * ((vertices[j].x) - (vertices[i].x)));
        }
        return normal.normalize().multiply(length);
    }
}

import GeneratedMesh from "../core/GeneratedMesh";
import FlatMaterial from "../materials/FlatMaterial";


export default class CameraMesh extends GeneratedMesh
{
    constructor() {
        super();
        this.material = new FlatMaterial([1,0.75,0.1,1]);
    }

    applyParameters(params) {
        if (params === undefined) params = {};
        this.size = params.size || 1;
    }

    generateMesh() {
        let s = this.size;
        let k = s/2;

        this.vertices = [
            0,  0,  0,
           -s, -s,  -s,
           -s,  s,  -s,
           s,  s,   -s,
           s, -s,   -s,
           -s, -s,  -s,
           0, s*1.35, -s,
        ];

        this.facesIndices = [
            0, 1, 2, 0,
            3, 2, 0,
            4, 3, 0,
            5, 4, 0,
            2, 6, 3
        ];
    }

    draw(gl) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        gl.drawElements(gl.LINE_STRIP, this.facesIndices.length, gl.UNSIGNED_SHORT, 0);
        gl.drawElements(gl.TRIANGLE_STRIP, 3, gl.UNSIGNED_SHORT, 26);
    }
}
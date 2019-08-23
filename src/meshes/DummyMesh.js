import GeneratedMesh from "../core/GeneratedMesh";
import FlatMaterial from "../materials/FlatMaterial";


export default class DummyMesh extends GeneratedMesh
{
    constructor(params) {
        super(params);
        this.material = new FlatMaterial([1,0.75,0.1,1]);
    }

    applyParameters(params) {
        if (params === undefined) params = {};
        this.size = params.size || 10;
    }

    generateMesh() {
        let s = this.size/2;

        this.vertices = [
            -s, -s, -s,
             s, -s, -s,
             s, -s, -s,
             s,  s, -s,
             s,  s, -s,
            -s,  s, -s,
            -s,  s, -s,
            -s, -s, -s,
            -s,  s, -s,
            -s,  s,  s,
            -s,  s,  s,
            -s, -s,  s,
            -s, -s,  s,
            -s, -s, -s,
            -s,  s,  s,
             s,  s,  s,
             s,  s,  s,
             s, -s,  s,
             s, -s,  s,
            -s, -s,  s,
             s,  s,  s,
             s,  s, -s,
             s, -s, -s,
             s, -s,  s
        ];
    }

    draw(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.drawArrays(gl.LINES, 0, this.vertices.length/3);
    }
}
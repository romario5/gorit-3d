import GeneratedMesh from "../core/GeneratedMesh";
import AxisMaterial from "../materials/AxisMaterial";

export default class AxisGuides extends GeneratedMesh
{
    constructor(params) {
        super(params);
        this.material = new AxisMaterial({color: [1, 1, 1, 1]});
    }


    applyParameters(params) {
        this.size = params.size || 50;
    }


    generateMesh() {
        let s = this.size/2;

        this.vertices = [
             s,  0,  0,
            -s,  0,  0,
             //0,  s,  0,
             //0, -s,  0,
             0,  0,  s,
             0,  0, -s
        ];
        this.facesIndices = [
            0, 1, 2, 3, 4, 5
        ];
    }

    draw(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.drawArrays(gl.LINES, 0, this.vertices.length/3);
    }
}

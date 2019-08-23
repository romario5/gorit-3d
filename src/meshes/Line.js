import GeneratedMesh from "../core/GeneratedMesh";
import FlatMaterial from "../materials/FlatMaterial";
import Vector3 from "../math/Vector3";
import Color from "../math/Color";


export default class Line extends GeneratedMesh
{
    constructor(params) {
        super(params);

        this.material = new FlatMaterial([1,0.75,0.1,1]);

        this.start.onChange(() => this.generateMesh());
        this.end.onChange(() => this.generateMesh());
        this.color.onChange(c => this.material.color = c.asArray());
    }

    applyParameters(params) {
        this.color = new Color(1, 0.75, 0.1, 1);
        this.start = new Vector3();
        this.end = new Vector3();

        if (params !== undefined && params.color instanceof Color) {
            this.color.copyValuesFrom(params.color);
        }
    }

    generateMesh() {
        this.vertices = [
            this.start.x, this.start.y, this.start.z,
            this.end.x,   this.end.y,   this.end.z
        ];
        this.updateBuffers = true;
    }

    draw(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.drawArrays(gl.LINES, 0, this.vertices.length/3);
    }
}
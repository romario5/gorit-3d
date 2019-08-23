import GeneratedMesh from "../core/GeneratedMesh";
import FlatMaterial from "../materials/FlatMaterial";
import Color from "../math/Color";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";

export default class PointLightMesh extends GeneratedMesh
{
    constructor(params) {
        super(params);
        this.name = params.name || 'Point light mesh';
        if (params === undefined) params = {};
        if (!params.color) params.color = Color.HELPERS;
        this.material = new FlatMaterial(params.color);

        this.matrix = new Matrix4();
        this.lookAtMatrix = new Matrix4();
    }


    applyParameters(params) {
        if (params === undefined) params = {};
        this.size = params.size || 2;
        this.interpolation = params.interpolation || 10;
        this.secondCircleOffset = 0;
    }


    generateMesh() {
        this.vertices = [];

        let step = 2/(this.interpolation - 1);
        let r = this.size/2;
        let PI2 = 2 * Math.PI;

        let j = 0;
        for (let i = 0; i <= PI2; i += step) {
            this.vertices.push(r*Math.sin(i), r*Math.cos(i), 0);
            if (j > 0) {
                this.facesIndices.push(j-1, j);
            }
            j++;
        }

        this.secondCircleOffset = this.vertices.length;

        r = this.size/2.5;
        j = 0;
        for (let i = 0; i <= PI2; i += step) {
            this.vertices.push(r*Math.sin(i), r*Math.cos(i), 0);
            if (j > 0) {
                this.facesIndices.push(j-1, j);
            }
            j++;
        }
    }


    makeFinalTransformMatrix(matrix, viewport) {
        this.matrix.copyValuesFrom(matrix);
        this.lookAtMatrix = Matrix4.createFromQuaternion(viewport.camera._rotationQ);
        return this.matrix.multiply(this.lookAtMatrix);
    }

    draw(gl) {
        let cullFaceEnabled = gl.isEnabled(gl.CULL_FACE);
        gl.disable(gl.CULL_FACE);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.drawArrays(gl.LINE_LOOP, 0, this.secondCircleOffset/3);
        gl.drawArrays(gl.TRIANGLE_FAN, this.secondCircleOffset/3, (this.vertices.length - this.secondCircleOffset)/3);

        if (cullFaceEnabled) {
            gl.enable(gl.CULL_FACE);
        }
    }
}

import GeneratedMesh from "../core/GeneratedMesh";
import AxisMaterial from "../materials/AxisMaterial";
import Color from "../math/Color";

export default class LinedPlane extends GeneratedMesh
{
    constructor(params) {
        super(params);
        this.material = new AxisMaterial(params);
    }


    applyParameters(params) {
        this.width  = params.width  || 50;
        this.height = params.height || 50;
        this.edgesX = params.edgesX || 50;
        this.edgesY = params.edgesY || 50;
    }


    generateMesh() {
        let vertices = [];
        let polygons = [];
        let indices = [];
        let normals = [];

        let stepX = Math.floor(this.width / this.edgesX);
        let stepY = Math.floor(this.height / this.edgesY);

        let halfW = this.width/2;
        let halfH = this.height/2;

        let j = 0;
        for (let yi = 0; yi < this.edgesY + 1; yi++) {
            vertices.push(-halfW, 0, yi * stepY - halfH);
            vertices.push(halfW, 0, yi * stepY - halfH);
            indices.push(j++, j++);
        }
        for (let xi = 0; xi < this.edgesX + 1; xi++) {
            vertices.push(xi * stepX - halfW, 0, -halfH);
            vertices.push(xi * stepX - halfW, 0, halfH);
            indices.push(j++, j++);
        }

        this.vertices = vertices;
        this.facesIndices = indices;
    }
    
    draw(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.drawArrays(gl.LINES, 0, this.vertices.length/3);
    }
}

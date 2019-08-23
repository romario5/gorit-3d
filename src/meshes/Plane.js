import GeneratedMesh from "../core/GeneratedMesh";

export default class Plane extends GeneratedMesh
{
    constructor(params) {
        super(params);
    }


    applyParameters(params) {
        this.width  = params.width || 200;
        this.height = params.height || 200;
        this.edgesX = params.edgesX || 1;
        this.edgesY = params.edgesY || 1;
    }


    generateMesh() {
        let vertices = [];
        let polygons = [];
        let indices = [];
        let normals = [];

        let stepX = this.width / this.edgesX;
        let stepY = this.height / this.edgesY;

        let k = 0;
        let inverse = false;
        for (let xi = 0; xi < this.edgesX + 1; xi++) {
            for (let yi = 0; yi < this.edgesY + 1; yi++) {

                let y2i = inverse ? this.edgesY - yi : yi;
                let x = -this.width/2 + (stepX * xi);
                let y = -this.height/2 + (stepY * y2i);

                let d = createPolygon(x, y, stepX, stepY, k);
                k += 4;

                vertices.push(...d.vertices);
                polygons.push(d.polygon);
                indices.push(...d.indices);
                normals.push(...d.normals);
            }
            inverse = !inverse;
        }

        this.vertices = vertices;
        this.polygons = polygons;
        this.facesIndices = indices;
        this.normals = normals;
    }
}


function createPolygon(x, y, width, height, k) {
    return {
        vertices: [
            x, 0, y,
            x + width, 0, y,
            x + width, 0, y + height,
            x, 0, y + height
        ],
        indices: [k+0, k+1, k+3, k+2, k+3, k+1],
        polygon: [k+0, k+1, k+2, k+3],
        normals: [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1
        ],
        textCoords: [0, 1]
    };
}

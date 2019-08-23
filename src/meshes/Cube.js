import GeneratedMesh from "../core/GeneratedMesh";
import FlatMaterial from "../materials/FlatMaterial";

export default class Cube extends GeneratedMesh
{
    constructor(params) {
        super(params);

        this.material = new FlatMaterial([1,0,1,1]);
    }


    applyParameters(params) {
        this.size = params.size || 100;
    }

    /**
     * Overrides mesh generation method.
     */
    generateMesh() {
        let s = this.size/2 || 0.5;

        let cornerVertices = [
            [-s, -s, -s],
            [+s, -s, -s],
            [-s, +s, -s],
            [+s, +s, -s],
            [-s, -s, +s],
            [+s, -s, +s],
            [-s, +s, +s],
            [+s, +s, +s],
        ];

        let faceNormals = [
            [+1, +0, +0],
            [-1, +0, +0],
            [+0, +1, +0],
            [+0, -1, +0],
            [+0, +0, +1],
            [+0, +0, -1],
        ];

        let uvCoords = [
            [1, 0],
            [0, 0],
            [0, 1],
            [1, 1],
        ];

        this.polygons = [
            [3, 7, 5, 1], // right
            [6, 2, 0, 4], // left
            [6, 7, 3, 2], // top
            [0, 1, 5, 4], // bottom
            [7, 6, 4, 5], // front
            [2, 3, 1, 0]  // back
        ];

        let normals = [];
        let positions = [];
        let texCoords = [];
        let indices = [];

        for (let f = 0; f < 6; f++) {
            const faceIndices = this.polygons[f];
            for (let v = 0; v < 4; v++) {
              const position = cornerVertices[faceIndices[v]];
              const normal = faceNormals[f];
              const uv = uvCoords[v];
      
                // Each face needs all four vertices because the normals and texture
                // coordinates are not all the same.
                positions.push(...position);
                normals.push(...normal);
                texCoords.push(...uv);
            
            }
            // Two triangles make a square face.
            const offset = 4 * f;
            indices.push(offset + 0, offset + 1, offset + 2);
            indices.push(offset + 0, offset + 2, offset + 3);
          }


        this.vertices = positions;
        this.facesIndices = indices;
        this.normals = normals;
        this.textureCoords = texCoords;
    }

    draw(gl) {
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        gl.drawElements(gl.LINE_LOOPS, this.facesIndices.length, gl.UNSIGNED_SHORT, 0);
    }
}

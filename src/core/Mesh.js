import Vertex from "../math/Vertex";
import Vector3 from "../math/Vector3";
import Polygon from "./Polygon";
import GLContext from "./Canvas";
import DefaultMaterial from "../materials/DefaultMaterial";
import gtNextId from "./IdGenerator";


/**
 * This class represents single mesh.
 * One object can contains few meshes and each can be rendered using specific
 * shader.
 * To reuse geometry information mesh can be a wrapper under another one.
 * Any transformation stored in the transformation matrix.
 */
export default class Mesh {
    constructor(cachedMesh) {
        this.id = gtNextId();

        /**
         * Array with all vertices.
         * Each vertex contains 3 components that follows in the array
         * one by one.
         * @var {number[]}
         * @see {Vertex}
         * @see {getVertex}
         */
        this.vertices = [];

        /**
         * Array that stores textures coordinates.
         * Each coordinate contains 3 components that follows in the array
         * one by one.
         * Must be read by 3.
         * @var {number[]}
         * @see {Vertex}
         */
        this.textureVertices = [];

        /**
         * Texture coordinates.
         * @var {number{}}
         */
        this.uv = [];

        /**
         * Array with vertices normals.
         * Each normal contains 3 components that follows in the array
         * one by one.
         * @var {number[]}
         * @see {Vector3}
         */
        this.normals = [];

        /**
         * Array that stores all polygons.
         * Polygon can contain 3 and more vertices.
         * Each item of the array must be a Polygon instance.
         * @var {Array[]}
         * @see {getPolygon}
         */
        this.polygons = [];

        /**
         * Array with indexes of triangles.
         * @var {number[]}
         * @see {getFace}
         */
        this.facesIndices = [];

        /**
         * Array of indices for the wireframe rendering.
         * @var {number[]}
         */
        this.wireframeIndices = [];

        /**
         * Material of the mesh.
         * @var {Material}
         */
        this.material = new DefaultMaterial();

        /**
         * Stores link to the mesh that holds all geometry information.
         * Used to prevent from keeping in memory a lot of clones.
         * Any method that uses geometry information must use cached mesh
         * first instead of internal properties.
         * @var {Mesh}
         */
        this.cachedMesh = cachedMesh || null;

        /**
         * Translation vector for the geometry.
         * Should be used for calculating real vertices positions.
         * Any methods that works with geometry sould use cached geometry
         * but must use self transformations.
         * @var {Vector3}
         */
        this.position = new Vector3();

        /**
         * Rotation vector.
         * Note that rotation will be processed using quaternion
         * but rotation setting may be set using euler angles.
         * @type {Vector3}
         */
        this.rotation = new Vector3();

        /**
         * Data buffers.
         * @type {null}
         */
        this.verticesBuffer = null;
        this.normalsBuffer = null;  
        this.indicesBuffer = null;
        this.wireBuffer = null;

        this.updateBuffers = true;
    }


    /**
     * Returns vertex with given index.
     * IMPORTANT: Counting begins from 0.
     * @return Vertex
     */
    getVertex(index, transformMatrix) {
        if (transformMatrix === undefined) {
            transformMatrix = this.transformMatrix;
        }
        // Call method on cached mesh if it exists.
        if (this.cachedMesh !== null) {
            return this.cachedMesh.getVertex(index, transformMatrix);
        }

        let startIndex = 0;
        if (this.vertices.length > index * 3 + 4) {
            startIndex = index * 3 + 1;
        }
        let vertex = new Vertex(
            this.vertices[index],
            this.vertices[index + 1],
            this.vertices[index + 2]
        );

        return vertex.applyTransform(transformMatrix);
    }

    /**
     * Returns polygon with given index.
     * IMPORTANT: Counting begins from 0.
     * @return {Polygon}
     */
    getPolygon(index) {

    }


    getFace(index) {

    }

    /**
     * Prepares material and buffers for rendering.
     * @param {WebGLProgram} program 
     * @param {WebGLRenderingContext} gl 
     */
    prepareForRendering(program, gl) {
        // Create vertices buffer.
        if (this.verticesBuffer === null) {
            this.verticesBuffer = gl.createBuffer();
        }
        if (this.updateBuffers) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW); 
        }


        // Create normals buffer.
        if (this.normalsBuffer === null || this.updateBuffers) {
            this.normalsBuffer = gl.createBuffer();
        }
        if (this.updateBuffers) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.normalsBuffer), gl.STATIC_DRAW);
        }
    
        
        // Create buffer for faces indices.
        if (this.indicesBuffer === null || this.updateBuffers) {
            this.indicesBuffer = gl.createBuffer();
        }
        if (this.updateBuffers) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.facesIndices), gl.STATIC_DRAW);
        }
    

        // Create buffer for wire indices.
        if (this.wireBuffer === null || this.updateBuffers) {
            this.wireBuffer = gl.createBuffer();
        }
        if (this.updateBuffers) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.wireframeIndices), gl.STATIC_DRAW);
        }

        this.updateBuffers = false;

        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        let positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalsBuffer);
        var normalLocation = gl.getAttribLocation(program, "a_normal");
        gl.enableVertexAttribArray(normalLocation);
        gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
    }

    /**
     * Allows to apply additional changes to the transformation matrix.
     * By default given matrix will be returned unchanged.
     * 
     * @param {Matrix4} matrix 
     * @param {Viewport} viewport 
     */
    makeFinalTransformMatrix(matrix, viewport) {
        return matrix;
    }

    /**
     * Renders meth in given viewport.
     * Transformation matrix is passed separately because each mesh 
     * inherits transforms of the parent objects.
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {Matrix4} transformMatrix 
     * @param {Viewport} viewport 
     */
    render(gl, transformMatrix, viewport) {
        this.material.compileShaders(gl);
        let program = this.material.getProgram();
        gl.useProgram(program);

        this.material.wireColor.a = 0;
        this.material.prepareForRendering(gl);

        this.prepareForRendering(program, gl);
        let matrixLocation = gl.getUniformLocation(program, "u_matrix");

        // Apply custom modifications to the transform matrix.
        transformMatrix = this.makeFinalTransformMatrix(transformMatrix, viewport);

        gl.uniformMatrix4fv(matrixLocation, false, transformMatrix.data);

        this.draw(gl);

        if (viewport.wireframe === true) {
            this.material.wireColor.a = 1;
            this.material.prepareForRendering(gl);
            this.drawWire(gl);
        }
    }

    /**
     * Draws a mesh.
     * @param {WebGLRenderingContext} gl 
     */
    draw(gl) {
        gl.bindBuffer(gl.ARRAY_BUFFER, this.verticesBuffer);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indicesBuffer);
        gl.drawElements(gl.TRIANGLES, this.facesIndices.length, gl.UNSIGNED_SHORT, 0);
    }

    /**
     * Draws wireframe of the mesh.
     * Rendering will be without face culling.
     * 
     * @param {WebGLRenderingContext} gl 
     */
    drawWire(gl) {
        let cullFaceEnabled = gl.isEnabled(gl.CULL_FACE);
        gl.disable(gl.CULL_FACE);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.wireBuffer);
        gl.drawElements(gl.LINES, this.wireframeIndices.length, gl.UNSIGNED_SHORT, 0);
        if (cullFaceEnabled) {
            gl.enable(gl.CULL_FACE);
        }
    }
}

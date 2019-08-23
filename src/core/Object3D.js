import getNextId from "./IdGenerator";
import Vector3 from "../math/Vector3";
import Quaternion from "../math/Quaternion";
import Matrix4 from "../math/Matrix4";
import ObjectsContainer from "./ObjectsContainer";
import Euler from "../math/Euler";

/**
 * Represents single 3D object.
 * Each 3d object has position, rotation and scale.
 * Also it can be rendered.
 */
export default class Object3D {
    constructor(name) {
        this.id = getNextId();
        this.name = name || '';

        // All meshes of the object.
        this.meshes = {};

        // Transform of the object.
        this.position = new Vector3();
        this.rotation = new Euler();
        this.scale = new Vector3();

        // Internal quaternion that stores orientation in the space.
        // All rotation changes are applied to the quaternion first and after that 
        // the euler angles are updated from this quaternion.
        this._rotationQ = new Quaternion();

        // Update internal quaternion when euler angles are changed.
        this.rotation.onChange(e => {
            this._rotationQ.setFromEuler(e, false);
        });

        // Update euler angles when quaternion is changed.
        this._rotationQ.onChange(q => {
            this.rotation.setFromQuaternion(q);
        });

        // Constraints that are applied to the object (such as LookAt or IK).
        this.constraints = [];

        // Container for helpers (other 3d objects that will not be rendered in production).
        // All helpers are not transformed by object's transform.
        // So if you use some helpers implement it own transform manipulation separately.
        // For example for camera the mesh position bound to the camera position.
        this.helpers = new ObjectsContainer();

        // Helpers that are available for displaying in the hierarchy tree.
        this.visibleHelpers = new ObjectsContainer();
    }

    /**
     * Adds helper to the object.
     * If visible is true it also adds object to the visible helpers container.
     * 
     * Note: Visible object can be displayed as nested objects in the hierarchy tree 
     * instead of general helpers that are used only for displaying some additional information, 
     * for example camera icon in the viewport.
     * 
     * @param {Object3D} obj 
     * @param {boolean} visible 
     */
    addHelper(obj, visible) {
        visible = visible === true;
        this.helpers.addObject(obj);
        if (visible) this.visibleHelpers.addObject(obj);
    }

    /**
     * Removes given object from helpers container.
     * 
     * @param {Object3D} obj 
     */
    removeHelper(obj) {
        this.helpers.removeObject(obj);
        this.visibleHelpers.removeObject(obj);
    }

    /**
     * Applies quaternion rotation.
     * Euler angles will be updated automatically.
     * 
     * @param {Quaternion} q 
     */
    rotateByQuaternion(q) {
        this._rotationQ.multiply(q);
    }

    /**
     * Adds constraint to the 3D object.
     * 
     * @param {Constraint} constraint 
     */
    addConstraint(constraint) {
        this.constraints.push(constraint);
    }

    /**
     * Adds mesh to the 3D object.
     * 
     * @param {Mesh}
     */
    addMesh(mesh) {
        this.meshes[mesh.id] = mesh;
    }

    /**
     * Removes mesh from the 3D object.
     * 
     * @param {Mesh} mesh 
     */
    removeMesh(mesh) {
        delete this.meshes[mesh.id];
    }

    /**
     * Creates translation matrix for the object.
     * 
     * @return {Matrix4}
     */
    getTranslationMatrix() {
        return Matrix4.createTranslation(this.position);
    }

    /**
     * Creates rotation matrix for the object.
     * 
     * @return {Matrix4}
     */
    getRotationMatrix() {
        return Matrix4.createFromQuaternion(this._rotationQ);
    }

    /**
     * Returns complete transformation matrix without applying constraints.
     * 
     * @return {Matrix4}
     */
    getTransformationMatrix() {
        let m = Matrix4.createTranslation(this.position);
        m.multiply(Matrix4.createFromQuaternion(this._rotationQ));
        return m;
    }

    /**
     * Applies all constraints to the given matrix.
     * 
     * @param {Matrix4} matrix 
     */
    applyConstraints(matrix) {
        for (let i = 0; i < this.constraints.length; i++) {
            this.constraints[i].applyTransformations(matrix);
        }
    }

    /**
     * Renders all meshes and helpers.
     * All objects except helpers inherit object transform.
     * 
     * @param {WebGLRenderingContext} gl 
     * @param {Matrix4} transformMatrix 
     * @param {boolean} renderWire
     */
    render(gl, transformMatrix, viewport) {


        // Compose transformation matrix.
        let matrix = transformMatrix
            .clone()
            .multiply(this.getTransformationMatrix());

        // Apply all constraints to this matrix.
        this.applyConstraints(matrix);

        // Render meshes of the objects.
        for (let p in this.meshes) {
            this.meshes[p].render(gl, matrix, viewport);
        }

        // Render helpers with initial transform matrix (without object transforms and constraints).
        for (let p in this.helpers.objects) {
            this.helpers.objects[p].render(gl, transformMatrix, viewport);
        }
    }
}

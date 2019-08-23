import Constraint from "./Constraint";
import Matrix4 from "../math/Matrix4";
import Vector3 from "../math/Vector3";

export default class LookAt extends Constraint
{
    constructor(obj, params) {
        super(obj);

        this.from = params.from || null;
        this.target = params.target || null;
    }

    applyTransformations(matrix) {
        let up = new Vector3(0, 1, 0);
        if (this.target === null) return;
        let m = Matrix4.lookAt(this.object.position.clone().sub(this.target), up.applyQuaternion(this.object._rotationQ));
        matrix.multiply(m);
        return matrix;
    }
}
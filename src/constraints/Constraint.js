export default class Constraint
{
    constructor(obj) {
        this.object = obj;
    }

    /**
     * Modifies given matrix depending on constraint.
     * 
     * @param {Matrix4} matrix 
     */
    applyTransformations(matrix) {
        // Implement this method in the subclass.
    }
}
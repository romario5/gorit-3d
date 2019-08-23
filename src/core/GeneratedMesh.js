import Mesh from "./Mesh";

/**
 * Class that represents parametrizied mesh (like box, cylinder, cone, etc.).
 * User should extend this class and implement his own generation algorythm.
 */
export default class GeneratedMesh extends Mesh {
    constructor(params) {
        super();
        params = params || {};
        this.applyParameters(params);
        this.generateMesh();
    }

    applyParameters(params) {
        // This method will be impemented in the subclass.
    }

    generateMesh() {
        // This method will be impemented in the subclass.
    }
}

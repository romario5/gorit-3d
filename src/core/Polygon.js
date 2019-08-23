import Face from "./Face";

/**
 * Polygon represents single polygon with 3 and more vertices.
 */
export default class Polygon extends Face {
    constructor() {
        super();
    }


    /**
     * Overrides default normal calculating because
     * quantity of triangles is more than 3.
     */
    normal() {
        // TODO: Implement polygon normal calculating.
    }
}

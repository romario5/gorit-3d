import Vector3 from "../math/Vector3";

/**
 * Represents single cell of the grid.
 */
export default class Cell
{
    constructor(size) {
        /**
         * Size of the cell.
         * @var {float}
         */
        this.size = size;

        /**
         * Objects of the cell.
         * @var {Object}
         */
        this.data = {};

        /**
         * Coordinates of the cell start.
         * The end of cell is coordinate + size.
         */
        this.position = new Vector3();
    }
}
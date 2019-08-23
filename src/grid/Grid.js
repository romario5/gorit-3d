/**
 * Grid is a structure that allows to separate objects in 3D space by coords.
 * The purpose of the grid is to limit quantity of objects that will be processed.
 */

 export default class Grid
 {
    constructor(params) {
        // Minimal cell size.
        this.minCellSize = 1;

        // Maximum cell size.
        this.maxCellSize = 100;

        
        /**
         * Storage of all cells levels.
         * An index of the array describes cell size 
         * and the value is and object that stores all cells of the level.
         */
        this.data = {};
    }
 }
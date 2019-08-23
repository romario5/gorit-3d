import getNextId from "./IdGenerator";

export default class ObjectsContainer {
    constructor (name) {
        this.id = getNextId();
        this.name = name;
        this.objects = {};
        this.seeThrough = false;
    }

    /**
     * Adds object to the container.
     * 
     * @param {Object3D}
     */
    addObject(obj) {
        this.objects[obj.id] = obj;
    }

    /**
     * Removes given objects.
     * 
     * @param {Object3D} obj 
     */
    removeObject(obj) {
        delete this.objects[obj.id];
    }
}

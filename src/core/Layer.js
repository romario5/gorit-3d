import ObjectsContainer from "./ObjectsContainer";


export default class Layer extends ObjectsContainer
{
    constructor(name) {
        super(name);

        this.lights = {};
    }

    /**
     * Adds object to the layer.
     * 
     * @param {Object3D}
     */
    addObject(obj) {
        this.objects[obj.id] = obj;

        if (obj.isLight) {
            this.lights[obj.id] = obj;
        }
    }

    /**
     * Removes given objects.
     * 
     * @param {Object3D} obj 
     */
    removeObject(obj) {
        delete this.objects[obj.id];
        delete this.lights[obj.id];
    }

    getLights() {
        return this.lights;
    }
}

import Layer from "./Layer";

/**
 * Class represents single scene.
 * The scene is a kid of container that holds all objects to be rendered.
 * Also it contains necessary settings
 * Use scenes for implementing stages of a game for example.
 */
export default class Scene
{
    constructor(name) {
        this.name = name;
        this.layers = {};
        this.layersByName = {};
        this.currentLayer = new Layer('Default layer');
        this.addLayer(this.currentLayer);
    }

    addLayer(layer) {
        this.layers[layer.id] = layer;
        this.layersByName[layer.name] = layer;
    }


    /**
     * Adds object into the given layer.
     * If layer is not defined object will be added to the first.
     * @param {Object3D} obj 
     */
    addObject(obj, layerName) {
        if (layerName === undefined) layerName = 'default';
        let layer = this.getLayer(layerName);
        if (layer === null) {
            let k = Object.keys(this.layers);
            if (k.length === 0) return false;
            layer = this.layers[k[0]]
        }
    
        layer.addObject(obj);
        return true;
    }

    /**
     * Returns layer with given ID.
     * If layer is absent null will be returned.
     * 
     * @param {number} id 
     * @return {Layer|null}
     */
    getLayer(id) {
        if (this.layers.hasOwnProperty(id)) {
            return this.layers[id];
        }
        return null;
    }

    /**
     * Returns layer with given name.
     * If layer is absent null will be returned.
     * 
     * @param {string} name
     * @return {Layer|null} 
     */
    getLayerByName(name) {
        if (this.layersByName.hasOwnProperty(name)) {
            return this.layersByName[name];
        }
        return null;
    }
}
/**
 * Object that holds information about lights to be used in rendering.
 */
export default class LightsList
{
    constructor() {
        this.lights           = [];
        this.lightsDirections = [];
        this.lightsColors     = [];
        this.lightsPosition   = [];
        this.lightsDirections = [];
        this.lightsTypes      = [];
        this.lightsIntensity  = [];
    }

    /**
     * Adds lights to the list.
     * @param {Light} light 
     */
    add(light) {
        this.lights.push(light);
        this.lightsColors.push(light.color.asArray());
        this.lightsPositions.push(light.position.toArray());
        this.lightsDirections.push(light.position.toArray());
        this.lightsTypes.push(light.type);
    }

    /**
     * Removes all lights from the list.
     */
    clear() {
        this.lights.splice(0, this.lights.length);
        this.lightsDirections.splice(0, this.lightsDirections.length);
        this.lightsColors.splice(0, this.lightsColors.length);
        this.lightsPosition.splice(0, this.lightsPosition.length);
        this.lightsDirections.splice(0, this.lightsDirections.length);
        this.lightsTypes.splice(0, this.lightsTypes.length);
        this.lightsIntensity.splice(0, this.lightsIntensity.length);
    }
}
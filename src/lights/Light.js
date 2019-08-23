import Object3D from "../core/Object3D";
import Shadow from "./Shadow";
import Vector3 from "../math/Vector3";


export default class Light extends Object3D
{
    constructor() {
        super();
        this.type = Light.POINT;
        this.intensity = 10;
        this.shadow = new Shadow();
        this.color = new Vector3(1, 1, 1);
    }
}


Light.prototype.isLight = true;


Light.DIRECTIONAL = 1;
Light.POINT       = 2;
Light.SPOT        = 3;
Light.DOME        = 4;
Light.SUN         = 5;
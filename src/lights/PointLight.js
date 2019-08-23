import Light from "./Light";
import Object3D from "../core/Object3D";
import PointLightMesh from "../meshes/PointLightMesh";

export default class PointLight extends Light
{
    constructor(params) {
        super(params);
        this.type = Light.POINT;
        this.name = params.name || 'Point light';

        // Create geometry for the light.
        let lightObj = new Object3D();
        let lightMesh = new PointLightMesh(params);
        lightObj.addMesh(lightMesh);
        this.helpers.addObject(lightObj);

        // Move helper with light.
        this.position.onChange(v => {
            lightObj.position.copyValuesFrom(v);
        });
    }
}
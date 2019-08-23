import Shader from "./Shader";

import {SHADER_TYPE_FRAGMENT} from "../core/constants";

export default class FragmentShader extends Shader
{
    constructor(source) {
        super(source, SHADER_TYPE_FRAGMENT);

        let positionsLocation = null;
        let positionAttributeName = 'a_positions';


        this.setPositionsAttributeName = function(name) {
            positionAttributeName = name;
        }
    }
}
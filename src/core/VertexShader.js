import Shader from "./Shader";

import {SHADER_TYPE_VERTEX} from "../core/constants";

export default class VertexShader extends Shader
{
    constructor(source) {
        super(source, SHADER_TYPE_VERTEX);
    }
}
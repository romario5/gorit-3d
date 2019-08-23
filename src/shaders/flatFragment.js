import Shader from "../core/Shader";
import {SHADER_TYPE_FRAGMENT} from "../core/constants";

let source = `
precision mediump float;

uniform vec4 u_diffuseColor;

void main() {
  gl_FragColor = u_diffuseColor;
}
`;

let defaultShader = new Shader(source, SHADER_TYPE_FRAGMENT);
export default defaultShader;

import Shader from "../core/Shader";
import {SHADER_TYPE_FRAGMENT} from "../core/constants";

let source = `
precision mediump float;

uniform vec4 u_gridColor;
uniform vec4 u_xColor;
uniform vec4 u_yColor;
uniform vec4 u_zColor;

float len;

varying vec3 v_position;

void main() {
  len = sqrt(v_position.x*v_position.x + v_position.y*v_position.y + v_position.z*v_position.z);
  
  

  gl_FragColor = u_gridColor;

  if (v_position.x == 0.0 && v_position.z == 0.0) {
    gl_FragColor = u_yColor;
  }

  if (v_position.y == 0.0 && v_position.z == 0.0) {
    gl_FragColor = u_xColor;
  }

  if (v_position.x == 0.0 && v_position.y == 0.0) {
    gl_FragColor = u_zColor;
  }

  if (len > 15.0) {
    len = (1.0 - ((len - 15.0) / 10.0))/1.0 * gl_FragColor.a;
    if (len < 0.0) {
      len = 0.0;
    }
    gl_FragColor.a = len;
  }
}
`;

let defaultShader = new Shader(source, SHADER_TYPE_FRAGMENT);
export default defaultShader;

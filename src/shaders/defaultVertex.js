import VertexShader from "../core/VertexShader";

let source = `
attribute vec4 a_position;
attribute vec3 a_normal;

uniform mat4 u_matrix;

uniform mat4 u_world;
uniform vec3 u_lightWorldPosition;

varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_surfaceToLight;

void main() {
  // Multiply the position by the matrix.
  gl_Position = u_matrix * a_position;
  v_position = a_position.xyz;

  // Pass the normal to the fragment shader
  v_normal = a_normal;

  // Вычисляем мировые координаты поверхности
  vec3 surfaceWorldPosition = (u_world * a_position).xyz;
 
  // вычисляем вектор от поверхности к источнику света
  // и передаём его во фрагментный шейдер
  v_surfaceToLight = u_lightWorldPosition - surfaceWorldPosition;
}
`;


let defaultShader = new VertexShader(source);
export default defaultShader;

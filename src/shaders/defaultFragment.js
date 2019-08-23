import FragmentShader from "../core/FragmentShader";

let source = `
precision mediump float;

// Lights
uniform vec3 u_lightPosition[100];
uniform vec3 u_lightColor[100];
uniform vec3 u_lightDirection[100];
uniform bool u_lightIsDirectional[100];


uniform vec3 u_reverseLightDirection;
uniform vec4 u_diffuseColor;
uniform vec4 u_wireColor;

varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_surfaceToLight;

void main() {
  vec3 normal = normalize(v_normal);


  gl_FragColor = u_diffuseColor;

  vec3 reflectedLightColor;
  vec3 lightDirection;

  // Calculate incoming light for all light sources
  for(int i = 0; i < 100; i++) {
    lightDirection = normalize(u_lightPosition[i], v_position.xyz);
    if (lightIsDirectional[i]) {
      reflectedLightColor += max(dot(v_normal, u_lightDirection[i]), 0.0) * u_lightColor[i];
    }
    else  {
      reflectedLightColor += max(dot(normalize(v_normal, lightDirection), 0.0) * u_lightColor[i];
    }
  }

  glFragColor = vec4(reflectedLightColor * u_diffuseColor, u_diffuseColor.a);

  if (u_wireColor[3] > 0.0) {
      gl_FragColor = u_wireColor;
  }
}
`;

let shader = new FragmentShader(source);

export default shader;

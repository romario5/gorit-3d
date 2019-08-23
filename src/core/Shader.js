import Log from "../utils/Log";
import {SHADER_TYPE_VERTEX, SHADER_TYPE_FRAGMENT} from "../core/constants";

const TYPE_VEC3 = 'vec3';
const TYPE_VEC4 = 'vec4';
const TYPE_MAT3 = 'mat3';
const TYPE_MAT4 = 'mat4';

export default class Shader
{
    constructor(source, type) {
        this.source = source;
        this.type = type === SHADER_TYPE_VERTEX ? SHADER_TYPE_VERTEX : SHADER_TYPE_FRAGMENT;
        this.shader = null;

        this.attributes = {};
        this.varyings = {};
        this.uniforms = {};

        this.parseSource();
    }

    getShader(gl) {
        if (this.shader !== null) return this.shader;

        // Compiles either a shader of type gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
        let shader = gl.createShader(this.type === SHADER_TYPE_VERTEX ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, this.source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            let info = gl.getShaderInfoLog(shader);
            Log.error("Could not compile WebGL shader. \n\n" + info);
        }
        this.shader = shader;
        return shader;
    }



    prepareForRendering() {
        for (let p in this.attributes) {

        }
    }



    parseSource() {
        let mainFuncPosition = this.source.search(/void\s+main\s*\(\)/i);

        if (mainFuncPosition < 0) {
            Log.error("Error on shader parsing: unable to find main function.");
        }

        let lines = this.source.slice(0, mainFuncPosition).split("\n");

        let isComment = false;
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i].trim();

            // Skip comments.
            if (isComment) {
                if (line.slice(-2) === '*/') {
                    isComment = false;
                }
                continue;
            }

            if (line.slice(0, 2) === '//') continue;
            if (line.slice(0, 2) === '/*') {
                isComment = true;
                continue;
            }

            // Skip empty lines.
            if (line === '') continue;

            let wordEndPos = line.indexOf(' ');
            if (wordEndPos < 0) continue;
            let v = line.slice(0, wordEndPos).split(' ');

            if (v[0] === 'uniform') {
                Object.defineProperty(this.uniforms, v[1], {
                    value: 1
                });
            }
        }
    }
}


Shader.TYPE_VERTEX = 1;
Shader.TYPE_FRAGMENT = 2;



// Uniforms.
Shader.U_WIRE_COLOR     = 'u_wireColor';
Shader.U_DIFFUSE_COLOR  = 'u_diffuseColor';
Shader.U_SPECULAR_COLOR = 'u_specularColor';
Shader.U_LIGHT_COLOR    = 'u_lightColor';
Shader.U_RIM_COLOR      = 'u_rimColor';

Shader.U_VIEW_MATRIX    = 'u_viewMatrix';
Shader.U_PROj_MATRIX    = 'u_projMatrix';

Shader.U_LIGHT_VECTOR   = 'u_lightVector';
Shader.U_LIGHT_REV_DIR  = 'u_reverseLightDirection';
Shader.U_LIGHT_POS      = 'u_lightPosition';
Shader.U_LIGHT_COLOR    = 'u_lightColor';
Shader.U_LIGHT_DIR      = 'u_lightDirection';
Shader.u_LIGHT_IS_DIR   = 'u_lightIsDirectional';



// Attributes.
Shader.A_POSITION       = 'a_position';
Shader.A_NORMAL         = 'a_normal';
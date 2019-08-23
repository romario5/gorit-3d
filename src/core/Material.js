import Log from "../utils/Log";
import Shader from "./Shader";
import Color from "../math/Color";

export default class Material
{
    constructor(params) {
        if (!params) params = {};

        let shaders = [];
        let program = null;
        let isCompiled = false;
        
        this.wireColor = params.wireColor || new Color(0.7,0.7,0.7,0);

        this.getProgram = function() {
            return program;
        };


        this.addShader = function(shader) {
            if ( !(shader instanceof Shader) )  {
                Log.error("Given shader is not and instance of Shader class.");
            }
            shaders.push(shader);
            return this;
        };


        this.compileShaders = function (gl) {
            if (!isCompiled) {
                program = gl.createProgram();
                for (let i = 0; i < shaders.length; i++) {
                    gl.attachShader(program, shaders[i].getShader(gl));
                }
                gl.linkProgram(program);

                if ( !gl.getProgramParameter( program, gl.LINK_STATUS) ) {
                    let info = gl.getProgramInfoLog(program);
                    throw 'Could not compile WebGL program. \n\n' + info;
                }

                isCompiled = true;
            }
            return this;
        };


        this.prepareShaders = function(gl) {
            for (let i = 0; i < shaders.length; i++) {
                shaders[i].prepareForRendering(gl);
            }
            return this;
        }
    }


    /**
     * This method must be overridden by the superclass.
     */
    prepareForRendering(gl) {

    }
}

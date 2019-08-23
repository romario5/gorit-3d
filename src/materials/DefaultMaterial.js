import Material from "../core/Material";
import defaultVertexShader from "../shaders/defaultVertex";
import defaultFragmentShader from "../shaders/defaultFragment";
import Color from "../math/Color";
import Shader from "../core/Shader";

export default class DefaultMaterial extends Material
{
    constructor(params) {
        super(params);
        if (!params) params = {};

        this.diffuseColor = params.color || new Color(0.5,0.5,0.5,1);

        this.specular = 1;
        this.glossiness = 0.5;

        this.addShader(defaultVertexShader);
        this.addShader(defaultFragmentShader);
    }


    prepareForRendering(gl) {
        let program = this.getProgram();
        let diffuseColorLoc = gl.getUniformLocation(program, Shader.U_DIFFUSE_COLOR);
        let wireColorLoc = gl.getUniformLocation(program, Shader.U_WIRE_COLOR);

        gl.uniform4fv(diffuseColorLoc, this.diffuseColor.asArray());
        gl.uniform4fv(wireColorLoc, this.wireColor.asArray());
    }
}

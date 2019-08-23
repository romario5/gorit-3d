import Material from "../core/Material";
import flatFragment from "../shaders/flatFragment";
import defaultVertexShader from "../shaders/defaultVertex";
import Shader from "../core/Shader";
import Color from "../math/Color";


export default class FlatMaterial extends Material
{
    constructor(color) {
        super();
        this.addShader(defaultVertexShader);
        this.addShader(flatFragment);
        
        if (color instanceof Color) {
            this.color = color;
        } else {
            this.color = new Color(1, 1, 1, 1);
            if (Array.isArray(color)) {
                this.color.setFromArray(color);
            }
        }
    }

    prepareForRendering(gl) {
        let program = this.getProgram();
        
        let colorLoc = gl.getUniformLocation(program, Shader.U_DIFFUSE_COLOR);
        gl.uniform4fv(colorLoc, this.color.asArray());
    }
}

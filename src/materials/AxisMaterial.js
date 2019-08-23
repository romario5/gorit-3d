import Material from "../core/Material";
import axisFragment from "../shaders/axisFragment";
import defaultVertexShader from "../shaders/defaultVertex";
import Color from "../math/Color";


export default class AxisMaterial extends Material
{
    constructor(params) {
        super(params);

        this.addShader(defaultVertexShader);
        this.addShader(axisFragment);

        this.gridColor  = params.gridColor || new Color(0.22,0.25,0.28,1);
        this.xAxisColor = new Float32Array([0.75, 0.15, 0, 1]);
        this.yAxisColor = new Float32Array([0, 0.75, 0, 1]);
        this.zAxisColor = new Float32Array([0, 0.25, 0.75, 1]);
    }


    prepareForRendering(gl) {
        let program = this.getProgram();
    
        let gColorLoc = gl.getUniformLocation(program, "u_gridColor");
        let xColorLoc = gl.getUniformLocation(program, "u_xColor");
        let yColorLoc = gl.getUniformLocation(program, "u_yColor");
        let zColorLoc = gl.getUniformLocation(program, "u_zColor");

        gl.uniform4fv(gColorLoc, this.gridColor.asArray());
        gl.uniform4fv(xColorLoc, this.xAxisColor);
        gl.uniform4fv(yColorLoc, this.yAxisColor);
        gl.uniform4fv(zColorLoc, this.zAxisColor);
    }
}

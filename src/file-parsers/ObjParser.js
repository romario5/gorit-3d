import FileParser from "./FileParser";
import Mesh from "../core/Mesh";

export default class ObjParser extends FileParser
{
    constructor(file) {
        super(file);
    }


    parse(content) {
        let mesh = new Mesh();
        
        let lines = content.split("\n");
        
        for (let i = 0, len = lines.length; i < len; i++) {
            let line = lines[i].trim();
            
            // Skip comments.
            if (line[0] === '#') continue;

            let arr = line.split(' '),
                command = arr.shift();

            // Parse vertices.    
            if (command === 'v') {
                for (let j = 0; j < arr.length; j++) {
                    mesh.vertices.push(parseFloat(arr[j]));
                }

            // Parse faces (indices).    
            } else if (command === 'f') {

                let face = [],
                    normal = [],
                    tex = [];

                let p = true;
                for (let j = 0; j < arr.length; j++) {

                    let indices = arr[j].split('/');
                    face.push(parseInt(indices[0])-1);

                    if (j > 2) {
                        mesh.facesIndices.push(face[j-1]);
                        mesh.facesIndices.push(face[j]);
                        mesh.facesIndices.push(face[0]);
                    } else {
                        mesh.facesIndices.push(face[j]);
                    }

                    // Add indices by two.
                    

                    if (j > 1) {
                        mesh.wireframeIndices.push(face[j-1]);
                        mesh.wireframeIndices.push(face[j]);

                        if (j === arr.length - 1) {
                            mesh.wireframeIndices.push(face[j]);
                            mesh.wireframeIndices.push(face[0]);
                        }
                    } else {
                        mesh.wireframeIndices.push(face[j]);
                    }
                    p = !p;
                }

            // Set mesh name.    
            } else if (command === 'o') {
                mesh.name = arr[0];
            }
        }

        return mesh;
    }
}
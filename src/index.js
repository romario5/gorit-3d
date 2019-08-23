import App from "./core/App";
import Vector3 from "./math/Vector3";
import FramesLoop from "./core/FramesLoop";
import Viewport from "./core/Viewport";
import Object3D from "./core/Object3D";
import Cube from "./meshes/Cube";
import Plane from "./meshes/Plane";
import Quaternion from "./math/Quaternion";
import Camera from "./core/Camera";
import Color from "./math/Color";
import ObjParser from "./file-parsers/ObjParser";
import Log from "./utils/Log";
import PointLight from "./lights/PointLight";

window.NAT = {
    App: App,
    Viewport: Viewport,
    Object3D: Object3D,
    Vector3: Vector3,
    Quaternion: Quaternion,
    FramesLoop: FramesLoop,
    Camera: Camera,
    Color: Color,

    // Standard meshes.
    meshes: {
        Cube: Cube,
        Plane: Plane
    },

    lights: {
        PointLight: PointLight,
        DirectLight: null,
        SpotLight: null
    },

    readFile(file) {
        let ext = file.name.split('.').pop().toLowerCase();

        let parser = null;

        switch (ext) {
            case 'obj':
                parser = new ObjParser(file);
                break;
        }

        if (parser === null) {
            Log.error('Unsupported file extension (' + ext + ')');
        } else {
            return parser.readFile();
        }
    }
};

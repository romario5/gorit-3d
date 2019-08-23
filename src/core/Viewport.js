import ObjectsContainer from "./ObjectsContainer";
import Object3D from "./Object3D";
import Vector3 from "../math/Vector3";
import Camera from "./Camera";
import LinedPlane from "../meshes/LinedPlane";
import AxisGuides from "../meshes/AxisGuides";
import getNextId from "./IdGenerator";
import Quaternion from "../math/Quaternion";
import Color from "../math/Color";
import LightsList from "../lights/LightsList";

export default class Viewport
{
    constructor(params) {
        if (params === undefined) params = {};


        this.id = getNextId();
        this.name = params.name || 'Viewport ' + this.id;

        this.x = params.x || 0;
        this.y = params.y || 0;
        this.width  = params.width  || Viewport.defaultWidth;
        this.height = params.height || Viewport.defaultHeight;

        this.flexible   = params.flexible !== false;
        this.showGrid   = params.showGrid !== false;

        this.background = params.background || Viewport.defaultBackground;
        this.container  = params.container  || null;

        // Containers that hold objects to render.
        this.helpersContainer = new ObjectsContainer();

        // Default camera that will be used for rendering by default.
        // It's invisible in the scene.
        this.defaultCamera = new Camera('viewport');

        // Current camera. It can be replaced by another camera from the world.
        this.camera = this.defaultCamera;
        this.projectViewMatrix = null;

        // Create grid mesh.
        this.grid = new Object3D();
        let gridMesh = new LinedPlane({
            width: 50,
            height: 50,
            gridColor: new Color(0.5,0.5,0.5, 0.25)
        });
        this.grid.addMesh(gridMesh);

        // Create axis guides.
        this.axisGuides = new Object3D();
        let guides = new AxisGuides({size: 50});
        this.axisGuides.addMesh(guides);

        this.showHelpers = true;
        this.wireframe = true;
        this.cullFace = true;

        this.lightsList = new LightsList();

        this.grow = params.grow === true;

        this.background = params.background || null;
        this.handleEvents = params.handleEvents === true;


        this.rotate = (() => {
            let up = new Vector3(0, 1, 0);
            let fw = new Vector3(0, 0, 1);
            let side = new Vector3(1, 0, 0);

            let q1 = new Quaternion();
            let q2 = new Quaternion();
            let pos = new Vector3();

            return (dX, dY) => {
                if (this.handleEvents) {
                    up.setValues(0, 1, 0);

                    side.setValues(1,0,0);
                    side.applyQuaternion(this.camera._rotationQ).normalize();
                    
                    q2.setFromAxisAngle(side, dY*0.005);
                    q1.setFromAxisAngle(up, dX*0.005);

                    pos.copyValuesFrom(this.camera.position)
                        .sub(this.camera.target.position)
                        .applyQuaternion(q2)
                        .applyQuaternion(q1)
                        .add(this.camera.target.position);

                    this.camera.position.copyValuesFrom(pos);

                    side.setValues(1,0,0);
                    q2.setFromAxisAngle(side, dY*0.005);
                    this.camera._rotationQ.multiply(q2);

                    q1.multiply(this.camera._rotationQ);
                    this.camera._rotationQ.copyValuesFrom(q1);
                }
            };
        })();

        this.onMouseDown = (dX, dY) => {

        };
    }

    /**
     * Prepares lights list of the given scene.
     * The list is stored as property of the viewport because 
     * viewport is passed to render() method of the 3D objects.
     * @param {Scene} scene 
     */
    prepareLights(scene) {
        this.lightsList.clear();

        for (let i = 0; i < scene.layers; i++) {
            let lights = scene.layers[i].getLights();
            for (let id in lights) {
                this.lightsList.add(lights[id]);
            }
        }
    }

    /**
     * Renders grid and axises of the viewport.
     * @param {WebGLRenderingContext} gl 
     */
    renderGrid(gl) {
        this.grid.render(gl, this.projectViewMatrix, this);
        this.axisGuides.render(gl, this.projectViewMatrix, this);
    }


    /**
     * Renders given scene.
     * @param {Scene} scene 
     * @param {WebGLRenderingContext} gl 
     */
    renderScene(scene, gl) {
        this.adjustSize(gl);

        gl.enable(gl.DEPTH_TEST);
        if (this.cullFace) {
            gl.enable(gl.CULL_FACE);
        }

        gl.enable(gl.POLYGON_OFFSET_FILL);
        gl.polygonOffset(2, 3);

        this.prepareLights(scene);

        this.projectViewMatrix = this.camera.getProjectionMatrix().multiply(this.camera.getViewMatrix());

        if (this.showHelpers) {
            this.renderGrid(gl);
        }
        for (let p in scene.layers) {
            let objects = scene.layers[p].objects;
            for (let id in objects) {
                if (objects[id] === this.camera) continue;
                objects[id].render(gl, this.projectViewMatrix, this);
            }
        }
    }


    adjustSize(gl) {
        let canvas = gl.canvas;
        let displayWidth  = canvas.clientWidth;
        let displayHeight = canvas.clientHeight;

        if (this.grow) {
            this.width = displayWidth;
            this.height = displayHeight;
        }

        var aspect = this.width / this.height;
        this.camera.aspectRatio = aspect;

        if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
            canvas.width  = displayWidth;
            canvas.height = displayHeight;
        }

        // Tell WebGL how to convert from clip space to pixels
        gl.viewport(this.x, this.y, this.width, this.height);
        gl.scissor(this.x, this.y, this.width, this.height);
        if (this.background !== null) {
            gl.clearColor(this.background.r, this.background.g, this.background.b, this.background.a);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        }
    }

    zoom(dX, dY) {
        if (this.handleEvents) {
            let dir = this.camera.position
                .clone()
                .sub(this.camera.target.position);

            dir.multiply(-dY*0.005);

            let dist = dir.magnitude();
            if (dist < 0.01 && dist !== 0) {
                dir.normalize().multiply(0.01);
                dist = 0.01;
            }

            this.camera.position.add(dir);

            dist = dir.clone().copyValuesFrom(this.camera.position)
                .sub(this.camera.target.position)
                .magnitude();

            if (dist < 0.01) {
                this.camera.target.position.add(dir);
            }
        }
    }

    move(dX, dY) {
        if (this.handleEvents) {
            let side = new Vector3(1,0,0);
            let up = new Vector3(0,1,0);

            let dist = side.copyValuesFrom(this.camera.position)
                .sub(this.camera.target.position)
                .magnitude();

            let k = dist/10;
            if (k < 0.25) k = 0.25;
     
            side.setValues(1,0,0);

            side.applyQuaternion(this.camera._rotationQ).multiply(dX*0.01*k);
            up.applyQuaternion(this.camera._rotationQ).multiply(-dY*0.01*k);

            

            this.camera.position.add(side);
            this.camera.position.add(up);

            this.camera.target.position.add(side);
            this.camera.target.position.add(up);
        }
    }
}

// Some default values.
Viewport.defaultWidth = 400;
Viewport.defaultHeight = 300;
Viewport.defaultBackground = '#fff';
// Viewport.defaultBackground = '#f3f3f3';

// Rendering modes.
Viewport.MODE_FLAT      = 1;
Viewport.MODE_SHADED    = 2;
Viewport.MODE_REALISTIC = 3;

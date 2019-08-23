import Viewport from "./Viewport";
import Canvas from "./Canvas";
import Scene from "./Scene";
import Log from "../utils/Log";
import FramesLoop from "./FramesLoop";
import Camera from "./Camera";
import Cube from "../meshes/Cube";
import Object3D from "./Object3D";
import Quaternion from "../math/Quaternion";
import Vector3 from "../math/Vector3";
import Color from "../math/Color";

export default class App {

    constructor() {
        this.viewports = {};
        this.viewportByName = {};
        this.scenes = {};
        this.canvas = null;

        this.currentScene = null;
        this.stopped = false;

        this.loop = new FramesLoop(deltaTime => {
            if (this.stopped || this.currentScene === null) return;

            // Clear the canvas.
            let gl = this.canvas.context;
            gl.enable(gl.SCISSOR_TEST);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            for (let v in this.viewports) {
                this.viewports[v].renderScene(this.currentScene, gl);
            }
        });
    }

    addViewport(viewport) {
        this.viewports[viewport.id] = viewport;
        this.viewportByName[viewport.name] = viewport;
    }

    getViewport(viewport) {
        
    }

    /**
     * Initializes application in the given container.
     * @param {Node} container 
     */
    init(container) {
        if (this.canvas !== null) return;

        this.canvas = new Canvas(container);
        let viewport = new Viewport({
            name: 'Default',
            x: 0,
            y: 0,
            width: 400,
            height: 200,
            grow: true,
            handleEvents: true
        });
        this.addViewport(viewport);

        this.currentScene = this.createScene('default');

        // Trigger rotation.
        this.canvas.onMouseDown = (dX, dY) => {
            for (let p in this.viewports) {
                this.viewports[p].onMouseDown(dX, dY);
            }
        };

        // Trigger rotation.
        this.canvas.onRotate = (dX, dY) => {
            for (let p in this.viewports) {
                this.viewports[p].rotate(dX, dY);
            }
        };

        // Trigger zoom.
        this.canvas.onZoom = (dX, dY) => {
            for (let p in this.viewports) {
                this.viewports[p].zoom(dX, dY);
            }
        };

        // Trigger zoom.
        this.canvas.onMove = (dX, dY) => {
            for (let p in this.viewports) {
                this.viewports[p].move(dX, dY);
            }
        };
    }

    /**
     * Returns WebGL context.
     * @return {GLContext}
     */
    getContext() {
        return this.canvas.context;
    }

    /**
     * Creates new scene with given name.
     * @param {string} name 
     */
    createScene(name) {
        if (this.scenes.hasOwnProperty(name)) {
            Log.warn('App: scene with name "' + name + '" already exists.');
            return null;
        }
        let scene = new Scene(name);
        this.scenes[name] = scene;
        if (this.currentScene === null) {
            this.currentScene = scene;
        }
        return scene;
    }

    /**
     * Activates scene with given name.
     * Returns true if scene was successfully activated.
     * @param {string} name 
     * @return {boolean}
     */
    activateScene(name) {
        if (this.scenes.hasOwnProperty(name)) {
            this.currentScene = this.scenes[name];
            return true;
        }
        Log.warn('App: scene with name "' + name + '" is absent.');
        return false;
    }
}

import FramesLoop from "./FramesLoop";
import Log from "../utils/Log";

export default class Canvas
{
    // Creates canvas and prepare it.
    constructor(container) {

        if (container === undefined) {
            Log.error('GLContext: container is not specified for the viewport.');
            return false;
        }

        // Create fps indicator.
        var div = document.createElement("div");
        div.style.position = 'relative';
        div.style.width = '150px';
        div.style.height = '150px';
        div.style.marginLeft = '-150px';
        div.style.marginTop = '-150px';
        div.style.top = '150px';
        div.style.left = '150px';
        div.style.padding = '10px';
        div.style.userSelect = 'none';
        div.style.pointerEvents = 'none';
        div.style.fontFamily = 'monospace';
        div.style.fontSize = '12px';
        div.style.color = '#333';
        var textNode = document.createTextNode("");
        div.appendChild(textNode);
        container.appendChild(div);


        this.container = container;

        this.canvas = document.createElement('canvas');
        this.canvas.style.display = 'block';
        this.container.appendChild(this.canvas);
        let gl = this.canvas.getContext('webgl', {antialias: false, premultipliedAlpha: false});
        this.context = gl;

        this.canvas.style.width = '100%';
        this.canvas.style.maxWidth = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.maxHeight = '100%';

        if (!gl) {
            alert('WebGL is not available. Please enable it.');
            return false;
        }

        this.loop = new FramesLoop(deltaTime => {
            this.resizeCanvas();
            textNode.textContent = 'FPS: ' + this.loop.getFPS();
        });

        // Handlers.
        this.onRotate = null;
        this.onZoom = null;
        this.onMove = null;
        this.onMouseDown = null;
        this.onMouseUp = null;

        let isMoving = false;
        let isZooming = false;
        let isRotating = false;

        let preventContext = false;

        let initialX = 0,
            initialY = 0;

        this.canvas.addEventListener('mousedown', event => {
            isMoving = event.button === 0;
            isZooming = event.button === 1;
            isRotating = event.button === 2;

            initialX = event.clientX;
            initialY = event.clientY;

            preventContext = true;

            if (this.onMouseDown !== null) this.onMouseDown(initialX, initialY);
        });

        document.addEventListener('mouseup', event => {
            isMoving = false;
            isZooming = false;
            isRotating = false;
            if (this.onMouseUp !== null) this.onMouseUp(deltaX, deltaY);
        });

        document.addEventListener('mousemove', event => {
            

            let deltaX = initialX - event.clientX;
            let deltaY = initialY - event.clientY;

            if (isRotating) {
                if (this.onRotate !== null) this.onRotate(deltaX, deltaY);
            }
            
            if (isMoving) {
                if (this.onMove !== null) this.onMove(deltaX, deltaY);
            }
        
            
            if (isZooming) {
                if (this.onZoom !== null) this.onZoom(deltaX, deltaY);
            }

            initialX = event.clientX;
            initialY = event.clientY;
        });


        document.addEventListener('contextmenu', event => {
            if (preventContext) event.preventDefault();
            preventContext = false;
        });
    }



    /**
     * Returns rendering context.
     * @return {WebGL2RenderingContext}
     */
    getContext() {
        return this.context;
    }

    // Fits canvas buffer size to the canvas size.
    resizeCanvas() {
        let gl = this.context;
        let width  = gl.canvas.clientWidth,
            height = gl.canvas.clientHeight;

        if (gl.canvas.width != width || gl.canvas.height != height) {
            gl.canvas.width  = width;
            gl.canvas.height = height;

            this.width = width;
            this.height = height;
        }
    }
}
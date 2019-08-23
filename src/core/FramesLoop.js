let handlers = [];
let namedHandlers = {};

let lastFrameTime = performance.now();
let deltaTime = 1;

let lastSecondTime = lastFrameTime;
let framesRendered = 0;

let fps = 0;

// Run all handlers in the loop.
function loop() {
    let now = performance.now();
    let deltaTime = now - lastFrameTime;
    lastFrameTime = now;

    for (let i = 0; i < handlers.length; i++) {
        handlers[i](deltaTime);
    }

    for (let p in namedHandlers) {
        if (namedHandlers.hasOwnProperty(p)) {
            namedHandlers[p](deltaTime);
        }
    }

    framesRendered++;

    if (now - lastSecondTime >= 1000) {
        lastSecondTime = now;
        fps = framesRendered;
        framesRendered = 0;
    }

    requestAnimationFrame(loop);
}


export default class FramesLoop
{
    constructor(handler, name) {
        this.name = name;
        this.handler = handler;
        this.start();
    }


    stop() {
        if (name === undefined) {
            for (let i = 0; i < handlers; i++) {
                if (handlers[i] === this.handler) {
                    handlers.splice(i, 1);
                    break;
                }
            }
        } else {
            delete namedHandlers[this.name];
        }
    }


    start() {
        if (this.name === undefined) {
            handlers.push(this.handler);
        } else {
            namedHandlers[this.name] = this.handler;
        }
    }

    getFPS() {
        return fps;
    }
}


FramesLoop.getFPS = function() {
    return fps;
};


loop();

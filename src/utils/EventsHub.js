export default class EventsHub
{
    constructor() {
        this.handlers = {};
        this.namedHandlers = {};
    }


    getChannel(name) {
        return {
            on: (eventName, handler) => {
                if (!this.namedHandlers.hasOwnProperty(name)) {
                    this.namedHandlers[name] = {};
                }
                this.namedHandlers[name][eventName] = handler;
            }
        };
    }

    on(eventName, handler) {
        if (!this.handlers.hasOwnProperty(eventName)) {
            this.handlers[eventName] = [];
        }
        this.handlers[eventName].push(handler);
    }

    trigger(eventName, context,  ...args) {
        if (this.handlers.hasOwnProperty(eventName)) {
            for (let i = 0; i < this.handlers[eventName].length; i++) {
                this.handlers[eventName][i].call(context, ...args);
            }
        }
        if (this.handlers.hasOwnProperty(eventName)) {
            for (let h in this.namedHandlers[eventName]) {
                this.namedHandlers[eventName][h].call(context, ...args);
            }
        }
    }
}
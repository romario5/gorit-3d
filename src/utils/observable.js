/**
 * Provides change event implementation for the given object.
 * Replaces all native properties with getters/setters.
 * 
 * Usage:
 * 
 * import makeObservable from "../utils/observable";
 * class Vector3 {
 *     // Some code...
 * }
 * makeObservable(Vector3.prototype);
 * 
 * @param {Object} target 
 */

export default function(target) {
    target.onChange = function(handler) {
        
        // Check if observing was already initialized.
        if (this.hasOwnProperty('_handlers')) {
            this._handlers.push(handler);
            return;
        }

        // Create internal storage for properties values.
        Object.defineProperty(this, '_values', {
            configurable: false,
            enumerable: false,
            value: {}
        });
        
        // Make all properties observable.
        for (let p in this) {
            if(this.hasOwnProperty(p)) {
                let val = this[p];
                delete this[p];


                Object.defineProperty(this, p, {
                    get() {
                        return val;
                    },
                    set(value) {
                        val = value;
                        executeHandlers();
                    }
                });
            }
        }

        let target = this;

        // Executes all handlers.
        function executeHandlers() {
            for (let i = 0, len = target._handlers.length; i < len; i++) {
                target._handlers[i].call(target, target);
            }
        }

        // Creates internal storage of the handlers.
        Object.defineProperty(this, '_handlers', {
            configurable: false,
            enumerable: false,
            writable: false,
            value: [handler]
        });
    }
};
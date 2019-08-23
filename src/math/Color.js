import EventsHub from "../utils/EventsHub";

export default class Color
{
    constructor(r, g, b, a) {
        this._r = r || 0;
        this._g = g || 0;
        this._b = b || 0;
        this._a = a || 1;

        Object.defineProperty(this, 'r', {
            get() {return this._r},
            set(value) {
                this._r = value;
                this._eventsHub.trigger('change', this, this);
            },
            enumerable: true
        });


        Object.defineProperty(this, 'g', {
            get() {return this._g},
            set(value) {
                this._g = value;
                this._eventsHub.trigger('change', this, this);
            },
            enumerable: true
        });


        Object.defineProperty(this, 'b', {
            get() {return this._b},
            set(value) {
                this._b = value;
                this._eventsHub.trigger('change', this, this);
            },
            enumerable: true
        });


        Object.defineProperty(this, 'a', {
            get() {return this._a},
            set(value) {
                this._a = value;
                this._eventsHub.trigger('change', this, this);
            },
            enumerable: true
        });

        this._eventsHub = new EventsHub();

        this._array = new Float32Array([this._r, this._g, this._b, this._a]);
    }

    /**
     * Adds change event listener.
     * 
     * @param {function} handler 
     * @param {number|string} channel Unique name of a handler.
     * @see EventsHub
     */
    onChange(handler, channel) {
        if (channel === undefined) {
            this._eventsHub.on('change', handler);
        } else {
            this._eventsHub.getChannel(channel).on('change', handler);
        }
    }

    copyValuesFrom(color) {
        this._r = color.r;
        this._g = color.g;
        this._b = color.b;
        this._a = color.a;
        this._eventsHub.trigger('change', this, this);
    }

    asArray() {
        this._array[0] = this._r;
        this._array[1] = this._g;
        this._array[2] = this._b;
        this._array[3] = this._a;
        return this._array;
    }

    setFromArray(a) {
        this._r = a.length > 0 ? a[0] : this._r;
        this._g = a.length > 1 ? a[1] : this._g;
        this._b = a.length > 2 ? a[2] : this._b;
        this._a = a.length > 3 ? a[3] : this._a;
    }
}


Color.HELPERS = new Color(1, 0.75, 0.1, 1);
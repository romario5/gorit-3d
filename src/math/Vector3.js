import EventsHub from "../utils/EventsHub";

export default class Vector3 
{
    constructor(x, y, z) {
        this._x = x || 0;
        this._y = y || 0;
        this._z = z || 0;

        this._eventsHub = new EventsHub();
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

    /**
     * Sets all three values and the fires change event.
     * Use this method to prevent unnecessary events firing.
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} z 
     * @return {Vector3}
     */
    setValues(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Copies values from another vector or quaternion.
     * 
     * @param {Vector3|Quaternion} vector
     * @return {Vector3} Returns itself for chaining.
     * @fires change
     */
    copyValuesFrom(vector) {
        this._x = vector.x;
        this._y = vector.y;
        this._z = vector.z;
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Returns length of the vector.
     * 
     * @return {number}
     */
    magnitude() {
        return Math.sqrt(this._x*this._x + this._y*this._y + this._z*this._z);
    }

    /**
     * Returns squared magnitude (same magnitude without square root).
     * 
     * @return {number}
     */
    squaredMagnitude() {
        return this._x*this._x + this._y*this._y + this._z*this._z;
    }

    /**
     * Normalizes vector (makes length 1).
     * 
     * @return {Vector3} Returns itself for chaining.
     * @fires change
     */
    normalize() {
        let len = this.magnitude();
        this._x /= len;
        this._y /= len;
        this._z /= len;
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Multiplies each component on the given value.
     * 
     * @param {number} value
     * @return {Vector3} Returns itself for chaining.
     * @fires change
     */
    multiply(value) {
        this._x *= value;
        this._y *= value;
        this._z *= value;
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Makes cross of current vector with given one.
     * 
     * @param {Vector3} v
     * @return {Vector3} Returns itself for chaining.
     * @fires change
     */
    cross(v) {
        let n = this.clone();
        this._x = n.y * v.z - n.z * v.y;
        this._y = n.z * v.x - n.x * v.z;
        this._z = n.x * v.y - n.y * v.x;

        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Returns dot product of this vector with another one.
     * 
     * @param {Vector3} v 
     * @return {number}
     */
    dot(v) {
        return this._x * v.x + this._y * v.y + this._z + v.z;
    }

    /**
     * Adds given value to each vector component.
     * 
     * @param {number} value 
     * @return {number|Vector3|Quaternion} Returns itself for chaining.
     * @fires change
     */
    add(value) {
        if (typeof value === 'object') {
            this._x += value.x;
            this._y += value.y;
            this._z += value.z;
        } else {
            this._x += value;
            this._y += value;
            this._z += value;
        }
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Subtracts given value from each vector component.
     * 
     * @param {number} value 
     * @return {number|Vector3|Quaternion} Returns itself for chaining.
     * @fires change
     */
    sub(value) {
        if (typeof value === 'object') {
            this._x -= value.x;
            this._y -= value.y;
            this._z -= value.z;
        } else {
            this._x -= value;
            this._y -= value;
            this._z -= value;
        }
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Inverts vector.
     * 
     * @return {Vector3} 
     */
    invert() {
        this._x = -this._x
        this._y = -this._y
        this._z = -this._z
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Clones vector and returns new copy.
     * 
     * @return {Vector3}
     */
    clone() {
        return new Vector3(this._x, this._y, this._z);
    }

    /**
     * Applies quaternion rotation to the vector.
     * 
     * @param {Quaternion} q
     * @return {Vector3} Returns itself for chaining.
     * @fires change
     */
    applyQuaternion(q) {
		let x = this.x, y = this.y, z = this.z;
		let qx = q.x, qy = q.y, qz = q.z, qw = q.w;

		// Calculate Quaternion * Vector3.
		let ix = qw * x + qy * z - qz * y;
		let iy = qw * y + qz * x - qx * z;
		let iz = qw * z + qx * y - qy * x;
		var iw = - qx * x - qy * y - qz * z;

		// Calculate result * inverse Quaternion.
		this._x = ix * qw + iw * - qx + iy * - qz - iz * - qy;
		this._y = iy * qw + iw * - qy + iz * - qx - ix * - qz;
		this._z = iz * qw + iw * - qz + ix * - qy - iy * - qx;

        this._eventsHub.trigger('change', this, this);
		return this;
	}

    /**
     * Returns array with all components.
     * 
     * @return {Array}
     */
    toArray() {
        return [this._x, this._y, this._z];
    }
}


Vector3.prototype.isVector3 = true;


Object.defineProperty(Vector3.prototype, 'x', {
    get() {return this._x},
    set(value) {
        this._x = value;
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});


Object.defineProperty(Vector3.prototype, 'y', {
    get() {return this._y},
    set(value) {
        this._y = value;
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});


Object.defineProperty(Vector3.prototype, 'z', {
    get() {return this._z},
    set(value) {
        this._z = value;
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});
import EventsHub from "../utils/EventsHub";
import Log from "../utils/Log";
import Euler from "./Euler";

export default class Quaternion
{
    constructor(x, y, z, w) {
        this._x = x === undefined ? 0 : x;
        this._y = y === undefined ? 0 : y;
        this._z = z === undefined ? 0 : z;
        this._w = w === undefined ? 1 : w;

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
     * @param {number} w
     * @return {Quaternion}
     */
    setValues(x, y, z, w) {
        this._x = x || this._x;
        this._y = y || this._y;
        this._z = z || this._z;
        this._w = w || this._w;
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    /**
     * Copies all values from given vector or quaternion.
     * Use this method to prevent unnecessary change event firing.
     * 
     * @param {Vector|Quaternion} v 
     */
    copyValuesFrom(v) {
        this._x = v.x;
        this._y = v.y;
        this._z = v.z;
        if (v.w !== undefined) {
            this._w = v.w;
        }
        this._eventsHub.trigger('change', this, this);
    }

    /**
     * Sets values from euler components.
     * 
     * @param {Euler|Vector3} euler 
     * @param {boolean} fireEvents
     * @return {Quaternion} Returns itself for chaining.
     */
    setFromEuler(euler, fireEvents) {
		if (!euler.isEuler && !euler.isVector3) {
            Log.error('Quaternion: argument given in .setFromEuler() is not an Euler or Vector3.');
        }

        let x     = euler._x, 
            y     = euler._y, 
            z     = euler._z, 
            order = euler.isEuler ? euler.order : 'XYZ'; // Use XYZ order by default for vectors.

		let cos = Math.cos;
		let sin = Math.sin;

		let c1 = cos( x / 2 );
		let c2 = cos( y / 2 );
		let c3 = cos( z / 2 );

		let s1 = sin( x / 2 );
		let s2 = sin( y / 2 );
		let s3 = sin( z / 2 );

		if (order === 'XYZ') {
			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if (order === 'YXZ') {
			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if (order === 'ZXY') {
			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if (order === 'ZYX') {
			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;

		} else if (order === 'YZX') {
			this._x = s1 * c2 * c3 + c1 * s2 * s3;
			this._y = c1 * s2 * c3 + s1 * c2 * s3;
			this._z = c1 * c2 * s3 - s1 * s2 * c3;
			this._w = c1 * c2 * c3 - s1 * s2 * s3;

		} else if (order === 'XZY') {
			this._x = s1 * c2 * c3 - c1 * s2 * s3;
			this._y = c1 * s2 * c3 - s1 * c2 * s3;
			this._z = c1 * c2 * s3 + s1 * s2 * c3;
			this._w = c1 * c2 * c3 + s1 * s2 * s3;
		}

		if (fireEvents !== false) this._eventsHub.trigger('change', this, this);
		return this;
    }
    
    /**
     * Set values from vector and rotation angle.
     * Ensure that vector is normalized.
     * 
     * @param {Vector3} axis 
     * @param {number} angle 
     * @return {Quaternion} Returns itself for chaining.
     */
    setFromAxisAngle(axis, angle) {
        let halfAngle = angle / 2, 
            s = Math.sin(halfAngle);

		this._x = axis.x * s;
		this._y = axis.y * s;
		this._z = axis.z * s;
		this._w = Math.cos(halfAngle);
		this._eventsHub.trigger('change', this, this);
		return this;
    }
    
    /**
     * Sets components from given matrix.
     * 
     * @param {Matrix3x3|Matrix4} m
     * @return {Quaternion} Returns itself for chaining.
     */
    setFromRotationMatrix(m) {
    	let te  = m.data,
			m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ],
			m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ],
			m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ],

			trace = m11 + m22 + m33,
			s;

		if ( trace > 0 ) {
			s = 0.5 / Math.sqrt( trace + 1.0 );

			this._w = 0.25 / s;
			this._x = ( m32 - m23 ) * s;
			this._y = ( m13 - m31 ) * s;
			this._z = ( m21 - m12 ) * s;

		} else if ( m11 > m22 && m11 > m33 ) {
			s = 2.0 * Math.sqrt( 1.0 + m11 - m22 - m33 );

			this._w = ( m32 - m23 ) / s;
			this._x = 0.25 * s;
			this._y = ( m12 + m21 ) / s;
			this._z = ( m13 + m31 ) / s;

		} else if ( m22 > m33 ) {
			s = 2.0 * Math.sqrt( 1.0 + m22 - m11 - m33 );

			this._w = ( m13 - m31 ) / s;
			this._x = ( m12 + m21 ) / s;
			this._y = 0.25 * s;
			this._z = ( m23 + m32 ) / s;

		} else {
			s = 2.0 * Math.sqrt( 1.0 + m33 - m11 - m22 );

			this._w = ( m21 - m12 ) / s;
			this._x = ( m13 + m31 ) / s;
			this._y = ( m23 + m32 ) / s;
			this._z = 0.25 * s;
		}

		this._eventsHub.trigger('change', this, this);
		return this;
    }
    
    /**
     * Sets value from angle between two vectors.
     * Ensure that both vectors are normalized.
     * Normalizes after setting components.
     * 
     * @param {Vector3} from 
     * @param {Vector3} to
     * @return {Quaternion} Returns itself for chaining.
     */
    setFromUnitVectors(from, to) {
		let EPS = 0.000001;
		let r = from.dot(to) + 1;

		if (r < EPS) {
			if (Math.abs(from.x) > Math.abs(from.z)) {
				this._x = - from.y;
				this._y = from.x;
				this._z = 0;
				this._w = 0;

			} else {
				this._x = 0;
				this._y = - from.z;
				this._z = from.y;
				this._w = 0;
			}
		} else {
			this._x = from.y * to.z - from.z * to.y;
			this._y = from.z * to.x - from.x * to.z;
			this._z = from.x * to.y - from.y * to.x;
			this._w = r;
		}
		return this.normalize();
    }
    
    /**
     * Returns length of the quaternion.
     * 
     * @return {number}
     */
    magnitude() {
		return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
	}

    /**
     * Normalizes quaternion changing components to change length to 1 keeping direction.
     * 
     * @return {Quaternion} Returns itself for chaining.
     */
    normalize() {
		let len = this.magnitude();

		if ( len === 0 ) {
			this._x = 0;
			this._y = 0;
			this._z = 0;
			this._w = 1;
		} else {
			len = 1 / len;
			this._x = this._x * len;
			this._y = this._y * len;
			this._z = this._z * len;
			this._w = this._w * len;
		}
		this._eventsHub.trigger('change', this, this);
		return this;
    }
    
    multiply(q) {
		var qax = this._x, qay = this._y, qaz = this._z, qaw = this._w;
		var qbx = q._x, qby = q._y, qbz = q._z, qbw = q._w;

		this._x = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
		this._y = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
		this._z = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
		this._w = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

		this._eventsHub.trigger('change', this, this);
		return this;
	}
}


Quaternion.prototype.isQuaternion = true;

// Add magic properties.
Object.defineProperty(Quaternion.prototype, 'x', {
    get() {return this._x;},
    set(value) {
        this._x = value; 
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});

Object.defineProperty(Quaternion.prototype, 'y', {
    get() {return this._y;},
    set(value) {
        this._y = value; 
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});

Object.defineProperty(Quaternion.prototype, 'z', {
    get() {return this._z;},
    set(value) {
        this._z = value; 
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});

Object.defineProperty(Quaternion.prototype, 'w', {
    get() {return this._w;},
    set(value) {
        this._w = value; 
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});
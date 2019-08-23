import EventsHub from "../utils/EventsHub";
import Vector3 from "./Vector3";
import {clamp} from "../utils/math";
import Log from "../utils/Log";
import Matrix4 from "./Matrix4";
import {radToDeg} from "../utils/math";

export default class Euler extends Vector3
{
    constructor(x, y, z, order) {
        super(x, y, z);
        this._order = order === undefined ? 'XYZ' : order.toUpperCase();
        this._eventsHub = new EventsHub();
	}
	
	/**
	 * Returns euler angles in degrees.
	 * 
	 * @return {Euler}
	 */
	inDegrees() {
		return new Euler(radToDeg(this.x), radToDeg(this.y), radToDeg(this.z), this.order);
	}

    copyValuesFrom(v) {
        this._x = vector.x;
        this._y = vector.y;
        this._z = vector.z;
        if (v.order !== undefined) {
            this._order = vector.order;
        }
        this._eventsHub.trigger('change', this, this);
        return this;
    }

    setFromRotationMatrix(m, order, update) {
		// assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
		var te = m.data;
		var m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
		var m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
		var m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

		order = order || this._order;

		if ( order === 'XYZ' ) {
			this._y = Math.asin( clamp(m13, -1, 1));

			if ( Math.abs( m13 ) < 0.9999999 ) {
				this._x = Math.atan2( - m23, m33 );
				this._z = Math.atan2( - m12, m11 );

			} else {
				this._x = Math.atan2( m32, m22 );
				this._z = 0;

			}

		} else if ( order === 'YXZ' ) {
			this._x = Math.asin( - clamp( m23, - 1, 1 ) );

			if ( Math.abs( m23 ) < 0.9999999 ) {
				this._y = Math.atan2( m13, m33 );
				this._z = Math.atan2( m21, m22 );

			} else {
				this._y = Math.atan2( - m31, m11 );
				this._z = 0;

			}

		} else if ( order === 'ZXY' ) {
			this._x = Math.asin( clamp( m32, - 1, 1 ) );

			if ( Math.abs( m32 ) < 0.9999999 ) {
				this._y = Math.atan2( - m31, m33 );
				this._z = Math.atan2( - m12, m22 );

			} else {
				this._y = 0;
				this._z = Math.atan2( m21, m11 );

			}

		} else if ( order === 'ZYX' ) {
			this._y = Math.asin( - clamp( m31, - 1, 1 ) );

			if ( Math.abs( m31 ) < 0.9999999 ) {
				this._x = Math.atan2( m32, m33 );
				this._z = Math.atan2( m21, m11 );

			} else {
				this._x = 0;
				this._z = Math.atan2( - m12, m22 );

			}

		} else if ( order === 'YZX' ) {
			this._z = Math.asin( clamp( m21, - 1, 1 ) );

			if ( Math.abs( m21 ) < 0.9999999 ) {
				this._x = Math.atan2( - m23, m22 );
				this._y = Math.atan2( - m31, m11 );

			} else {
				this._x = 0;
				this._y = Math.atan2( m13, m33 );

			}

		} else if ( order === 'XZY' ) {
			this._z = Math.asin( - clamp( m12, - 1, 1 ) );

			if ( Math.abs( m12 ) < 0.9999999 ) {
				this._x = Math.atan2( m32, m22 );
				this._y = Math.atan2( m13, m11 );

			} else {
				this._x = Math.atan2( - m23, m33 );
				this._y = 0;

			}
		} else {
			Log.warn( 'Euler: .setFromRotationMatrix() given unsupported order: ' + order );
		}

		this._order = order;

		if ( update !== false ) this._eventsHub.trigger('change', this, this);
		return this;
	}

	setFromQuaternion(q, order, update) {
		let matrix = Matrix4.createFromQuaternion(q);
		return this.setFromRotationMatrix(matrix, order, update);
    }
    
    reorder(newOrder) {
        // WARNING: this discards revolution information
        //let _quaternion = new Quaternion();
		//_quaternion.setFromEuler(this);
		//return this.setFromQuaternion( _quaternion, newOrder );
	}
}


Euler.prototype.isEuler = true;

Object.defineProperty(Euler.prototype, 'order', {
    get() {
        return this._order;
    },
    set(value) {
        this._order = value.toUpperCase();
        this._eventsHub.trigger('change', this, this);
    },
    enumerable: true
});
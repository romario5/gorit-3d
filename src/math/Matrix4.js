import Matrix from "./Matrix";
import Vector3 from "./Vector3";

let _up = new Vector3(0, 1, 0);
let zero = new Vector3( 0, 0, 0 );
let one = new Vector3( 1, 1, 1 );

export default class Matrix4 extends Matrix {
    constructor(data) {
        super(data);
    }


    clone() {
        let data = [];
        for (let i = 0; i <= this.data.length; i++) {
            data[i] = this.data[i];
        }
        return new Matrix4(data);
    }

    /**
     * Copies values from given matrix.
     * @param {Matrix4} m 
     */
    copyValuesFrom(m) {
        for (let i = 0; i < 16; i++) {
            this.data[i] = m.data[i];
        }
    }


    multiply(m) {
        let a = this.data;
        let b = m.data;
        var a00 = a[0 * 4 + 0];
        var a01 = a[0 * 4 + 1];
        var a02 = a[0 * 4 + 2];
        var a03 = a[0 * 4 + 3];
        var a10 = a[1 * 4 + 0];
        var a11 = a[1 * 4 + 1];
        var a12 = a[1 * 4 + 2];
        var a13 = a[1 * 4 + 3];
        var a20 = a[2 * 4 + 0];
        var a21 = a[2 * 4 + 1];
        var a22 = a[2 * 4 + 2];
        var a23 = a[2 * 4 + 3];
        var a30 = a[3 * 4 + 0];
        var a31 = a[3 * 4 + 1];
        var a32 = a[3 * 4 + 2];
        var a33 = a[3 * 4 + 3];
        var b00 = b[0 * 4 + 0];
        var b01 = b[0 * 4 + 1];
        var b02 = b[0 * 4 + 2];
        var b03 = b[0 * 4 + 3];
        var b10 = b[1 * 4 + 0];
        var b11 = b[1 * 4 + 1];
        var b12 = b[1 * 4 + 2];
        var b13 = b[1 * 4 + 3];
        var b20 = b[2 * 4 + 0];
        var b21 = b[2 * 4 + 1];
        var b22 = b[2 * 4 + 2];
        var b23 = b[2 * 4 + 3];
        var b30 = b[3 * 4 + 0];
        var b31 = b[3 * 4 + 1];
        var b32 = b[3 * 4 + 2];
        var b33 = b[3 * 4 + 3];
        this.data = [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];
        return this;
    }


    inverse() {
        let m = this.data;
        var m00 = m[0 * 4 + 0];
        var m01 = m[0 * 4 + 1];
        var m02 = m[0 * 4 + 2];
        var m03 = m[0 * 4 + 3];
        var m10 = m[1 * 4 + 0];
        var m11 = m[1 * 4 + 1];
        var m12 = m[1 * 4 + 2];
        var m13 = m[1 * 4 + 3];
        var m20 = m[2 * 4 + 0];
        var m21 = m[2 * 4 + 1];
        var m22 = m[2 * 4 + 2];
        var m23 = m[2 * 4 + 3];
        var m30 = m[3 * 4 + 0];
        var m31 = m[3 * 4 + 1];
        var m32 = m[3 * 4 + 2];
        var m33 = m[3 * 4 + 3];
        var tmp_0  = m22 * m33;
        var tmp_1  = m32 * m23;
        var tmp_2  = m12 * m33;
        var tmp_3  = m32 * m13;
        var tmp_4  = m12 * m23;
        var tmp_5  = m22 * m13;
        var tmp_6  = m02 * m33;
        var tmp_7  = m32 * m03;
        var tmp_8  = m02 * m23;
        var tmp_9  = m22 * m03;
        var tmp_10 = m02 * m13;
        var tmp_11 = m12 * m03;
        var tmp_12 = m20 * m31;
        var tmp_13 = m30 * m21;
        var tmp_14 = m10 * m31;
        var tmp_15 = m30 * m11;
        var tmp_16 = m10 * m21;
        var tmp_17 = m20 * m11;
        var tmp_18 = m00 * m31;
        var tmp_19 = m30 * m01;
        var tmp_20 = m00 * m21;
        var tmp_21 = m20 * m01;
        var tmp_22 = m00 * m11;
        var tmp_23 = m10 * m01;

        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

        m[0] = d * t0;
        m[1] = d * t1;
        m[2] = d * t2;
        m[3] = d * t3;
        m[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
        m[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
        m[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
        m[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
        m[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
        m[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
        m[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
        m[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
        m[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
        m[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
        m[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
        m[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
        (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

        return this;
    }

    compose(position, quaternion, scale) {
		let te = this.data;

		let x = quaternion._x, y = quaternion._y, z = quaternion._z, w = quaternion._w;
		let x2 = x + x,	y2 = y + y, z2 = z + z;
		let xx = x * x2, xy = x * y2, xz = x * z2;
		let yy = y * y2, yz = y * z2, zz = z * z2;
		let wx = w * x2, wy = w * y2, wz = w * z2;

		let sx = scale.x, sy = scale.y, sz = scale.z;

		te[ 0 ] = ( 1 - ( yy + zz ) ) * sx;
		te[ 1 ] = ( xy + wz ) * sx;
		te[ 2 ] = ( xz - wy ) * sx;
		te[ 3 ] = 0;

		te[ 4 ] = ( xy - wz ) * sy;
		te[ 5 ] = ( 1 - ( xx + zz ) ) * sy;
		te[ 6 ] = ( yz + wx ) * sy;
		te[ 7 ] = 0;

		te[ 8 ] = ( xz + wy ) * sz;
		te[ 9 ] = ( yz - wx ) * sz;
		te[ 10 ] = ( 1 - ( xx + yy ) ) * sz;
		te[ 11 ] = 0;

		te[ 12 ] = position.x;
		te[ 13 ] = position.y;
		te[ 14 ] = position.z;
		te[ 15 ] = 1;

		return this;
	}
}

/**
 * 
 */
Matrix4.createTranslation = function(dx, dy, dz) {
    if (dx.isVector3) {
        dy = dx._y;
        dz = dx._z;
        dx = dx._x;
    }
    return new Matrix4([
        1,  0,  0,  0,
        0,  1,  0,  0,
        0,  0,  1,  0,
        dx, dy, dz, 1
    ]);
};


Matrix4.createXRotation = function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return new Matrix4([
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1
    ]);
};


Matrix4.createYRotation = function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return new Matrix4([
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1
    ]);
};


Matrix4.createZRotation = function(angleInRadians) {
    var c = Math.cos(angleInRadians);
    var s = Math.sin(angleInRadians);

    return new Matrix4([
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
};


Matrix4.createScaling = function(sx, sy, sz) {
    return new Matrix4([
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1
    ]);
};


Matrix4.createProjection = function(width, height, depth) {
    return new Matrix4([
        2 / width, 0, 0, 0,
        0, -2 / height, 0, 0,
        0, 0, 2 / depth, 0,
        -1, 1, 0, 1
    ]);
};


Matrix4.createPerspective = function(FOVInRadians, near, far, aspect) {
    let m = [];
    var f = Math.tan(Math.PI * 0.5 - 0.5 * FOVInRadians);
    var rangeInv = 1.0 / (near - far);

    m[ 0] = f / aspect;
    m[ 1] = 0;
    m[ 2] = 0;
    m[ 3] = 0;
    m[ 4] = 0;
    m[ 5] = f;
    m[ 6] = 0;
    m[ 7] = 0;
    m[ 8] = 0;
    m[ 9] = 0;
    m[10] = (near + far) * rangeInv;
    m[11] = -1;
    m[12] = 0;
    m[13] = 0;
    m[14] = near * far * rangeInv * 2;
    m[15] = 0;

    return new Matrix4(m);
};



Matrix4.lookAt = function(direction, up) {
    // If local UP vector is not given - use global UP vector.
    if (up === undefined) up = _up;
    
    var zAxis = direction.clone();

    if (zAxis.squaredMagnitude() === 0) {
        console.log('change direction');
        zAxis.z = 1;
    }

    zAxis.normalize();

    var xAxis = up.clone().cross(zAxis);

    // If UP and Z are parallel.
    if (xAxis.squaredMagnitude() === 0) {
        if (Math.abs(up.z) === 1) {
            zAxis.x += 0.0001;
        } else {
            zAxis.z += 0.0001;
        }

        zAxis.normalize();
        xAxis= zAxis.clone().cross(up);
    }
    xAxis.normalize();

    let yAxis = zAxis.clone().cross(xAxis);

    return new Matrix4([
        xAxis.x, xAxis.y, xAxis.z, 0,
        yAxis.x, yAxis.y, yAxis.z, 0,
        zAxis.x, zAxis.y, zAxis.z, 0,
        0,
        0,
        0,
        1,
    ]);
};

Matrix4.createRotationAxis = function(axis, angle) {
    let c = Math.cos( angle ),
        s = Math.sin( angle ),
        t = 1 - c,
        x = axis.x, 
        y = axis.y, 
        z = axis.z,
        tx = t * x, 
        ty = t * y;

    let matrix = new Matrix4();

    matrix.data = [
        tx * x + c, tx * y - s * z, tx * z + s * y, 0,
        tx * y + s * z, ty * y + c, ty * z - s * x, 0,
        tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
        0, 0, 0, 1
    ];

    return matrix;
},



Matrix4.createFromQuaternion = function(q) {
    let m = new Matrix4();
	return m.compose(zero, q, one);
}
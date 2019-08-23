var _lut = [];

for ( var i = 0; i < 256; i ++ ) {
	_lut[ i ] = ( i < 16 ? '0' : '' ) + ( i ).toString( 16 );
}

let DEG2RAD = Math.PI / 180;
let RAD2DEG = 180 / Math.PI;

export function generateUUID() {
    var d0 = Math.random() * 0xffffffff | 0;
    var d1 = Math.random() * 0xffffffff | 0;
    var d2 = Math.random() * 0xffffffff | 0;
    var d3 = Math.random() * 0xffffffff | 0;
    var uuid = _lut[ d0 & 0xff ] + _lut[ d0 >> 8 & 0xff ] + _lut[ d0 >> 16 & 0xff ] + _lut[ d0 >> 24 & 0xff ] + '-' +
        _lut[ d1 & 0xff ] + _lut[ d1 >> 8 & 0xff ] + '-' + _lut[ d1 >> 16 & 0x0f | 0x40 ] + _lut[ d1 >> 24 & 0xff ] + '-' +
        _lut[ d2 & 0x3f | 0x80 ] + _lut[ d2 >> 8 & 0xff ] + '-' + _lut[ d2 >> 16 & 0xff ] + _lut[ d2 >> 24 & 0xff ] +
        _lut[ d3 & 0xff ] + _lut[ d3 >> 8 & 0xff ] + _lut[ d3 >> 16 & 0xff ] + _lut[ d3 >> 24 & 0xff ];

    return uuid.toUpperCase();
}

export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Compute euclidian modulo of m % n
// https://en.wikipedia.org/wiki/Modulo_operation
export function euclideanModulo(n, m) {
    return (( n % m ) + m) % m;
}

// Linear mapping from range <a1, a2> to range <b1, b2>
export function mapLinear(x, a1, a2, b1, b2) {
    return b1 + ( x - a1 ) * ( b2 - b1 ) / ( a2 - a1 );
}

// https://en.wikipedia.org/wiki/Linear_interpolation
export function lerp(x, y, t) {
    return (1 - t) * x + t * y;
}

// http://en.wikipedia.org/wiki/Smoothstep
export function smoothstep(x, min, max) {
    if (x <= min) return 0;
    if (x >= max) return 1;
    x = (x - min) / (max - min);
    return x * x * (3 - 2 * x);
}

export function smootherstep(x, min, max) {
    if ( x <= min ) return 0;
    if ( x >= max ) return 1;
    x = ( x - min ) / ( max - min );
    return x * x * x * ( x * ( x * 6 - 15 ) + 10 );
}

// Random integer from <low, high> interval
export function randInt(low, high) {
    return low + Math.floor(Math.random() * ( high - low + 1 ));
}

// Random float from <low, high> interval
export function randFloat(low, high) {
    return low + Math.random() * (high - low);
}

// Random float from <-range/2, range/2> interval
export function randFloatSpread(range) {
    return range * (0.5 - Math.random());
}

export function degToRad(degrees) {
    return degrees * DEG2RAD;
}

export function radToDeg(radians) {
    return radians * RAD2DEG;
}

export function isPowerOfTwo(value) {
    return (value & (value - 1 )) === 0 && value !== 0;
}

export function ceilPowerOfTwo(value) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

export function floorPowerOfTwo(value) {
    return Math.pow(2, Math.floor( Math.log( value ) / Math.LN2 ));
}


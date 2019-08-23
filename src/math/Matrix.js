export default class Matrix {
    constructor(data) {
        this.data = Array.isArray(data) ? data : [];
    }
}

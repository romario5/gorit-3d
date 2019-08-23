class Log
{
    constructor(prefix) {
        this.prefix = prefix || 'Gorit3D: ';
    }

    error(msg) {
        console.log(this.prefix + msg);
    }

    info(msg) {
        console.log(this.prefix + msg);
    }

    warn(msg) {
        console.warn(this.prefix + msg);
    }
}



var log = new Log();
export default log;

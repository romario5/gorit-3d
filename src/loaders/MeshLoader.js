import Mesh from "../core/Mesh";
import Object3D from "../core/Object3D";
import BaseLoader from "./BaseLoader";

class ObjectLoader extends BaseLoader {
    constructor() {
        super();
    }


    load(source, alias) {
        if (alias === undefined) alias = source;
        this.registry[alias] = new Resource();

        // return new Promise((resolve, reject) => {
        //     let req = new XmlHttpRequest();
        //
        //
        // });
    }


    parseData() {

    }
}

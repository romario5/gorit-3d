import Resource from "../core/Resource";

export default BaseLoader {
    /**
     * On initialization loader must create registry that
     * stores all the loaded resources.
     * @see {Resource}
     */
    constructor() {
        this.registry = {};
    }


    /**
     * Starts loading resource.
     * This method must be extended by another loader.
     * @param {string} source Should be url of the loaded resource.
     * @return {Promise}
     */
    load(source, alias) {
        // if (alias === undefined) alias = source;
        // this.registry[alias] = new Resource();
        // return new Promise((resolve, reject) => {
        //
        // });
    }
}

/**
 * Base class for files parsers.
 * All that you need is to implement parse method.
 */
export default class ObjParser
{
    constructor(file) {
        this.file = file;
    }

    /**
     * @return {Promise}
     */
    readFile() {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();

            reader.onload = () => {
                let base64Index = reader.result.indexOf(';base64,');
                if (base64Index >= 0) {
                    return resolve(this.parse(atob(reader.result.slice(base64Index + 8))));
                }
                resolve(this.parse(reader.result));
            };

            reader.onerror = reject;
            reader.readAsDataURL(this.file);
        });
    }

    /**
     * @param {Object|null} content 
     */
    parse(content) {
        // Implement parsing in the subclasses.
        return null;
    }
}
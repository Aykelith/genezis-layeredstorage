import GenezisChecker from "@genezis/genezis/Checker";
import deleteOnProduction from "@genezis/genezis/utils/deleteOnProduction";

const ConstructorGenezisCheckerConfig = deleteOnProduction({
    layers: GenezisChecker.array({
        of: GenezisChecker.function()
    }).required(),
    settings: GenezisChecker.object({
        shape: {
            returnNullIfNotFound: GenezisChecker.boolean(),
            populateMethods: GenezisChecker.array({ of: GenezisChecker.function() })
        }
    })
});

export default class LayeredStorage {
    constructor(data) {
        GenezisChecker(data, ConstructorGenezisCheckerConfig);

        this.layers = data.layers;
        this.settings = data.settings || {};

        this.get = this.get.bind(this);
    }

    get(key) {
        if (key == null) throw new Error();
        
        return new Promise(async (resolve, reject) => {
            let i=0;
            for (let length=this.layers.length; i < length; ++i) {
                const v = await this.layers[i](...arguments);
                if (v !== undefined) resolve(v);
            }

            if (this.settings.returnNullIfNotFound) {
                resolve(null);
            } else {
                reject("Not found the value in any layer");
            }

            if (i != 0 && this.settings.populateIfNotFound) {
                for (let j=0; j < i; ++j) {
                    this.settings.populateMethods[j](...arguments);
                }
            }
        });
    }
}

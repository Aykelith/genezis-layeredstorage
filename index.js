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
        this.populateLayers = this.populateLayers.bind(this);
    }

    async get(key) {
        if (key == null) throw new Error();
        
        let i=0;
        for (let length=this.layers.length; i < length; ++i) {
            const v = await this.layers[i](...arguments);
            if (v !== undefined) return v;
        }

        if (this.settings.returnNullIfNotFound) {
            Promise.resolve(null);
        } else {
            Promise.reject("Not found the value in any layer");
        }
    }

    async populateLayers() {
        if (i != 0 && this.settings.populateIfNotFound) {
            for (let j=0; j < i; ++j) {
                this.settings.populateMethods[j](...arguments);
            }
        }
    }
}

//= V2 =================================================================================================================

export class UseFailSafeLayerError extends Error {
    constructor() {
        super("");

        this.name = this.constructor.name;

        Error.captureStackTrace(this, this.constructor);
    }
}

const ConstructorGenezisCheckerConfig2 = deleteOnProduction({
    main_layer: GenezisChecker.function().required(),
    fail_safe_layer: GenezisChecker.function().required()
});

export class LayeredStorage2 {
    constructor(data) {
        GenezisChecker(data, ConstructorGenezisCheckerConfig2);

        this.data = data;

        this.get = this.get.bind(this);
    }

    async get() {
        try {
            return await this.data.main_layer(...arguments);
        } catch (error) {
            if (error instanceof UseFailSafeLayerError) return await this.data.fail_safe_layer(...arguments);
            throw error;
        }
    }
}

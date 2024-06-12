import GenericSettings, {GenericSettingsTypes} from "$lib/server/Database/Entities/GenericSettings.db";

class GenericSettingsWrapper {
    private genericSettingsMap: Map<string, GenericSettings> = new Map();

    async get(key: string, defaultValue: any = null): Promise<string|object|number|boolean|null> {
        if(this.genericSettingsMap.has(key)) {
            let setting = this.genericSettingsMap.get(key)!;
            switch(setting.type) {
                case "string":
                    return setting.stringValue;
                case "number":
                    return setting.intValue;
                case "boolean":
                    return setting.booleanValue;
                case "json":
                    return JSON.parse(setting.jsonValue);
            }
            throw new Error("Invalid setting type");
        }

        let setting = await GenericSettings.findOneBy({key});
        if(setting === null) {
            return defaultValue;
        }
        this.genericSettingsMap.set(key, setting);
        return this.get(key);
    }

    async set(key: string, value: string|object|number|boolean) {
        let setting = this.genericSettingsMap.get(key);
        if(setting === undefined) {
            setting = new GenericSettings();
            setting.key = key;

        }
        if(typeof value === "string") {
            setting.type = GenericSettingsTypes.STRING;
            setting.stringValue = value;
        } else if(typeof value === "number") {
            setting.type = GenericSettingsTypes.NUMBER;
            setting.intValue = value;
        } else if(typeof value === "boolean") {
            setting.type = GenericSettingsTypes.BOOLEAN;
            setting.booleanValue = value;
        } else if(typeof value === "object") {
            setting.type = GenericSettingsTypes.JSON;
            setting.jsonValue = JSON.stringify(value);
        } else {
            throw new Error("Invalid setting type");
        }


        this.genericSettingsMap.set(key, setting);
        await setting.save();
    }

}


const _settings = new GenericSettingsWrapper();

export default _settings;
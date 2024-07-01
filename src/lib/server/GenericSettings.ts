import GenericSettings, {GenericSettingsTypes} from "$lib/server/Database/Entities/GenericSettings.db";
import PGPLoader   from "./PGPLoader";
//check pgploader.ts
let testEncrypted = await PGPLoader.encryptString("test");
let testDecrypted = await PGPLoader.decryptString(testEncrypted);
if(testDecrypted !== "test") {
    throw new Error("PGP encryption test failed");
}


class GenericSettingsWrapper {
    private genericSettingsMap: Map<string, GenericSettings> = new Map();

    async get<T>(key: string, defaultValue: any = null): Promise<T|null> {
        if(this.genericSettingsMap.has(key)) {
            let setting = this.genericSettingsMap.get(key)!;
            switch(setting.type) {
                case "string":
                    return setting.stringValue as any as T;
                case "number":
                    return setting.intValue as any as T;
                case "boolean":
                    return setting.booleanValue as any as T;
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

    async getSecuredString(key: string): Promise<string> {
        let setting = await this.get<string>(key);
        if(setting === null) {
            return null;
        }
        if(!setting.includes("-----BEGIN PGP MESSAGE-----")) {
            await this.setSecuredString(key, setting);
            return setting;
        }
        let decrypted = await PGPLoader.decryptString(setting);
        this.genericSettingsMap.set(key, decrypted);
        return decrypted;
    }

    async setSecuredString(key: string, value: string) {
        let encrypted = await PGPLoader.encryptString(value);
        await this.set(key, encrypted);
    }

    async set(key: string, value: any) {
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
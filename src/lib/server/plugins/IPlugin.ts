import type {IUserDirectoryPlugin} from "./IUserDirectoryPlugin";
import GenericSettings from "$lib/server/GenericSettings";
import deepmerge from "deepmerge";

export abstract class IPlugin {
    public abstract static readonly pluginName: string;
    public abstract static readonly pluginVersion: string;
    public abstract static readonly pluginDescription: string;
    public abstract static readonly pluginAuthor: string;
    public abstract static readonly pluginAuthorURL: string;
    public abstract static readonly pluginAuthorEmail: string;
    public abstract static readonly pluginSlug: string;
    private _settings : TypeDefaultPluginSettings;

    private static _instanceMap: Map<string, IPlugin> = new Map();
    static getInstance<Type = this>(): Type {
        if(!this._instanceMap.has(this.pluginSlug)) {
            this._instanceMap.set(this.pluginSlug, this.createInstance());
        }
        return this._instanceMap.get(this.pluginSlug);
    };

    abstract static createInstance(): this;



    static getPluginList(): IPlugin[] {
        return Array.from(this._instanceMap.values());
    }

    static registerSelf() {
        this.getInstance();
    }

    private constructor() {
        this.getInternalSettings();
    }

    static getUserDirectoryPlugins(): IUserDirectoryPlugin[] {
        return this.getPluginList().filter(plugin => plugin.isUserDirectoryPlugin) as IUserDirectoryPlugin[];
    }


    private async getInternalSettings(): Promise<TypeDefaultPluginSettings> {
        if(this._settings === undefined) {
            this._settings = await GenericSettings.get<TypeDefaultPluginSettings>('plugin.settings.' + this.pluginSlug, defaultSettings);
        }
        return this._settings;
    }

    async activate() {
        await this.setInternalSettings({active: true});
    }

    private async setInternalSettings(setting: partial<TypeDefaultPluginSettings>) {
        let x = await this.getInternalSettings();
        let newSet = deepmerge(x, setting);
        this._settings = newSet;
        await GenericSettings.set('plugin.settings.' + this.pluginSlug, newSet);
    }

    isActive() : boolean {
        return this._settings?.active ?? false;
    }
}
export interface TypeDefaultPluginSettings {
    active: boolean;
}

const defaultSettings : TypeDefaultPluginSettings = {
    active: false
}


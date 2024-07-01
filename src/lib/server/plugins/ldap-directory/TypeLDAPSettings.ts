import type {TypeDefaultPluginSettings} from "$lib/server/plugins/IPlugin";

export interface LDAPSettings extends TypeDefaultPluginSettings {
    ldap: {
        host: string;
        username: string;
        password: string;
    }
}
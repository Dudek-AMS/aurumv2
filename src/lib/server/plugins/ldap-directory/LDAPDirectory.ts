import {IPlugin} from "$lib/server/plugins/IPlugin";
import {IUserDirectoryPlugin} from "$lib/server/plugins/IUserDirectoryPlugin";
import type {LDAPSettings} from "./TypeLDAPSettings";






export class LDAPDirectory extends IPlugin implements IUserDirectoryPlugin {
    public static readonly pluginName = "LDAP Directory";
    public static readonly pluginVersion = "1.0";
    public static readonly pluginDescription = "LDAP Directory";
    public static readonly pluginAuthor = "Aurum";
    public static readonly pluginAuthorURL = "https://www.adesso-mobile.de";
    public static readonly pluginAuthorEmail = "aurum@adesso-mobile.de";
    public static readonly pluginSlug = "ldap-directory";


    static createInstance(): LDAPDirectory {
        return new LDAPDirectory();
    }


    constructor() {
        super();
    }

    getSettings(): LDAPSettings {
        return {
            active: this.isActive(),
            ldap: {
                host: '',
                username: '',
                password: '',
            }
        }
    }

    isUserDirectoryPlugin() : boolean { return true; }

}
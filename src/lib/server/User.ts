import UserEntity from "$lib/server/Database/Entities/User.db";
import {IPlugin} from "$lib/server/plugins/IPlugin";


export class User {

    private _userEntity: UserEntity;
    constructor(user: UserEntity) {
        super();
        this._userEntity = user;
    }

    static async getSysadmin() : Promise<User> {
        return await User.findOneBy({
            id: '00000000-0000-0000-0000-000000000000'
        }) as User;
    }

    static async findOneByIdentifier(id: string): Promise<User> {
        let user = await User.findOneBy({
            id
        }) as User;
        if(user !== null) {
            return new User(user);
        }

        userDirectoryPlugins = IPlugin.getUserDirectoryPlugins();
        for(let plugin of userDirectoryPlugins) {
            let user = await plugin.getUserByIdentifier(id);
            if(user !== null) {
                return new User(user);
            }
        }
        return null;

    }
}
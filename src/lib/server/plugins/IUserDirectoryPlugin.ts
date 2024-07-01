import UserEntity from "$lib/server/Database/Entities/User.db";
export interface IUserDirectoryPlugin {
    getUserByIdentifier(id: string): Promise<UserEntity>;
}
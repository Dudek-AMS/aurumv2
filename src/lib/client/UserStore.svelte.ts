import type {UserDisplayData} from "../../routes/backend/userdisplay/[userId]/+server";

type UserStore = {
    [key: string]: UserDisplayData;
};

let userStore : UserStore = $state({});

export default {
    getUserByIdOrName(userIdOrName?: string) {
        if(userIdOrName === undefined) {
            throw new Error(userIdOrName + ' is not a valid user id or name');
        }
        if(!userStore[userIdOrName]){
            userStore[userIdOrName] = {userId: userIdOrName, userName: userIdOrName, displayName: 'Unknown User'};
            fetch('/backend/userdisplay/' + userIdOrName).then(response => response.json()).then((data: UserDisplayData) => {
                userStore[data.userId] = data;
                userStore[data.userId] = data;
            });
        }

        return userStore[userIdOrName];
    },



}
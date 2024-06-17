import {forbidden, notFound} from "$lib/server/HTTPErrors";
import User from "$lib/server/Database/Entities/User.db";

export type UserDisplayData = {
    userId: string;
    displayName: string;
    userName: string;
};

export const GET = async (request) => {
    if(!request.locals.isSysadmin && !request.locals.session.data.userid) {
        forbidden();
    }


    let user = await User.findOneBy({id: request.params.userId});
    if(user === null) {
        notFound();
        // @ts-ignore
        return;
    }
    let data : UserDisplayData = {
        userId: user.id,
        displayName: user.displayName,
        userName: user.userName
    };

    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json'
        }
    });
};
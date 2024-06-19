import {EntraClient} from "$lib/server/entra/Client";
import {forbidden, notFound} from "$lib/server/HTTPErrors";
import User from "$lib/server/Database/Entities/User.db";

export async function GET({params, locals, request}) {

    if(locals.user === null || locals.user === undefined) {
        forbidden();
    }

    let findUser = await User.findOne( {
        where: [
            {id: params.userId},
            {entraId: params.userId},
            {userName: params.userId}
        ]
    });
    if(findUser === null) {
        return notFound();
    }

    let requestEtag = request.headers.get("If-None-Match");

    let photo = await EntraClient.getInstance().getProfilePhoto(findUser.entraId, requestEtag);
    if(photo === null) {
        return notFound();
    }

    let etag = photo.meta["@odata.mediaEtag"];

    if(requestEtag !== null && requestEtag === etag) {
        return new Response(null, {
            status: 304
        });
    }

    return new Response(photo.img, {
            headers: {
                "Content-Type": "image/jpeg",
                "ETag": etag
            }
        });

};
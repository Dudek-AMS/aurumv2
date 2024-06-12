import 'reflect-metadata';
import { TypeORM } from "$lib/server/Database/db";
import type {Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";
import {createNewSessionId, createOrGet, set} from "$lib/Session/SessionStorage";
import User from "$lib/server/Database/Entities/User.db";
console.log('AurumV2 running in ' + (import.meta.env.DEV ? 'DEV' : 'PROD'));
const db = await TypeORM.getInstance(); //we init the db connection





export const handle: Handle = async ({ event, resolve }) => {
    const cookies = event.cookies;
    let sessionId = cookies.get('sessionid') ?? '';
    if(sessionId === '') {
        sessionId = createNewSessionId();
        cookies.set('sessionid', sessionId, { path: '/',   secure: !dev})
    }
    event.locals.session = createOrGet(sessionId);
    if(event.locals.session.data.userid !== null) {
        const user = await User.findOneBy({
            id: event.locals.session.data.userid
        });
        if(user === null) {
            event.locals.session.data.userid = null;
            delete event.locals.user;
        } else {
            event.locals.user = user;
        }

    }
    try {
        event.locals.ip = event.getClientAddress();
    }   catch (e) {
        event.locals.ip = 'unknown';
    }

    const response = await resolve(event);

    set(event.locals.session);
    return response;
}


    User.findOneBy({
        id: '00000000-0000-0000-0000-000000000000'
    }).then(user => {
        if(user === null) {
            const admin = new User();
            admin.id = '00000000-0000-0000-0000-000000000000';
            admin.userName = 'SYSADMIN';
            admin.givenName = 'Admin';
            admin.familyName = 'Admin';
            admin.displayName = 'SYSADMIN';
            admin.active = true;
            admin.entraId = 'admin';
            admin.save();
        }});

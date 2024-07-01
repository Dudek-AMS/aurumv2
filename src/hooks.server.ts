import 'reflect-metadata';
import type {Handle} from "@sveltejs/kit";
import {dev} from "$app/environment";
import {createNewSessionId, createOrGet, set} from "$lib/Session/SessionStorage";
import User from "$lib/server/Database/Entities/User.db";
console.log('AurumV2 running in ' + (import.meta.env.DEV ? 'DEV' : 'PROD'));
//we init the db connection
import {TypeORM} from "$lib/server/Database/db";
import {addStartup, runStartup} from "$lib/Startup";
import {LDAPDirectory} from "$lib/server/plugins/ldap-directory/LDAPDirectory";
await TypeORM.getInstance();



export const handle: Handle = async ({ event, resolve }) => {
    await runStartup();
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
    event.locals.isSysadmin =() => event.locals.session.sysadmin;
    try {
        event.locals.ip = event.getClientAddress();
    }   catch (e) {
        event.locals.ip = 'unknown';
    }

    const response = await resolve(event);

    set(event.locals.session);



    return response;
}



addStartup(async () => {

    let user = await User.findOneBy({
        id: '00000000-0000-0000-0000-000000000000'
    });

    if(user === null) {
        const admin = new User();
        admin.id = '00000000-0000-0000-0000-000000000000';
        admin.userName = 'SYSADMIN';
        admin.givenName = 'Admin';
        admin.familyName = 'Admin';
        admin.displayName = 'SYSADMIN';
        admin.active = true;
        admin.entraId = 'admin';
        await admin.save();
    }

});
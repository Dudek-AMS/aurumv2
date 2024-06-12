import { createLoginURL, assert} from "$lib/server/entra/SAML2";
import {redirect} from "@sveltejs/kit";
import User from "$lib/server/Database/Entities/User.db";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    redirect(307, await createLoginURL())
}
/** @type {import('./$types').PostHandler} */
export async function POST({request, locals}) {
    const params = Object.fromEntries((await request.formData()).entries());
    const result = await assert({...params});


    // LDAP:    msDS-ExternalDirectoryObjectId
    // Entra:   user.attributes['http://schemas.microsoft.com/identity/claims/objectidentifier']
    // Database: entraId

    if(typeof result.user !== undefined) {
        const entraUser = result.user;
        const entraId = entraUser.attributes['http://schemas.microsoft.com/identity/claims/objectidentifier'][0]
        let user = await User.findOneBy({entraId: entraId})
        if (user !== null) {
            locals.session.data.userid = user.id;
        }


    }

    redirect(303, '/');
}
import { createLoginURL, assert} from "$lib/server/entra/SAML2";
import {redirect} from "@sveltejs/kit";

/** @type {import('./$types').RequestHandler} */
export async function GET() {
    redirect(307, await createLoginURL())
}
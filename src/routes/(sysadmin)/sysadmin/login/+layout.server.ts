import type { LayoutServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";
export const load: LayoutServerLoad = async ({locals, parent}) => {

    if(locals.isSysadmin()) {
        redirect(303, '/sysadmin');
        return;
    }


    let parentData = await parent();
    return {
        crumbs: [
            ...(parentData.crumbs ?? []),
            {name: 'Anmelden', href: '/sysadmin/Login'},
        ]
    };
};
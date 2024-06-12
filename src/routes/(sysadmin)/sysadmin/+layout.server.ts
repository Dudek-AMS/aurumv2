import type { LayoutServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";
export const load: LayoutServerLoad = async ({locals, request, parent}) => {
    const url = new URL(request.url);
    if(url.pathname === '/sysadmin/login') {
        return {};
    }
    if(!locals.session.sysadmin) {
        redirect(303, '/sysadmin/login');
    }



    let parentData = await parent();
    return {
        crumbs: [
            ...(parentData.crumbs ?? []),
            { name: 'Systemeinstellungen', href: '/sysadmin', icon: 'Home'}
        ]
    };
};
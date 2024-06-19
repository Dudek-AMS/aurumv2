import type { LayoutServerLoad } from './$types';
import {redirect} from "@sveltejs/kit";
export const load: LayoutServerLoad = ({locals}) => {
    if(!locals.user) {
        redirect(307, '/login');
    }

    let user = locals.user.toJSON();

    return {
        user
    };
};
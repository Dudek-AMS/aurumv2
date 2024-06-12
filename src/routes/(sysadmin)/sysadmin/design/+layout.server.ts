import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = async ({parent}) => {
    let data = await parent();
    return {
        crumbs: [
            ...(data.crumbs ?? []),
            {name: 'Design', href: '/sysadmin/design', icon: 'Design_services'}
        ]
    };
};
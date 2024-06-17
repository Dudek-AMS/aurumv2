import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = async ({parent}) => {
    let data = await parent();
    return {
        crumbs: [
            ...(data.crumbs ?? []),
            {name: 'Audit', href: '/sysadmin/audit', icon: 'History'}
        ]
    };
};
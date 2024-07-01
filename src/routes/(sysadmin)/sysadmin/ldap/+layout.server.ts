import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = async ({parent}) => {



    let data = await parent();


    return {
        ldapSettings: {
            ldap: {
                host: '',
                username: '',
                password: '',
            }
        },
        crumbs: [
            ...(data.crumbs ?? []),
            {name: 'LDAP Directory', href: '/sysadmin/ldap', icon: 'Groups'}
        ]
    };
};
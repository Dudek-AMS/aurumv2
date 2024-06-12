import type {LayoutServerLoad} from "./$types";
import GenericSettings from "$lib/server/GenericSettings";

export const load: LayoutServerLoad = async ({parent})  => {
    let data = {
        website: {}
    };

    let promiseWebsiteData =  Promise.all([
        GenericSettings.get('base_url', null) as Promise<string>
    ]);

    let [websiteData] = await Promise.all([
        promiseWebsiteData
    ]);

    let website = {
        base_url: websiteData[0]
    }


    let parentData = await parent();
    return {
        website,
        crumbs: [
            ...(parentData.crumbs ?? []),
            {name: 'Allgemein', href: '/sysadmin/settings', icon: 'Settings'}
        ]
    };

};
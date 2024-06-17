import type { LayoutServerLoad } from './$types';

import Design from "$lib/server/Design";

import type {CrumbItem} from "$lib/Components/Breadcrumb/BreadcrumbStore.svelte";
import GenericSettings from "$lib/server/GenericSettings";
import {redirect} from "@sveltejs/kit";



type MainLayout =  {
    design: {key: string, value: string}[],
    crumbs: CrumbItem[]
};

export const load : LayoutServerLoad = async ({request}): Promise<MainLayout> => {
    let base_url  = await GenericSettings.get('base_url', null) as string|null;
    if(base_url && !request.url.startsWith(base_url)){
        let url = new URL(request.url);
        redirect(307, base_url + url.pathname);
    }

    return {
        design: Design.values().map(design => design.toJSON()),
        crumbs: []
    }
}
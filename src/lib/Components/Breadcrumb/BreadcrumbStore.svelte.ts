
export interface CrumbItem {
    name: string;
    href: string;
    icon?: string;
}



let _crumbs: CrumbItem[] = $state([]);

export function setCrumbs(newCrumbs: CrumbItem[]) {
    _crumbs = newCrumbs;
}




export const crumbs = {
    get value() {
        return _crumbs;
    }
}

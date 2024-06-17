import {building} from '$app/environment';
import Design from "$lib/server/Database/Entities/Design.db";
import {addStartup} from "$lib/Startup";


class DesignWrapper implements Iterable<Design> {
    private designMap: Map<string, Design> = new Map();

    async refresh() {
        this.designMap = new Map();
        let designs = await Design.find();
        designs.forEach(design => {
            this.designMap.set(design.key, design);
        });
    }


    keys() {
        return Array.from(this.designMap.keys());
    }

    entries() {
        return Array.from(this.designMap.entries());
    }

    values() {
        return Array.from(this.designMap.values());
    }

    get(key: string): null | Partial<Design> {
        return this.designMap.get(key)?.toJSON() ?? null;
    }

    private _get(key: string): null | Design {
        return this.designMap.get(key) ?? null;
    }

    async set(key: string, value: string) {
        let design = this._get(key);
        if (design === null) {
            design = new Design();
            design.key = key;
            design.value = value;
            this.designMap.set(key, design);
        } else {
            design.value = value;
        }
        await design.save();
    }

    constructor() {
    }

    [Symbol.iterator](): Iterator<Design, any, undefined> {
        let data = this.values();
        let index = 0;
        return {
            next: () => ({value: data[++index], done: !(index in data)})
        };
    }


}


const _design = new DesignWrapper();

addStartup(async function () {
        await _design.refresh();

        const DefaultColors = [
            ['--color-primary', 'rgb(0,123,255)'],
            ['--color-primarybg-text', 'rgb(255,255,255)'],
            ['--color-bodybg', 'rgb(238,238,238)'],
            ['--color-secondary', 'rgb(221,221,221)'],
            ['--color-secondarybg-text', 'rgb(0,0,0)'],
            ['--color-secondarybg-link', 'rgb(0,123,255)'],
        ]

        DefaultColors.forEach(([key, value]) => {
            if (_design.get(key) === null) {
                _design.set(key, value);
            }
        });
});


export default _design;




import { building } from '$app/environment';
import Design from "$lib/server/Database/Entities/Design.db";


class DesignWrapper implements Iterable<Design>{
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

    get(key: string): null|Partial<Design> {
        return this.designMap.get(key)?.toJSON() ?? null;
    }
    private _get(key: string): null|Design {
        return this.designMap.get(key) ?? null;
    }

    async set(key: string, value: string) {
        let design = this._get(key);
        if(design === null) {
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
            next: () => ({ value: data[++index], done: !(index in data) })
        };
    }


}


const _design = new DesignWrapper();

if(!building) {
    await _design.refresh();

    const DefaultColors = [
        ['--color-primary', '#007bff'],
        ['--color-primarybg-text', '#FFFFFF'],
        ['--color-bodybg', '#EEEEEE'],
        ['--color-secondary', '#DDDDDD'],
        ['--color-secondarybg-text', '#000000'],
        ['--color-secondarybg-link', '#007bff'],
    ]

    DefaultColors.forEach(([key, value]) => {
        if (_design.get(key) === null) {
            _design.set(key, value);
        }
    });
}


export default _design;




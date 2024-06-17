type StartupFunction = () => Promise<any>|any;
const startup : StartupFunction[] = []

export function addStartup(fn: StartupFunction) {
    startup.push(fn)
}

export async function runStartup() {
    if(startup.length === 0) {
        return;
    }
    let funcs : StartupFunction[] = [];
    while(startup.length > 0) {
        funcs.push(startup.shift() as StartupFunction);
    }
    await Promise.all(funcs.map(fn => fn()));
}
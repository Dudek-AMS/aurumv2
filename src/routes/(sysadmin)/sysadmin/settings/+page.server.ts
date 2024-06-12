import type { Actions } from './$types';
import GenericSettings from "$lib/server/GenericSettings";
import Auditlog, {AuditlogTypes} from "$lib/server/Database/Entities/Auditlog.db";
import User from "$lib/server/Database/Entities/User.db";


async function updateWebsite(formData: FormData, user: User) : Promise<{error:string|null}> {
    const base_url = formData.get('base_url') as string ?? '';
    if (!base_url) {
        return {
            error: 'Base URL is required.'
        }
    }
    let awaitPromises = [];
    let old_base_url = await GenericSettings.get('base_url');
    if(old_base_url !== base_url) {
        await GenericSettings.set('base_url', base_url);
        let newAuditLog = new Auditlog();
        newAuditLog.type = AuditlogTypes.SETTINGS;
        newAuditLog.user = user;
        newAuditLog.payload = {
            key: 'base_url',
            oldValue: old_base_url,
            newValue: base_url
        }
        awaitPromises.push(newAuditLog.save());

    }

    await Promise.all(awaitPromises);

    return {
        error: null
    }
}


export const actions = {
    default: async function({request, locals}) : Promise<{error:string|null, action: string}> {
        let user = locals.user ?? (await User.findOneBy({id: '00000000-0000-0000-0000-000000000000'})) as User;
        const formData = await request.formData();
        const action = formData.get('action') as string ?? '';

        if (action === 'updateWebsite') {
            return {action, ...await updateWebsite(formData, user)};
        }

        return {
            action, error: null
        }
    }
} satisfies Actions;
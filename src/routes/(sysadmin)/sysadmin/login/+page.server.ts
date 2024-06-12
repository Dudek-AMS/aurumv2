import type { Actions } from './$types';
import Sysadmin from "$lib/Sysadmin";
import Auditlog, {AuditlogTypes} from "$lib/server/Database/Entities/Auditlog.db";
import User from "$lib/server/Database/Entities/User.db";
export const actions = {
    default: async({request, locals}) : Promise<{error:string|null}> => {
        const formData = await request.formData();
        let password = formData.get('sysPassword');
        if(Sysadmin.sysAdminPasswordValidUntil < new Date()) {
            Sysadmin.refreshSysadminPassword();
            return {
                error: 'The SysAdmin password has expired, please try again.'
            };
        }
        if(password === Sysadmin.sysAdminPassword) {
            locals.session.sysadmin = true;

            const succeededLoginAuditLog = new Auditlog();
            succeededLoginAuditLog.type = AuditlogTypes.SYSADMINLOGIN;
            succeededLoginAuditLog.user = (locals.user ?? await User.getSysadmin());
            succeededLoginAuditLog.payload = {
                newValue: {
                    status: 'success',   ip: locals.ip
                }
            }
            await succeededLoginAuditLog.save();

            return {
                error: null
            }
        }

        const failedLoginAuditLog = new Auditlog();
        failedLoginAuditLog.type = AuditlogTypes.SYSADMINLOGIN;
        failedLoginAuditLog.user = (locals.user ?? await User.getSysadmin());
        failedLoginAuditLog.payload = {
            newValue: {
                status: 'failed',   ip: locals.ip
            }
        }
        await failedLoginAuditLog.save();

        return {
            error: 'Invalid password.',

        }
    }
} satisfies Actions;
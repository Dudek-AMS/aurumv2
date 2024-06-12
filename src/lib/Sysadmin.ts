import crypto from "node:crypto";

let sysAdminPassword = '';
let sysAdminPasswordValidUntil = new Date();


refreshSysadminPassword();


export function refreshSysadminPassword() {
    sysAdminPassword = crypto.randomBytes(32).toString('base64url');
    sysAdminPasswordValidUntil = new Date(Date.now() + 15 * 60 * 1000); //15m


    console.log('SysAdmin password:', sysAdminPassword);
    console.log('SysAdmin password valid until:', sysAdminPasswordValidUntil);

    return {
        sysAdminPassword,
        sysAdminPasswordValidUntil
    }
}

export default {
    get sysAdminPassword() {
        return sysAdminPassword;
    },
    get sysAdminPasswordValidUntil() {
        return sysAdminPasswordValidUntil;
    },
    refreshSysadminPassword: refreshSysadminPassword
}
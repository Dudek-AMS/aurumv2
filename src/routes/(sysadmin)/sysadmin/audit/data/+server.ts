import type {DataTableResponse} from "$lib/Components/DataTable/DataTableResponse";
import Auditlog from "$lib/server/Database/Entities/Auditlog.db";

export type AuditLogEntry = {
    createdDate: string;
    userId: string;
    type: string;
}

export const POST = async (request) => {

    let data : DataTableResponse<AuditLogEntry> = {
        columns: [
            { keyMap: 'createdDate', label: 'Zeitpunkt' },
            { keyMap: 'userId', label: 'Benutzer' },
            { keyMap: 'type', 'label': 'Typ' },
            { keyMap: 'payload', 'label': 'Payload'}
        ],
        entries: []
    };


    let logs = await Auditlog.find({
        cache: true,
    });

    data.entries = logs.map(log => {
        return {

            createdDate: log.createdDate.toISOString(),
            userId: log.userId,
            type: log.type,
            payload: log.payload
        }
    });

    return new Response(JSON.stringify(data), {
        headers: {
            'content-type': 'application/json'
        }
    });
};
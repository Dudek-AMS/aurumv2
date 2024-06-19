import GenericSettings from "$lib/server/GenericSettings";

export class EntraClient {
    private tenantId: string|null;
    private clientId: string|null;
    private clientSecret: string|null;
    private bearerToken: string = '';
    private tokenValidUntil: number = 0;


    private static __instance: EntraClient;

    static getInstance() {
        if (!this.__instance) {
            this.__instance = new EntraClient()
        }
        return this.__instance;
    }

    private async getBearerToken() {
        if(this.bearerToken !== "" && this.tokenValidUntil > Date.now()) {
            return;
        }
        await this.loadSettings();
        if(this.tenantId === null || this.clientId === null || this.clientSecret === null) {
            throw new Error("Missing settings");
        }

        const url = `https://login.microsoftonline.com/${this.tenantId}/oauth2/token?api-version=1.0 `;



        const formBody = new FormData();
        formBody.append('resource', "https://graph.microsoft.com");
        formBody.append('grant_type', 'client_credentials');
        formBody.append('client_secret', this.clientSecret as string);
        formBody.append('client_id', this.clientId as string);

        const response = await fetch(url, {
            method: "POST",
            body: formBody
        });


        const data = await response.json();

        this.bearerToken = `${data.token_type} ${data.access_token}`;
        this.tokenValidUntil = ((data.expires_on??0) * 1000);
    }

    async getProfilePhoto(userId: string, requestEtag: string|null = null) {
        await this.getBearerToken();


        const metaURL  = `https://graph.microsoft.com/v1.0/users/${userId}/photo`;
        const metaResponse = await fetch(metaURL, {
            headers: {
                "Authorization": this.bearerToken,
                'ConsistencyLevel': 'eventual',
            }
        });

        if(metaResponse.status !== 200) {
            return null;
        }
        const meta = await metaResponse.json();
        let etag = meta["@odata.mediaEtag"];
        if(requestEtag !== null && requestEtag === etag) {
            return {meta, img: null};
        }


        const url = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;
        const response = await fetch(url, {
            headers: {
                "Authorization": this.bearerToken,
                'ConsistencyLevel': 'eventual',
            }
        });
        return {meta, img: await response.arrayBuffer() };
    }



    private async loadSettings() {
        let [tenantId, clientId, clientSecret] = await Promise.all([
            GenericSettings.get<string>("entraApi.tenantId"),
            GenericSettings.get<string>("entraApi.clientId"),
            GenericSettings.get<string>("entraApi.clientSecret")
        ]);
        this.tenantId = tenantId;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    private constructor() {}
}
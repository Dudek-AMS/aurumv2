import saml2 from 'saml2-js';
import devMeta from './dev-meta.json';
import prodMeta from './prod-meta.json';

const isDEV = import.meta.env.DEV || process.env.NODE_ENV === 'dev';
const isLocal = import.meta.env.DEV;
const entityID = import.meta.env.DEV ? 'https://aurum.dev.adesso-mobile.de' : 'https://aurum.adesso-mobile.de';



const url = isLocal ? 'http://127.0.0.1' :
    (isDEV ?
        'https://login.microsoftonline.com/3d355765-67d9-47cd-9c7a-bf31179f56eb/federationmetadata/2007-06/federationmetadata.xml?appid=309edf2f-662e-48f6-bc28-10840bd019bc' :
        'https://login.microsoftonline.com/3d355765-67d9-47cd-9c7a-bf31179f56eb/federationmetadata/2007-06/federationmetadata.xml?appid=f5d3cbf0-f4bc-407b-a974-bff093bfd743');





const metaData = isDEV ? devMeta : prodMeta;

const sp = new saml2.ServiceProvider({
    'entity_id':entityID,
    'private_key': '',
    'certificate': '',
    'assert_endpoint': `${url}/backend/sso/entra`,
    'allow_unencrypted_assertion': true

});

const idp = new saml2.IdentityProvider({
    'sso_login_url': metaData.EntityDescriptor.IDPSSODescriptor.SingleSignOnService[0].Location,
    'sso_logout_url': metaData.EntityDescriptor.IDPSSODescriptor.SingleLogoutService.Location,
    'certificates': metaData.EntityDescriptor.IDPSSODescriptor.KeyDescriptor.KeyInfo.X509Data.X509Certificate,
    'allow_unencrypted_assertion': true
});

export function createLoginURL() : Promise<string>{
    return new Promise((resolve, reject) => {
        sp.create_login_request_url(idp, {}, (err, login_url, request_id) => {
            if (err != null)
                reject(err);
            else
                resolve(login_url);
        });
    });
}

export function assert(params: any) : Promise<any>{
    return new Promise((resolve, reject) => {
        sp.post_assert(idp, {
            request_body: params

        }, (err, saml_response) => {
            if (err != null)
                reject(err);
            else
                resolve(saml_response);
        });
    });
}
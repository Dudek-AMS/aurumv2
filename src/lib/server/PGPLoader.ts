import * as openpgp from 'openpgp';
import * as fs from "node:fs";



let _privateKey: string;
let _publicKey: string;
let privateKey: openpgp.PrivateKey;
let publicKey: openpgp.PublicKey;

await (async () => {

    if (!fs.existsSync('/var/aurum/gpg/private.key')) {
        console.log('Private key not found, create new...');
        const {privateKey, publicKey, revocationCertificate} = await openpgp.generateKey({
            type: 'ecc', // Type of the key, defaults to ECC
            curve: 'curve25519', // ECC curve name, defaults to curve25519
            userIDs: [{name: 'Aurum', email: 'aurum@example.com'}], // you can pass multiple user IDs
            format: 'armored' // output key format, defaults to 'armored' (other options: 'binary' or 'object')
        });


        fs.writeFileSync('/var/aurum/gpg/private.key', privateKey);
        fs.writeFileSync('/var/aurum/gpg/public.key', publicKey);

    }

    if (!fs.existsSync('/var/aurum/gpg/private.key')) {
        throw new Error('error creating private key');
    }
    _privateKey = await fs.promises.readFile('/var/aurum/gpg/private.key', 'utf-8');
    _publicKey = await fs.promises.readFile('/var/aurum/gpg/public.key', 'utf-8');

    privateKey = await openpgp.readPrivateKey({armoredKey: _privateKey});
    publicKey = await openpgp.readKey({armoredKey: _publicKey});
})();




export default {
    encryptString: async (str: string) => {
        return await openpgp.encrypt({
            message: await openpgp.createMessage({text: str}), // input as Message object
            encryptionKeys: publicKey // for encryption
        });
    },
    decryptString: async (str: string) => {
        const {data: decrypted} = await openpgp.decrypt({
            message: await openpgp.readMessage({armoredMessage: str}), // parse armored message
            decryptionKeys: privateKey // for decryption
        });
        return decrypted;
    }
};
import { Crypt, RSA } from 'hybrid-crypto-js';
import md5 from "md5";

let crypto = new Crypt({
    // Default AES standard is AES-CBC. Options are:
    // AES-ECB, AES-CBC, AES-CFB, AES-OFB, AES-CTR, AES-GCM, 3DES-ECB, 3DES-CBC, DES-ECB, DES-CBC
    aesStandard: 'AES-CBC',
    // Default RSA standard is RSA-OAEP. Options are:
    // RSA-OAEP, RSAES-PKCS1-V1_5
    rsaStandard: 'RSA-OAEP',
});
let rsa = new RSA({
    keySize: 1024,
});

/**
 * This function will hash the given text.
 */
export let hashText = ({text}) => {
    return md5(text);
}

/**
 * This function will create a signature
 */
export let sign = ({privateKey, message}) => {
    return crypto.signature(privateKey, message);
}

/**
 * This function will encrypt the packet using
 * the recievers publicKey and it will add a
 * signature for verification.
 */
export let encryptedPacket = ({packet, publicKeys, signature}) => {
    return crypto.encrypt(publicKeys, packet, signature);
}

/**
 * This function will decrypt the packet using
 * the recievers privateKey and the signature
 * will be used for verification.
 */
export let decryptedPacket = ({packet, privateKey}) => {
    return crypto.decrypt(privateKey, packet);
}

/**
 * This function will verify the decrypted packet
 * using the supplied issuers publicKey, the
 * signature and the message.
 */
export let verifyPacket = ({packet, publicKey}) => {
    return crypto.verify(publicKey, packet.signature, packet.payload);
}

/**
 * This function will generate the users
 * publicKey and privateKey if they do
 * not already exist.
 */
export let generateKeyPair = () => {
    return rsa.generateKeyPairAsync();
}
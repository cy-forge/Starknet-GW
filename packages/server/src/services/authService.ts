import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';

export const generateSecret = () => {
    const secret = speakeasy.generateSecret({ name: 'Starknet GW' });
    return {
        secret: secret.base32,
        qrCode: generateQRCode(secret.otpauth_url!)
    }
};

export const verifyMFAToken = (secret: string, token: string) => {
    return speakeasy.totp.verify({
        secret,
        token,
        encoding: 'base32'
    })
}

export const generateQRCode = async (otpauthUrl: string) => {
    return await qrcode.toDataURL(otpauthUrl);
}

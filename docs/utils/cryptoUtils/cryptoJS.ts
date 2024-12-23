/*
 * @file AES对称加密/解密
 * @author: DontK
 * @LastEditTime: 2024-12-23 09:22:51
 * npm install crypto-js --save-dev
 */
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import CryptoJS from 'crypto-js'
import { isObject, isArray, isJSON } from '../isUtils'

const KEY = 'PL+kwG0IG1w2CapFwoh0Rw=='
const key = CryptoJS.enc.Utf8.parse(KEY)
const iv = CryptoJS.enc.Utf8.parse(KEY.substring(0, 16))
const option = {
    iv,
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
}
// 加密
export const AESEncrypt = (data: any): string => {
    let dataStr = ''
    if (isObject(data) || isArray(data)) {
        dataStr = JSON.stringify(data)
    } else {
        dataStr = data
    }
    const pData = CryptoJS.enc.Utf8.parse(dataStr)
    const encryptedStr = CryptoJS.AES.encrypt(pData, key, option).toString()
    return encryptedStr
}
// 解密
export const AESDecrypt = (encryptData: string): string => {
    const decrypted = CryptoJS.AES.decrypt(encryptData, key, option)
    const decryptedStr = CryptoJS.enc.Utf8.stringify(decrypted).toString()
    if (isJSON(decryptedStr)) {
        return JSON.parse(decryptedStr)
    }
    return decryptedStr
}

export const test = () => {
    const str = { a: 111, b: 222 }
    // const str = [1, 2, 3];
    // const str = null;
    // const str = '1234';
    // const str = 2345;
    // const str = undefined;
    console.log('🚀  数据', str)
    const enStr = AESEncrypt(str)
    console.log('🚀  加密', enStr)
    const deStr = AESDecrypt(enStr)
    console.log('🚀  解密', deStr)
}

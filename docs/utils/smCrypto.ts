/*
 * @file sm2 加密/解密
 * @author: DontK
 * @LastEditTime: 2024-07-25 14:19:59
 */
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { sm2 } from 'sm-crypto'

const key =
    '04BF393ACF9C2F24681AAB13DC6B00CF40B78148095453E4D50EFE1E194B366879965DB20464303F6106A0FD5564B7A3E7F444A28685331231D006BB5EFF414951'

// 加密
export const SM2Encrypt = (data: any): string => {
    return sm2.doEncrypt(JSON.stringify(data), key)
}

// 解密
export const SM2Decrypt = (data: string): string => {
    // 解密和加密的key不同需要注意
    return sm2.doDecrypt(JSON.stringify(data), key)
}

/*
 * @file: 定义一个用于安全地存储和读取localStorage数据的对象
 * @author: DontK
 * @LastEditTime: 2024-08-14 14:00:38
 */
const secureStorage = {
    setItem(key: string, value: any) {
        // 使用btoa和encodeURIComponent对数据进行编码后存储
        localStorage.setItem(key, btoa(encodeURIComponent(JSON.stringify(value))))
    },
    getItem(key: string): any {
        const storedData = localStorage.getItem(key)
        // 如果找到了对应的键，则解码并返回数据
        return storedData ? JSON.parse(decodeURIComponent(atob(storedData))) : null
    }
}

export default secureStorage

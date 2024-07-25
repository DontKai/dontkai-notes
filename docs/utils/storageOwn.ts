/*
 * @file: localStorage加密存储
 * @author: DontK
 * @LastEditTime: 2024-04-18 18:28:01
 */
const storageOwn: any = {
    setItem(key: string, value: any) {
        localStorage.setItem(key, btoa(encodeURIComponent(JSON.stringify(value))))
    },
    getItem(key: string): any {
        const date = localStorage.getItem(key)
        return date ? JSON.parse(decodeURIComponent(atob(date))) : null
    }
}

export default storageOwn

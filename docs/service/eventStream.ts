/*
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-12-02 15:48:52
 */
// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
import { EventSourcePolyfill } from 'event-source-polyfill'

export const streamChatWithBSS = (data: { params: any; sucessFnc: Function; errFnc: Function; openFnc?: Function }) => {
    let es: {
        addEventListener: (
            arg0: string,
            arg1: { (event: any): void; (res: any): void; (event: any): void; (event: any): void }
        ) => void
        close: () => void
    } | null = null
    try {
        // 1.生成带参URL
        const baseUrl = 'http://192.168.81.142:10111/stream_chat'
        const queryString = Object.keys(data.params)
            .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data.params[key])}`)
            .join('&')
        const url = `${baseUrl}?${queryString}`

        // 2.构造EventSourcePolyfill对象
        es = new EventSourcePolyfill(url, {})

        // 3.监听open （请求第一次响应时会触发）
        es?.addEventListener('open', (event: any) => {
            if (data.openFnc) data.openFnc(event)
        })

        // 4.监听message（请求返回信息流过程中连续触发）
        es?.addEventListener('message', (res: { data: string }) => {
            const obj = JSON.parse(res.data)
            if (obj.result.metadata.finishReason) {
                es?.close()
            }
            if (data.sucessFnc) data.sucessFnc(res)
        })

        // 5.监听error
        es?.addEventListener('error', (event: { type: string; message: any; error: any }) => {
            es?.close()
            if (data.errFnc) data.errFnc(event)
        })
    } catch (error) {
        es?.close()
        if (data.errFnc) data.errFnc(error)
    }
}

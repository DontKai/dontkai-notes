// /*
//  * @file: 讯飞语音识别
//  * @author: DontK
//  * @LastEditTime: 2024-11-11 11:26:04
//  */
// // @ts-ignore
// // eslint-disable-next-line import/no-extraneous-dependencies
// import CryptoJS from 'crypto-js'
// import { ref, Ref } from 'vue'
// import useMainStore from '@/store/modules/useMainStore'

// const appId = '9d73adac'
// const apiKey = 'e0f2ea92f118b4b00aeeb7f7738bebaa'
// const apiSecret = 'NDU3YTJkYjI1MzYzODRjN2M2MGRiYTJl'

// export function useSpeechRecognitionXF(options: { result: Ref<string> }) {
//     const resultBackups = ref('') // 字符串备份
//     const voiceSocket = ref() // websocket
//     const mainStore = useMainStore()

//     const SpeechRecorder = window && (window as any).RecorderManager // 语音识别判断

//     let countdownInterval: any // 录音计时器

//     let recorder: any | undefined // 录音器实例

//     // 获取WebSocket连接地址
//     const getWebSocketUrl = () => {
//         // 获取签名
//         const url = new URL('wss://iat-api.xfyun.cn/v2/iat')
//         const { host } = url
//         const date = new Date().toUTCString()
//         const algorithm = 'hmac-sha256'
//         const headers = 'host date request-line'
//         const requestLine = `GET ${url.pathname} HTTP/1.1`
//         const signatureOrigin = `host: ${host}\ndate: ${date}\n${requestLine}`
//         const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret)
//         const signature = CryptoJS.enc.Base64.stringify(signatureSha)
//         const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`
//         const authorization = btoa(authorizationOrigin)
//         return `${url.href}?authorization=${authorization}&date=${date}&host=${host}`
//     }

//     // 将二进制数据转换为Base64
//     const toBase64 = (buffer: Iterable<number>) => {
//         let binary = ''
//         const bytes = new Uint8Array(buffer)
//         const len = bytes.byteLength
//         for (let i = 0; i < len; i += 1) {
//             binary += String.fromCharCode(bytes[i])
//         }
//         return window.btoa(binary)
//     }

//     // 倒计时默认为60秒录音
//     const countdown = () => {
//         let seconds: number = 60
//         console.log(`录音中（${seconds}s）`)
//         countdownInterval = setInterval(() => {
//             seconds -= 1
//             if (seconds <= 0) {
//                 clearInterval(countdownInterval)
//                 changeBtnStatus('CLOSED')
//             } else {
//                 console.log(`录音中（${seconds}s）`)
//             }
//         }, 1000)
//     }

//     /**
//      * @description: 修改状态
//      * @param status 'OPEN'-打开 | 'CONNECTING'-连接中 | 'CLOSING'-关闭连接中 | 'CLOSED'-已关闭
//      */
//     const changeBtnStatus = (status: 'OPEN' | 'CONNECTING' | 'CLOSING' | 'CLOSED') => {
//         if (status === 'OPEN') {
//             console.log('建立连接中')
//             mainStore.speechRecognitionStatus = 1
//             countdown()
//         } else if (status === 'CONNECTING') {
//             console.log('建立连接中')
//         } else if (status === 'CLOSING') {
//             console.log('关闭连接中')
//         } else if (status === 'CLOSED') {
//             mainStore.speechRecognitionStatus = 0
//             recorder!.stop()
//         }
//     }

//     if (SpeechRecorder) {
//         recorder = new SpeechRecorder('/iat')

//         // 识别开始事件
//         recorder.onStart = () => {
//             changeBtnStatus('OPEN')
//         }

//         // 识别结束事件
//         recorder.onFrameRecorded = ({ isLastFrame, frameBuffer }: any) => {
//             if (voiceSocket.value.readyState === voiceSocket.value.OPEN) {
//                 voiceSocket.value.send(
//                     JSON.stringify({
//                         data: {
//                             status: isLastFrame ? 2 : 1,
//                             format: 'audio/L16;rate=16000',
//                             encoding: 'raw',
//                             audio: toBase64(frameBuffer)
//                         }
//                     })
//                 )
//                 if (isLastFrame) {
//                     changeBtnStatus('CLOSING')
//                 }
//             }
//         }

//         // 识别结束事件
//         recorder.onStop = () => {
//             clearInterval(countdownInterval)
//         }
//     }

//     // 渲染识别结果
//     const renderResult = (resultData: any) => {
//         // 识别结束
//         const jsonData = JSON.parse(resultData)
//         if (jsonData.data && jsonData.data.result) {
//             const data = jsonData.data.result
//             let str = ''
//             const { ws } = data
//             for (let i = 0; i < ws.length; i += 1) {
//                 str += ws[i].cw[0].w
//             }
//             // 开启wpgs会有此字段(前提：在控制台开通动态修正功能)
//             // 取值为 "apd"时表示该片结果是追加到前面的最终结果；取值为"rpl" 时表示替换前面的部分结果，替换范围为rg字段
//             if (data.pgs) {
//                 if (data.pgs === 'apd') {
//                     // 将result同步给resultBackups
//                     resultBackups.value = options.result.value
//                 }
//                 // 将结果存储在result中
//                 options.result.value = resultBackups.value + str
//             } else {
//                 resultBackups.value += str
//                 options.result.value = resultBackups.value
//             }
//         }
//         if (jsonData.code === 0 && jsonData.data.status === 2) {
//             voiceSocket.value.close()
//         }
//         if (jsonData.code !== 0) {
//             voiceSocket.value.close()
//             console.error(jsonData)
//         }
//     }

//     // 创建代理WebSocket
//     const proxyWebSocket = (url: string) => {
//         const WebSocketProxy = new Proxy(WebSocket, {
//             construct(target: any, arg: any) {
//                 try {
//                     // eslint-disable-next-line new-cap
//                     return new target(...arg)
//                 } catch (error) {
//                     console.log(error)
//                     return error
//                 }
//             }
//         })
//         return new WebSocketProxy(url)
//     }

//     // 连接WebSocket
//     const connectWebSocket = () => {
//         try {
//             const websocketUrl = getWebSocketUrl()
//             voiceSocket.value = proxyWebSocket(websocketUrl)

//             changeBtnStatus('CONNECTING')

//             // socket打开开始录音
//             voiceSocket.value.onopen = () => {
//                 // 开始录音
//                 recorder.start({
//                     sampleRate: 16000,
//                     frameSize: 1280
//                 })
//                 const params = {
//                     common: {
//                         app_id: appId
//                     },
//                     business: {
//                         language: 'zh_cn',
//                         domain: 'iat',
//                         accent: 'mandarin',
//                         vad_eos: 5000,
//                         dwa: 'wpgs'
//                     },
//                     data: {
//                         status: 0,
//                         format: 'audio/L16;rate=16000',
//                         encoding: 'raw'
//                     }
//                 }
//                 voiceSocket.value.send(JSON.stringify(params))
//             }

//             // socket消息中
//             voiceSocket.value.onmessage = (e: any) => {
//                 renderResult(e.data)
//             }

//             // socket消息错误
//             voiceSocket.value.onerror = (e: any) => {
//                 console.error(e)
//                 changeBtnStatus('CLOSED')
//             }

//             // socket消息关闭
//             voiceSocket.value.onclose = (e: any) => {
//                 changeBtnStatus('CLOSED')
//             }
//         } catch (error) {
//             console.error('WebSocket 错误:', error)
//         }
//     }

//     // 点击开始识别
//     const start = () => {
//         resultBackups.value = options.result.value
//         connectWebSocket()
//     }

//     // 点击结束识别
//     const stop = () => {
//         changeBtnStatus('CLOSED')
//     }

//     return {
//         start,
//         stop
//     }
// }

// // import { SpeechRecognition } from '@/utils/speechRecognition';
// // const speech2 = new SpeechRecognition({});
// // const voiceSocket = ref();
// // const getWebSocketUrl = () => {
// //     // 获取签名
// //     const url = new URL('wss://iat-api.xfyun.cn/v2/iat');
// //     const { host } = url;
// //     const apiKey = 'e0f2ea92f118b4b00aeeb7f7738bebaa';
// //     const apiSecret = 'NDU3YTJkYjI1MzYzODRjN2M2MGRiYTJl';
// //     const date = new Date().toUTCString();
// //     const algorithm = 'hmac-sha256';
// //     const headers = 'host date request-line';
// //     const requestLine = `GET ${url.pathname} HTTP/1.1`;
// //     const signatureOrigin = `host: ${host}\ndate: ${date}\n${requestLine}`;
// //     const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
// //     const signature = CryptoJS.enc.Base64.stringify(signatureSha);
// //     // 获取authorization
// //     const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
// //     const authorization = btoa(authorizationOrigin);
// //     // const authorization = CryptoJS.enc.Base64.stringify(
// //     //     CryptoJS.enc.Utf8.parse(authorizationOrigin)
// //     // );
// //     // return `${url.href}?authorization=${encodeURIComponent(authorization)}&date=${date}&host=${host}`;
// //     return `${url.href}?authorization=${authorization}&date=${date}&host=${host}`;
// // };
// // const initSocket = () => {
// //     try {
// //         // 使用代理处理 soket 创建报错
// //         const WebSocketProxy = new Proxy(WebSocket, {
// //             construct(target: any, arg: any) {
// //                 try {
// //                     // eslint-disable-next-line new-cap
// //                     return new target(...arg);
// //                 } catch (error) {
// //                     console.log(error);
// //                     return error;
// //                 }
// //             }
// //         });
// //         voiceSocket.value = new WebSocketProxy(getWebSocketUrl());
// //         // console.log(socket);
// //         voiceSocket.value.onopen = () => {
// //             speech2.startRecording().then((res: any) => {
// //                 console.log(res, 3333);
// //                 voiceSocket.value.send(
// //                     JSON.stringify({
// //                         common: {
// //                             // 公共请求参数
// //                             app_id: '9d73adac'
// //                         },
// //                         business: {
// //                             language: 'zh_cn',
// //                             domain: 'iat',
// //                             accent: 'mandarin'
// //                         },
// //                         data: {
// //                             status: 1,
// //                             format: 'audio/L16;rate=16000',
// //                             encoding: 'raw',
// //                             audio: res.result.replace('data:audio/webm;codecs=opus;base64,', '')
// //                         }
// //                     })
// //                 );
// //                 voiceSocket.value.send(
// //                     JSON.stringify({
// //                         data: {
// //                             status: 2
// //                         }
// //                     })
// //                 );
// //             });
// //             const params = {
// //                 common: {
// //                     app_id: '9d73adac'
// //                 },
// //                 business: {
// //                     language: 'zh_cn',
// //                     domain: 'iat',
// //                     accent: 'mandarin',
// //                     vad_eos: 5000,
// //                     dwa: 'wpgs'
// //                 },
// //                 data: {
// //                     status: 0,
// //                     format: 'audio/L16;rate=16000',
// //                     encoding: 'raw'
// //                 }
// //             };
// //             voiceSocket.value.send(JSON.stringify(params));
// //         };

// //         voiceSocket.value.onmessage = (message: any) => {};

// //         // 连接关闭时的回调函数
// //         voiceSocket.value.onclose = () => {};

// //         // 发生错误时的回调函数
// //         voiceSocket.value.onerror = (error: any) => {
// //             console.log(error);
// //         };
// //     } catch (error) {
// //         console.error('WebSocket 错误:', error);
// //     }
// // };

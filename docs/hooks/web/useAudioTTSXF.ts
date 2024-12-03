// /*
//  * @file: 讯飞语音合成
//  * @author: DontK
//  * @LastEditTime: 2024-11-22 09:43:02
//  */
// // @ts-ignore
// // eslint-disable-next-line import/no-extraneous-dependencies
// import CryptoJS from 'crypto-js';
// import { ref } from 'vue';

// const appId = '9d73adac';
// const apiKey = 'e0f2ea92f118b4b00aeeb7f7738bebaa';
// const apiSecret = 'NDU3YTJkYjI1MzYzODRjN2M2MGRiYTJl';

// export function useAudioTTSXF() {
//     const audioSocket = ref(); // websocket
//     const AudioRecorder = window && (window as any).AudioPlayer; // 语音识别判断
//     const audioText = ref<string>('');
//     let audioPlayer: any | undefined; // 录音器实例

//     // 获取WebSocket连接地址
//     const getWebSocketUrl = () => {
//         // 获取签名
//         const url = new URL('wss://tts-api.xfyun.cn/v2/tts');
//         const { host } = url;
//         const date = new Date().toUTCString();
//         const algorithm = 'hmac-sha256';
//         const headers = 'host date request-line';
//         const requestLine = `GET ${url.pathname} HTTP/1.1`;
//         const signatureOrigin = `host: ${host}\ndate: ${date}\n${requestLine}`;
//         const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, apiSecret);
//         const signature = CryptoJS.enc.Base64.stringify(signatureSha);
//         const authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
//         const authorization = btoa(authorizationOrigin);
//         return `${url.href}?authorization=${authorization}&date=${date}&host=${host}`;
//     };

//     // Base64编码
//     const encodeText = (text: string) => {
//         const utf8Bytes = CryptoJS.enc.Utf8.parse(text);
//         return CryptoJS.enc.Base64.stringify(utf8Bytes);
//     };

//     if (AudioRecorder) {
//         audioPlayer = new AudioRecorder('/tts');
//     }

//     // 创建代理WebSocket
//     const proxyWebSocket = (url: string) => {
//         let Socket: any = null;
//         if ('WebSocket' in window) {
//             Socket = window.WebSocket;
//         } else if ('MozWebSocket' in window) {
//             Socket = (window as any).MozWebSocket;
//         } else {
//             alert('浏览器不支持WebSocket');
//             return null;
//         }
//         const WebSocketProxy = new Proxy(Socket, {
//             construct(target: any, arg: any) {
//                 try {
//                     // eslint-disable-next-line new-cap
//                     return new target(...arg);
//                 } catch (error) {
//                     console.log(error);
//                     return error;
//                 }
//             }
//         });
//         return new WebSocketProxy(url);
//     };

//     // 连接WebSocket
//     const connectWebSocket = () => {
//         try {
//             const websocketUrl = getWebSocketUrl();
//             audioSocket.value = proxyWebSocket(websocketUrl);

//             // socket打开开始录音
//             audioSocket.value.onopen = () => {
//                 audioPlayer.start({
//                     autoPlay: true,
//                     sampleRate: 16000,
//                     resumePlayDuration: 1000
//                 });
//                 const params = {
//                     common: {
//                         app_id: appId
//                     },
//                     business: {
//                         aue: 'raw',
//                         auf: 'audio/L16;rate=16000',
//                         vcn: 'xiaoyan',
//                         speed: 50,
//                         volume: 50,
//                         pitch: 50,
//                         bgs: 1,
//                         tte: 'UTF8'
//                     },
//                     data: {
//                         status: 2,
//                         text: encodeText(audioText.value)
//                     }
//                 };
//                 audioSocket.value.send(JSON.stringify(params));
//             };

//             // socket消息中
//             audioSocket.value.onmessage = (e: any) => {
//                 const jsonData = JSON.parse(e.data);
//                 // 合成失败
//                 if (jsonData.code !== 0) {
//                     console.error('jsonData', jsonData);
//                     return;
//                 }
//                 audioPlayer.postMessage({
//                     type: 'base64',
//                     data: jsonData.data.audio,
//                     isLastData: jsonData.data.status === 2
//                 });
//                 if (jsonData.code === 0 && jsonData.data.status === 2) {
//                     audioSocket.value.close();
//                 }
//             };

//             // socket消息错误
//             audioSocket.value.onerror = (e: any) => {
//                 console.log('消息错误', e);
//             };

//             // socket消息关闭
//             audioSocket.value.onclose = (e: any) => {
//                 console.log('消息关闭', e);
//             };
//         } catch (error) {
//             console.error('WebSocket 错误:', error);
//         }
//     };

//     // 点击开始
//     const start = (str: string, callStop: Function, callPlay: Function) => {
//         audioText.value = str;
//         audioPlayer.onStop = callStop;
//         audioPlayer.onPlay = callPlay;
//         if (!audioText.value.length) return;
//         // 开始合成
//         connectWebSocket();
//     };

//     // 点击结束
//     const stop = () => {
//         // 停止合成
//         audioSocket.value?.close();
//         audioPlayer.reset();
//     };

//     return {
//         start,
//         stop
//     };
// }

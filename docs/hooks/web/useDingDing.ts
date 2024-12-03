// /*
//  * @file: 钉钉工具
//  * @author: DontK
//  * @LastEditTime: 2024-11-21 16:14:24
//  */
// import * as dd from 'dingtalk-jsapi';
// import 'dingtalk-jsapi/entry/union';

// export const useDingDing = () => {
//     /**
//      * @description: 钉钉鉴权
//      */
//     const dingdingConfig = ({ agentId, corpId, timeStamp, nonceStr, signature }: any) => {
//         dd.config({
//             agentId, // 必填，微应用ID
//             corpId, // 必填，企业ID
//             timeStamp, // 必填，生成签名的时间戳
//             nonceStr, // 必填，自定义固定字符串。
//             signature, // 必填，签名
//             jsApiList: ['device.audio.startRecord'] // 必填，需要使用的jsapi列表，注意：不要带dd。
//         });
//         dd.error((err: any) => {
//             // eslint-disable-next-line no-alert
//             alert(`dd error: ${JSON.stringify(err)}`);
//         }); // 该方法必须带上，用来捕获鉴权出现的异常信息，否则不方便排查出现的问题
//     };

//     /**
//      * @description: 是否不在钉钉环境
//      * @return true-不在钉钉环境 false-在钉钉环境
//      */
//     const isNotInDingTalk = () => {
//         return dd.env.platform === 'notInDingTalk';
//     };

//     /**
//      * @description: 钉钉ready
//      * @param callback 需要处理的函数
//      */
//     const dingdingReady = (callback: Function) => {
//         dd.ready(() => {
//             callback();
//         });
//     };

//     /**
//      * @description: 执行回调函数
//      * @param ddcb 钉钉环境执行内容
//      * @param nddcb 非钉钉环境执行内容
//      */
//     const runFunction = (ddcb: Function, nddcb?: Function) => {
//         if (!isNotInDingTalk()) {
//             dingdingReady(ddcb);
//         } else if (nddcb) {
//             nddcb();
//         }
//     };

//     /**
//      * @description: 获取微应用免登授权码
//      * @param param1 钉钉应用地址栏参数
//      * @param corpId 企业id
//      */
//     const dingdingAuthCode = ({ corpId }: any) => {
//         return new Promise<object>((resolve, reject) => {
//             dd.runtime.permission
//                 .requestAuthCode({
//                     corpId
//                 })
//                 .then((result: any) => {
//                     resolve(result);
//                 })
//                 .catch((err: any) => {
//                     reject(err);
//                 });
//         });
//     };

//     /**
//      * @description: 打开新页面
//      * @param param1
//      */
//     const openNewWindow = ({ url, info }: any) => {
//         return new Promise<object>((resolve, reject) => {
//             dingdingReady(() => {
//                 dd.openPageInWorkBenchForPC({
//                     app_url: url,
//                     app_info: {
//                         app_tab_key: info,
//                         app_refresh_if_exist: true,
//                         app_active_if_exist: true
//                     },
//                     onSuccess: (result: any) => {
//                         resolve(result);
//                     },
//                     onFail: (err: any) => {
//                         reject(err);
//                     }
//                 });
//             });
//         });
//     };

//     /**
//      * @description: 设置钉钉导航
//      * @param param1
//      */
//     const setDingNav = ({ title }: any) => {
//         dd.setNavigationTitle({
//             title
//         });
//         dd.biz.navigation.setRight({
//             show: true,
//             control: true,
//             onSuccess: () => {
//                 dd.share({
//                     type: 2,
//                     title: ''
//                 });
//             }
//         });
//     };

//     /**
//      * @description 下载文件
//      * @param url 文件链接
//      */
//     const downFile = (url: string) => {
//         dd.openLink({
//             url,
//             success: () => {},
//             fail: () => {},
//             complete: () => {}
//         });
//     };

//     /**
//      * @description: 开始录音
//      * @param callback
//      */
//     const startRecord = (options: { maxDuration: number } = { maxDuration: 60 }) => {
//         return new Promise<object>((resolve, reject) => {
//             dd.startRecord({
//                 maxDuration: options.maxDuration,
//                 success: (result: any) => {
//                     resolve(result);
//                 },
//                 fail: (err: any) => {
//                     reject(err);
//                 }
//             });
//         });
//     };

//     /**
//      * @description: 停止录音
//      */
//     const stopRecord = () => {
//         return new Promise<object>((resolve, reject) => {
//             dd.stopRecord({
//                 success: (result: any) => {
//                     resolve(result);
//                 },
//                 fail: (err: any) => {
//                     reject(err);
//                 }
//             });
//         });
//     };

//     /**
//      * @description: 监听录音自动停止
//      */
//     const onRecordEnd = () => {
//         return new Promise<object>((resolve, reject) => {
//             dd.onRecordEnd({
//                 success: (result: any) => {
//                     resolve(result);
//                 },
//                 fail: (err: any) => {
//                     reject(err);
//                 }
//             });
//         });
//     };

//     /**
//      * @description: 语音转文字
//      */
//     const translateVoice = (options: { mediaId: string; duration?: number }) => {
//         return new Promise<object>((resolve, reject) => {
//             dd.translateVoice({
//                 mediaId: options.mediaId,
//                 duration: options.duration || 60,
//                 success: (result: any) => {
//                     resolve(result);
//                 },
//                 fail: (err: any) => {
//                     reject(err);
//                 }
//             });
//         });
//     };

//     return {
//         dingdingConfig,
//         isNotInDingTalk,
//         dingdingReady,
//         runFunction,
//         dingdingAuthCode,
//         openNewWindow,
//         setDingNav,
//         downFile,
//         startRecord,
//         stopRecord,
//         onRecordEnd,
//         translateVoice
//     };
// };

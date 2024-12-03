// // eslint-disable-next-line import/no-extraneous-dependencies
// import VConsole from 'vconsole';

// // 判断是否是移动端
// const isMobile = (): boolean => {
//     const flag = window.navigator.userAgent.match(
//         /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
//     );
//     return Boolean(flag);
// };

// export const setupVconsole = () => {
//     // 或者使用配置参数来初始化，详情见文档
//     if (['development', 'test'].includes(import.meta.env.VITE_ENV) && isMobile()) {
//         // eslint-disable-next-line no-new
//         new VConsole({ theme: 'dark' });
//     }
// };

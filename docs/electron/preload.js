/*
 * 使用方式
 * const { electronAPI } = window;
 * electronAPI.closeWindow();
 */
// const { contextBridge, ipcRenderer } = require('electron');

// contextBridge.exposeInMainWorld('electronAPI', {
//     closeWindow: () => ipcRenderer.send('close-window'), // 关闭窗口
//     maximize: () => ipcRenderer.send('maximize-window'), // 放大还原窗口
//     minimize: () => ipcRenderer.send('minimize-window'), // 最小化窗口
//     getAppVersion: () => ipcRenderer.invoke('get-app-version'), // 获取当前版本号
//     closeSubWindow: () => ipcRenderer.send('close-sub-window'), // 关闭子窗口
//     maximizeSub: () => ipcRenderer.send('maximize-sub-window'), // 放大还原子窗口
//     minimizeSub: () => ipcRenderer.send('minimize-sub-window'), // 最小化子窗口
//     newWindow: (routerPath) => ipcRenderer.send('create-window', routerPath) // 创建新窗口
// });

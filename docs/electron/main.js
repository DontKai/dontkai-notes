// // eslint-disable-next-line import/no-extraneous-dependencies
// const { app, BrowserWindow, ipcMain } = require('electron')
// const path = require('path')

// const checkUpdate = require('./update')

// let loadingWindow = null
// // 加载loading页面窗口
// function showLoading() {
//     loadingWindow = new BrowserWindow({
//         width: 512,
//         height: 512,
//         frame: false, // 无边框（窗口、工具栏等），只包含网页内容
//         transparent: true // 窗口是否支持透明，如果想做高级效果最好为true
//     })
//     loadingWindow.loadFile('./loading.html')
//     loadingWindow.show()
// }

// function createWindow() {
//     const win = new BrowserWindow({
//         width: 1000,
//         height: 800,
//         minWidth: 900,
//         minHeight: 600,
//         autoHideMenuBar: true,
//         frame: false,
//         show: false,
//         transparent: true,
//         webPreferences: {
//             preload: path.join(__dirname, 'preload.js'),
//             contextIsolation: true // 确保启用上下文隔离
//         },
//         icon: path.join(__dirname, '../public/logo.png')
//     })
//     const url = process.env.VITE_DEV_SERVER_URL || path.join(__dirname, '../dist/index.html')
//     if (process.env.VITE_DEV_SERVER_URL) {
//         win.loadURL(url)
//         // 开启调试台
//         win.webContents.openDevTools()
//     } else {
//         win.loadFile(url)
//         // win.webContents.openDevTools();
//     }

//     win.webContents.on('dom-ready', () => {
//         loadingWindow.hide()
//         loadingWindow.close()
//         win.show()
//     })

//     ipcMain.on('close-window', () => {
//         win.close()
//     })
//     ipcMain.on('maximize-window', () => {
//         if (win.isMaximized()) {
//             win.unmaximize()
//         } else {
//             win.maximize()
//         }
//     })
//     ipcMain.on('minimize-window', () => {
//         win.minimize()
//     })
//     ipcMain.handle('get-app-version', () => {
//         const v = app.getVersion()
//         return v
//     })
//     // 执行更新检测
//     checkUpdate(win)
//     // 创建新窗口
//     ipcMain.on('create-window', (evebt, routePath) => {
//         console.log(routePath)
//         const childWin = new BrowserWindow({
//             width: 1000,
//             height: 800,
//             minWidth: 900,
//             minHeight: 600,
//             autoHideMenuBar: true,
//             webPreferences: {
//                 preload: path.join(__dirname, 'preload.js'),
//                 contextIsolation: true // 确保启用上下文隔离
//             },
//             icon: path.join(__dirname, '../public/logo.png')
//         })
//         childWin.loadURL(routePath)

//         ipcMain.on('close-sub-window', () => {
//             childWin.close()
//         })
//         ipcMain.on('maximize-sub-window', () => {
//             if (childWin.isMaximized()) {
//                 childWin.unmaximize()
//             } else {
//                 childWin.maximize()
//             }
//         })
//         ipcMain.on('minimize-sub-window', () => {
//             childWin.minimize()
//         })
//     })
// }

// app.whenReady().then(() => {
//     showLoading()
//     createWindow()
//     app.on('activate', () => {
//         if (BrowserWindow.getAllWindows().length === 0) {
//             createWindow()
//         }
//     })
// })

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit()
//     }
// })

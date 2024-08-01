// // eslint-disable-next-line import/no-extraneous-dependencies
// const { dialog } = require('electron')
// const { autoUpdater } = require('electron-updater')

// const checkUpdate = (win) => {
//     autoUpdater.autoDownload = true
//     // const updateUrl = `${serverUrl}/update?platform=${process.platform}&version=${app.getVersion()}`
//     // console.log(updateUrl)
//     // 注意这里必须使用trycatch包裹 否则代码无法运行
//     try {
//         // autoUpdater.setFeedURL({ url: updateUrl })
//         autoUpdater.checkForUpdatesAndNotify().catch()
//         // 每隔 5 分钟检查一次更新
//         setInterval(() => {
//             // autoUpdater.checkForUpdates()
//             autoUpdater.checkForUpdatesAndNotify().catch()
//         }, 60000 * 5)

//         autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName, releaseDate, updateURL) => {
//             const dialogOpts = {
//                 type: 'info',
//                 title: '应用程序更新',
//                 message: process.platform === 'win32' ? releaseNotes : releaseName,
//                 buttons: ['现在重启', '稍后'],
//                 detail: '新版本已下载，是否现在重启应用程序以更新？'
//             }

//             dialog.showMessageBox(win, dialogOpts).then((returnValue) => {
//                 if (returnValue.response === 0) autoUpdater.quitAndInstall()
//             })
//         })
//         autoUpdater.on('checking-for-update', (evt) => {
//             // const dialogOpts = {
//             //     type: 'info',
//             //     title: '更新测试弹窗',
//             //     message: '当开始检查更新的时候触发',
//             //     buttons: ['确认', '取消']
//             // };

//             // dialog.showMessageBox(win, dialogOpts).then((response) => {
//             //     console.log(response.response); // 输出用户点击的按钮索引
//             // });
//             console.log('当开始检查更新的时候触发')
//         })
//         autoUpdater.on('update-available', (evt) => {
//             const dialogOpts = {
//                 type: 'info',
//                 title: '提示',
//                 message: '有新版本需要更新',
//                 buttons: ['确认', '取消']
//             }

//             dialog.showMessageBox(win, dialogOpts).then((response) => {
//                 console.log(response.response) // 输出用户点击的按钮索引
//             })
//         })
//         autoUpdater.on('update-not-available', (evt) => {
//             // const dialogOpts = {
//             //     type: 'info',
//             //     title: '更新测试弹窗',
//             //     message: '无需更新',
//             //     buttons: ['确认', '取消']
//             // };

//             // dialog.showMessageBox(win, dialogOpts).then((response) => {
//             //     console.log(response.response); // 输出用户点击的按钮索引
//             // });
//             console.log('无需更新')
//         })
//         // autoUpdater.on('download-progress', (progressObj) => {});
//         // 错误处理
//         autoUpdater.on('error', (err) => {
//             console.log('出错了' + err)
//         })
//     } catch (error) {
//         console.log('更新报错:' + error)
//     }
// }

// module.exports = checkUpdate

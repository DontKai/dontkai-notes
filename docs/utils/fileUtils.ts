/*
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-12-03 14:17:51
 */
/**
 * @description: 下载文件by blob
 * @param data
 * @param fileName
 */
export const downFile = (data: string, fileName: string) => {
    const url = window.URL.createObjectURL(
        new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
    )
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * @description: 下载文件by url
 * @param url
 * @param fileName
 */
export const downFileByUrl = async (url: string, fileName: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = blobUrl
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

/**
 * @description: 预览pdf文件
 * @param data
 */
export const viewFile = (data: string) => {
    const url = window.URL.createObjectURL(
        new Blob([data], {
            type: 'application/pdf'
        })
    )
    window.open(url)
}

/**
 * @description: blob转对象
 * @param blob
 * @param callBack
 */
export const blobToObj = (blob: Blob, callBack: Function) => {
    const reader = new FileReader()
    reader.onload = (event: any) => {
        const blobData = event.target.result
        // 将Blob数据解析为对象
        const obj = JSON.parse(blobData)
        callBack(obj) // 输出对象
    }
    reader.readAsText(blob)
}

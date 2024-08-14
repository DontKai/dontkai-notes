/*
 * @file: 浏览器相关工具
 * @author: DontK
 * @LastEditTime: 2024-08-14 14:33:38
 */

/**
 * @description: 获取浏览器的宽高
 * @return 宽高
 */
export const getBrowserWindowHW = () => {
    const browerWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
    const broweHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    return { browerWidth, broweHeight }
}

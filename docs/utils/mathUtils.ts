/*
 * @file: 随机数工具
 * @author: DontK
 * @LastEditTime: 2024-08-13 11:26:30
 */

/**
 * @description: 获取指定范围的随机整数
 * @param min 最小整数
 * @param max 最大整数
 * @return 随机数
 */
export const getRandomNumber = (min: number, max: number) => {
    // 计算范围内的随机数
    let random = Math.random() * (max - min + 1) + min
    // 向下取整得到整数
    let randomNumber = Math.floor(random)
    // 返回随机数
    return randomNumber
}

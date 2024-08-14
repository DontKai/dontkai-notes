/*
 * @file: 计算相关工具
 * @author: DontK
 * @LastEditTime: 2024-08-14 14:41:04
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

/**
 * @description: 将树结构数组转为一维数组
 * @param tree 数结构数据
 * @param key 取出树结构某个属性进行转换为一维数组
 * @return 一维数组
 */
export const flattenTree = (tree: any[], key?: string): any[] => {
    const result: any = []
    tree.forEach((node: any) => {
        if (key) {
            result.push(node[key])
        } else {
            result.push(node)
        }
        if (node.children && node.children.length) {
            result.push(...flattenTree(node.children, key))
        }
    })
    return result
}

/**
 * @description: 取出树结构数组中每个最后一级子级
 * @param tree 数结构数据
 * @param key 取出树结构最后一级子级某个属性
 * @return 一维数组
 */
export const flattenTreeLast = (tree: any[], key: string) => {
    const result: any = []
    tree.forEach((node: any) => {
        if (node.children && node.children.length) {
            result.push(...flattenTreeLast(node.children, key))
        } else if (key) {
            result.push(node[key])
        } else {
            result.push(node)
        }
    })
    return result
}

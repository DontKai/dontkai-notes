/*
 * @file: 按钮权限自定义指令
 * @author: DontK
 * @LastEditTime: 2024-08-15 16:11:09
 */
import type { App, Directive, DirectiveBinding } from 'vue'
// import useStorage from '../../hooks/web/useStorage'

// const { getStorage } = useStorage()

const checkPermission = (el: HTMLElement, binding: DirectiveBinding) => {
    // const buttonList = getStorage('buttonList') || [] // 所有按钮数据
    const buttonList = [] // 所有按钮数据

    // value 获取用户使用自定义指令绑定的内容
    const { value: permissionFlag } = binding
    // 判断用户使用自定义指令，是否使用正确了
    if (permissionFlag && permissionFlag instanceof Array && permissionFlag.length > 0) {
        const hasPermission = buttonList.some((role: any) => {
            return permissionFlag.includes(role)
        })
        // 当用户没有这个按钮权限时，设置隐藏这个按钮
        if (!hasPermission && el.parentNode) el.parentNode?.removeChild(el)
    } else {
        throw new Error("need roles! Like v-permission=\"['admin','editor']\"")
    }
}

const permission: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
    },
    updated(el: HTMLElement, binding: DirectiveBinding) {
        checkPermission(el, binding)
    }
}

/**
 * @methods permission 按钮权限，用法: v-permission
 */
export const setupPermissionDirective = (app: App<Element>) => {
    app.directive('permission', permission)
}

export default permission

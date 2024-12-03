/*
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-12-03 14:09:02
 */
// @ts-nocheck
import { ref, Ref, watch } from 'vue'

/**
 * @description: 限制点击事件
 * @param {boolean} disabled 是否禁用点击事件
 */
export const useCheckClick = (disabled: Ref<boolean>) => {
    const isDisabled = ref<boolean>(disabled.value)
    function checkClick(func: any) {
        const checked = function () {
            const context: any = this // 保存函数的上下文
            // eslint-disable-next-line prefer-rest-params
            const args: any = arguments // 保存函数参数
            if (!isDisabled.value) {
                func.apply(context, args)
            }
        }
        return checked as any
    }

    watch(
        disabled,
        (newValue: any) => {
            isDisabled.value = newValue
        },
        {
            immediate: true
        }
    )

    return {
        checkClick
    }
}

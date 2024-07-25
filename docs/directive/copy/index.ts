/*
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-06-06 10:07:53
 */
import { ElMessage } from 'element-plus';
import { App, Directive } from 'vue';

const copyContent = (el: any, binding: any) => {
    if (!el.targetContent) {
        ElMessage.warning('没有需要复制的目标内容');
        return;
    }
    // 创建textarea标签
    const textarea: any = document.createElement('textarea');
    // 设置相关属性
    textarea.readOnly = 'readonly';
    textarea.style.position = 'fixed';
    textarea.style.top = '-99999px';
    // 把目标内容赋值给它的value属性
    textarea.value = el.targetContent;
    // 插入到页面
    document.body.appendChild(textarea);
    // 调用onselect()方法
    textarea.select();
    const success = binding.arg;
    // 把目标内容复制进剪贴板, 该API会返回一个Boolean
    const res = document.execCommand('Copy');
    if (res && success) {
        success(el.targetContent);
    }
    ElMessage.success('复制成功');
    // 移除textarea标签
    document.body.removeChild(textarea);
};

const copy: Directive = {
    mounted(el, binding) {
        el.targetContent = binding.value;
        el.addEventListener('click', () => {
            copyContent(el, binding);
        });
    },
    updated(el, binding) {
        // 实时更新最新的目标内容
        el.targetContent = binding.value;
    },
    unmounted(el, binding) {
        el.removeEventListener('click', () => {
            copyContent(el, binding);
        });
    }
};

/**
 * @methods 复制，用法: v-copy
 */
export const setupCopy = (app: App<Element>) => {
    app.directive('copy', copy);
};

export default copy;

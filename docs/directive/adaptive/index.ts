// /* eslint-disable no-unused-vars */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-undef */
// /*
//  * @file: 自定义表格自适应高度指令
//  * @author: DontK
//  * @LastEditTime: 2024-06-11 14:54:44
//  */
// import { nextTick, type App, type Directive, type DirectiveBinding } from 'vue';

// interface ExHTMLElement extends HTMLElement {
//     resizeListener: EventListener;
// }

// // 获取内容高度 不包含 padding
// const getHeight1 = (el: ExHTMLElement) => {
//     const style = window.getComputedStyle(el); // 父元素全部属性
//     const paddingTop = Number(style.paddingTop.replace(/\s+|px/gi, '')); // paddingTop
//     const paddingBottom = Number(style.paddingBottom.replace(/\s+|px/gi, '')); // paddingBottom
//     const height = el.offsetHeight - (paddingTop + paddingBottom); // 真实高度
//     return height;
// };

// // 获取高度 包含 padding和margin
// const getHeight2 = (el: ExHTMLElement) => {
//     const style = window.getComputedStyle(el); // 父元素全部属性
//     const marginTop = Number(style.marginTop.replace(/\s+|px/gi, '')); // marginTop
//     const marginBottom = Number(style.marginBottom.replace(/\s+|px/gi, '')); // marginBottom
//     const height = el.offsetHeight + marginTop + marginBottom; // 真实高度
//     return height;
// };

// // 设置高度
// const setHeight = (el: ExHTMLElement, binding: DirectiveBinding) => {
//     const { parentNode }: any = el;
//     if (parentNode) {
//         // 父元素高度
//         const pHeight = getHeight1(parentNode);
//         const cNodes = parentNode?.children || ''; // 父元素下面的全部子元素
//         let cNodesHeidht = 0; // 不包含本身元素其他子元素的高度和
//         // 存在子元素则计算其他子元素的高度和
//         if (cNodes && cNodes.length) {
//             Array.from(cNodes)?.forEach((cNode: any) => {
//                 // 不为当前元素时
//                 if (cNode.className !== el.className) {
//                     cNodesHeidht += getHeight2(cNode); // 其他元素高度
//                 }
//             });
//         }
//         // 设置当前元素高度
//         el.style.height = `${pHeight - cNodesHeidht}px`;
//     } else {
//         throw new Error('自适应高度指令使用错误！请在有父元素下面的子元素上面使用！');
//     }
// };

// const adaptive: Directive = {
//     mounted: (el: ExHTMLElement, binding: DirectiveBinding) => {
//         nextTick(() => {
//             setHeight(el, binding);
//         });
//         el.resizeListener = () => {
//             nextTick(() => {
//                 setHeight(el, binding);
//             });
//         };
//         window.addEventListener('resize', el.resizeListener);
//     },
//     unmounted(el: ExHTMLElement) {
//         window.removeEventListener('resize', el.resizeListener);
//     },
//     updated(el: ExHTMLElement, binding: DirectiveBinding) {
//         nextTick(() => {
//             setHeight(el, binding);
//         });
//     }
// };

// /**
//  * @methods adaptive 自适应高度: v-adaptive
//  */
// export const setupAdaptiveDirective = (app: App<Element>) => {
//     app.directive('adaptive', adaptive);
// };

// export default adaptive;

/*
 * @file: 事件总线bus
 * @author: DontK
 * @LastEditTime: 2024-01-24 15:28:55
 */
// import mitt, { Handler } from 'mitt';
// import { onBeforeUnmount } from 'vue';

// interface Option {
//     name: string; // 事件名称
//     callback: Handler<unknown>; // 事件回调
// }

// const emitter = mitt();

// export const useEventBus = (option?: Option) => {
//     if (option) {
//         emitter.on(option.name, option.callback);
//         onBeforeUnmount(() => {
//             emitter.off(option.name);
//         });
//     }
//     return {
//         emitterOn: emitter.on,
//         emitterOff: emitter.off,
//         emitterEmit: emitter.emit,
//         emitterAll: emitter.all
//     };
// };

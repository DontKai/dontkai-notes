/*
 * @file: JavaScript 路由
 * @author: DontK
 * @LastEditTime: 2024-12-30 09:56:46
 */
export const JavaScript_Nav = { text: 'JavaScript', link: '/page/JavaScript/Interview/common1' }

export default {
    '/page/JavaScript/': [
        {
            text: '面试系列',
            collapsed: true,
            items: [
                {
                    text: '面试1',
                    link: '/page/JavaScript/Interview/common1'
                }
            ]
        },
        {
            text: 'ES6系列',
            collapsed: true,
            items: [
                {
                    text: '运算符',
                    link: '/page/JavaScript/es6/operrationExtension/'
                },
                {
                    text: '对象拓展',
                    link: '/page/JavaScript/es6/objectExtension/'
                }
            ]
        },
        {
            text: '深入系列',
            collapsed: true,
            items: [
                {
                    text: '原型链',
                    link: '/page/JavaScript/deep/prototype/'
                },
                {
                    text: '作用域',
                    link: '/page/JavaScript/deep/scope/'
                },
                {
                    text: '执行上下文栈',
                    link: '/page/JavaScript/deep/executionContextStack/'
                },
                {
                    text: '执行上下文',
                    link: '/page/JavaScript/deep/executionContext/'
                },
                {
                    text: '作用域链',
                    link: '/page/JavaScript/deep/scopeChain/'
                },
                {
                    text: 'this',
                    link: '/page/JavaScript/deep/this/'
                }
            ]
        },
        {
            text: '专题系列',
            collapsed: true,
            items: [
                {
                    text: '闭包',
                    link: '/page/JavaScript/special/closure/'
                },
                {
                    text: '函数的扩展',
                    link: '/page/JavaScript/special/functionExtension/'
                },
                {
                    text: 'apply|call|bind',
                    link: '/page/JavaScript/special/thisTransfer/'
                },
                {
                    text: '创建对象的多种方式',
                    link: '/page/JavaScript/special/createObject/'
                },
                {
                    text: '继承的多种方式',
                    link: '/page/JavaScript/special/objectExtend/'
                },
                {
                    text: 'Object.assign',
                    link: '/page/JavaScript/special/objectAssign/'
                },
                {
                    text: '深拷贝和浅拷贝',
                    link: '/page/JavaScript/special/copy/'
                },
                {
                    text: '防抖节流',
                    link: '/page/JavaScript/special/debounceThrottle/'
                },
                {
                    text: '类型判断',
                    link: '/page/JavaScript/special/typeJudge/'
                },
                {
                    text: '集合-Set 和 字典-Map',
                    link: '/page/JavaScript/special/setAndMap/'
                },
                {
                    text: '树-深/广度优先遍历',
                    link: '/page/JavaScript/special/tree/'
                },
                {
                    text: '函数柯里化',
                    link: '/page/JavaScript/special/currying/'
                },
                {
                    text: 'Object.defineProperty',
                    link: '/page/JavaScript/special/objectDefineProperty/'
                },
                {
                    text: 'Proxy',
                    link: '/page/JavaScript/special/proxy/'
                },
                {
                    text: '事件流',
                    link: '/page/JavaScript/special/event/'
                },
                {
                    text: '事件循环(Event Loop)',
                    link: '/page/JavaScript/special/eventLoop/'
                }
            ]
        },
        {
            text: 'UtilsArray系列',
            collapsed: true,
            items: [
                {
                    text: '数组常用方法',
                    link: '/page/JavaScript/utilsArray/arrayFunction/'
                },
                {
                    text: '数组去重',
                    link: '/page/JavaScript/utilsArray/arrayDeduplication/'
                },
                {
                    text: '数组扁平化',
                    link: '/page/JavaScript/utilsArray/arrayFlatten/'
                },
                {
                    text: '数组最大值和最小值',
                    link: '/page/JavaScript/utilsArray/arrayMaxMin/'
                },
                {
                    text: '数组reduce方法总结',
                    link: '/page/JavaScript/utilsArray/arrayReduce'
                },
                {
                    text: '矩阵交换行和列',
                    link: '/page/JavaScript/utilsArray/arrayTranspose'
                },
                {
                    text: '遍历树节点',
                    link: '/page/JavaScript/utilsArray/arrayForeachTree'
                },
                {
                    text: '数组转树结构|树形结构转数组',
                    link: '/page/JavaScript/utilsArray/arrayTreeDataTranslate'
                }
            ]
        },
        {
            text: 'UtilsObject系列',
            collapsed: true,
            items: [
                {
                    text: '对象深拷贝',
                    link: '/page/JavaScript/utilsObject/4_ObjClone'
                },
                {
                    text: '字符串转对象',
                    link: '/page/JavaScript/utilsObject/4_StrParse'
                },
                {
                    text: '删除无效属性',
                    link: '/page/JavaScript/utilsObject/4_RemoveNullUndefined'
                },
                {
                    text: '获取/反转对象键值对',
                    link: '/page/JavaScript/utilsObject/4_InvertObj'
                },
                {
                    text: '对象是否为空',
                    link: '/page/JavaScript/utilsObject/4_IsEmptyObj'
                },
                {
                    text: '(上传)对象转化为FormData对象',
                    link: '/page/JavaScript/utilsObject/4_GetFormData'
                },
                {
                    text: '检查对象是否存在某个属性',
                    link: '/page/JavaScript/utilsObject/4_HasObjKey'
                }
            ]
        },
        {
            text: 'UtilsNumber系列',
            collapsed: true,
            items: [
                {
                    text: '中文金额相互转换数字',
                    link: '/page/JavaScript/utilsNumber/5_DigitUppercase'
                },
                {
                    text: "使用'BigInt'支持大数计算",
                    link: '/page/JavaScript/utilsNumber/5_BigInt'
                },
                {
                    text: '数字分隔符',
                    link: '/page/JavaScript/utilsNumber/5_ReadableBillion'
                },
                {
                    text: '指定位数四舍五入',
                    link: '/page/JavaScript/utilsNumber/5_RoundNumber'
                },
                {
                    text: '截断数字',
                    link: '/page/JavaScript/utilsNumber/5_ToFixedNumber'
                },
                {
                    text: '数字补零0',
                    link: '/page/JavaScript/utilsNumber/5_FillZero'
                },
                {
                    text: '判断为负数奇数偶数|整数相等',
                    link: '/page/JavaScript/utilsNumber/5_IsEvenMinus'
                },
                {
                    text: '数字取整~~代替Math.floor()',
                    link: '/page/JavaScript/utilsNumber/5_FloatNumber'
                },
                {
                    text: '数字千分位分隔|金额格式化',
                    link: '/page/JavaScript/utilsNumber/5_FormatMoney'
                }
            ]
        },
        {
            text: 'UtilsOthers系列',
            collapsed: true,
            items: [
                {
                    text: '字符串处理方法',
                    link: '/page/JavaScript/utilsOthers/7_OperatorString'
                },
                {
                    text: '浏览器操作dom操作',
                    link: '/page/JavaScript/utilsOthers/7_WindowOrDomOrHtmlCss'
                },
                {
                    text: '设备判断ios.mobble.mac.weixin',
                    link: '/page/JavaScript/utilsOthers/7_DeviceJudgment'
                },
                {
                    text: '运算符操作',
                    link: '/page/JavaScript/utilsOthers/7_OperatorOperations'
                },
                {
                    text: '颜色RGB十六进制互转',
                    link: '/page/JavaScript/utilsOthers/7_RgbOrHex'
                },
                {
                    text: '设置读取删除Cookie',
                    link: '/page/JavaScript/utilsOthers/7_SetCookie'
                },
                {
                    text: '本地会话存储类操作',
                    link: '/page/JavaScript/utilsOthers/7_MyCache'
                },
                {
                    text: '解析URL参数',
                    link: '/page/JavaScript/utilsOthers/7_SearchParams'
                },
                {
                    text: '获取文件后缀名',
                    link: '/page/JavaScript/utilsOthers/7_GetExt'
                }
            ]
        }
    ]
}

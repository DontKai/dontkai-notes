/*
 * @file 判断工具
 * @author: DontK
 * @LastEditTime: 2024-08-13 13:26:45
 */
const { toString } = Object.prototype

/**
 * @description: 判断变量类型
 */
export const is = (val: unknown, type: string) => {
    return toString.call(val) === `[object ${type}]`
}
/**
 * @description: 判断是否是对象
 */
export const isObject = (val: any): val is Record<any, any> => {
    return val !== null && is(val, 'Object')
}
/**
 * @description: 判断是否是数组
 */
export const isArray = (val: any): val is Array<any> => {
    return val && Array.isArray(val)
}
/**
 * @description: 判断是否是字符串
 */
export const isString = (val: unknown): val is string => {
    return is(val, 'String')
}
/**
 * @description: 判断是否是Number
 */
export const isNumber = (val: unknown): val is number => {
    return is(val, 'Number')
}
/**
 * @description: 判断是否是布尔值
 */
export const isBoolean = (val: unknown): val is boolean => {
    return is(val, 'Boolean')
}
/**
 * @description: 判断是否是Date
 */
export const isDate = (val: unknown): val is Date => {
    return is(val, 'Date')
}
/**
 * @description: 判断不是undefined
 */
export const isDefined = <T = unknown>(val?: T): val is T => {
    return typeof val !== 'undefined'
}
/**
 * @description: 判断是undefined
 */
export const isUnDefined = <T = unknown>(val?: T): val is T => {
    return !isDefined(val)
}
/**
 * @description: 判断是null
 */
export const isNull = (val: unknown): val is null => {
    return val === null
}
/**
 * @description: 判断是否是方法
 */
export const isFunction = (val: unknown): val is Function => {
    return typeof val === 'function'
}
/**
 * @description: 判断是否是异步
 */
export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
    return is(val, 'Promise') && isObject(val) && isFunction(val.then) && isFunction(val.catch)
}
/**
 * @description: 判断是否为正则
 */
export const isRegExp = (val: unknown): val is RegExp => {
    return is(val, 'RegExp')
}
/**
 * @description: 判断是否是undefined和null
 */
export const isNullAndUnDef = (val: unknown): val is null | undefined => {
    return isUnDefined(val) && isNull(val)
}
/**
 * @description: 判断是否是undefined或null
 */
export const isNullOrUnDef = (val: unknown): val is null | undefined => {
    return isUnDefined(val) || isNull(val)
}
/**
 * @description: 判断是否为空字符串/空对象/空数组/空集合
 */
export const isEmpty = <T = unknown>(val: T): val is T => {
    if (isArray(val) || isString(val)) {
        return val.length === 0
    }
    if (val instanceof Map || val instanceof Set) {
        return val.size === 0
    }
    if (isObject(val)) {
        return Object.keys(val).length === 0
    }
    return false
}
/**
 * @description: 判断是否为空值
 */
export const isEmptyVal = (val: any): boolean => {
    return val === '' || val === null || val === undefined
}
/**
 * @description: 判断是否为window
 */
export const isWindow = (val: any): val is Window => {
    return typeof window !== 'undefined' && is(val, 'Window')
}
/**
 * @description: 判断是否为element
 */
export const isElement = (val: unknown): val is Element => {
    return isObject(val) && !!val.tagName
}
/**
 * @description: 判断是否为集合
 */
export const isMap = (val: unknown): val is Map<any, any> => {
    return is(val, 'Map')
}

/**
 * @description: 判断是否是移动端
 */
export const isMobile = (): boolean => {
    const flag = window.navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    )
    return Boolean(flag)
}

/**
 * @description: 判断是否是微信浏览器
 */
export const isWXBrowser = (): boolean => {
    return /micromessenger/i.test(window.navigator.userAgent)
}

/**
 * @description: 判断两个值是否相等
 * @param a
 * @param b
 * @param aStack
 * @param bStack
 */
export const isEqual = (a: any, b: any, aStack?: any, bStack?: any): boolean => {
    // === 结果为 true 的区别出 +0 和 -0
    if (a === b) return a !== 0 || 1 / a === 1 / b

    // typeof null 的结果为 object ，这里做判断，是为了让有 一个存在为 null 的情况尽早退出函数
    if (a === null || b === null) return false

    // 判断 NaN
    if (a !== a) return b !== b

    // 判断参数 a 类型，如果是基本类型，在这里可以直接返回 false
    const type = typeof a
    if (type !== 'function' && type !== 'object' && typeof b !== 'object') return false

    // 更复杂的对象使用 deepEq 函数进行深度比较
    return deepEqual(a, b, aStack, bStack)
}

/**
 * @description: 深度比较
 * @param a
 * @param b
 * @param aStack
 * @param bStack
 */
export const deepEqual = (a: any, b: any, aStack?: any, bStack?: any): boolean => {
    // a 和 b 的内部属性 [[class]] 相同时 返回 true
    const className = toString.call(a)
    if (className !== toString.call(b)) return false

    switch (className) {
        case '[object RegExp]':
        case '[object String]':
            return '' + a === '' + b
        case '[object Number]':
            if (+a !== +a) return +b !== +b
            return +a === 0 ? 1 / +a === 1 / b : +a === +b
        case '[object Date]':
        case '[object Boolean]':
            return +a === +b
    }

    const areArrays = className === '[object Array]'
    // 不是数组
    if (!areArrays) {
        // 过滤掉两个函数的情况
        if (typeof a !== 'object' || typeof b !== 'object') return false

        const aCtor = a.constructor,
            bCtor = b.constructor
        // aCtor 和 bCtor 必须都存在并且都不是 Object 构造函数的情况下，aCtor 不等于 bCtor， 那这两个对象就真的不相等啦
        if (
            aCtor == bCtor &&
            !(isFunction(aCtor) && aCtor instanceof aCtor && isFunction(bCtor) && bCtor instanceof bCtor) &&
            'constructor' in a &&
            'constructor' in b
        ) {
            return false
        }
    }

    aStack = aStack || []
    bStack = bStack || []
    let length = aStack.length

    // 检查是否有循环引用的部分
    while (length--) {
        if (aStack[length] === a) {
            return bStack[length] === b
        }
    }

    aStack.push(a)
    bStack.push(b)

    // 数组判断
    if (areArrays) {
        length = a.length
        if (length !== b.length) return false

        while (length--) {
            if (!isEqual(a[length], b[length], aStack, bStack)) return false
        }
    }
    // 对象判断
    else {
        const keys = Object.keys(a)
        let key: any,
            length: any = keys.length

        if (Object.keys(b).length !== length) return false
        while (length--) {
            key = keys[length]
            if (!(b.hasOwnProperty(key) && isEqual(a[key], b[key], aStack, bStack))) return false
        }
    }

    aStack.pop()
    bStack.pop()
    return true
}

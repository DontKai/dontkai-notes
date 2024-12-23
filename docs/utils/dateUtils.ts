/*
 * @file: 日期回显格式
 * @author: DontK
 * @LastEditTime: 2024-12-23 09:58:17
 */
// @ts-ignore
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

/**
 * @description: 格式化日期+时间
 * @param date 时间
 * @param format 日期格式
 */
export const formatToDateTime = (date?: dayjs.ConfigType, format = DATE_TIME_FORMAT): string => {
    return date ? dayjs(date).format(format) : ''
}

/**
 * @description: 格式话日期
 * @param date 时间
 * @param format 日期格式
 */
export const formatToDate = (date?: dayjs.ConfigType, format = DATE_FORMAT): string => {
    return date ? dayjs(date).format(format) : ''
}

export const dateUtil = dayjs

/**
 * @description: 时间戳转换为日期格式 当天显示xx秒前，xx分钟前，xx小时前，当天后显示日期时间
 * @param date 时间戳
 * @param format 显示的日期时间格式
 * @return
 */
export const formatTimestamp = (date: string, format = DATE_TIME_FORMAT): string => {
    if (!date) return ''
    // 获取当前时间
    const now: any = new Date()

    // 将传入的日期字符串转为Date对象
    const targetDate: any = new Date(date)

    // 计算时间戳差，单位是秒
    const diffInSeconds = Math.floor((now - targetDate) / 1000)

    // 获取今天的开始时间
    const startOfDay = new Date(now.setHours(0, 0, 0, 0))

    // 判断目标日期是否在今天的范围内
    if (targetDate >= startOfDay) {
        // 时间差小于1分钟，则显示“X秒”
        if (diffInSeconds < 60) {
            return `${diffInSeconds + 1}秒前`
        }
        // 时间差小于1小时，则显示“X小时前”
        if (diffInSeconds < 3600) {
            return `${Math.ceil(diffInSeconds / 60)}分钟前`
        }
        // 默认以小时为单位显示时间差
        return `${Math.ceil(diffInSeconds / 3600)}小时前`
    }
    // 否则，返回日期和时间
    return formatToDateTime(date, format)
}

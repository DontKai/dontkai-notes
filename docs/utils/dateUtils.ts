/*
 * @file: 日期回显格式
 * @author: DontK
 * @LastEditTime: 2024-12-23 11:27:18
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

/**
 * @description: 找出两日期之间的天数|日差
 * @param date1 日期1
 * @param date2 日期2
 * dayDif(new Date('2020-10-21'), new Date('2021-10-22')) => Result: 366
 */
export const dayDif = (date1: Date, date2: Date) => Math.ceil(Math.abs(date1.getTime() - date2.getTime()) / 86400000)

/**
 * @description: 检查日期是否有效
 * @param val
 */
export const isDateValid = (val: string) => !Number.isNaN(new Date(val).valueOf())

/**
 * @description: 查找日期位于一年中的第几天
 * @param date 日期
 * dayOfYear(new Date()) => Result: 272
 */
export const dayOfYear = (date: Date) =>
    Math.floor(((date as any) - (new Date(date.getFullYear(), 0, 0) as any)) / 1000 / 60 / 60 / 24)

/**
 * @description: 获取 hh:mm:ss 时间
 * @param date 日期
 * timeFormat(new Date()) => Result: 14:23:12
 */
export const timeFormat = (date: Date) => date.toTimeString().slice(0, 8)

/**
 * @description: 查询某天是否为工作日
 * @param date 日期
 * isWeekday(new Date('2024-12-23'))
 */
export const isWeekday = (date: Date) => date.getDay() % 6 !== 0

/**
 * @description: 判断日期是否为今天
 * @param date 日期
 * isToday(new Date('2024-12-23'))
 */
export const isToday = (date: Date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)

/**
 * @description: 秒数转换为 hh:mm:ss 格式
 * @param s 秒数
 * formatSeconds(200) // 00:03:20
 */
export const formatSeconds = (s: number) => new Date(s * 1000).toISOString().substr(11, 8)

/**
 * @description: 获取某年月份天数
 * @param year 年
 * @param month 月
 * getDaysNum(2024, 2) // 29
 */
export const getDaysNum = (year: number, month: number) => new Date(year, month, 0).getDate()

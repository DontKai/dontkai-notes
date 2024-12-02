/*
 * @file:
 * @author: DontK
 * @LastEditTime: 2024-12-02 15:46:28
 */
type WebSocketState = 'start' | 'pedding' | 'stop'

interface WebSocketOptions {
    reconnectInterval?: number // 重连间隔，单位毫秒，默认 5000ms
    heartbeatInterval?: number // 心跳检测间隔，单位毫秒，默认 30000ms
    heartbeatTimeout?: number // 心跳超时时间，单位毫秒，默认 10000ms
}

export default class WebSocketService {
    private socket: WebSocket | null = null // WebSocket 实例
    private url: string // WebSocket 服务地址
    private reconnectInterval: number // 重连间隔（毫秒）
    private heartbeatInterval: number // 心跳间隔（毫秒）
    private heartbeatTimeout: number // 心跳超时时间（毫秒）
    private reconnectTimer: number | null = null // 重连定时器
    private heartbeatTimer: number | null = null // 心跳定时器
    private heartbeatTimeoutTimer: number | null = null // 心跳超时定时器
    private socketState: WebSocketState = 'stop' // WebSocket 当前连接状态

    constructor(url: string, options: WebSocketOptions) {
        this.url = url
        this.reconnectInterval = options.reconnectInterval || 5000 // 默认重连间隔 5 秒
        this.heartbeatInterval = options.heartbeatInterval || 30000 // 默认心跳间隔 30 秒
        this.heartbeatTimeout = options.heartbeatTimeout || 10000 // 默认心跳超时 10 秒
        this.init()
    }

    /**
     * 判断浏览器是否支持 WebSocket
     * @returns {boolean} 是否支持 WebSocket
     */
    private isWebSocketSupported(): boolean {
        return 'WebSocket' in window
    }

    /**
     * 初始化 WebSocket 连接
     */
    private init(): void {
        if (!this.isWebSocketSupported()) {
            console.error('浏览器不支持 WebSocket')
            return
        }

        this.socketState = 'pedding' // 正在连接中
        this.socket = new WebSocket(this.url)

        // WebSocket 打开时的回调
        this.socket.onopen = () => {
            console.log('WebSocket 连接已建立')
            this.socketState = 'start' // 状态设置为已连接
            this.startHeartbeat() // 开始心跳检测
        }

        // WebSocket 关闭时的回调
        this.socket.onclose = () => {
            console.log('WebSocket 连接已关闭')
            this.socketState = 'stop' // 状态设置为已关闭
            this.stopHeartbeat() // 停止心跳检测
            this.stopReconnect() // 停止重连检测
        }

        // WebSocket 错误时的回调
        this.socket.onerror = (error) => {
            console.error('WebSocket 错误:', error)
        }

        // 接收到消息时的回调
        this.socket.onmessage = (event) => {
            this.handleMessage(event.data)
        }

        // 网络状态检测
        window.addEventListener('online', () => this.attemptReconnect())
        window.addEventListener('offline', () => {
            if (this.socketState === 'start') {
                this.socketState = 'stop'
                this.stopHeartbeat()
            }
        })
    }

    /**
     * 处理接收到的消息
     * @param message {string} 接收到的消息内容
     */
    private handleMessage(message: string): void {
        console.log('接收到消息:', message)
    }

    /**
     * 启动心跳检测
     */
    private startHeartbeat(): void {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer) // 清除之前的心跳定时器
        }

        if (this.heartbeatTimeoutTimer) {
            clearTimeout(this.heartbeatTimeoutTimer) // 清除之前的心跳超时定时器
        }

        this.heartbeatTimer = window.setInterval(() => {
            if (this.socket && this.socket.readyState === WebSocket.OPEN) {
                this.socket.send('ping') // 发送心跳消息
                console.log('发送心跳: ping')

                // 设置心跳超时定时器
                this.heartbeatTimeoutTimer = window.setTimeout(() => {
                    console.warn('心跳超时，连接关闭')
                    this.closeConnection()
                }, this.heartbeatTimeout)
            } else {
                console.warn('WebSocket 状态异常，尝试重新连接')
                this.reconnect() // 如果 WebSocket 状态异常，尝试重新连接
            }
        }, this.heartbeatInterval)
    }

    /**
     * 停止心跳检测
     */
    private stopHeartbeat(): void {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer) // 清除心跳定时器
        }
        if (this.heartbeatTimeoutTimer) {
            clearTimeout(this.heartbeatTimeoutTimer) // 清除心跳超时定时器
        }
    }

    /**
     * 断点续连逻辑
     */
    private reconnect(): void {
        if (this.socketState === 'stop') {
            console.log('WebSocket 连接已断开，正在尝试重连...')
            this.socketState = 'pedding'
            this.reconnectTimer = window.setTimeout(() => this.init(), this.reconnectInterval) // 重新连接
        }
    }

    /**
     * 网络恢复时自动尝试重新连接
     */
    private attemptReconnect(): void {
        if (navigator.onLine && this.socketState === 'stop') {
            console.log('网络恢复，尝试重新连接 WebSocket')
            this.reconnect()
        }
    }

    /**
     * 手动发送消息到服务器
     * @param message {string} 要发送的消息内容
     */
    public sendMessage(message: string): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message)
        } else {
            console.warn('WebSocket 连接不可用，无法发送消息')
        }
    }

    /**
     * 关闭 WebSocket 连接
     */
    private closeConnection(): void {
        if (this.socket) {
            this.socket.close()
            this.socketState = 'stop' // 连接关闭
            this.stopHeartbeat() // 停止心跳检测
            this.stopReconnect() // 停止重连检测
        }
    }

    /**
     * 停止重连
     */
    private stopReconnect(): void {
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer) // 清除重连定时器
        }
    }

    /**
     * 清理所有 WebSocket 相关资源
     */
    public destroy(): void {
        if (this.socket) {
            this.socket.close()
            this.socket = null
        }
        if (this.reconnectTimer) {
            clearTimeout(this.reconnectTimer) // 清除重连定时器
        }
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer) // 清除心跳定时器
        }
        if (this.heartbeatTimeoutTimer) {
            clearTimeout(this.heartbeatTimeoutTimer) // 清除心跳超时定时器
        }
        this.socketState = 'stop' // 状态设置为已停止
    }

    /**
     * 获取当前 WebSocket 状态
     * @returns {'start' | 'pedding' | 'stop'} 当前 WebSocket 状态
     */
    public getState(): 'start' | 'pedding' | 'stop' {
        return this.socketState
    }
}

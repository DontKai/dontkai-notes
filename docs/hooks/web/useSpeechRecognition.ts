/*
 * @file: 语音识别
 * @desc: 需要将public中的iat 录音功能在index.html中引入 <script src="/iat/index.umd.js"></script>
 * @author: DontK
 * @LastEditTime: 2024-12-03 14:11:34
 */

import { ref, watch, Ref } from 'vue'

export function useSpeechRecognition(options: { result: Ref<string> }) {
    const isListening = ref(false) // 是否监听中
    const isFinal = ref(false) // 是否识别结束
    const resultBackups = ref('')

    // 点击切换监听状态
    const toggle = (value = !isListening.value) => {
        isListening.value = value
    }

    // 点击开始识别
    const start = () => {
        isListening.value = true
        resultBackups.value = options.result.value
    }

    // 点击结束识别
    const stop = () => {
        isListening.value = false
    }

    // 浏览器支持语音识别判断
    const SpeechRecognition = window && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)

    let recognition: any | undefined

    if (SpeechRecognition) {
        recognition = new SpeechRecognition()
        recognition.lang = 'zh-CN' // 设置识别语言
        recognition.continuous = true // 是否连续识别
        recognition.interimResults = true // 是否返回中间结果

        // 识别开始事件
        recognition.onstart = () => {
            isFinal.value = false
        }

        // 识别结果事件
        recognition.onresult = (event: any) => {
            const currentResult = event.results[event.resultIndex]
            const { transcript } = currentResult[0]
            isFinal.value = currentResult.isFinal
            options.result.value = resultBackups.value + (transcript || '')
        }

        // 识别错误事件
        recognition.onerror = (event: any) => {
            console.error('event: ', event)
        }

        // 识别结束事件
        recognition.onend = () => {
            isListening.value = false
        }

        watch(isListening, () => {
            if (isListening.value) recognition!.start()
            else recognition!.stop()
        })
    }

    return {
        isListening,
        isFinal,
        recognition,
        toggle,
        start,
        stop
    }
}

export type UseSpeechRecognitionReturn = ReturnType<typeof useSpeechRecognition>

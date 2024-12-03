// /*
//  * @file: 虚拟列表hooks
//  * @author: DontK
//  * @LastEditTime: 2024-10-29 11:06:15
//  */
// import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
// import type { Ref } from 'vue'

// interface Config {
//     data: Ref<any[]> // 数据源
//     container: string // 虚拟列表容器
//     scrollContainer: string // 滚动容器的元素选择器
//     actualHeightContainer: string // 用于撑开高度的元素选择器
//     translateContainer: string // 用于偏移的元素选择器
//     itmeContainer: string // 列表项选择器
//     itemHeight: number // 列表项高度
//     size: number // 每次渲染数据量
// }

// type HtmlElType = HTMLElement | null

// export default function useVirtualList(config: Config) {
//     // 获取元素
//     let containerEl: any = null
//     let actualHeightContainerEl: HtmlElType = null
//     let translateContainerEl: HtmlElType = null
//     let scrollContainerEl: HtmlElType = null

//     const updateEl = () => {
//         const container: any = document.getElementsByClassName(config.container)[0]
//         containerEl = container
//         if (containerEl) {
//             actualHeightContainerEl = containerEl?.querySelector(config.actualHeightContainer)
//             scrollContainerEl = containerEl.querySelector(config.scrollContainer)
//             translateContainerEl = containerEl.querySelector(config.translateContainer)
//             // 初始滚动位置
//             if (scrollContainerEl) {
//                 scrollContainerEl.scrollTop = 0
//             }
//         }
//     }

//     onMounted(() => {
//         updateEl()
//     })

//     // 数据源，便于后续直接访问
//     const dataSource = ref<any[]>([])

//     // 数据源发生变动
//     watch(
//         () => config.data.value,
//         (newVla) => {
//             // 更新数据源
//             dataSource.value = newVla

//             RenderedItemsCache = {}

//             actualRenderData.value = (newVla || []).slice(0, 20)

//             // 更新元素
//             updateEl()

//             // 计算需要渲染的数据
//             updateRenderData(0)
//         }
//     )

//     // 更新实际高度
//     const updateActualHeight = () => {
//         let actualHeight = 0
//         dataSource.value.forEach((_, i) => {
//             actualHeight += getItemHeightFromCache(i)
//         })
//         if (actualHeightContainerEl) {
//             actualHeightContainerEl!.style.height = actualHeight ? `${actualHeight}px` : 'fit-content'
//         }
//     }

//     // 缓存已渲染元素的高度
//     let RenderedItemsCache: any = {}

//     // 更新已渲染列表项的缓存高度
//     const updateRenderedItemCache = (index: number) => {
//         // 当所有元素的实际高度更新完毕，就不需要重新计算高度
//         const shouldUpdate = Object.keys(RenderedItemsCache).length < dataSource.value.length
//         if (!shouldUpdate) return

//         nextTick(() => {
//             // 获取所有列表项元素
//             const Items: HTMLElement[] = Array.from(containerEl.querySelectorAll(config.itmeContainer))

//             // 进行缓存
//             Items.forEach((el) => {
//                 if (!RenderedItemsCache[index]) {
//                     RenderedItemsCache[index] = el.offsetHeight
//                 }
//                 index += 1
//             })

//             // 更新实际高度
//             updateActualHeight()
//         })
//     }

//     // 获取缓存高度，无缓存，取配置项的 itemHeight
//     const getItemHeightFromCache = (index: number | string) => {
//         const val = RenderedItemsCache[index]
//         return val === 0 ? config.itemHeight : val
//     }

//     // 实际渲染的数据
//     const actualRenderData: Ref<any[]> = ref([])

//     // 更新实际渲染数据
//     const updateRenderData = (scrollTop: number) => {
//         let startIndex = 0
//         let offsetHeight = 0

//         for (let i = 0; i < dataSource.value.length; i += 1) {
//             offsetHeight += getItemHeightFromCache(i)

//             if (offsetHeight >= scrollTop) {
//                 startIndex = i
//                 break
//             }
//         }

//         // 计算得出的渲染数据
//         actualRenderData.value = dataSource.value.slice(startIndex, startIndex + config.size)

//         // 缓存最新的列表项高度
//         updateRenderedItemCache(startIndex)

//         // 更新偏移值
//         updateOffset(offsetHeight - getItemHeightFromCache(startIndex))
//     }

//     // 更新偏移值
//     const updateOffset = (offset: number) => {
//         if (translateContainerEl) {
//             translateContainerEl!.style.transform = `translateY(${offset || 0}px)`
//         }
//     }

//     // 滚动事件
//     const handleScroll = (e: any) => {
//         // actualRenderData.value.length === config.size
//         if (config.data.value.length > config.size) {
//             // 渲染正确的数据
//             updateRenderData(e?.target?.scrollTop || e?.scrollTop || 0)
//         }
//     }

//     // // 注册滚动事件
//     // onMounted(() => {
//     //     scrollContainerEl?.addEventListener('scroll', handleScroll);
//     // });

//     // // 移除滚动事件
//     // onBeforeUnmount(() => {
//     //     scrollContainerEl?.removeEventListener('scroll', handleScroll);
//     // });

//     return { actualRenderData, handleScroll }
// }

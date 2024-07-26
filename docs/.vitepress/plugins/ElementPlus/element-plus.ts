import {
    ElConfigProvider,
    ElHeader,
    ElContainer,
    ElMain,
    ElAside,
    ElMenu,
    ElMenuItem,
    ElSubMenu,
    ElRow,
    ElCol,
    ElForm,
    ElFormItem,
    ElButton,
    ElInput,
    ElSelect,
    ElOption,
    ElCheckbox,
    ElTree,
    ElDatePicker,
    ElTable,
    ElTableColumn,
    ElPagination,
    ElIcon,
    ElDialog,
    ElScrollbar,
    ElPopconfirm,
    ElTooltip,
    ElUpload,
    ElCheckboxGroup,
    ElAutocomplete,
    ElImage,
    ElImageViewer,
    ElPopover,
    ElInfiniteScroll,
    ElLoading,
    ElAvatar,
    ElResult,
    ElCascader,
    ElSwitch,
    ElRadio,
    ElDrawer,
    ElCascaderPanel,
    ElEmpty
} from 'element-plus'
import type { App } from 'vue'

const elementPlus = {
    install(Vue: any) {
        Vue.component('ElConfigProvider', ElConfigProvider)
        Vue.component('ElHeader', ElHeader)
        Vue.component('ElContainer', ElContainer)
        Vue.component('ElMain', ElMain)
        Vue.component('ElAside', ElAside)
        Vue.component('ElMenu', ElMenu)
        Vue.component('ElMenuItem', ElMenuItem)
        Vue.component('ElSubMenu', ElSubMenu)
        Vue.component('ElRow', ElRow)
        Vue.component('ElCol', ElCol)
        Vue.component('ElForm', ElForm)
        Vue.component('ElFormItem', ElFormItem)
        Vue.component('ElButton', ElButton)
        Vue.component('ElInput', ElInput)
        Vue.component('ElSelect', ElSelect)
        Vue.component('ElOption', ElOption)
        Vue.component('ElTree', ElTree)
        Vue.component('ElCheckbox', ElCheckbox)
        Vue.component('ElDatePicker', ElDatePicker)
        Vue.component('ElTable', ElTable)
        Vue.component('ElTableColumn', ElTableColumn)
        Vue.component('ElPagination', ElPagination)
        Vue.component('ElIcon', ElIcon)
        Vue.component('ElDialog', ElDialog)
        Vue.component('ElScrollbar', ElScrollbar)
        Vue.component('ElPopconfirm', ElPopconfirm)
        Vue.component('ElTooltip', ElTooltip)
        Vue.component('ElUpload', ElUpload)
        Vue.component('ElCheckboxGroup', ElCheckboxGroup)
        Vue.component('ElAutocomplete', ElAutocomplete)
        Vue.component('ElImage', ElImage)
        Vue.component('ElImageViewer', ElImageViewer)
        Vue.component('ElPopover', ElPopover)
        Vue.component('ElAvatar', ElAvatar)
        Vue.component('ElResult', ElResult)
        Vue.component('ElCascader', ElCascader)
        Vue.component('ElSwitch', ElSwitch)
        Vue.component('ElRadio', ElRadio)
        Vue.component('ElDrawer', ElDrawer)
        Vue.component('ElCascaderPanel', ElCascaderPanel)
        Vue.component('ElEmpty', ElEmpty)
    }
}

export const setupElementPlus = (app: App<Element>) => {
    app.use(elementPlus)
    app.use(ElInfiniteScroll)
    app.use(ElLoading)
}

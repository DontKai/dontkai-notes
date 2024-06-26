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
    ElDrawer,
    ElPopover,
    ElInfiniteScroll,
    ElLoading
} from 'element-plus'

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
        Vue.component('ElDrawer', ElDrawer)
        Vue.component('ElPopover', ElPopover)
    }
}

export const setupElementPlus = (app: any) => {
    app.use(elementPlus)
    app.use(ElInfiniteScroll)
    app.use(ElLoading)
}

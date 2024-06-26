import type { App } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

export const setupElementPlusIcon = (app: App<Element>) => {
    Object.keys(ElementPlusIconsVue).forEach((key: any) => {
        app.component(key, (ElementPlusIconsVue as any)[key]);
    });
};

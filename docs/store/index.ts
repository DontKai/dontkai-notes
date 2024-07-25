import type { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginpersistedstate from 'pinia-plugin-persist';

const store = createPinia();
store.use(piniaPluginpersistedstate);

export const setupStore = (app: App<Element>) => {
    app.use(store);
};

export default store;

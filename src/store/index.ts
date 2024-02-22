import {createPinia} from 'pinia'

// 引入pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建pinia实例
const pinia = createPinia()
// 使用持久化插件,让pinia可以进行持久化配置
pinia.use(piniaPluginPersistedstate);

export default pinia
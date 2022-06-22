import {modify, time} from '@/app/support/helpers'
import {providers} from '@/app/providers'
import App from '@/resources/views/App'
import Vue from 'vue'

export const vueStart = time()

Vue.use({
    install(vue) {
        vue.prototype.$start = {
            fresh: 0,
            freshStart: vueStart,
            isFresh() {
                return this.fresh === 0
            },
            continue() {
                ++this.fresh
                this.freshStart = time()
            },
            reset() {
                this.fresh = 0
            },
        }
    },
})

Vue.config.productionTip = false
export const app = new Vue(
    modify(
        {
            render: h => h(App),
        },
        function (options) {
            Object.keys(providers).forEach(key => {
                const provider = providers[key]
                if ('installer' in provider) {
                    Vue.use(provider.installer)
                }
                if ('injects' in provider) {
                    Object.assign(options, provider.injects)
                }
            })
            return options
        },
    ),
).$mount('#app')

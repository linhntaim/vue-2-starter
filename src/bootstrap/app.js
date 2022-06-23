import {createStart} from '@/app/support/start'
import {modify, time} from '@/app/support/helpers'
import {providers} from '@/app/providers'
import App from '@/resources/views/App'
import Vue from 'vue'

export const vueStart = time()

Vue.config.productionTip = false

Vue.use(createStart(vueStart).installer)

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
                if ('inject' in provider) {
                    Object.assign(options, provider.inject())
                }
            })
            return options
        },
    ),
).$mount('#app')

import {Config} from './config'

export function createConfig(configs) {
    return {
        installer: {
            install(vueApp) {
                vueApp.prototype.$config = new Config(configs)
            },
        },
    }
}

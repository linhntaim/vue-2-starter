import {registerPropertyFactory} from '../helpers'
import {Config} from './config'

export function createConfig(configs) {
    return {
        installer: {
            install(vueApp) {
                registerPropertyFactory(vueApp, '$config', function () {
                    return new Config(configs)
                })
            },
        },
    }
}

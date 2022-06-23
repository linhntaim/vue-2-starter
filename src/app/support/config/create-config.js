import {registerPropertyFactory} from '../helpers'
import {Config} from './config'

export function createConfig(configs) {
    return {
        installer: {
            install(Vue) {
                registerPropertyFactory(Vue, '$config', function () {
                    return new Config(configs)
                })
            },
        },
    }
}

import {registerGlobalPropertyFactory} from '../helpers'
import {Config} from './config'

export function createConfig(configs) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$config',
                    () => new Config(configs),
                )
            },
        },
    }
}

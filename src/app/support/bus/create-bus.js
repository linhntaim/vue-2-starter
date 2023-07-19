import {registerGlobalPropertyFactory} from '@/app/support/helpers'
import mitt from 'mitt'

export function createBus() {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(
                    Vue,
                    '$bus',
                    () => mitt(),
                )
            },
        },
    }
}
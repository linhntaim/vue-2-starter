import {registerGlobalPropertyFactory, time} from '@/app/support/helpers'

export function createStart(vueStart) {
    return {
        installer: {
            install(Vue) {
                registerGlobalPropertyFactory(Vue, '$start', function () {
                    return {
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
                })
            },
        },
    }
}

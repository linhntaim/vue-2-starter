import {take} from '../helpers'
import {Middlewares} from './middlewares'
import VueRouter from 'vue-router'

export function createRouter(env, options = {}) {
    return {
        installer: VueRouter,
        inject: () => ({
            router: take(
                new VueRouter(
                    Object.assign(
                        {
                            mode: 'history',
                            base: env.BASE_URL,
                        },
                        options || {},
                    ),
                ),
                router => {
                    let middlewares = null

                    router.beforeEach(
                        (to, from, next) => {
                            if (!middlewares) {
                                middlewares = new Middlewares(router.app)
                            }
                            router.app.$log.debug('router', 'beforeEach')
                            middlewares.collect(to).beforeEach(to, from, next)
                        },
                    )
                    router.beforeResolve(
                        (to, from, next) => {
                            router.app.$log.debug('router', 'beforeResolve')
                            middlewares.beforeResolve(to, from, next)
                        },
                    )
                    router.afterEach(
                        (to, from) => {
                            router.app.$log.debug('router', 'afterEach')
                            middlewares.afterEach(to, from)
                        },
                    )
                },
            ),
        }),
    }
}

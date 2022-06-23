import {take} from '../helpers'
import {Middlewares} from './middlewares'
import VueRouter from 'vue-router'

const middlewares = new Middlewares()

export function createRouter(options = {}) {
    if (!('mode' in options)) {
        options.mode = 'history'
    }
    if (!('base' in options)) {
        options.base = process.env.BASE_URL
    }
    return {
        installer: VueRouter,
        inject: () => ({
            router: take(
                new VueRouter(options),
                function (router) {
                    router.beforeEach((to, from, next) => {
                        middlewares.collect(to).beforeEach(to, from, next)
                    })
                    router.beforeResolve((to, from, next) => {
                        middlewares.collect(to).beforeResolve(to, from, next)
                    })
                    router.afterEach((to, from) => {
                        middlewares.collect(to).afterEach(to, from)
                    })
                },
            ),
        }),
    }
}

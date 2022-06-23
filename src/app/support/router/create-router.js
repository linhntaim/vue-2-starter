import {take} from '../helpers'
import {Middlewares} from './middlewares'
import VueRouter from 'vue-router'

const middlewares = new Middlewares()

export function createRouter(options = {}) {
    return {
        installer: VueRouter,
        inject: () => ({
            router: take(
                new VueRouter(
                    Object.assign(
                        {
                            mode: 'history',
                            base: process.env.BASE_URL,
                        },
                        options || {},
                    ),
                ),
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

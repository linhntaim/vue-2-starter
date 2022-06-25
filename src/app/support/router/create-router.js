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
                    const createMiddlewares = app => middlewares ? middlewares : middlewares = new Middlewares(app)

                    router.beforeEach(
                        (to, from, next) => createMiddlewares(router.app).collect(to).beforeEach(to, from, next),
                    )
                    router.beforeResolve(
                        (to, from, next) => createMiddlewares(router.app).beforeResolve(to, from, next),
                    )
                    router.afterEach(
                        (to, from) => createMiddlewares(router.app).afterEach(to, from),
                    )
                },
            ),
        }),
    }
}

import {Middleware} from '@/app/support/router'

export class Auth extends Middleware
{
    beforeEach(to, from, next) {
        this.app.$log.debug('middleware', 'auth.beforeEach')
        if (!this.app.$store.getters['account/isLoggedIn']) {
            if (to.matched.some(route => route.meta.requiresAuth)) {
                const ifUnauthenticatedRoute = this.app.$config.app.routes.redirect_if_unauthenticated
                if (to.name !== ifUnauthenticatedRoute.name) {
                    next(ifUnauthenticatedRoute)
                    return false
                }
            }
        }
        next()
    }
}

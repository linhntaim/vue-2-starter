import {Middleware} from '@/app/support/router'

export class Guest extends Middleware
{
    beforeEach(to, from, next) {
        this.app.$log.debug('middleware', 'auth.beforeEach')
        if (this.app.$store.getters['account/isLoggedIn']) {
            if (to.matched.some(route => route.meta.requiresGuest)) {
                const ifAuthenticatedRoute = this.app.$config.app.routes.redirect_if_authenticated
                if (to.name !== ifAuthenticatedRoute.name) {
                    next(ifAuthenticatedRoute)
                    return false
                }
            }
        }
        next()
    }
}

import {app} from '@/bootstrap/app'
import {localization} from '@/config'
import {Middleware} from '@/app/support/router'
import {ServiceError} from '@/app/support/services'

export class Fresh extends Middleware
{
    waitAppResolved() {
        return new Promise(resolve => {
            const resolveApp = () => {
                if (!app) {
                    setTimeout(resolveApp, 1000)
                }
                else {
                    resolve(app)
                }
            }
            resolveApp()
        })
    }

    async beforeEach(to, from, next) {
        await this.waitAppResolved() // trick
        const fresh = app.$start.isFresh()
        app.$start.continue()
        if (fresh) {
            if (!(await this.restoreFromServer(to, from, next))) {
                return
            }
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        next()
    }

    async restoreFromServer(to, from, next) {
        const data = await app.$store.dispatch('prerequisite/require', ['server']).catch(err => err)
        app.$log.debug('middleware', 'fresh.restoreFromServer', data)
        if (data instanceof ServiceError) {
            app.$start.reset()
            const connectionLostRoute = app.$config.app.routes.connection_lost
            if (to.name !== connectionLostRoute.name) {
                next(connectionLostRoute)
                return false
            }
        }
        return true
    }

    async restoreFromCache() {
        app.$log.debug('middleware', 'fresh.restoreFromCache')
        //
    }

    async restoreFromCookie() {
        app.$log.debug('middleware', 'fresh.restoreFromCookie')
        // settings
        await app.$settings
            .set(await app.$cookie.get('settings', {
                locale: localization.locale.default,
            }))
            .apply()
        // account
        await app.$store.dispatch('account/restoreFromCookie')
    }
}

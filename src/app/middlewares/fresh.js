import {app} from '@/bootstrap/app'
import {localization} from '@/config'
import {Middleware} from '@/app/support/router'

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
            await this.restoreFromCache()
            await this.restoreFromCookie()
        }
        next()
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
    }
}

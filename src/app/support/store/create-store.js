import {registerPropertyFactory, take} from '@/app/support/helpers'
import Vuex from 'vuex'

export function createStore(options = {}) {
    return {
        installer: Vuex,
        inject: () => ({
            store: take(new Vuex.Store(options), store => registerPropertyFactory(store, 'app', store => store._vm)),
        }),
    }
}

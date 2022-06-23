import Vuex from 'vuex'

export function createStore(options = {}) {
    return {
        installer: Vuex,
        inject: () => ({
            store: new Vuex.Store(options),
        }),
    }
}

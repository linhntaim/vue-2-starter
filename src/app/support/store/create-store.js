import Vuex from 'vuex'

export function createStore(options = {}) {
    return {
        installer: Vuex,
        injects: {
            store: new Vuex.Store(options),
        },
    }
}

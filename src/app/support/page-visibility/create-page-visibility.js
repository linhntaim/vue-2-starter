export function createPageVisibility() {
    return {
        installer: {
            install(Vue) {
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'visible') {
                        Vue.prototype.$bus.emit('pageVisible')
                    }
                })
            },
        },
    }
}
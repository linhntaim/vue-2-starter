import {createHead} from '@unhead/vue'
import {UnheadPlugin} from '@unhead/vue/vue2'

export const head = {
    installer: UnheadPlugin,
    inject: () => ({
        unhead: createHead(),
    }),
}
<template lang="pug">
router-view
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Base',
    beforeUnmount() {
        this.registerSetProgressing(false)
        this.registerReset()
    },
    methods: {
        ...mapMutations({
            registerSetProgressing: 'register/setProgressing',
            registerReset: 'register/reset',
        }),
    },
}
</script>

<template lang="pug">
router-view
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Base',
    beforeUnmount() {
        this.forgotPasswordSetProgressing(false)
        this.forgotPasswordReset()
    },
    methods: {
        ...mapMutations({
            forgotPasswordSetProgressing: 'forgotPassword/setProgressing',
            forgotPasswordReset: 'forgotPassword/reset',
        }),
    },
}
</script>

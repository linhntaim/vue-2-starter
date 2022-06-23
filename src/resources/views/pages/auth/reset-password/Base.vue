<template lang="pug">
router-view
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Base',
    beforeDestroy() {
        this.resetPasswordSetProgressing(false)
        this.resetPasswordReset()
    },
    methods: {
        ...mapMutations({
            resetPasswordSetProgressing: 'resetPassword/setProgressing',
            resetPasswordReset: 'resetPassword/reset',
        }),
    },
}
</script>

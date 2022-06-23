<template lang="pug">
.reset-password
    h1 Reset Password
    p You have reset your password successfully.
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Success',
    computed: {
        ...mapGetters({
            resetPasswordProgressing: 'resetPassword/progressing',
        }),
    },
    created() {
        if (!this.resetPasswordProgressing) {
            this.$router.push({name: 'login'})
        }
        this.resetPasswordSetProgressing(false)
    },
    methods: {
        ...mapMutations({
            resetPasswordSetProgressing: 'resetPassword/setProgressing',
        }),
    },
}
</script>

<template lang="pug">
.forgot-password
    h1 Forgot Password
    p Please check and follow instructions in the email of resetting password that has been sent to your inbox.
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Success',
    computed: {
        ...mapGetters({
            forgotPasswordProgressing: 'forgotPassword/progressing',
        }),
    },
    created() {
        if (!this.forgotPasswordProgressing) {
            this.$router.push({name: 'password.request'})
        }
        this.forgotPasswordSetProgressing(false)
    },
    methods: {
        ...mapMutations({
            forgotPasswordSetProgressing: 'forgotPassword/setProgressing',
        }),
    },
}
</script>

<template lang="pug">
p Logging out...
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Logout',
    computed: {
        ...mapGetters({
            accountLogoutActivated: 'account/logoutActivated',
        }),
    },
    created() {
        if (this.accountLogoutActivated) {
            const logout = () => this.$router.push(this.$config.app.routes.redirect_after_unauthenticated)
            this.accountLogout()
                .then(logout)
                .catch(logout)
        }
        else {
            this.$router.push(this.$config.app.routes.root)
        }
    },
    methods: {
        ...mapActions({
            accountLogout: 'account/sanctumLogout',
        }),
    },
}
</script>

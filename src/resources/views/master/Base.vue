<template lang="pug">
#app
    nav
        router-link(:to="{name: 'root'}") Home
        | &nbsp;|&nbsp;
        router-link(:to="{name: 'about'}") About
        template(v-if="accountIsLoggedIn")
            | &nbsp;|&nbsp;
            router-link(:to="{name: 'account'}") Account
            | &nbsp;|&nbsp;
            a(@click.prevent="onLogoutClick" href="#") Logout
        template(v-else)
            | &nbsp;|&nbsp;
            router-link(:to="loginRoute") Login
            | &nbsp;|&nbsp;
            router-link(:to="{name: 'register'}") Register
            | &nbsp;|&nbsp;
            router-link(:to="{name: 'password.request'}") Forgot password
    router-view
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Base',
    data() {
        return {
            loginRoute: this.$config.app.routes.login,
        }
    },
    computed: {
        ...mapGetters({
            accountIsLoggedIn: 'account/isLoggedIn',
        }),
    },
    methods: {
        ...mapMutations({
            accountActivateLogout: 'account/activateLogout',
        }),
        onLogoutClick() {
            this.accountActivateLogout()
            this.$router.push(this.$config.app.routes.logout)
        },
    },
}
</script>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>

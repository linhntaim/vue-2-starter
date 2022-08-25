<template lang="pug">
.unauthenticated
    h1 401 - Unauthenticated
    p
        router-link(:to="loginRoute") Go to Login
</template>

<script>
export default {
    // eslint-disable-next-line
    name: 'Unauthenticated',
    data() {
        return {
            loginRoute: this.$config.app.routes.login,
        }
    },
}
</script>

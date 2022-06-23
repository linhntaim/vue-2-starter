<template lang="pug">
.internal-server-error
    h1 503 - Service Unavailable
    p Connection to server has been lost.
    button(type="button" @click="onRefreshClick") Refresh
</template>

<script>
export default {
    name: 'ConnectionLost',
    methods: {
        onRefreshClick() {
            this.$router.push({name: 'root'})
        },
    },
}
</script>

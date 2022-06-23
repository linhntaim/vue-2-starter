<template lang="pug">
.account
    h1 Account
    div {{ accountName }}
    div {{ accountEmail }}
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Account',
    computed: {
        ...mapGetters({
            account: 'account/account',
        }),
        accountName() {
            return this.account?.name
        },
        accountEmail() {
            return this.account?.email
        },
    },
}
</script>

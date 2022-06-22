<template lang="pug">
.account
    h1 Account
    div {{ account.name }}
    div {{ account.email }}
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
    },
}
</script>

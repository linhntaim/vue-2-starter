<template lang="pug">
.register
    h1 Register
    p You have registered successfully.
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Success',
    computed: {
        ...mapGetters({
            registerProgressing: 'register/progressing',
        }),
    },
    created() {
        if (!this.registerProgressing) {
            this.$router.push({name: 'register'})
        }
        this.registerSetProgressing(false)
    },
    methods: {
        ...mapMutations({
            registerSetProgressing: 'register/setProgressing',
        }),
    },
}
</script>

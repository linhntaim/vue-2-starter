<template lang="pug">
.login
    h1 Login
    form(@submit.prevent="onSubmit")
        div
            input(v-model="email" type="email" name="email" placeholder="Email" required)
        template(v-if="error.validation.email")
            div(v-for="message in error.validation.email")
                small {{ message }}
        div
            input(v-model="password" type="password" name="password" placeholder="Password" autocomplete="off" required)
        button(:disabled="loading._" type="submit") Submit
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Login',
    data() {
        return {
            loading: {
                _: false,
            },

            email: '',
            password: '',

            error: {
                messages: [],
                validation: {},
            },
        }
    },
    computed: {
        ...mapGetters({
            accountIsLoggedIn: 'account/isLoggedIn',
        }),
    },
    methods: {
        ...mapActions({
            accountLogin: 'account/sanctumLogin',
        }),
        onSubmit() {
            this.loading._ = true
            this.accountLogin({
                email: this.email,
                password: this.password,
            }).then(() => {
                this.loading._ = false
                if (this.accountIsLoggedIn) {
                    this.$router.push(this.$config.app.routes.redirect_after_authenticated)
                }
            }).catch(err => {
                this.loading._ = false
                this.error.messages = err.messages
                if (err.data && 'validation' in err.data) {
                    this.error.validation = err.data.validation
                }
            })
        },
    },
}
</script>

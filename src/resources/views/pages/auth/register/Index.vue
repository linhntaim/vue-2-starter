<template lang="pug">
.register
    h1 Register
    form(@submit.prevent="onSubmit")
        div
            input(v-model="name" type="text" name="name" placeholder="Name" required)
        template(v-if="error.validation.name")
            div(v-for="message in error.validation.name")
                small {{ message }}
        div
            input(v-model="email" type="email" name="email" placeholder="Email" required)
        template(v-if="error.validation.email")
            div(v-for="message in error.validation.email")
                small {{ message }}
        div
            input(v-model="password" type="password" name="password" placeholder="Password" autocomplete="off" required)
        template(v-if="error.validation.password")
            div(v-for="message in error.validation.password")
                small {{ message }}
        div
            input(v-model="passwordConfirmation" type="password" name="password_confirmation" placeholder="Password Confirmation" autocomplete="off" required)
        button(:disabled="loading._" type="submit") Submit
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
    // eslint-disable-next-line
    name: 'Index',
    data() {
        return {
            loading: {
                _: false,
            },

            error: {
                messages: [],
                validation: {},
            },
        }
    },
    computed: {
        ...mapGetters({
            registerProgressing: 'register/progressing',
        }),
        name: {
            get() {
                return this.$store.state.register.name
            },
            set(value) {
                this.$store.state.register.name = value
            },
        },
        email: {
            get() {
                return this.$store.state.register.email
            },
            set(value) {
                this.$store.state.register.email = value
            },
        },
        password: {
            get() {
                return this.$store.state.register.password
            },
            set(value) {
                this.$store.state.register.password = value
            },
        },
        passwordConfirmation: {
            get() {
                return this.$store.state.register.passwordConfirmation
            },
            set(value) {
                this.$store.state.register.passwordConfirmation = value
            },
        },
    },
    created() {
        if (!this.registerProgressing) {
            this.registerReset()
        }
    },
    methods: {
        ...mapActions({
            register: 'register/register',
        }),
        ...mapMutations({
            registerSetProgressing: 'register/setProgressing',
            registerReset: 'register/reset',
        }),
        onSubmit() {
            this.loading._ = true
            this.register({
                login_url: this.$url.route(this.$config.app.routes.login),
            }).then(() => {
                this.loading._ = false
                this.registerSetProgressing(true)
                this.$router.push({name: 'register.success'})
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

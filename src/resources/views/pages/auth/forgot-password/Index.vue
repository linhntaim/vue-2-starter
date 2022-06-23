<template lang="pug">
.forgot-password
    h1 Forgot Password
    form(@submit.prevent="onSubmit")
        div
            input(v-model="email" type="email" name="email" placeholder="Email" required)
        template(v-if="error.validation.email")
            div(v-for="message in error.validation.email")
                small {{ message }}
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
            forgotPasswordProgressing: 'forgotPassword/progressing',
        }),
        email: {
            get() {
                return this.$store.state.forgotPassword.email
            },
            set(value) {
                this.$store.state.forgotPassword.email = value
            },
        },
    },
    created() {
        if (!this.forgotPasswordProgressing) {
            this.forgotPasswordReset()
        }
    },
    methods: {
        ...mapActions({
            forgotPassword: 'forgotPassword/forgotPassword',
        }),
        ...mapMutations({
            forgotPasswordSetProgressing: 'forgotPassword/setProgressing',
            forgotPasswordReset: 'forgotPassword/reset',
        }),
        onSubmit() {
            this.loading._ = true
            this.forgotPassword({
                reset_url: this.$url.route({
                    name: 'password.reset',
                    params: {
                        token: '{token}',
                    },
                }),
            }).then(() => {
                this.loading._ = false
                this.forgotPasswordSetProgressing(true)
                this.$router.push({name: 'password.request.success'})
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

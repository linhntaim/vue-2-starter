<template lang="pug">
.about
    h1 This is an about page
    p
        small Say hello to&nbsp;
        input(v-model="world" type="text")
        template(v-if="locales.length > 1")
            small &nbsp;in&nbsp;
            select(v-model="locale")
                option(v-for="value in locales" :key="value" :value="value")
                    | {{ value }}
    p {{ $t('hello', {world}) }}
</template>

<script>
import {app} from '@/bootstrap/app'

export default {
    // eslint-disable-next-line
    name: 'About',
    data() {
        return {
            world: 'World',
            locale: this.$i18n.locale,
            locales: this.$config.localization.locale.supported,
        }
    },
    watch: {
        locale() {
            this.$setLocale(this.locale)
        },
    },
    beforeRouteEnter(to, from, next) { // cannot access `this`
        app.$log.debug('page', 'about.beforeRouteEnter')
        next()
    },
    beforeRouteUpdate(to, from, next) {
        this.$log.debug('page', 'about.beforeRouteUpdate')
        next()
    },
    beforeRouteLeave(to, from, next) {
        this.$log.debug('page', 'about.beforeRouteLeave')
        next()
    },
    beforeCreate() {
        this.$log.debug('page', 'about.beforeCreate')
    },
    created() {
        this.$log.debug('page', 'about.created')
    },
    beforeUpdate() {
        this.$log.debug('page', 'about.beforeUpdate')
    },
    updated() {
        this.$log.debug('page', 'about.updated')
    },
    beforeMount() {
        this.$log.debug('page', 'about.beforeMount//rendering')
    },
    mounted() {
        this.$log.debug('page', 'about.mounted//rendered')
    },
    beforeDestroy() {
        this.$log.debug('page', 'about.beforeDestroy')
    },
    destroyed() {
        this.$log.debug('page', 'about.destroyed')
    },
}
</script>

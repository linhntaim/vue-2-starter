<template lang="pug">
.unauthenticated
    h1 401 - Unauthenticated
    p
        router-link(:to="{name: 'login'}") Go to Login
</template>

<script>
export default {
    // eslint-disable-next-line
    name: 'Unauthenticated',
}
</script>

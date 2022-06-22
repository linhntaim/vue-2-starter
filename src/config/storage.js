export const storage = {
    default: 'local',
    drivers: {
        local: {
            prefix: process.env.VUE_APP_ID + '__',
            flatten: true,
        },
        cookie: {
            prefix: process.env.VUE_APP_ID + '__',
            flatten: true,
            // encrypt: true,
        },
    },
}

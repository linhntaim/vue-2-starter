import {middlewares} from '@/app/middlewares'
import {Auth} from '@/app/middlewares/auth'
import {Guest} from '@/app/middlewares/guest'
import Base from '@/resources/views/master/Base'
import BaseError from '@/resources/views/master/BaseError'
import BaseBlank from '@/resources/views/master/BaseBlank'

export const routes = [
    {
        path: '/',
        component: Base,
        meta: {
            middleware: middlewares,
        },
        children: [
            {
                path: 'clear-site-data',
                name: 'clear_site_data',
                component: () => import(/* webpackChunkName: "view-clear-site-data" */ '@/resources/views/pages/ClearSiteData'),
            },
            {
                path: 'error',
                component: BaseError,
                children: [
                    {
                        path: 'connection-lost',
                        name: 'connection_lost',
                        component: () => import(/* webpackChunkName: "view-error-connection-lost" */ '@/resources/views/errors/ConnectionLost'),
                    },
                    {
                        path: '401',
                        name: 'unauthenticated',
                        component: () => import(/* webpackChunkName: "view-error-unauthenticated" */ '@/resources/views/errors/Unauthenticated'),
                    },
                    {
                        path: '404',
                        name: 'not_found',
                        component: () => import(/* webpackChunkName: "view-error-not-found" */ '@/resources/views/errors/NotFound'),
                    },
                    //
                ],
            },
            {
                path: 'auth',
                component: BaseBlank,
                meta: {
                    requiresGuest: true,
                    middleware: [Guest],
                },
                children: [
                    {
                        path: 'login',
                        name: 'login',
                        component: () => import(/* webpackChunkName: "view-auth-login" */ '@/resources/views/pages/auth/Login'),
                    },
                    {
                        path: 'register',
                        component: () => import(/* webpackChunkName: "view-auth-register-base" */ '@/resources/views/pages/auth/register/Base'),
                        children: [
                            {
                                path: '',
                                name: 'register',
                                component: () => import(/* webpackChunkName: "view-auth-register-index" */ '@/resources/views/pages/auth/register/Index'),
                            },
                            {
                                path: 'success',
                                name: 'register.success',
                                component: () => import(/* webpackChunkName: "view-auth-register-success" */ '@/resources/views/pages/auth/register/Success'),
                            },
                        ],
                    },
                    {
                        path: 'forgot-password',
                        component: () => import(/* webpackChunkName: "view-auth-forgot-password-base" */ '@/resources/views/pages/auth/forgot-password/Base'),
                        children: [
                            {
                                path: '',
                                name: 'password.request',
                                component: () => import(/* webpackChunkName: "view-auth-forgot-password-index" */ '@/resources/views/pages/auth/forgot-password/Index'),
                            },
                            {
                                path: 'success',
                                name: 'password.request.success',
                                component: () => import(/* webpackChunkName: "view-auth-forgot-password-success" */ '@/resources/views/pages/auth/forgot-password/Success'),
                            },
                        ],
                    },
                    {
                        path: 'reset-password',
                        component: () => import(/* webpackChunkName: "view-auth-reset-password-base" */ '@/resources/views/pages/auth/reset-password/Base'),
                        children: [
                            {
                                path: ':token',
                                name: 'password.reset',
                                component: () => import(/* webpackChunkName: "view-auth-reset-password-index" */ '@/resources/views/pages/auth/reset-password/Index'),
                            },
                            {
                                path: 'success',
                                name: 'password.reset.success',
                                component: () => import(/* webpackChunkName: "view-auth-reset-password-success" */ '@/resources/views/pages/auth/reset-password/Success'),
                            },
                        ],
                    },
                    //
                ],
            },
            {
                path: '/',
                name: 'root',
                component: () => import(/* webpackChunkName: "view-home" */ '@/resources/views/pages/Home'),
            },
            //
            {
                path: 'about',
                name: 'about',
                component: () => import(/* webpackChunkName: "view-about" */ '@/resources/views/pages/About'),
            },
            //
            {
                path: '/',
                component: BaseBlank,
                meta: {
                    requiresAuth: true,
                    middleware: [Auth],
                },
                children: [
                    {
                        path: 'auth/logout',
                        name: 'logout',
                        component: () => import(/* webpackChunkName: "view-auth-logout" */ '@/resources/views/pages/auth/Logout'),
                    },
                    {
                        path: 'account',
                        name: 'account',
                        component: () => import(/* webpackChunkName: "view-me-account" */ '@/resources/views/pages/me/Account'),
                    },
                    //
                ],
            },
            {
                path: ':pathMatch(.*)*',
                component: () => import(/* webpackChunkName: "view-welcome" */ '@/resources/views/pages/Welcome'),
            },
        ],
    },
]

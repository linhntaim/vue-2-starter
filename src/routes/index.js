import {middlewares} from '@/app/middlewares'
import Base from '@/resources/views/master/Base'
import BaseBlank from '@/resources/views/master/BaseBlank'

const viewNotFound = () => import(/* webpackChunkName: "view-error-not-found" */ '@/resources/views/errors/NotFound')
const fallbackRoute = {
    path: ':pathMatch(.*)*',
    component: viewNotFound,
}
const rootIncludedFallbackRoute = [
    {
        path: '',
        component: viewNotFound,
    },
    fallbackRoute,
]

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
                component: BaseBlank,
                children: [
                    {
                        path: '404',
                        name: 'not_found',
                        component: viewNotFound,
                    },
                    //
                    ...rootIncludedFallbackRoute,
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
            fallbackRoute,
        ],
    },
]

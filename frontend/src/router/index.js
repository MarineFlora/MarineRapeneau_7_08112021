import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../middleware/auth';
import VueRouteMiddleware from 'vue-route-middleware';

import LatestPosts from '../views/LatestPosts.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import AboutPage from '../views/AboutPage.vue'
import MyProfile from '../views/MyProfile.vue'
import UserProfile from '../views/UserProfile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/', 
        name: 'LatestPosts',
        component: LatestPosts,
        meta: {
            middleware: Auth
        },
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage,
        props: true,
        meta: {
            middleware: Auth
        },
    },
    {
        path: '/user-profile',
        name: 'MyProfile',
        component: MyProfile,
        meta: {
            middleware: Auth
        },
    },
    {
        path: '/user-profile/:userId',
        name: 'UserProfile',
        component: UserProfile,
        meta: {
            middleware: Auth
        },
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(VueRouteMiddleware())

export default router

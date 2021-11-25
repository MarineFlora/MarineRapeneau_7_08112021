import Vue from 'vue'
import VueRouter from 'vue-router'
import LatestPosts from '../views/LatestPosts.vue'
import LogIn from '../views/LogIn.vue'
import SignUp from '../views/SignUp.vue'
import AboutPage from '../views/AboutPage.vue'
import UserProfile from '../views/UserProfile.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/posts', // à changer en /
        name: 'LatestPosts',
        component: LatestPosts
    },
    {
        path: '/about',
        name: 'AboutPage',
        component: AboutPage
    },
    {
        path: '/', // doit être /login (test)
        name: 'LogIn',
        component: LogIn
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/user-profile',
        name: 'UserProfile',
        component: UserProfile
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

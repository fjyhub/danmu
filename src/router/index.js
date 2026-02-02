import {createWebHashHistory,createRouter } from 'vue-router'

const Home=()=>import('../views/home/index.vue')
const Management=()=>import('../views/management/index.vue')
const Comment=()=>import('../views/comment/index.vue')

const routes=[
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/management',
        name:'Management',
        component:Management
    },
    {
        path:'/comment',
        name:'Comment',
        component:Comment
    },

]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router

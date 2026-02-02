import {createWebHashHistory,createRouter } from 'vue-router'

const Home=()=>import('../views/home/index.vue')
const Comment=()=>import('../views/comment/indev.vue')
const Management=()=>import('../views/management/index.vue')

const routes=[
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/comment',
        name:'Comment',
        component:Comment
    },
    {
        path:'/management',
        name:'Management',
        component:Management
    },

]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})
export default router

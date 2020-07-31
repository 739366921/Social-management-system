import Vue from "vue"
import Router from "vue-router"
import Landing from "../components/Landing.vue"
import Login from "../components/Login.vue"
import Register from "../components/Register.vue"

Vue.use(Router)

export default new Router({
    mode:'history',
    linkActiveClass:'active',
    routes:[
        {path:"*",redirect:'/'},
        {path:"/",component:Landing},
        {path:"/login",component:Login},
        {path:"/register",component:Register},
    ]

})
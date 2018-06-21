import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from './pages/Home.vue'
import First from './pages/First.vue'
import Second from './pages/Second.vue'
import Login from './pages/Login.vue'
import Buy from './pages/Buy.vue'
import Leave from './pages/Leave.vue'


Vue.use(VueRouter)
const routes = [
    { 'path': '/', component: Home, "meta": "is-primary" },
    { 'path': '/first', component: First, "meta": "is-info" },
    { 'path': '/second', component: Second, "meta": "is-success" },
    { 'path': '/auth', component: Login, "meta": "is-warning" },
    { 'path': '/buy', component: Buy, "meta": "is-primary" },
    { 'path': '/leave', component: Leave, "meta": "is-light" }
]

export default new VueRouter({
    routes // short for `routes: routes`
})

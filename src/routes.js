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
    { 'path': '/', component: Home },
    { 'path': '/first', component: First },
    { 'path': '/second', component: Second },
    { 'path': '/auth', component: Login },
    { 'path': '/buy', component: Buy },
    { 'path': '/leave', component: Leave}
  ]
  
export default  new VueRouter({
    routes // short for `routes: routes`
})
  
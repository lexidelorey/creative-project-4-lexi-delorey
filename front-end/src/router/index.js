import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/SignupView.vue'
import SearchView from '../views/SearchView.vue'
import CreateView from '../views/CreateView.vue'
import PostView from '../views/PostView.vue'
import PostManagementView from '../views/PostManagementView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
  {
    path: '/posts',
    name: 'post',
    component: PostView
  },
  {
    path: '/manage',
    name: 'management',
    component: PostManagementView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

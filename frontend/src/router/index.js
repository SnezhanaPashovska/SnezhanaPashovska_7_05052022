import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    }
  },
  {
    path: '/NewsFeed',
    name: 'NewsFeed',
    component: function () {
      return import(/* webpackChunkName: "NewsFeed" */ '../views/NewsFeed.vue')
    }
  },
  {
    path: "/signup.js",
    name: "signup.js",
    component: function () {
      return import(/* webpackChunkName: "NewsFeed" */ '../js/signup.js')
    }
  }




]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'


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
      return import(/* webpackChunkName: "login" */ '../components/Login.vue')
    },
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: function () {
      return import(/* webpackChunkName: "signup" */ '../components/Signup.vue')
    },
    meta: {
      hideNavbar: true
    }
  },

  {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: function () {
      return import(/* webpackChunkName: "ProfilePage" */ '../components/ProfilePage.vue')
    },
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/Newsfeed',
    name: 'NewsFeed',
    component: function () {
      return import(/* webpackChunkName: "NewsFeed" */ '../components/NewsFeed.vue')
    }
  },
  {
    path: '/Header',
    name: 'Header',
    component: function () {
      return import(/* webpackChunkName: "Header" */ '../components/Header.vue')
    }
  },

  {
    path: '/Settings',
    name: 'Settings',
    component: function () {
      return import(/* webpackChunkName: "Header" */ '../components/Settings.vue')
    }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
	const isLogged = store.state.isLogged
	if ((to.name !== 'Login' && !isLogged) && (to.name !== 'Signup' && !isLogged)) next({ name: 'Login' })
	else next()
})

export default router

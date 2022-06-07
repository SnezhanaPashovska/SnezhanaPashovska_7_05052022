import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store/index.js'
import NewsFeed from '../views/NewsFeed'
import PostBox from '../views/PostBox'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "login" */ '../views/Login.vue')
    },
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: function () {
      return import(/* webpackChunkName: "signup" */ '../views/Signup.vue')
    },
    meta: {
      hideNavbar: true
    }
  },

  {
    path: '/ProfilePage',
    name: 'ProfilePage',
    component: function () {
      return import(/* webpackChunkName: "ProfilePage" */ '../views/ProfilePage.vue')
    },
    meta: {
      hideNavbar: true
    }
  },
  {
    path: '/Newsfeed',
    name: 'NewsFeed',
    component: function () {
      return import(/* webpackChunkName: "NewsFeed" */ '../views/NewsFeed.vue')
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
      return import(/* webpackChunkName: "Settings" */ '../views/Settings.vue')
    }
  },
  {
    path: '/PostBox',
    name: 'PostBox',
    component: function () {
      return import(/* webpackChunkName: "PostBox" */ '../views/PostBox.vue')
    }
  },
  {
    path: '/post/:id',
    name: 'ModifyPost',
    component: function () {
      return import(/* webpackChunkName: "PostBox" */ '../views/ModifyPost.vue')
    }
  },
  {
    path: "/CommentBox",
    name: "CommentBox",
    component: function () {
      return import(/* webpackChunkName: "PostBox" */ '../views/CommentBox.vue')
    }
  },
  {
    path: "/CommentSent",
    name: "CommentSent",
    component: function () {
      return import(/* webpackChunkName: "PostBox" */ '../views/CommentSent.vue')
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

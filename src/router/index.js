import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreatePostView from '../views/CreatePostView.vue'
import EditPostView from '../views/EditPostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePostView
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: EditPostView,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from'@/components/layout/AppLayout.vue'
import About from '@/views/AboutView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Analyze from '@/views/AnalyzeView.vue'
import Show from '@/views/ShowView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: AppLayout,
      children:[
        {
          path:'about/',
          component: About
        },
        {
          path:'dashboard/',
          component: Dashboard
        },
        {
          path:'analyze/',
          component: Analyze
        },
        {
          path:'show/',
          component: Show
        }
      ]
    }

  ]
})

export default router

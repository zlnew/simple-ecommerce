import { fetchUser, useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/browse',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: 'browse',
          name: 'browse',
          meta: {
            title: 'Browse'
          },
          component: () => import('@/views/BrowseView.vue')
        },
        {
          path: 'product/:id',
          name: 'detailProduct',
          meta: {
            title: 'Product not found'
          },
          component: () => import('@/views/DetailProductView.vue')
        }
      ]
    },
    {
      path: '/auth',
      meta: { middleware: 'guest' },
      component: () => import('@/layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          meta: {
            title: 'Login'
          },
          component: () => import('@/views/Auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'register',
          meta: {
            title: 'Register'
          },
          component: () => import('@/views/Auth/RegisterView.vue')
        },
        {
          path: 'forgot-password',
          name: 'forgotPassword',
          meta: {
            title: 'Forgot Password'
          },
          component: () => import('@/views/Auth/ForgotPasswordView.vue')
        },
        {
          path: 'reset-password/:token',
          name: 'resetPassword',
          meta: {
            title: 'Reset Password'
          },
          component: () => import('@/views/Auth/ResetPasswordView.vue')
        },
      ]
    },
    {
      path: '/admin',
      redirect: '/admin/dashboard',
      meta: { middleware: 'admin' },
      component: () => import('@/layouts/AdminLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'adminDashboard',
          meta: {
            title: 'Dashboard'
          },
          component: () => import('@/views/Admin/DashboardView.vue')
        },
        {
          path: 'products',
          name: 'adminProducts',
          meta: {
            title: 'Products'
          },
          component: () => import(`@/views/Admin/Product/IndexView.vue`)
        },
        {
          path: 'products/create',
          name: 'adminCreateProduct',
          meta: {
            title: 'Create Product'
          },
          component: () => import('@/views/Admin/Product/CreateView.vue')
        },
        {
          path: 'products/edit/:id',
          name: 'adminEditProduct',
          meta: {
            title: 'Edit Product'
          },
          component: () => import('@/views/Admin/Product/EditView.vue')
        },
      ]
    }
  ]
})


router.beforeEach(async (to, _from, next) => {
  setDocumentTitle(to.meta.title, to.meta.middleware)

  await setUser()

  next()
})

function setDocumentTitle (title: any, middleware?: any) {
  let appName = import.meta.env.VITE_APP_NAME

  if (middleware === 'admin') {
    appName = `${appName} Admin`
  }

  if (!!title && typeof title === 'string') {
    document.title = `${title} | ${appName}`
  } else {
    document.title = appName
  }
}

async function setUser () {
  const { user } = storeToRefs(useAuthStore())

  if (user.value !== undefined) { return }
  
  user.value = await fetchUser()
}

export default router

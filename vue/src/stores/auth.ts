import api from "@/lib/api"
import axios from "axios"
import { defineStore } from "pinia"
import { ref } from "vue"

export type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
}

export type RegisterForm = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginForm = {
  email: string
  password: string
  remember: boolean
}

export type ResetPasswordForm = {
  token: string
  email: string
  password: string
  password_confirmation: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null | undefined>(undefined)

  async function refresh () {
    try {
      user.value = await fetchUser()
    } catch {
      user.value = null
    }
  }

  async function register (form: RegisterForm) {
    await api.post('/register', form)

    await refresh()
  }

  async function login (form: LoginForm) {
    await api.post('/login', form)

    await refresh()
  }

  async function forgotPassword (email: string, ) {
    const { data } = await api.post<{ status: string }>('/forgot-password', { email })

    return data.status
  }

  async function resetPassword (form: ResetPasswordForm) {
    const { data } = await api.post<{ status: string }>('/reset-password', form)

    return data.status
  }

  async function logout () {
    await api.post('/logout')

    user.value = null
  }

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout
  }
})

export async function initCsrf () {
  await api.get('/sanctum/csrf-cookie')
}

export async function fetchUser () {
  try {
    const res = await api.get<User>('/api/user')
    return res.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if ([401, 419].includes(error.response?.status || -1)) {
        return null
      }
    }

    throw error
  }
}

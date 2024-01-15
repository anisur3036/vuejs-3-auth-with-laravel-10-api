import { defineStore } from 'pinia'
import axios from '@/utils/axios'
import { useLocalStorage } from '@/composables/localStorage'

type Credentials = {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage('auth.user')
  let isSessionVerified = false

  async function login(credentials: Credentials) {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/login', credentials)
    const { data } = await axios.get('api/user')
    user.value = data
  }

  async function logout() {
    await axios.post('/logout')
    user.value = {}
  }

  async function loadUser() {
    isSessionVerified = true
    const { data } = await axios.get('api/user')
    user.value = data
  }

  async function verifySession() {
    if (user.value && !isSessionVerified) {
      try {
        await loadUser()
      } catch (err) {
        user.value = null
      }
    }
  }

  return {
    verifySession,
    user,
    login,
    logout
  }
})

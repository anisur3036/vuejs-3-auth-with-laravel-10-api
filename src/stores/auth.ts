import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import axios from '@/utils/axios'

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string
  created_at: string
  updated_at: string
}

type Credentials = {
  email: string
  password: string
  remember: string
}

function useLocalStorage<T>(key: string, defaultValue?: T) {
  const val = ref(defaultValue)

  const storageVal = window.localStorage.getItem(key)
  if (storageVal) {
    val.value = JSON.parse(storageVal)
  }

  watch(val, (newValue) => window.localStorage.setItem(key, JSON.stringify(newValue)), {
    deep: true
  })

  return val
}

export const useAuthStore = defineStore('auth', () => {
  const user = useLocalStorage<User>('auth.user')

  async function login(credentials: Credentials) {
    await axios.get('/sanctum/csrf-cookie')
    await axios.post('/login', credentials)
    const { data } = await axios.get('api/user')
    user.value = data
  }

  function setUser(u: any) {
    user.value = u
  }

  return {
    setUser,
    user,
    login
  }
})

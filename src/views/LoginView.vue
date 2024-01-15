<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const form = ref({
  email: 'tyrel.pouros@example.net',
  password: 'password'
})
async function handleSubmit() {
  await auth.login(form.value)
  router.push('/')
}
</script>

<template>
  <main>
    <h1>Login</h1>
    <form class="space-y-2" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" />
      </div>

      <div class="flex flex-col">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" />
      </div>

      <div>
        <button class="bg-blue-500 hover:bg-blue-600 px-3 py-1.5 rounded text-white">Login</button>
      </div>
    </form>
  </main>
</template>

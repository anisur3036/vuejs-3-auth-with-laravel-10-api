<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
const auth = useAuthStore()
</script>

<template>
  <main>
    {{ auth.user }}
    <button @click="auth.setUser({ x: 1 })">Click me</button>
  </main>
</template>

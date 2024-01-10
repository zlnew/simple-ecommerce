<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { useAuthStore } from '@/stores/auth'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { user } = useAuthStore()

onBeforeMount(() => {
  if (user) {
    if (user.is_admin) {
      router.push('/admin/dashboard')
    } else {
      router.push('/')
    }
  }
})
</script>

<template>
  <div class="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
    <div class="min-h-screen flex flex-col items-center justify-center gap-6">
      <AppLogo text="Vue Commerce" />
      <main>
        <RouterView />
      </main>
      <footer>
        <p class="text-sm text-slate-500">Copyright {{ new Date().getFullYear() }} Vue Commerce. All rights reserved</p>
      </footer>
    </div>
  </div>
</template>

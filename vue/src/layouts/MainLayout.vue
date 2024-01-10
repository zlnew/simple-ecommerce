<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import ProfileDropdown from '@/components/ProfileDropdown.vue'
import { useAuthStore } from '@/stores/auth'
import { FwbButton } from 'flowbite-vue'

const { user } = useAuthStore()
</script>

<template>
  <div>
    <nav class="bg-white border-b">
      <div class="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div class="flex items-center justify-between gap-4">
          <AppLogo text="Vue Commerce" />

          <ProfileDropdown v-if="user" />

          <RouterLink v-else to="/auth/login">
            <FwbButton color="green">Log In</FwbButton>
          </RouterLink>
        </div>
      </div>
    </nav>
  
    <div class="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <main>
        <RouterView />
      </main>
    </div>
  
    <footer>
      <div class="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <p class="text-sm text-slate-500">Copyright {{ new Date().getFullYear() }} Vue Commerce. All rights reserved</p>
      </div>
    </footer>
  </div>
</template>

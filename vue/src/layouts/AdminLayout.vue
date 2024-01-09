<script setup lang="ts">
import AppLogo from '@/components/AppLogo.vue'
import { useAuthStore } from '@/stores/auth'
import { useSubmitStore } from '@/stores/submit'
import { FwbButton, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const submit = useSubmitStore()
const { user, logout } = useAuthStore()

const logoutHandler = async () => {
  await submit.execute(() => logout(), {
    onSuccess: () => {
      window.location.reload()
    }
  })
}

onBeforeMount(() => {
  if (!user) {
    router.push('/auth/login')
  }
})
</script>

<template>
  <div>
    <nav class="bg-white border-b">
      <div class="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div class="flex items-center justify-between gap-4">
          <AppLogo to="/admin/dashboard" text="Vue Commerce Admin" />

          <fwb-dropdown v-if="user">
            <template #trigger>
              <FwbButton color="light">{{ user.name }}</FwbButton>
            </template>
            
            <fwb-list-group>
              <fwb-list-group-item>
                Profile
              </fwb-list-group-item>
              <fwb-list-group-item class="cursor-pointer" @click="logoutHandler">
                Logout
              </fwb-list-group-item>
            </fwb-list-group>
          </fwb-dropdown>

          <RouterLink v-else to="/auth/login">
            <FwbButton color="green">Log In</FwbButton>
          </RouterLink>
        </div>
      </div>
    </nav>

    <header class="shadow-sm bg-white border-b">
      <div class="p-4 max-w-4xl mx-auto">
        <div class="flex justify-center gap-4">
          <RouterLink to="/admin/dashboard" class="tracking-widest" active-class="font-bold">
            Dashboard
          </RouterLink>
          <RouterLink to="/admin/products" class="tracking-widest" active-class="font-bold">
            Products
          </RouterLink>
        </div>
      </div>
    </header>
  
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

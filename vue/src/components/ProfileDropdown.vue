<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useSubmitStore } from '@/stores/submit'
import { FwbButton, FwbDropdown, FwbListGroup, FwbListGroupItem } from 'flowbite-vue'

const submit = useSubmitStore()
const { user, logout } = useAuthStore()

const logoutHandler = async () => {
  await submit.execute(() => logout(), {
    onSuccess: () => {
      window.location.reload()
    }
  })
}
</script>

<template>
  <FwbDropdown v-if="user">
    <template #trigger>
      <FwbButton color="light">{{ user.name }}</FwbButton>
    </template>
    
    <FwbListGroup>
      <FwbListGroupItem class="cursor-pointer" @click="logoutHandler">
        Logout
      </FwbListGroupItem>
    </FwbListGroup>
  </FwbDropdown>
</template>

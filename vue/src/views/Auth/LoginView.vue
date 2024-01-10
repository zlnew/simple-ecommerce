<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useSubmitStore } from '@/stores/submit'
import { FwbCard, FwbInput, FwbCheckbox, FwbButton, FwbAlert } from 'flowbite-vue'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const submit = useSubmitStore()
const { login } = useAuthStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const submitHandler = async () => {
  await submit.execute(() => login(form), {
    onSuccess: () => {
      window.location.reload()
    }
  })
}
</script>

<template>
  <FwbCard variant="image" class="w-80 md:w-96">
    <div class="p-5">
      <h5 class="text-xl font-bold tracking-tight">
        Log In to your account
      </h5>
    </div>

    <hr>
    
    <form @submit.prevent="submitHandler">
      <div class="p-5">
        <div class="space-y-4">
          <FwbAlert v-if="validationMessage" type="danger" closable>
            {{ validationMessage }}
          </FwbAlert>

          <FwbAlert
            v-if="$route.query.success"
            type="success"
            closable
            @close="$router.replace({ query: { success: undefined } })"
          >
            {{ $route.query.success }}
          </FwbAlert>

          <FwbInput
            v-model="form.email"
            type="email"
            placeholder="Email address"
            :validation-status="validationErrors?.email && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.email?.[0] }}
            </template>
          </FwbInput>
    
          <FwbInput
            v-model="form.password"
            type="password"
            placeholder="Password"
            :validation-status="validationErrors?.password && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.password?.[0] }}
            </template>
          </FwbInput>

          <FwbCheckbox
            v-model="form.remember"
            label="Remember Me"
          />

          <div class="flex justify-end">
            <RouterLink to="/auth/forgot-password" class="text-sm">
              Forgot your password?
            </RouterLink>
          </div>
        </div>
      </div>
      
      <hr>
      
      <div class="p-5">
        <div class="flex items-center justify-between gap-4">
          <RouterLink to="/auth/register" class="text-sm">Don't have an account?</RouterLink>
          <FwbButton type="submit" color="green" :disabled="processing">Log In</FwbButton>
        </div>
      </div>
    </form>
  </FwbCard>
</template>

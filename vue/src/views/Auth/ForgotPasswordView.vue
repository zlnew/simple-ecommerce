<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useSubmitStore } from '@/stores/submit'
import { FwbCard, FwbInput, FwbButton, FwbAlert } from 'flowbite-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const submit = useSubmitStore()
const { forgotPassword } = useAuthStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const email = ref<string>('')
const status = ref<string | null>(null)

const submitHandler = async () => {
  await submit.execute(() => forgotPassword(email.value), {
    onSuccess: (statusMessage) => {
      status.value = statusMessage
    }
  })
}
</script>

<template>
  <FwbCard variant="image" class="w-80 md:w-96">
    <div class="p-5">
      <h5 class="text-xl font-bold tracking-tight">
        Forgot your password?
      </h5>
    </div>

    <hr>

    <form @submit.prevent="submitHandler">
      <div class="p-5">
        <div class="space-y-4">
          <p className="text-sm text-slate-600">
            Let us know your email
            email address and we will email you a password reset link that
            that will allow you to choose a new one.
          </p>

          <FwbAlert v-if="validationMessage" type="danger" closable>
            {{ validationMessage }}
          </FwbAlert>

          <FwbAlert v-if="status" type="success" closable>
            {{ status }}
          </FwbAlert>

          <FwbInput
            v-model="email"
            placeholder="Enter your email address"
            :validation-status="validationErrors?.email && 'error'"
            required
          />
        </div>
      </div>
      
      <hr>
      
      <div class="p-5">
        <div class="flex items-center justify-between gap-4">
          <RouterLink to="/auth/login" class="text-sm">Back to login</RouterLink>
          <FwbButton type="submit" color="green" :disabled="processing">Request</FwbButton>
        </div>
      </div>
    </form>
  </FwbCard>
</template>

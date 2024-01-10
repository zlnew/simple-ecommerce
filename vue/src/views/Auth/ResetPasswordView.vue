<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useSubmitStore } from '@/stores/submit'
import { FwbCard, FwbInput, FwbButton, FwbAlert } from 'flowbite-vue'
import { storeToRefs } from 'pinia'
import { onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const submit = useSubmitStore()
const { resetPassword } = useAuthStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const form = reactive({
  token: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const submitHandler = async () => {
  await submit.execute(() => resetPassword(form), {
    onSuccess: (statusMessage) => {
      router.push(`/auth/login?success=${statusMessage}`)
    }
  })
}

onMounted(() => {
  if (typeof route.params.token === 'string') {
    form.token = route.params.token
  }

  if (typeof route.query.email === 'string') {
    form.email = route.query.email as string
  }
})
</script>

<template>
  <FwbCard variant="image" class="w-80 md:w-96">
    <div class="p-5">
      <h5 class="text-xl font-bold tracking-tight">
        Reset Password
      </h5>
    </div>

    <hr>

    <form @submit.prevent="submitHandler">
      <div class="p-5">
        <div class="space-y-4">
          <FwbAlert v-if="validationMessage" type="danger" closable>
            {{ validationMessage }}
          </FwbAlert>
          
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

          <FwbInput
            v-model="form.password_confirmation"
            type="password"
            placeholder="Confirm Password"
            :validation-status="validationErrors?.password_confirmation && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.password_confirmation?.[0] }}
            </template>
          </FwbInput>
        </div>
      </div>
      
      <hr>
      
      <div class="p-5">
        <div class="flex items-center justify-end">
          <FwbButton type="submit" color="green" :disabled="processing">Reset Password</FwbButton>
        </div>
      </div>
    </form>
  </FwbCard>
</template>

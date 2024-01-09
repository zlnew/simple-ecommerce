<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useSubmitStore } from '@/stores/submit'
import { FwbCard, FwbInput, FwbButton, FwbAlert } from 'flowbite-vue'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

const submit = useSubmitStore()
const { register } = useAuthStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const form = reactive({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const submitHandler = () => submit.execute(() => register(form))
</script>

<template>
  <fwb-card variant="image" class="w-80 md:w-96">
    <div class="p-5">
      <h5 class="text-xl font-bold tracking-tight">
        Register an account
      </h5>
    </div>

    <hr>

    <form @submit.prevent="submitHandler">
      <div class="p-5">
        <div class="space-y-4">
          <fwb-alert v-if="validationMessage" type="danger">
            {{ validationMessage }}
          </fwb-alert>
          
          <fwb-input
            v-model="form.name"
            placeholder="Full Name"
            :validation-status="validationErrors?.name && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.name?.[0] }}
            </template>
          </fwb-input>

          <fwb-input
            v-model="form.email"
            type="email"
            placeholder="Email address"
            :validation-status="validationErrors?.email && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.email?.[0] }}
            </template>
          </fwb-input>
    
          <fwb-input
            v-model="form.password"
            type="password"
            placeholder="Password"
            :validation-status="validationErrors?.password && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.password?.[0] }}
            </template>
          </fwb-input>

          <fwb-input
            v-model="form.password_confirmation"
            type="password"
            placeholder="Confirm Password"
            :validation-status="validationErrors?.password_confirmation && 'error'"
            required
          >
            <template #validationMessage>
              {{ validationErrors?.password_confirmation?.[0] }}
            </template>
          </fwb-input>
        </div>
      </div>
      
      <hr>
      
      <div class="p-5">
        <div class="flex items-center justify-between gap-4">
          <RouterLink to="/auth/login" class="text-sm">Already have an account?</RouterLink>
          <fwb-button type="submit" color="green" :disabled="processing">Register</fwb-button>
        </div>
      </div>
    </form>
  </fwb-card>
</template>

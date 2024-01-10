<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useSubmitStore } from '@/stores/submit'
import { FwbButton, FwbModal } from 'flowbite-vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  state: boolean
  productId: number | null
}>()
const emit = defineEmits(['close'])

const router = useRouter()
const submit = useSubmitStore()
const productStore = useProductStore()

const deleteHandler = async () => {
  const id = props.productId

  if (id) {
    await submit.execute(() => productStore.destroy(id), {
      onSuccess: (statusMessage) => {
        emit('close', id)
        router.push(`/admin/products?success=${statusMessage}`)
      }
    })
  }
}
</script>

<template>
  <FwbModal v-if="state" @close="$emit('close')" size="sm">
    <template #header>
      <div class="flex items-center text-lg">
        Delete Product Confirmation
      </div>
    </template>

    <template #body>
      <p class="text-base leading-relaxed text-gray-600">
        Are you sure want to delete this product?
      </p>
    </template>

    <template #footer>
      <div class="flex justify-between">
        <FwbButton @click="$emit('close')" color="light">
          Never mind
        </FwbButton>
        <FwbButton @click="deleteHandler" color="red">
          Delete
        </FwbButton>
      </div>
    </template>
  </FwbModal>
</template>

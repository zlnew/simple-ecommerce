<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { onMounted, reactive, ref } from 'vue'
import {
FwbAlert,
  FwbBreadcrumb,
  FwbBreadcrumbItem,
  FwbButton,
  FwbFileInput,
  FwbInput,
  FwbSelect,
FwbTextarea
} from 'flowbite-vue'
import { getProductCategories } from '@/utils'
import { useSubmitStore } from '@/stores/submit'
import { storeToRefs } from 'pinia'

const submit = useSubmitStore()
const productStore = useProductStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const categories = ref()

const form = reactive({
  name: '',
  description: '',
  price: 0,
  category: '',
  image: null
})

const submitHandler = () => {
  const formImage = form.image as any

  if (formImage instanceof File) {
    console.log(formImage)
    submit.execute(() => productStore.store({ ...form, image: formImage }), {
      onSuccess: () => {
        const statusMessage = 'Product created successfully'
        window.location.href = `/admin/products?success=${statusMessage}`
      }
    })
  }
}

onMounted(async () => {
  const products = await productStore.get()

  categories.value = getProductCategories(products).map(value => {
    return {
      value,
      name: value
    }
  })
})
</script>

<template>
  <div class="space-y-4">
    <FwbBreadcrumb>
      <FwbBreadcrumbItem home>
        <RouterLink to="/admin/dashboard">
          Vue Commerce Admin
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        <RouterLink to="/admin/products">
          Products
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        Create
      </FwbBreadcrumbItem>
    </FwbBreadcrumb>

    <hr>
    
    <div class="rounded-lg shadow-sm border bg-white">
      <div class="p-5">
        <form @submit.prevent="submitHandler">
          <div class="space-y-4">
            <FwbAlert v-if="validationMessage" type="danger">
              {{ validationMessage }}
            </FwbAlert>

            <FwbInput
              v-model="form.name"
              placeholder="Product Name"
              label="Name"
              :validation-status="validationErrors?.name && 'error'"
              required
            >
              <template #validationMessage>
                {{ validationErrors?.name?.[0] }}
              </template>
            </FwbInput>

            <!-- @vue-ignore -->
            <FwbInput
              v-model="form.price"
              type="number"
              placeholder="Product Price"
              label="Price"
              :validation-status="validationErrors?.price && 'error'"
              required
            >
              <template #validationMessage>
                {{ validationErrors?.price?.[0] }}
              </template>
            </FwbInput>

            <FwbSelect
              v-model="form.category"
              :options="categories"
              placeholder="Select Category"
              label="Category"
              :validation-status="validationErrors?.category && 'error'"
              required
            >
              <template #validationMessage>
                {{ validationErrors?.category?.[0] }}
              </template>
            </FwbSelect>

            <div></div>

            <FwbTextarea
              v-model="form.description"
              placeholder="Product Description"
              label="Description"
              :validation-status="validationErrors?.description && 'error'"
              required
            >
              <template #validationMessage>
                {{ validationErrors?.description?.[0] }}
              </template>
            </FwbTextarea>

            <FwbFileInput
              v-model="form.image"
              placeholder="Select Image"
              label="Image"
              :validation-status="validationErrors?.image && 'error'"
              required
            >
              <template #validationMessage>
                {{ validationErrors?.image?.[0] }}
              </template>
            </FwbFileInput>

            <hr>

            <div class="text-right">
              <FwbButton
                type="submit"
                color="green"
                size="lg"
                :disabled="processing"
              >
                Create
              </FwbButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

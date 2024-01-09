<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/product'
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
import { useRoute } from 'vue-router'

const route = useRoute()
const submit = useSubmitStore()
const productStore = useProductStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const product = ref<Product>()
const imagePreview = ref<string>()
const categories = ref()

const form = reactive({
  name: '',
  description: '',
  price: 0,
  category: '',
  image: null
})

const submitHandler = async () => {
  const productID = product.value?.id
  const formImage = form.image as any

  await submit.execute(() => productStore.update(productID ?? 0, { ...form, image: formImage }), {
    onSuccess: () => {
      const statusMessage = 'Product updated successfully'
      window.location.href = `/admin/products?success=${statusMessage}`
    }
  })
}

onMounted(async () => {
  const idParams = route.params.id
  const products = await productStore.get()

  if (typeof idParams === 'string') {
    product.value = products.find(item => item.id.toString() === idParams)    

    if (product.value) {
      Object.assign(form, {
        name: product.value.name,
        description: product.value.description,
        price: product.value.price,
        category: product.value.category,
        image: null
      })

      imagePreview.value = product.value.image
    }
  }

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
        <RouterLink to="/admin/dashboard" class="line-clamp-1">
          Vue Commerce Admin
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        <RouterLink to="/admin/products" class="line-clamp-1">
          Products
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        <p class="line-clamp-1">
          Edit
        </p>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        <p class="line-clamp-1">
          {{ product?.name }}
        </p>
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

              <p class="!mt-1 text-sm text-gray-500 dark:text-gray-300">
                PNG, JPG or JPEG (1:1 Ratio).
              </p>
            </FwbFileInput>

            <hr>

            <div class="text-right">
              <FwbButton
                type="submit"
                color="green"
                size="lg"
                :disabled="processing"
              >
                Update
              </FwbButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

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
import VueCard from '@/components/VueCard.vue'
import { getImagePreview, getProductCategories } from '@/utils'
import { useSubmitStore } from '@/stores/submit'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { apiBaseURL } from '@/lib/api'

const route = useRoute()
const router = useRouter()
const submit = useSubmitStore()
const productStore = useProductStore()
const { processing, validationMessage, validationErrors } = storeToRefs(submit)

const product = ref<Product>()
const categories = ref()
const imagePreview = ref('')

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
    onSuccess: (result) => {
      router.push(`/admin/products?success=${result.status}`)
    }
  })
}

async function handleFileChange (value: File) {  
  try {
    imagePreview.value = await getImagePreview(value)
  } catch (error: any) {
    console.error("Error:", error.message)
  }
}

onMounted(async () => {
  const idParam = route.params.id
  const products = await productStore.get({})

  if (typeof idParam === 'string') {
    product.value = products.find(item => item.id.toString() === idParam)    

    if (product.value) {
      Object.assign(form, {
        name: product.value.name,
        description: product.value.description,
        price: product.value.price,
        category: product.value.category,
        image: null
      })

      imagePreview.value = `${apiBaseURL}${product.value.image}`
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
    
    <VueCard>
      <div class="p-5">
        <div class="grid md:grid-cols-3 gap-4 md:gap-8">
          <div>
            <img
              v-if="!imagePreview"
              src="https://placehold.co/600x600?text=Image Preview"
              alt="Image Preview Placeholder"
            >
            <img
              v-else
              :src="imagePreview"
              alt="Image Preview"
            >
          </div>

          <hr class="md:hidden">

          <form @submit.prevent="submitHandler" class="md:col-span-2">
            <div class="space-y-4">
              <FwbAlert v-if="validationMessage" type="danger" closable>
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
    
              <div class="grid grid-cols-3 items-end gap-2">
                <FwbSelect
                  v-model="form.category"
                  :options="categories"
                  placeholder="Select Category"
                  label="Category"
                  :validation-status="validationErrors?.category && 'error'"
                  required
                />
  
                <div class="col-span-2">
                  <FwbInput
                    v-model="form.category"
                    placeholder="Or input category"
                    :validation-status="validationErrors?.category && 'error'"
                    required
                  />
                </div>
              </div>
    
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
                @update:model-value="handleFileChange"
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
    </VueCard>
  </div>
</template>

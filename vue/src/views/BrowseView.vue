<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/product'
import { Rp, getProductCategories } from '@/utils'
import { FwbBreadcrumb, FwbBreadcrumbItem, FwbCard, FwbInput, FwbSelect } from 'flowbite-vue'
import { onMounted, ref } from 'vue'

const apiBaseURL = import.meta.env.VITE_API_URL

const productStore = useProductStore()

const products = ref<Product[] | null>(null)
const categories = ref()

const search = ref()
const category = ref()

async function getProducts () {
  const searchQuery = search.value
  const categoryQuery = category.value

  return productStore.get({
    search: searchQuery,
    category: categoryQuery
  })
}

async function handleSearch () {
  products.value = await getProducts()
}

onMounted(async () => {
  products.value = await getProducts()

  categories.value = getProductCategories(products.value).map(value => {
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
        <RouterLink to="/">
          Home
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
          Browse
      </FwbBreadcrumbItem>
    </FwbBreadcrumb>

    <hr>

    <div class="rounded-lg shadow-sm border bg-white">
      <div class="p-5">
        <div class="grid md:grid-cols-5 items-center gap-2">
          <div class="col-span-1">
            <FwbSelect
              v-model="category"
              :options="categories"
              placeholder="By Category"
              @update:model-value="handleSearch"
            />
          </div>
          <div class="col-span-4">
            <FwbInput
              v-model="search"
              placeholder="Search products..."
              @keyup.enter="handleSearch"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="min-h-96">
      <div v-if="!products" class="min-h-96 h-full flex items-center justify-center">
        Getting products...
      </div>

      <div v-else-if="!products.length" class="min-h-96 h-full flex items-center justify-center">
        No products were found
      </div>

      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <RouterLink v-for="product in products" :key="product.id" :to="`/product/${product.id}`">
          <FwbCard
            :key="product.id"
            :img-alt="product.name"
            :img-src="`${apiBaseURL}${product.image}`"
            variant="image"
            class="shadow-sm"
          >
            <div class="p-2">
              <h5 class="mb-2 font-bold tracking-tight line-clamp-2">
                {{ product.name }}
              </h5>
              <p class="font-normal text-gray-700 dark:text-gray-400">
                {{ Rp(product.price) }}
              </p>
            </div>
          </FwbCard>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

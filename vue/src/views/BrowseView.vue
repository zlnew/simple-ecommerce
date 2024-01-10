<script setup lang="ts">
import VueCard from '@/components/VueCard.vue'
import { apiBaseURL } from '@/lib/api'
import { useProductStore, type Product } from '@/stores/product'
import { Rp, getProductCategories } from '@/utils'
import { FwbBreadcrumb, FwbBreadcrumbItem, FwbButton, FwbCard, FwbInput, FwbRange, FwbSelect } from 'flowbite-vue'
import { onMounted, ref } from 'vue'

const productStore = useProductStore()

const products = ref<Product[] | null>(null)
const categories = ref()
const priceMinRange = ref(0)
const priceMaxRange = ref(0)

const search = ref()
const category = ref()
const priceMin = ref(0)
const priceMax = ref(0)

async function getProducts () {
  const searchQuery = search.value
  const categoryFilter = category.value
  const priceMinFilter = priceMin.value
  const priceMaxFilter = priceMax.value

  return productStore.get({
    search: searchQuery,
    filters: {
      category: categoryFilter,
      price_min: priceMinFilter,
      price_max: priceMaxFilter
    }
  })
}

async function handleSearch () {
  products.value = await getProducts()
}

onMounted(async () => {
  products.value = await getProducts()

  categories.value = [
    {
      name: 'All',
      value: undefined
    },
    ...getProductCategories(products.value).map(value => {
      return {
        value,
        name: value
      }
    })
  ]

  priceMax.value = products.value.reduce((maxPrice, product) => {
    return product.price > maxPrice ? product.price : maxPrice
  }, 0)

  priceMaxRange.value = priceMax.value
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

    <VueCard>
      <div class="p-5 space-y-5">
        <div class="grid md:grid-cols-5 items-center gap-5">
          <div class="col-span-1">
            <FwbSelect
              v-model="category"
              :options="categories"
              placeholder="By Category"
              @update:model-value="handleSearch"
            />
          </div>
          
          <div class="col-span-4">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <FwbRange
                  v-model="priceMin"
                  :steps="1000"
                  :min="priceMinRange"
                  :max="priceMax"
                  label="Price Minimum"
                />
                {{ Rp(priceMin) }}
              </div>
              <div>
                <FwbRange
                  v-model="priceMax"
                  :steps="1000"
                  :min="priceMin"
                  :max="priceMaxRange"
                  label="Price Maximum"
                />
                {{ Rp(priceMax) }}
              </div>
            </div>
          </div>
        </div>
  
        <hr>
  
        <div class="text-right">
          <FwbButton color="light" @click="handleSearch">Apply Filter</FwbButton>
        </div>
      </div>
    </VueCard>

    <FwbInput
      v-model="search"
      placeholder="Search products..."
      class="bg-white"
      @keyup.enter="handleSearch"
    />

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

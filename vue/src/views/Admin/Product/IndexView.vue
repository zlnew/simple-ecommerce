<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/product'
import { onMounted, ref } from 'vue'
import {
  FwbAlert,
  FwbBreadcrumb,
  FwbBreadcrumbItem,
  FwbButton,
  FwbInput,
  FwbRange,
  FwbSelect,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow
} from 'flowbite-vue'
import { Rp, getProductCategories } from '@/utils'
import VueCard from '@/components/VueCard.vue'
import DeleteProductModal from '@/components/Modals/DeleteProductModal.vue'

const productStore = useProductStore()

const products = ref<Product[] | null>(null)
const categories = ref()
const priceMinRange = ref(0)
const priceMaxRange = ref(0)

const search = ref()
const category = ref()
const priceMin = ref(0)
const priceMax = ref(0)

const deleteModalState = ref(false)
const productIDtoDelete = ref<number | null>(null)

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

function openDeleteModal (id: number) {
  productIDtoDelete.value = id
  deleteModalState.value = true
}

function closeDeleteModal (deletedID: number) {
  productIDtoDelete.value = null
  deleteModalState.value = false

  const filteredProducts = products.value?.filter(item => item.id !== deletedID)

  if (filteredProducts) {
    products.value = filteredProducts
  }
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
        <RouterLink to="/admin/dashboard">
          Vue Commerce Admin
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        Products
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

    <VueCard>
      <div class="p-5 space-y-5">
        <div class="flex items-center justify-between gap-4">
          <h5 class="text-lg font-bold tracking-tight">Table of Product</h5>
          <RouterLink to="/admin/products/create">
            <FwbButton color="green">New Product</FwbButton>
          </RouterLink>
        </div>
  
        <hr>
  
        <FwbAlert
          v-if="$route.query.success"
          type="success"
          closable
          @close="$router.replace({ query: { success: undefined } })"
        >
          {{ $route.query.success }}
        </FwbAlert>

        <div v-if="!products" class="min-h-96 h-full flex items-center justify-center">
          Getting products...
        </div>

        <div v-else-if="!products.length" class="min-h-96 h-full flex items-center justify-center">
          No products were found
        </div>
        
        <FwbTable v-else hoverable class="border-none shadow-sm">
          <FwbTableHead>
            <FwbTableHeadCell>Product name</FwbTableHeadCell>
            <FwbTableHeadCell>Category</FwbTableHeadCell>
            <FwbTableHeadCell>Price</FwbTableHeadCell>
            <FwbTableHeadCell>
              <span class="sr-only">Edit</span>
            </FwbTableHeadCell>
          </FwbTableHead>
    
          <FwbTableBody>
            <FwbTableRow v-for="product in products" :key="product.id">
              <FwbTableCell>{{ product.name }}</FwbTableCell>
              <FwbTableCell>{{ product.category }}</FwbTableCell>
              <FwbTableCell>{{ Rp(product.price) }}</FwbTableCell>
              <FwbTableCell>
                <div class="flex gap-2">
                  <RouterLink :to="`/admin/products/edit/${product.id}`">
                    Edit
                  </RouterLink>
                  <span class="cursor-pointer" @click="openDeleteModal(product.id)">
                    Delete
                  </span>
                </div>
              </FwbTableCell>
            </FwbTableRow>
          </FwbTableBody>
        </FwbTable>
      </div>
    </VueCard>

    <DeleteProductModal
      :state="deleteModalState"
      :product-id="productIDtoDelete"
      @close="closeDeleteModal"
    />
  </div>
</template>
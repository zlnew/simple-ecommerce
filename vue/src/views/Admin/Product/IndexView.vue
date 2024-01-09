<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/product'
import { onMounted, ref } from 'vue'
import {
  FwbAlert,
  FwbBreadcrumb,
  FwbBreadcrumbItem,
  FwbButton,
  FwbInput,
  FwbSelect,
  FwbTable,
  FwbTableBody,
  FwbTableCell,
  FwbTableHead,
  FwbTableHeadCell,
  FwbTableRow
} from 'flowbite-vue'
import { Rp, getProductCategories } from '@/utils'
import { useSubmitStore } from '@/stores/submit'

const submit = useSubmitStore()
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

const deleteHandler = async (id: number) => {
  const status = confirm('Are you sure want to delete this product?')

  if (status) {
    await submit.execute(() => productStore.destroy(id), {
      onSuccess: () => {
        const statusMessage = 'Product deleted successfully'
        window.location.href = `/admin/products?success=${statusMessage}`
      }
    })
  }
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
        <RouterLink to="/admin/dashboard">
          Vue Commerce Admin
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        Products
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

    <div class="rounded-lg shadow-sm border bg-white">
      <div class="p-5 space-y-5">
        <div class="flex items-center justify-between gap-4">
          <h5 class="text-lg font-bold tracking-tight">Table of Product</h5>
          <RouterLink to="/admin/products/create">
            <FwbButton color="green">New Product</FwbButton>
          </RouterLink>
        </div>
 
        <hr>

        <FwbAlert v-if="$route.query.success" type="success">
          {{ $route.query.success }}
        </FwbAlert>
        
        <fwb-table hoverable class="border-none shadow-sm">
          <fwb-table-head>
            <fwb-table-head-cell>Product name</fwb-table-head-cell>
            <fwb-table-head-cell>Category</fwb-table-head-cell>
            <fwb-table-head-cell>Price</fwb-table-head-cell>
            <fwb-table-head-cell>
              <span class="sr-only">Edit</span>
            </fwb-table-head-cell>
          </fwb-table-head>
    
          <fwb-table-body>
            <fwb-table-row v-for="product in products" :key="product.id">
              <fwb-table-cell>{{ product.name }}</fwb-table-cell>
              <fwb-table-cell>{{ product.category }}</fwb-table-cell>
              <fwb-table-cell>{{ Rp(product.price) }}</fwb-table-cell>
              <fwb-table-cell>
                <div class="flex gap-2">
                  <RouterLink :to="`/admin/products/edit/${product.id}`">
                    Edit
                  </RouterLink>
                  <span class="cursor-pointer" @click="deleteHandler(product.id)">Delete</span>
                </div>
              </fwb-table-cell>
            </fwb-table-row>
          </fwb-table-body>
        </fwb-table>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useProductStore, type Product } from '@/stores/product'
import { Rp } from '@/utils'
import {
  FwbBreadcrumb,
  FwbBreadcrumbItem,
  FwbButton,
  FwbInput,
  FwbAccordion,
  FwbAccordionContent,
  FwbAccordionHeader,
  FwbAccordionPanel
} from 'flowbite-vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const appName = import.meta.env.VITE_APP_NAME
const apiBaseURL = import.meta.env.VITE_API_URL

const route = useRoute()
const productStore = useProductStore()

const product = ref<Product | null>(null)

async function getProduct () {
  const productID = route.params.id as unknown as number

  return productStore.show(productID)
}

onMounted(async () => {
  product.value = await getProduct()

  document.title = `${product.value.name} | ${appName}`
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
        <RouterLink to="/browse">
          Product
        </RouterLink>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem v-if="product">
        <p class="line-clamp-1">
          {{ product?.category }}
        </p>
      </FwbBreadcrumbItem>

      <FwbBreadcrumbItem>
        <p class="line-clamp-1">
          {{ product?.name || 'Product not found' }}
        </p>
      </FwbBreadcrumbItem>
    </FwbBreadcrumb>

    <hr>

    <div v-if="product === null" class="min-h-96 flex items-center justify-center">
      Product not found
    </div>

    <div v-else class="rounded-lg shadow-sm border bg-white">
      <div class="p-5">
        <div class="grid md:grid-cols-2 gap-4 md:gap-8">
          <div>
            <img :src="`${apiBaseURL}${product.image}`" :alt="product.image">
          </div>
    
          <div class="space-y-6">
            <div class="space-y-2">
              <h1 class="font-bold text-3xl">{{ product.name }}</h1>
              <FwbButton color="light" size="xs">
                {{ product.category }} Category
              </FwbButton>
            </div>
            
            <p class="text-2xl">{{ Rp(product.price) }}</p>
    
            <div class="grid grid-cols-3 items-center gap-2">
              <div>
                <FwbInput model-value="1" type="number" placeholder="Qty" />
              </div>
              <div class="col-span-2">
                <FwbButton size="lg" color="green" class="w-full">Add to cart</FwbButton>
              </div>
            </div>
    
            <hr>
            
            <fwb-accordion always-open>
              <fwb-accordion-panel>
                <fwb-accordion-header>Description</fwb-accordion-header>
                <fwb-accordion-content>
                  <div class="space-y-4">
                    <p>{{ product.description }}</p>
                  </div>
                </fwb-accordion-content>
              </fwb-accordion-panel>
    
              <fwb-accordion-panel>
                <fwb-accordion-header>Return & Refund Policy</fwb-accordion-header>
                <fwb-accordion-content>
                  <div>
                    <p>I'm a Return and Refund policy. I'm a great place to let your customers know what to do in case they are dissatisfied with their purchase. Having a straightforward refund or exchange policy is a great way to build trust and reassure your customers that they can buy with confidence.</p>
                  </div>
                </fwb-accordion-content>
              </fwb-accordion-panel>
              
              <fwb-accordion-panel>
                <fwb-accordion-header>Shipping Info</fwb-accordion-header>
                <fwb-accordion-content>
                  <div>
                    <p>I'm a shipping policy. I'm a great place to add more information about your shipping methods, packaging and cost. Providing straightforward information about your shipping policy is a great way to build trust and reassure your customers that they can buy from you with confidence.</p>
                  </div>
                </fwb-accordion-content>
              </fwb-accordion-panel>
            </fwb-accordion>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

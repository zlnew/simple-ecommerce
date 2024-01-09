<script setup lang="ts">
import { FwbBreadcrumb, FwbBreadcrumbItem, FwbCard } from 'flowbite-vue'
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
        Dashboard
      </FwbBreadcrumbItem>
    </FwbBreadcrumb>

    <hr>
    
    <FwbCard variant="image" class="shadow-sm">
      <div class="p-5 w-full">
        <h1>Welcome to Vue Commerce Dashboard, you can manage your store here</h1>
      </div>
    </FwbCard>
  </div>
</template>

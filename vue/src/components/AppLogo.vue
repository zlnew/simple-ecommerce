<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    to?: RouteLocationRaw
    sizeClass?: string
  }>(), {
    to: '/',
    sizeClass: 'w-10 h-10'
  }
)
</script>

<template>
  <RouterLink :to="to">
    <img
      alt="App logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
      :class="sizeClass"
    />
  </RouterLink>
</template>

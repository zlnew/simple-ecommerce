<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

withDefaults(
  defineProps<{
    text?: string
    to?: RouteLocationRaw
    sizeClass?: string
  }>(), {
    to: '/',
    sizeClass: 'w-10 h-10'
  }
)
</script>

<template>
  <RouterLink :to="to" class="flex items-center gap-2">
    <img
      alt="App logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
      :class="sizeClass"
    />
    <strong v-if="text" class="hidden md:block text-xl">
      {{ text }}
    </strong>
  </RouterLink>
</template>

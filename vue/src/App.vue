<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppLogo from './components/AppLogo.vue'
</script>

<template>
  <header>
    <AppLogo />

    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

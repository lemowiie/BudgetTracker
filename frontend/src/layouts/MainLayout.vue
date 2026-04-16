<template>
  <div class="layout">
    <AppSidebar />
    <div class="layout-main">
      <AppNavbar />
      <main class="layout-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import AppSidebar from '../components/ui/AppSidebar.vue';
import AppNavbar from '../components/ui/AppNavbar.vue';
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
  background: #020617;
}
.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.layout-content {
  padding: 1.5rem;
}
</style>

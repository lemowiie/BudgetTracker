<template>
  <div :class="['layout']">
    <AppSidebar :class="{ hidden: collapsed }" />

    <div class="layout-main">
      <AppNavbar @toggleSidebar="collapsed = !collapsed" />

      <main class="layout-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppSidebar from '../components/ui/AppSidebar.vue';
import AppNavbar from '../components/ui/AppNavbar.vue';

const collapsed = ref(false);
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

.hidden {
  display: none;
}


.layout-content {
  padding: 1.5rem;
}
</style>

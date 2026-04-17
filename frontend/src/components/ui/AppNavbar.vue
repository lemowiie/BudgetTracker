<template>
  <header class="navbar">
    <button class="toggle-btn" @click="$emit('toggleSidebar')">
      ☰
    </button>

    <h1>BudgetTracker</h1>
    <button class="logout" @click="logout">Déconnexion</button>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const logout = () => {
  localStorage.removeItem('token');
  router.push({ name: 'login' });
};
</script>

<style scoped>
.toggle-btn {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.4rem;
  cursor: pointer;
  margin-right: 1rem;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #1f2937;
  background: #020617;
}
.logout {
  background: #ef4444;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  cursor: pointer;
}
</style>

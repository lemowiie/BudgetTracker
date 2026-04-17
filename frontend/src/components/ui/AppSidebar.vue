<template>
    <aside :class="['sidebar']">

    <div class="logo">BT</div>
    <nav>
      <RouterLink to="/" class="link" active-class="active">Dashboard</RouterLink>
      <RouterLink to="/transactions" class="link" active-class="active">Transactions</RouterLink>
      <RouterLink to="/savings-goals" class="link" active-class="active">Objectifs</RouterLink>
    </nav>
  </aside>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>



<style scoped>
.sidebar {
  width: 220px;
  background: #020617;
  border-right: 1px solid #1f2937;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: width 0.25s ease;
}


.logo {
  font-weight: 700;
  font-size: 1.4rem;
}
.link {
  display: block;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  color: #9ca3af;
  text-decoration: none;
}
.link.active {
  background: #111827;
  color: #f9fafb;
}
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>

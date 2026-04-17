<template>
  <MainLayout>
    <section class="grid">
      <div class="card">
        <h2>Vue d’ensemble</h2>
        <BalanceChart :incomes="incomes" :expenses="expenses" />
      </div>
      <div class="card">
        <h2>Objectifs</h2>
        <ul>
          <li v-for="goal in goals" :key="goal._id">
            <strong>{{ goal.title }}</strong>
            <span>{{ goal.progressPercent }}%</span>
          </li>
        </ul>
      </div>
    </section>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import BalanceChart from '../components/charts/BalanceChart.vue';
import { getTransactions } from '../services/transactions';
import { getObjectifs } from '../services/savings';

const incomes = ref(0);
const expenses = ref(0);
const goals = ref([]);

onMounted(async () => {
  const { data: txs } = await getTransactions();
  incomes.value = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  expenses.value = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  const { data: g } = await getObjectifs();
  goals.value = g;
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1.2fr);
  gap: 1.5rem;
}
.card {
  background: #020617;
  border-radius: 1rem;
  border: 1px solid #1f2937;
  padding: 1.25rem;
}
@media (max-width: 900px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>

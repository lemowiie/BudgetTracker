<template>
<MainLayout>
  <div class="transactions-page">
    <div class="header">
        <h1 class="title">Transactions</h1>

        <button class="add-btn" @click="showForm = !showForm">
            {{ showForm ? "Fermer" : "Ajouter une transaction" }}
        </button>
    </div>

    <div :class="['grid', showForm ? 'single' : '']">
        <TransactionForm
            v-if="showForm"
            @created="handleCreated"
        />

        <TransactionList
            v-if="!showForm"
            :transactions="transactions"
            @deleted="loadTransactions"
        />

    </div>
  </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import { getTransactions } from '../services/transactions';
import TransactionForm from '../components/transactions/TransactionForm.vue';
import TransactionList from '../components/transactions/TransactionList.vue';

const transactions = ref([]);
const showForm = ref(false);

const loadTransactions = async () => {
  const { data } = await getTransactions();
  transactions.value = data.transactions;
};

const handleCreated = () => {
  showForm.value = false;
  loadTransactions();
};

onMounted(loadTransactions);
</script>

<style scoped>
.transactions-page {
  padding: 1.5rem;
  color: #e5e7eb;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.title {
  font-size: 1.8rem;
}

.add-btn {
  background: #4f46e5;
  padding: 0.6rem 1rem;
  border-radius: 0.5rem;
  border: none;
  color: white;
  cursor: pointer;
}

.grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  gap: 2rem;
}

.grid.single {
  grid-template-columns: 1fr !important;
}


</style>

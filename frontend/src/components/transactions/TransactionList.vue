<template>
  <div class="list card">
    <h2>Liste des transactions</h2>

    <div v-if="transactions.length === 0" class="empty">
      Aucune transaction pour le moment.
    </div>

    <ul v-else>
      <li v-for="t in transactions" :key="t._id" class="item">
        <div class="info">
          <span class="label">{{ t.category }}</span>
          <span class="desc">{{ t.description }}</span>
        </div>

        <div class="meta">
          <span :class="t.type === 'income' ? 'income' : 'expense'">
            {{ t.type === 'income' ? '+' : '-' }}{{ t.amount }} €
          </span>
          <span class="date">{{ new Date(t.date).toLocaleDateString() }}</span>
        </div>

        <button class="delete" @click="remove(t._id)">✕</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { deleteTransaction } from '../../services/transactions';

const props = defineProps({
  transactions: Array
});

const emit = defineEmits(['deleted']);

const remove = async (id) => {
  await deleteTransaction(id);
  emit('deleted');
};
</script>

<style scoped>
.card {
  background: #0f172a;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
}

.list h2 {
  margin-bottom: 1rem;
}

.item {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid #1e293b;
}

.label {
  font-weight: 600;
}

.desc {
  font-size: 0.85rem;
  opacity: 0.7;
}

.meta {
  text-align: right;
  margin-right: 1rem;
}

.income {
  color: #22c55e;
}

.expense {
  color: #ef4444;
}

.date {
  font-size: 0.8rem;
  opacity: 0.7;
}

.delete {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1.2rem;
}

.empty {
  opacity: 0.7;
  padding: 1rem 0;
}
</style>

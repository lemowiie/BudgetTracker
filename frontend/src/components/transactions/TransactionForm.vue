<template>
  <form class="card" @submit.prevent="submit">
    <h2>Ajouter une transaction</h2>

    <div class="field">
      <label>Type</label>
      <select v-model="type" required>
        <option value="income">Entrée</option>
        <option value="expense">Sortie</option>
      </select>
    </div>

    <div class="field">
      <label>Montant</label>
      <input type="number" v-model="amount" required min="0.01" step="0.01" />
    </div>

    <div class="field">
      <label>Catégorie</label>
      <select v-model="category" required>
        <option disabled value="">Choisir une catégorie</option>
        <option
          v-for="c in categories"
          :key="c._id"
          :value="c.name"
        >
          {{ c.name }}
        </option>
      </select>
    </div>

    <div class="field">
      <label>Description</label>
      <input type="text" v-model="description" maxlength="200" />
    </div>

    <div class="field">
      <label>Date</label>
      <input type="date" v-model="date" required />
    </div>

    <button type="submit" class="btn">Ajouter</button>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createTransaction } from '../../services/transactions';
import { getCategories } from '../../services/categories';

const emit = defineEmits(['created']);

const type = ref('expense');
const amount = ref('');
const category = ref('');
const description = ref('');
const date = ref(new Date().toISOString().split('T')[0]);

const categories = ref([]);

const loadCategories = async () => {
  const { data } = await getCategories();
  categories.value = data.categories;
};

const submit = async () => {
  await createTransaction({
    type: type.value,
    amount: Number(amount.value),
    category: category.value,
    description: description.value,
    date: date.value
  });

  amount.value = '';
  category.value = '';
  description.value = '';

  emit('created');
};

onMounted(loadCategories);
</script>

<style scoped>
.card {
  background: #0f172a;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input, select {
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  background: #1e293b;
  color: #e5e7eb;
}

.btn {
  width: 100%;
  padding: 0.7rem;
  background: #4f46e5;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
}
</style>

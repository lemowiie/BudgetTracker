<template>
  <form class="card" @submit.prevent="submit">
    <h2>Nouvel objectif</h2>

    <div class="field">
      <label>Titre</label>
      <input v-model="title" required />
    </div>

    <div class="field">
      <label>Montant cible</label>
      <input type="number" v-model="targetAmount" required min="1" />
    </div>

    <div class="field">
      <label>Description</label>
      <input v-model="description" maxlength="200" />
    </div>

    <div class="field">
      <label>Date limite</label>
      <input type="date" v-model="deadline" required />
    </div>

    <button class="btn">Créer</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { createObjectif } from '../../services/savings';

const emit = defineEmits(['created']);

const title = ref('');
const targetAmount = ref('');
const description = ref('');
const deadline = ref(new Date().toISOString().split('T')[0]);

const submit = async () => {
  await createObjectif({
    title: title.value,
    targetAmount: Number(targetAmount.value),
    description: description.value,
    deadline: deadline.value
  });

  emit('created');
};
</script>

<style scoped>
.card {
  background: #0f172a;
  padding: 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
  margin-bottom: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

input {
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

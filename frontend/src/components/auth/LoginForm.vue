<template>
  <form @submit.prevent="submit">
    <div class="field">
      <label>Email</label>
      <input v-model="email" type="email" required />
    </div>
    <div class="field">
      <label>Mot de passe</label>
      <input v-model="password" type="password" required />
    </div>
    <button type="submit" :disabled="loading">
      {{ loading ? 'Connexion...' : 'Se connecter' }}
    </button>
    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { login } from '../../services/auth';

const emit = defineEmits(['success']);

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const submit = async () => {
  loading.value = true;
  error.value = '';
  try {
    const { data } = await login(email.value, password.value);
    localStorage.setItem('token', data.token);
    emit('success');
  } catch (e) {
    error.value = e.response?.data?.message || 'Erreur de connexion';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
input {
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #374151;
  background: #020617;
  color: #e5e7eb;
}
button {
  width: 100%;
  padding: 0.6rem;
  border-radius: 999px;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}
.error {
  margin-top: 0.5rem;
  color: #f97373;
  font-size: 0.85rem;
}
</style>

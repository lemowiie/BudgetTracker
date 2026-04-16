<template>
  <div class="auth-page">
    <div class="card">
      <h2>Inscription</h2>

      <RegisterForm @success="onSuccess" />

      <p class="switch">
        Déjà un compte ?
        <RouterLink to="/login">Connexion</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useRouter, RouterLink } from 'vue-router';
import RegisterForm from '../components/auth/RegisterForm.vue';

const router = useRouter();

const onSuccess = () => {
  router.push({ name: 'dashboard' });
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle at top, #1f2937, #020617);
}
.card {
  background: #020617;
  border: 1px solid #1f2937;
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 380px;
}
.switch {
  margin-top: 1rem;
  font-size: 0.9rem;
}
</style>

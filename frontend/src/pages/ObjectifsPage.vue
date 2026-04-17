<template>
  <MainLayout>
    <div class="objectifs-page">
      <div class="header">
        <h1 class="title">Objectifs d'épargne</h1>

        <button class="add-btn" @click="showForm = !showForm">
          {{ showForm ? "Fermer" : "Ajouter un objectif" }}
        </button>
      </div>

      <ObjectifForm
        v-if="showForm"
        @created="handleCreated"
      />

      <div class="list">
        <ObjectifCard
          v-for="o in objectifs"
          :key="o._id"
          :objectif="o"
          @deleted="loadObjectifs"
        />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import MainLayout from '../layouts/MainLayout.vue';
import { getObjectifs } from '../services/savings';
import ObjectifForm from '../components/savings/ObjectifForm.vue';
import ObjectifCard from '../components/savings/ObjectifCard.vue';

const objectifs = ref([]);
const showForm = ref(false);

const loadObjectifs = async () => {
  const { data } = await getObjectifs();
  objectifs.value = data.objectifs;
};

const handleCreated = () => {
  showForm.value = false;
  loadObjectifs();
};

onMounted(loadObjectifs);
</script>

<style scoped>
.objectifs-page {
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

.list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}
</style>

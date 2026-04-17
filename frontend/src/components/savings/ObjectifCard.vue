<template>
  <div class="card">
    <div class="top">
      <h3>{{ objectif.title }}</h3>

      <span
        class="status"
        :class="{
          success: objectif.isCompleted,
          danger: isLate && !objectif.isCompleted,
          progress: !objectif.isCompleted && !isLate
        }"
      >
        {{ statusLabel }}
      </span>
    </div>

    <p class="desc">{{ objectif.description }}</p>

    <div class="progress-container">
      <div class="progress-bar">
        <div
          class="progress-fill"
          :style="{ width: objectif.progressPercent + '%' }"
        ></div>
      </div>

      <div class="numbers">
        <span>{{ objectif.currentAmount }} €</span>
        <span>{{ objectif.targetAmount }} €</span>
      </div>
    </div>

    <div class="footer">
      <span class="deadline">
        Deadline : {{ new Date(objectif.deadline).toLocaleDateString() }}
      </span>

      <button class="delete" @click="remove(objectif._id)">✕</button>
    </div>
  </div>
</template>

<script setup>
import { deleteObjectif } from '../../services/savings';

const props = defineProps({
  objectif: Object
});

const emit = defineEmits(['deleted']);

const isLate = new Date(props.objectif.deadline) < new Date();

const statusLabel = computed(() => {
  if (props.objectif.isCompleted) return "Atteint";
  if (isLate) return "En retard";
  return "En cours";
});

const remove = async (id) => {
  await deleteObjectif(id);
  emit('deleted');
};
</script>

<style scoped>
.card {
  background: #0f172a;
  padding: 1.2rem;
  border-radius: 0.75rem;
  border: 1px solid #1e293b;
}

.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 0.8rem;
}

.status.success {
  background: #22c55e33;
  color: #22c55e;
}

.status.danger {
  background: #ef444433;
  color: #ef4444;
}

.status.progress {
  background: #3b82f633;
  color: #3b82f6;
}

.desc {
  opacity: 0.7;
  margin: 0.5rem 0 1rem;
}

.progress-container {
  margin-bottom: 1rem;
}

.progress-bar {
  height: 10px;
  background: #1e293b;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4f46e5;
  transition: width 0.3s ease;
}

.numbers {
  display: flex;
  justify-content: space-between;
  margin-top: 0.3rem;
  font-size: 0.85rem;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deadline {
  opacity: 0.7;
  font-size: 0.85rem;
}

.delete {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  font-size: 1.2rem;
}
</style>

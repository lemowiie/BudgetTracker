<script setup>
import { Bar } from 'vue-chartjs';
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const props = defineProps({
  incomes: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 }
});

const data = {
  labels: ['Entrées', 'Sorties'],
  datasets: [
    {
      label: 'Montant',
      data: [props.incomes, props.expenses],
      backgroundColor: ['#22c55e', '#ef4444']
    }
  ]
};

const options = {
  responsive: true,
  maintainAspectRatio: false
};
</script>

<template>
  <div style="height: 260px;">
    <Bar :data="data" :options="options" />
  </div>
</template>

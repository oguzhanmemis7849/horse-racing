<script setup lang="ts">
import HorseList from '@/components/HorseListComponent.vue'
import RaceTrackComponent from '@/components/RaceTrackComponent.vue'
</script>

<template>
  <div class="grid-container">
    <HorseList class="grid-item horse-list" />
    <RaceTrackComponent class="grid-item race-track" />
    <div class="grid-item race-results">Yaris Sonuclari</div>
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  gap: 2rem;

  @media (max-width: 768px) {
    // Small devices
    grid-template-columns: 1fr;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    // Medium devices
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto auto;
  }

  @media (min-width: 1025px) {
    // Large devices
    grid-template-columns: repeat(12, 1fr);
  }
}

.grid-item {
  background-color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
}

.horse-list {
  @media (min-width: 1025px) {
    grid-column: span 3;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-column: span 4;
    grid-row: 1;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
}

.race-track {
  @media (min-width: 1025px) {
    grid-column: span 6;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-column: span 4;
    grid-row: 2;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
}

.race-results {
  @media (min-width: 1025px) {
    grid-column: span 3;
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    grid-column: span 4;
    grid-row: 3;
  }

  @media (max-width: 768px) {
    grid-column: span 1;
  }
}
</style>

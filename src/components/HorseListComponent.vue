<script setup lang="ts">
import type { HorseModel } from '@/types/models'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

// Get horseList from vuex store
const horseList = computed<HorseModel[]>(() => store.getters.randomHorses)
</script>

<template>
  <div class="table">
    <h2>Horse List (1-20)</h2>
    <DataTable
      :value="horseList"
      class="p-datatable-gridlines"
      :scrollable="true"
      scrollHeight="680px"
    >
      <Column field="name" header="Name" sortable />
      <Column field="condition" header="Condition" sortable />
      <Column field="colorName" header="Color" sortable />
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.table {
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: $app-border-radius-1;

  & h2 {
    background-color: #ffeb3b;
    padding: 0.5rem;
    text-align: center;
  }
}
</style>

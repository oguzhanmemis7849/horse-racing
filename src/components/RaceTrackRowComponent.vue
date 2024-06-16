<script setup lang="ts">
import { computed } from 'vue'
import type { HorseModel } from '@/types/models'
import Horse from './HorseComponent.vue'
import { useStore } from 'vuex'

defineProps<{
  rowNumber: number
  horse?: HorseModel
}>()

const store = useStore()

const isRunning = computed<boolean>(() => store.getters.raceStatus === 'running')
</script>

<template>
  <div class="race-track-row">
    <div class="race-track-row__number-box">
      <p class="race-track-row__number-box__number">{{ rowNumber }}</p>
    </div>
    <div class="race-track-row__track">
      <div
        v-if="horse"
        class="race-track-row__track__horse"
        :style="{ left: `calc(${horse.distanceCoveredPercentage}% - 2rem)` }"
      >
        <Horse :animation="isRunning" :color="horse.color" :horse-name="horse.name" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

$lane-height: 68px;

.race-track-row {
  display: flex;
  align-items: center;
  position: relative;

  &__number-box {
    width: 40px;
    height: $lane-height;
    background-color: #408643;
    border: 2px solid #fff;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;

    &__number {
      font-weight: $font-semi-bold;
      color: white;
      text-align: center;
      rotate: -90deg;
    }
  }

  &__track {
    flex: 1;
    height: $lane-height;
    border-bottom: 2px dashed #3a3a3a;
    position: relative;

    &__horse {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transition: left 0.5s ease-in-out;
    }
  }
}
</style>

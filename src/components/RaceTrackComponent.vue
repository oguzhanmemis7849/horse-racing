<script setup lang="ts">
import { ref, computed, defineProps, withDefaults } from 'vue'
import type { HorseModel, RoundNumber, Round } from '@/types/models'
import { MAX_SELECTABLE_HORSE_COUNT } from '@/constants/horses'
import RaceTrackRow from './RaceTrackRowComponent.vue'
import { useStore } from 'vuex'

const store = useStore()

const horses = computed<HorseModel[]>(() => store.getters.selectedHorses)

const currentRoundNumber = computed<RoundNumber>(() => store.getters.currentRoundNumber)

const runningRound = computed<Round>(() => {
  return store.getters.round(currentRoundNumber.value)
})

function getOrdinalSuffix(roundNumber: RoundNumber): string {
  switch (roundNumber) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}
</script>

<template>
  <div class="race-track">
    <div class="race-track__track">
      <RaceTrackRow
        v-for="i in MAX_SELECTABLE_HORSE_COUNT"
        :key="i"
        :rowNumber="i"
        :horse="horses[i - 1]"
      />
    </div>
    <div class="race-track__footer">
      <p v-if="horses.length" class="race-track__footer__round-info">
        {{ runningRound.roundNumber }}.{{ getOrdinalSuffix(runningRound.roundNumber) }} Lap
        {{ runningRound.raceLength }}m
      </p>
      <p class="race-track__footer__finish">FINISH</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.race-track {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  border-radius: $app-border-radius-1;

  &__track {
    background-color: #e0e0e0;
    padding: 1rem;
    margin: 1rem;
    border-radius: $app-border-radius-1;
    display: flex;
    flex-direction: column;
    border-right: 4px solid red;
  }

  &__footer {
    width: 100%;
    position: relative;

    &__round-info {
      width: 100%;
      color: red;
      text-align: center;
      font-size: $text-font-size;
      font-weight: $font-bold;
    }

    &__finish {
      position: absolute;
      top: 0;
      width: 100%;
      text-align: end;
      color: red;
      font-size: $text-font-size;
      font-weight: $font-bold;
    }
  }
}
</style>

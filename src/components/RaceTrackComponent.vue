<script setup lang="ts">
import { ref, computed } from 'vue'
import type { HorseModel, RoundNumber, Round, RoundHorseModel } from '@/types/models'
import { MAX_SELECTABLE_HORSE_COUNT } from '@/constants/horses'
import RaceTrackRow from './RaceTrackRowComponent.vue'
import { getOrdinalSuffix } from '@/utils'
import { useStore } from 'vuex'

const store = useStore()

const horses = computed<HorseModel[]>(() => {
  const round = store.getters.round(store.getters.currentRoundNumber)
  if (!round) return []

  return round.horseList
    .map((h: RoundHorseModel) => {
      const horse = store.getters.randomHorses.find((horse: HorseModel) => horse.id === h.horseId)
      if (!horse) return null

      return {
        ...horse,
        distanceCoveredPercentage: h.distanceCoveredPercentage
      }
    })
    .filter((h: HorseModel) => h !== null) as HorseModel[]
})

const currentRoundNumber = computed<RoundNumber>(() => store.getters.currentRoundNumber)

const runningRound = computed<Round>(() => {
  return store.getters.round(currentRoundNumber.value)
})
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
  justify-content: start;
  gap: 0.5rem;
  background-color: #f9f9f9;
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

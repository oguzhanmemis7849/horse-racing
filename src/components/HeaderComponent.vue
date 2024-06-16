<script setup lang="ts">
import { ref, computed } from 'vue'
import { MAX_SELECTABLE_HORSE_COUNT } from '@/constants/horses'
import { useStore } from 'vuex'
import type { RaceStatus } from '@/types/models'

const store = useStore()

function handleClickGenerateProgram() {
  handleClickPause()
  // Reset Race
  store.dispatch('resetRace').then(() => {
    // Her tur için rastgele 10 at seç
    for (let i = 1; i <= store.state.rounds.length; i++) {
      const selectedHorseIdList = new Set<number>()
      while (selectedHorseIdList.size < MAX_SELECTABLE_HORSE_COUNT) {
        const randomIndex = Math.floor(Math.random() * store.state.horses.length)
        const selectedHorse = store.state.horses[randomIndex]

        if (!selectedHorseIdList.has(selectedHorse.id)) {
          selectedHorseIdList.add(selectedHorse.id)
          store.dispatch('selectHorseForRound', { roundNumber: i, horse: selectedHorse })
        }
      }
    }
  })
}

const raceStatus = computed<RaceStatus>(() => store.getters.raceStatus)

const isDisableStartButton = computed<boolean>(() => {
  return !store.getters.allRoundsHaveHorses
})

function handleClickStart() {
  store.dispatch('startRace')
}
function handleClickPause() {
  store.dispatch('pauseRace')
}
</script>

<template>
  <header class="header">
    <div class="header__content">
      <h2>Horse Racing</h2>
      <div class="header__content__button-group">
        <Button severity="secondary" @click="handleClickGenerateProgram">Generate Program</Button>
        <Button
          v-if="raceStatus === 'not_started' || raceStatus === 'paused'"
          severity="success"
          @click="handleClickStart"
          :disabled="isDisableStartButton"
          >Start</Button
        >
        <Button v-else-if="raceStatus === 'running'" severity="danger" @click="handleClickPause"
          >Pause</Button
        >
        <Button v-else @click="handleClickGenerateProgram">Create New Race</Button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.header {
  background-color: $header-background-color;
  color: $header-text-color;
  padding: $app-padding;
  text-align: center;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: $header-z-index;
  height: $header-height;

  &__content {
    height: inherit;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    &__button-group {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
  }
}
</style>

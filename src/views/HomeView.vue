<script setup lang="ts">
import DataTable from '@/components/TableComponent.vue'
import RaceTrackComponent from '@/components/RaceTrackComponent.vue'
import { getOrdinalSuffix } from '@/utils'

import type {
  HorseModel,
  RoundNumber,
  Round,
  RoundHorseModel,
  ResultModel,
  ProgramTable,
  ResultTable
} from '@/types/models'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const horseList = computed<HorseModel[]>(() => store.getters.randomHorses)

const horseListColumns = computed(() => [
  { field: 'name', header: 'Name', sortable: true },
  { field: 'condition', header: 'Condition', sortable: true },
  { field: 'colorName', header: 'Color', sortable: true }
])

const programListColumns = computed(() => [
  { field: 'lane', header: 'Lane', sortable: false },
  { field: 'name', header: 'Name', sortable: false }
])

const resultListColumns = computed(() => [
  { field: 'position', header: 'Position', sortable: false },
  { field: 'name', header: 'Name', sortable: false }
])

const roundPrograms = computed<ProgramTable[]>(() => {
  const programs: ProgramTable[] = []
  for (let i = 1; i <= store.state.rounds.length; i++) {
    const round = store.state.rounds.find((r: Round) => r.roundNumber === (i as RoundNumber))
    if (round) {
      const program = round.horseList.map((horse: RoundHorseModel, index: number) => {
        const horseDetails = store.state.horses.find((h: HorseModel) => h.id === horse.horseId)
        return {
          lane: index + 1,
          name: horseDetails ? horseDetails.name : ''
        }
      })
      programs.push({ round: i as RoundNumber, program })
    }
  }
  return programs
})

const roundResults = computed<ResultTable[]>(() => {
  const results: ResultTable[] = []
  for (let i = 1; i <= store.state.rounds.length; i++) {
    const roundResult = store.getters.roundResults(i as RoundNumber)
    const formattedResults = roundResult.map((result: ResultModel) => {
      const horse = store.state.horses.find((h: HorseModel) => h.id === result.horseId)
      return {
        position: result.position,
        name: horse ? horse.name : ''
      }
    })
    results.push({ round: i as RoundNumber, results: formattedResults })
  }
  return results
})

function tableSubTitle(round: RoundNumber): string {
  const runningRound = store.getters.round(round)
  return `${runningRound.roundNumber}.${getOrdinalSuffix(runningRound.roundNumber)} Lap - ${runningRound.raceLength}m`
}
</script>

<template>
  <div class="grid-container">
    <DataTable
      class="grid-container__horse-list"
      :list="horseList"
      :columns="horseListColumns"
      titleBackgroundColor="#ffeb3b"
      title="Horse List (1-20)"
      rowSize="large"
    />
    <RaceTrackComponent class="grid-container__race-track" />
    <div class="grid-container__race-results">
      <div class="results-container">
        <div class="results-container__column">
          <div class="results-container__column__program-header">
            <h3>Programs</h3>
          </div>
          <div v-for="roundItem in roundPrograms" :key="roundItem.round">
            <DataTable
              :list="roundItem.program"
              :columns="programListColumns"
              :subTitle="tableSubTitle(roundItem.round)"
              titleBackgroundColor="#3d8bf5"
              subTitleBackgroundColor="#fa6654"
              rowSize="small"
            />
          </div>
        </div>
        <div class="results-container__column">
          <div class="results-container__column__results-header">
            <h3>Results</h3>
          </div>
          <div v-for="roundItem in roundResults" :key="roundItem.round" class="result-tables">
            <DataTable
              :list="roundItem.results"
              :columns="resultListColumns"
              :subTitle="tableSubTitle(roundItem.round)"
              titleBackgroundColor="#93d36c"
              subTitleBackgroundColor="#fa6654"
              rowSize="small"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.5rem;
  align-items: start;
  height: 790px;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    height: auto;
  }

  &__horse-list,
  &__race-track,
  &__race-results {
    overflow: auto;
    height: 790px;

    @media (max-width: 1023px) {
      grid-column: span 12;
      height: auto;
    }

    @media (min-width: 1024px) {
      &.grid-container__horse-list {
        grid-column: span 3;
      }

      &.grid-container__race-track {
        grid-column: span 5;
      }

      &.grid-container__race-results {
        grid-column: span 4;
      }
    }
  }
}

.results-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  height: 100%;

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
  }

  &__column {
    grid-column: span 1;
    overflow: auto;
    position: relative;

    &__program-header,
    &__results-header {
      position: sticky;
      top: 0;
      z-index: 2;
      background-color: inherit;
      text-align: center;
      padding: 0.5rem;
    }

    &__program-header {
      background-color: #3d8bf5;
    }

    &__results-header {
      background-color: #93d36c;
    }

    & h3 {
      margin: 0;
    }
  }
}
</style>

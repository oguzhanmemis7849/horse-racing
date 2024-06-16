import type { State } from '@/types/state'
import { HORSES } from '@/constants/horses'
import { TOTAL_ROUND, RACE_LENGTH_LIST } from '@/constants/race'
import type { RoundNumber, RaceStatus, RaceLenght } from '@/types/models'

const state: State = {
  horses: HORSES,
  rounds: Array.from({ length: TOTAL_ROUND }, (_, i) => ({
    roundNumber: (i + 1) as RoundNumber,
    raceLength: RACE_LENGTH_LIST[i] as RaceLenght,
    horseList: [],
    finishTimes: [],
    results: []
  })),
  currentRoundNumber: 1 as RoundNumber,
  raceStatus: 'not_started' as RaceStatus
}

export default state

import type { HorseModel } from '@/types/models'

export interface State {
  horses: HorseModel[]
  selectedHorses: HorseModel[]
}

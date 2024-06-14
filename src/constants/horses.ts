import type { HorseModel } from '../types/models'

export const HORSES: HorseModel[] = [
  { id: 1, name: 'THUNDER', condition: 85, color: '#000000' },
  { id: 2, name: 'LIGHTNING', condition: 90, color: '#FFFFFF' },
  { id: 3, name: 'STORM', condition: 70, color: '#808080' },
  { id: 4, name: 'SUNSHINE', condition: 95, color: '#FFD700' },
  { id: 5, name: 'RAINBOW', condition: 60, color: '#FF00FF' },
  { id: 6, name: 'MIDNIGHT', condition: 88, color: '#191970' },
  { id: 7, name: 'SHADOW', condition: 75, color: '#696969' },
  { id: 8, name: 'GHOST', condition: 85, color: '#F5F5F5' },
  { id: 9, name: 'EMBER', condition: 65, color: '#FF4500' },
  { id: 10, name: 'SNOWFLAKE', condition: 92, color: '#ADD8E6' },
  { id: 11, name: 'WILDFIRE', condition: 77, color: '#FF6347' },
  { id: 12, name: 'BREEZE', condition: 80, color: '#00CED1' },
  { id: 13, name: 'BLIZZARD', condition: 68, color: '#E0FFFF' },
  { id: 14, name: 'TWILIGHT', condition: 83, color: '#483D8B' },
  { id: 15, name: 'DAWN', condition: 70, color: '#FFB6C1' },
  { id: 16, name: 'DUSK', condition: 74, color: '#8B0000' },
  { id: 17, name: 'RUSTY', condition: 66, color: '#B22222' },
  { id: 18, name: 'COPPER', condition: 78, color: '#B87333' },
  { id: 19, name: 'PEARL', condition: 91, color: '#E6E6FA' },
  { id: 20, name: 'ONYX', condition: 87, color: '#353839' }
]

export const MAX_SELECTABLE_HORSES_COUNT = 10

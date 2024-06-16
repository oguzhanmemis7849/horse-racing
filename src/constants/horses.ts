import type { HorseModel } from '../types/models'

export const HORSES: HorseModel[] = [
  { id: 1, name: 'THUNDER', condition: 85, colorName: 'Red', color: '#D32F2F' },
  { id: 2, name: 'LIGHTNING', condition: 79, colorName: 'Blue', color: '#1976D2' },
  { id: 3, name: 'STORM', condition: 67, colorName: 'Green', color: '#388E3C' },
  { id: 4, name: 'SUNSHINE', condition: 92, colorName: 'Yellow', color: '#FBC02D' },
  { id: 5, name: 'RAINBOW', condition: 78, colorName: 'Magenta', color: '#C2185B' },
  { id: 6, name: 'MIDNIGHT', condition: 64, colorName: 'Cyan', color: '#00796B' },
  { id: 7, name: 'SHADOW', condition: 75, colorName: 'Orange', color: '#F57C00' },
  { id: 9, name: 'EMBER', condition: 67, colorName: 'Brown', color: '#795548' },
  { id: 10, name: 'WILDFIRE', condition: 77, colorName: 'Lime', color: '#CDDC39' },
  { id: 11, name: 'BREEZE', condition: 85, colorName: 'Teal', color: '#00796B' },
  { id: 12, name: 'BLIZZARD', condition: 49, colorName: 'Indigo', color: '#303F9F' },
  { id: 13, name: 'TWILIGHT', condition: 83, colorName: 'Gold', color: '#FFA000' },
  { id: 14, name: 'DAWN', condition: 70, colorName: 'Coral', color: '#FF7043' },
  { id: 15, name: 'RUSTY', condition: 96, colorName: 'Violet', color: '#8E24AA' },
  { id: 16, name: 'COPPER', condition: 78, colorName: 'Crimson', color: '#D32F2F' },
  { id: 17, name: 'CHARCOAL', condition: 88, colorName: 'Black', color: '#212121' },
  { id: 18, name: 'ASH', condition: 74, colorName: 'Gray', color: '#616161' },
  { id: 19, name: 'SLATE', condition: 82, colorName: 'Dark Gray', color: '#455A64' },
  { id: 20, name: 'CHOCOLATE', condition: 90, colorName: 'Dark Brown', color: '#5D4037' }
]

export const MAX_SELECTABLE_HORSE_COUNT = 10

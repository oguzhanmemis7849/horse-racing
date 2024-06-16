import { describe, it, expect } from 'vitest'
import { shuffleArray, getOrdinalSuffix } from '@/utils'
import type { RoundNumber } from '@/types/models'

describe('utils', () => {
  describe('shuffleArray', () => {
    it('returns an array with the same elements but in different order', () => {
      const array = [1, 2, 3, 4, 5]
      const shuffledArray = shuffleArray(array)

      expect(shuffledArray).toEqual(expect.arrayContaining(array))
      expect(shuffledArray).toHaveLength(array.length)

      expect(shuffledArray).not.toEqual(array)
    })

    it('returns an empty array when the input is an empty array', () => {
      const array: any[] = []
      const shuffledArray = shuffleArray(array)
      expect(shuffledArray).toEqual([])
    })

    it('does not modify the original array', () => {
      const array = [1, 2, 3, 4, 5]
      const originalArray = array.slice()
      shuffleArray(array)
      expect(array).toEqual(originalArray)
    })
  })

  describe('getOrdinalSuffix', () => {
    it('returns "st" for 1', () => {
      const suffix = getOrdinalSuffix(1 as RoundNumber)
      expect(suffix).toBe('st')
    })

    it('returns "nd" for 2', () => {
      const suffix = getOrdinalSuffix(2 as RoundNumber)
      expect(suffix).toBe('nd')
    })

    it('returns "rd" for 3', () => {
      const suffix = getOrdinalSuffix(3 as RoundNumber)
      expect(suffix).toBe('rd')
    })

    it('returns "th" for numbers other than 1, 2, 3', () => {
      const suffix4 = getOrdinalSuffix(4 as RoundNumber)
      const suffix11 = getOrdinalSuffix(11 as RoundNumber)
      const suffix21 = getOrdinalSuffix(21 as RoundNumber)
      expect(suffix4).toBe('th')
      expect(suffix11).toBe('th')
      expect(suffix21).toBe('th')
    })
  })
})

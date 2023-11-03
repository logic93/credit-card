import { expect, test } from 'vitest'
import {
    removeIdenticalLetters,
    maximumOddSum,
    parallelRemoveIdenticalLetters,
} from '../algorithms'

test('algorithms', () => {
    // Test removeIdenticalLetters
    expect(removeIdenticalLetters('ffdttttyy')).toBe('ffdtttyy')
    expect(removeIdenticalLetters('iiikigggg')).toBe('iiikiggg')
    expect(removeIdenticalLetters('abccccccdeeeeeee')).toBe('abcccdeee')

    parallelRemoveIdenticalLetters('a'.repeat(150000), 3, 150000).then(
        (result) => {
            expect(result).toHaveLength(3)
        }
    )

    // Test maximumOddSum
    expect(maximumOddSum([19, 2, 42, 18])).toBe(61)
    expect(maximumOddSum([61, 32, 51])).toBe(93)

    expect(maximumOddSum([19, 2, 42, 18])).toBeGreaterThan(1)
    expect(maximumOddSum([19, 2, 42, 18])).toBeLessThan(150000)
})

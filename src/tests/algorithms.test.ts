import { expect, test } from 'vitest';
import { removeIdenticalLetters, maximumOddSum } from '../algorithms';

test('algorithms', () => {
  // Test removeIdenticalLetters
  expect(removeIdenticalLetters('ffdttttyy')).toBe('ffdtttyy');
  expect(removeIdenticalLetters('iiikigggg')).toBe('iiikiggg');
  expect(removeIdenticalLetters('abccccccdeeeeeee')).toBe('abcccdeee');

  // Test maximumOddSum
  expect(maximumOddSum([19, 2, 42, 18])).toBe(61);
  expect(maximumOddSum([61, 32, 51])).toBe(93);

  expect(maximumOddSum([19, 2, 42, 18])).toBeGreaterThan(1);
  expect(maximumOddSum([19, 2, 42, 18])).toBeLessThan(150000);
});


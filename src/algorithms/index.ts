const removeIdenticalLetters = (
    str: string,
    maxConsecutive: number = 3
): string => {
    let modifiedStr = ''
    let count = 1

    for (let i = 0; i < str.length; i++) {
        if (i > 0 && str[i] === str[i - 1] && /[a-z]/.test(str[i])) {
            count++
        } else {
            count = 1
        }

        if (count <= maxConsecutive || !/[a-z]/.test(str[i])) {
            modifiedStr += str[i]
        }
    }

    return modifiedStr
}

function maximumOddSum(numbers: number[]): number | undefined {
    let maxOddSum = -1

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 1 && numbers[i] > maxOddSum) {
            maxOddSum = numbers[i]
        }

        for (let j = i + 1; j < numbers.length; j++) {
            const sum = numbers[i] + numbers[j]
            if (sum % 2 === 1 && sum > maxOddSum) {
                maxOddSum = sum
            }
        }
    }

    return maxOddSum > -1 ? maxOddSum : undefined
}

export { removeIdenticalLetters, maximumOddSum }

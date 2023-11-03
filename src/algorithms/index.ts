const removeIdenticalLetters = (
    str: string,
    maxConsecutive: number = 3
): string => {
    const modifiedStrArr = []
    let count = 1

    for (let i = 0; i < str.length; i++) {
        const currentChar = str[i]

        // Check if the current character is a lowercase letter
        if (/[a-z]/.test(currentChar)) {
            if (i > 0 && currentChar === str[i - 1]) {
                count++
            } else {
                count = 1
            }

            // If count is within the limit, add the character to the result
            if (count <= maxConsecutive) {
                // For memory optimization, instead of concatenating strings using +=, which creates a new string each time,
                // a better practice is using an array to store the characters and then join them into a string at the end.
                modifiedStrArr.push(currentChar)
            }
        } else {
            // If it's not a lowercase letter, add it to the result
            modifiedStrArr.push(currentChar)
            count = 1 // Reset count for non-letter characters
        }
    }

    return modifiedStrArr.join('')
}

const parallelRemoveIdenticalLetters = async (
    inputString: string,
    maxConsecutive: number = 3,
    chunkSize: number = 150000
): Promise<string> => {
    const inputLength = inputString.length
    const numChunks = Math.ceil(inputLength / chunkSize)

    const processChunk = async (chunk: string): Promise<string> => {
        return removeIdenticalLetters(chunk, maxConsecutive)
    }

    const chunkPromises: Promise<string>[] = []

    for (let i = 0; i < numChunks; i++) {
        const start = i * chunkSize
        const end = (i + 1) * chunkSize
        const chunk = inputString.slice(start, end)

        chunkPromises.push(processChunk(chunk))
    }

    const processedChunks = await Promise.all(chunkPromises)

    return processedChunks.join('')
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

export { removeIdenticalLetters, maximumOddSum, parallelRemoveIdenticalLetters }

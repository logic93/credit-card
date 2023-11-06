import { types as CardType } from 'credit-card-type'

const allowedCreditCardTypes = [
    CardType.VISA, // Starts with 4
    CardType.MASTERCARD, // Starts with 5
    CardType.AMERICAN_EXPRESS, // Starts with 34 or 37
    CardType.MAESTRO, // Starts with 50, 56, 57, 58, 6013, 62, 63, or 67
]

const getSVGImage = (name: string) => {
    return new URL(`/src/assets/images/${name}.svg`, import.meta.url).href
}

export { allowedCreditCardTypes, getSVGImage }

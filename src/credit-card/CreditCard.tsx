import { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'
import creditCardType, { types as CardType } from 'credit-card-type'
import { ICreditCard } from './types'
import Card from './components/Card'
import CardForm from './components/CardForm'

const Wrapper = styled.div<{ $style?: any }>`
    display: flex;
    flex-direction: column;
    ${({ $style }) => $style && css($style)}
`

const initialCreditCardState: ICreditCard = {
    cardCvv: '',
    cardHolder: '',
    cardNumber: '',
    validThru: '',
}

interface CreditCardProps {
    $style?: any
    $cardFormStyle?: any
}

const CreditCard = ({ $style, $cardFormStyle }: CreditCardProps) => {
    const [creditCardDetails, setCreditCardDetails] = useState<ICreditCard>(
        initialCreditCardState
    )
    const [selectedCreditCardType, setSelectedCreditCardType] =
        useState<any>(null)
    const [maskedCardNumber, setMaskedCardNumber] = useState<string>(
        '**** **** **** ****'
    )

    const updateCardNumber = (value: string): string => {
        let sanitizedInput = value.replace(/[^0-9]/g, '')
        const foundCreditCardTypes = creditCardType(sanitizedInput)
        const defaultGaps = [4, 8, 12]

        const allowedCreditCardTypes = [
            CardType.VISA,
            CardType.MASTERCARD,
            CardType.AMERICAN_EXPRESS,
            CardType.MAESTRO,
        ]

        if (
            foundCreditCardTypes.length === 1 &&
            // @ts-ignore: ts(2345)
            allowedCreditCardTypes.includes(foundCreditCardTypes[0]?.type)
        ) {
            const creditCardType = foundCreditCardTypes[0]
            const gapPositions = creditCardType?.gaps || defaultGaps
            const lastIndex =
                creditCardType?.lengths[creditCardType?.lengths.length - 1]
            let masked = '*'.repeat(creditCardType?.lengths[0])

            if (sanitizedInput.length > creditCardType?.lengths[0]) {
                masked = '*'.repeat(lastIndex)
            }

            gapPositions.forEach((position, index) => {
                if (position <= sanitizedInput.length) {
                    sanitizedInput =
                        sanitizedInput.slice(0, position + index) +
                        ' ' +
                        sanitizedInput.slice(position + index)
                }

                masked =
                    masked.slice(0, position + index) +
                    ' ' +
                    masked.slice(position + index)
            })

            setSelectedCreditCardType(creditCardType)
            setMaskedCardNumber(masked)
        } else {
            defaultGaps.forEach((position, index) => {
                if (position <= sanitizedInput.length) {
                    sanitizedInput =
                        sanitizedInput.slice(0, position + index) +
                        ' ' +
                        sanitizedInput.slice(position + index)
                }
            })
        }

        if (!sanitizedInput || !foundCreditCardTypes.length) {
            setSelectedCreditCardType(null)
            setMaskedCardNumber('**** **** **** ****')
        }

        return sanitizedInput.trim()
    }

    const updateValidThru = (value: string): string => {
        const sanitizedInput = value.replace(/\D/g, '')
        const formattedValidThru = sanitizedInput
            .slice(0, 4)
            .replace(/(\d{2})(\d{2})/, '$1/$2')

        return formattedValidThru.trim()
    }

    const updateCreditCardDetails = useCallback(
        (fieldName: string, value: string) => {
            const updatedCreditCardDetails = {
                ...creditCardDetails,
                [fieldName]: value || '',
            }

            if (fieldName === 'cardNumber') {
                updatedCreditCardDetails['cardNumber'] =
                    updateCardNumber(value) || ''
            }

            if (fieldName === 'validThru') {
                updatedCreditCardDetails['validThru'] =
                    updateValidThru(value) || ''
            }

            setCreditCardDetails(updatedCreditCardDetails)
        },
        [creditCardDetails]
    )

    return (
        <Wrapper $style={$style}>
            <Card
                creditCardDetails={creditCardDetails}
                creditCardType={selectedCreditCardType}
                maskedCardNumber={maskedCardNumber}
            />

            <CardForm
                $cardFormStyle={$cardFormStyle}
                creditCardDetails={creditCardDetails}
                onUpdateCreditCardDetails={updateCreditCardDetails}
                creditCardType={selectedCreditCardType}
            />
        </Wrapper>
    )
}

export default CreditCard

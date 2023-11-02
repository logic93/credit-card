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
    cardIssuer: '',
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
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [maskedCardNumber, setMaskedCardNumber] = useState<string>(
        '**** **** **** ****'
    )

    const allowedCreditCardTypes = [
        CardType.VISA,
        CardType.MASTERCARD,
        CardType.AMERICAN_EXPRESS,
        CardType.MAESTRO,
    ]

    const updateCardNumber = (value: string): string => {
        let cardNumberInput = value.replace(/[^0-9]/g, '')
        const foundCreditCardTypes = creditCardType(cardNumberInput)
        const defaultGaps = [4, 8, 12]

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

            if (cardNumberInput.length > creditCardType?.lengths[0]) {
                masked = '*'.repeat(lastIndex)
            }

            gapPositions.forEach((position, index) => {
                if (position <= cardNumberInput.length) {
                    cardNumberInput =
                        cardNumberInput.slice(0, position + index) +
                        ' ' +
                        cardNumberInput.slice(position + index)
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
                if (position <= cardNumberInput.length) {
                    cardNumberInput =
                        cardNumberInput.slice(0, position + index) +
                        ' ' +
                        cardNumberInput.slice(position + index)
                }
            })
        }

        if (!cardNumberInput || !foundCreditCardTypes.length) {
            setSelectedCreditCardType(null)
            setMaskedCardNumber('**** **** **** ****')
        }

        return cardNumberInput.trim()
    }

    const updateValidThru = (value: string): string => {
        const validThruInput = value.replace(/\D/g, '')

        if (validThruInput.length > 2) {
            return validThruInput.slice(0, 2) + '/' + validThruInput.slice(2)
        }

        return validThruInput
    }

    const updateCardCvv = (value: string): string => {
        return value.replace(/[^0-9]/g, '')
    }

    const checkForm = (value: ICreditCard) => {
        let isFormValid = Object.values(value).every(
            (val) => val !== undefined && val !== null && val !== ''
        )
        setIsFormValid(isFormValid)
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

            if (fieldName === 'cardCvv') {
                updatedCreditCardDetails['cardCvv'] = updateCardCvv(value) || ''
            }

            updatedCreditCardDetails['cardIssuer'] =
                selectedCreditCardType?.type || ''

            setCreditCardDetails(updatedCreditCardDetails)
            checkForm(updatedCreditCardDetails)
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
                isFormValid={isFormValid}
            />
        </Wrapper>
    )
}

export default CreditCard

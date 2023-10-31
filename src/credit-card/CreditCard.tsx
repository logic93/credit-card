import { CreditCardProps } from './types/types'
import Card from './components/Card'
import CardForm from './components/CardForm'
import React, { useCallback, useState } from 'react'
import styled, { css } from 'styled-components'

const Wrapper = styled.div<{ $style?: any }>`
    display: flex;
    flex-direction: column;
    ${({ $style }) => $style && css($style)}
`

const initialState: CreditCardProps = {
    cardCvv: '',
    cardHolder: '',
    cardNumber: '',
    validThru: '',
}

const CreditCard: React.FC<{ $style?: any }> = ({ $style }) => {
    const [state, setState] = useState<CreditCardProps>(initialState)

    const updateCardNumber = (value: string): string => {
        const input = value.replace(/[^0-9]/g, '')
        let formattedCardNumber = ''

        for (let i = 0; i < input.length; i += 4) {
            formattedCardNumber += input.slice(i, i + 4) + ' '
        }

        return formattedCardNumber.trim()
    }

    const updateValidThru = (value: string): string => {
        const input = value.replace(/\D/g, '')
        const formattedValidThru = input
            .slice(0, 4)
            .replace(/(\d{2})(\d{2})/, '$1/$2')

        return formattedValidThru.trim()
    }

    const updateStateValues = useCallback(
        (keyName: string, value: string) => {
            const updatedState = { ...state, [keyName]: value || '' }

            if (keyName === 'cardNumber') {
                updatedState['cardNumber'] = updateCardNumber(value) || ''
            }

            if (keyName === 'validThru') {
                updatedState['validThru'] = updateValidThru(value) || ''
            }

            setState(updatedState)
        },
        [state]
    )

    return (
        <Wrapper $style={$style}>
            <Card
                cardCvv={state.cardCvv}
                cardHolder={state.cardHolder}
                cardNumber={state.cardNumber}
                validThru={state.validThru}
            />

            <CardForm
                creditCardDetails={state}
                onUpdateState={updateStateValues}
            />
        </Wrapper>
    )
}

export default CreditCard

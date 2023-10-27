import { useCallback, useEffect, useState } from 'react'
import { CreditCardInterface } from './types'
import styled from 'styled-components'

import Card from './components/Card'
import CardForm from './components/CardForm'

const Wrapper = styled.div({
    width: '40rem',
})

const initialState: CreditCardInterface = {
    cardCvv: '',
    cardHolder: '',
    cardMonth: '',
    cardNumber: '',
    cardYear: '',
    expirationDate: '',
    id: '',
}

const CreditCard = () => {
    const [state, setState] = useState<CreditCardInterface>(initialState)

    const updateStateValues = useCallback(
        (keyName: string, value: string) => {
            setState({
                ...state,
                [keyName]: value || '',
            })
        },
        [state]
    )

    return (
        <Wrapper className="max-w-full m-auto px-12">
            <Card
                cardCvv={''}
                cardHolder={''}
                cardMonth={''}
                cardNumber={state.cardNumber}
                cardYear={''}
                expirationDate={''}
                id={''}
            />

            <CardForm
                creditCardDetails={state}
                onUpdateState={updateStateValues}
            />
        </Wrapper>
    )
}

export default CreditCard

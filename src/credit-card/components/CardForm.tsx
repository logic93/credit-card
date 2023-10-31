import { CreditCardProps } from '../types/types'
import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import { useFocus } from './FocusContext'

const CardFormWrapper = styled.div`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: flex;
    flex-direction: column;
    margin: 2em 0 0 0;
    padding: calc(28px + 1em) 1em 1em;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
`

const Label = styled.label<{ $noMargin?: boolean }>`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: ${({ $noMargin }) => ($noMargin ? '0' : '0 0 3em 0')};
    position: relative;
`

const Span = styled.span`
    color: #d3d3d3;
    display: block;
    font-weight: bold;
    position: absolute;
    top: -28px;
    transition: 0.3s ease all;
`

const Input = styled.input`
    background: transparent;
    border-radius: 4px;
    border: 1px solid #d3d3d3;
    color: #000;
    font-size: 20px;
    height: 3em;
    outline: none;
    padding: 0 0 0 12px;
    transition: 0.3s ease all;
    text-transform: capitalize;

    &:focus {
        border: 1px solid #000;
    }

    &:focus + ${Span} {
        color: #000;
    }
`

const BottomInputs = styled.div`
    column-gap: 1em;
    display: flex;
    flex-direction: row;
    flex: 1;
    margin: 0 0 2em 0;
`

const Button = styled.input`
    background-color: #d3d3d3;
    color: #fff;
    height: 40px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1em;
    transition: 0.3s ease all;
    outline: none;

    &:hover,
    &:focus {
        background-color: #000;
    }
`

type CardFormProps = {
    creditCardDetails: CreditCardProps
    onUpdateState: (key: string, value: string) => void
}

const CardForm: React.FC<CardFormProps> = (props) => {
    const { onUpdateState, creditCardDetails } = props
    const { setFocus } = useFocus()

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target

        onUpdateState(name, value)
    }

    return (
        <CardFormWrapper>
            <Form action="/post/payment" method="post">
                <Label htmlFor="cardHolder">
                    <Input
                        id="cardHolder"
                        name="cardHolder"
                        onChange={handleFormChange}
                        type="text"
                        value={creditCardDetails.cardHolder}
                    />
                    <Span>Name on Card</Span>
                </Label>

                <Label htmlFor="cardNumber">
                    <Input
                        autoComplete="off"
                        id="cardNumber"
                        maxLength={19}
                        name="cardNumber"
                        onChange={handleFormChange}
                        type="text"
                        value={creditCardDetails.cardNumber}
                    />
                    <Span>Card Number</Span>
                </Label>
                <BottomInputs>
                    <Label htmlFor="validThru" $noMargin>
                        <Input
                            id="validThru"
                            name="validThru"
                            onChange={handleFormChange}
                            type="text"
                            value={creditCardDetails.validThru}
                            maxLength={5}
                        />
                        <Span>Valid Thru</Span>
                    </Label>

                    <Label htmlFor="cardCvv" $noMargin>
                        <Input
                            id="cardCvv"
                            name="cardCvv"
                            onChange={handleFormChange}
                            type="text"
                            value={creditCardDetails.cardCvv}
                            maxLength={4}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                        <Span>CVV</Span>
                    </Label>
                </BottomInputs>

                <Button type="submit" value="Pay" />
            </Form>
        </CardFormWrapper>
    )
}

export default CardForm

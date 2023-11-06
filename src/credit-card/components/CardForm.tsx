import { allowedCreditCardTypes } from '../utils'
import {
    BottomInputs,
    Button,
    CardFormWrapper,
    Form,
    FormHeading,
    Input,
    Label,
    Span,
    ValidationError,
} from './styles/card-form-styles'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ICreditCard } from '../types'
import { useFocus } from '../context/FocusContext'
import luhn from 'luhn'

interface CardFormProps {
    $cardFormStyle?: any
    creditCardDetails: ICreditCard
    creditCardType?: any
    isFormValid: boolean
    onUpdateCreditCardDetails: (name: keyof ICreditCard, value: string) => void
}

const CardForm = ({
    $cardFormStyle,
    creditCardDetails,
    creditCardType,
    isFormValid,
    onUpdateCreditCardDetails,
}: CardFormProps) => {
    const { setFocus } = useFocus()
    const [validationError, setValidationError] = useState<string>('')
    const [networkError, setNetworkError] = useState<string>('')

    const handleFormChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setValidationError('')
        onUpdateCreditCardDetails(name as keyof ICreditCard, value)
    }

    function validateCreditCard(details: ICreditCard) {
        const { cardNumber, cardHolder, validThru, cardCvv, cardIssuer } =
            details

        // @ts-ignore: ts(2345)
        if (!allowedCreditCardTypes.includes(cardIssuer)) {
            return false
        }

        // Card Number validation using Luhn algorithm
        if (!luhn.validate(cardNumber)) {
            return false
        }

        // Cardholder Name validation
        if (/[^\p{L}\s\-']+/gu.test(cardHolder)) {
            return false
        }

        // Valid Thru (Expiration Date) validation
        const validThruRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/
        if (!validThruRegex.test(validThru)) {
            return false
        }

        // @ts-ignore ts(2531)
        const [expirationMonth, expirationYear] = validThru
            .match(/\d+/g)
            .map(Number)
        const currentDate = new Date()
        const currentYear = currentDate.getFullYear() % 100 // Get the last two digits of the current year
        const currentMonth = currentDate.getMonth() + 1

        if (
            expirationYear < currentYear ||
            (expirationYear === currentYear &&
                expirationMonth < currentMonth) ||
            expirationMonth < 1 ||
            expirationMonth > 12
        ) {
            return false
        }

        // CVV (Card Verification Value) validation
        if (!/^\d{3,4}$/.test(cardCvv)) {
            return false
        }

        return true // All validations passed
    }

    const handleSubmit = async (
        e: FormEvent<HTMLFormElement>
    ): Promise<void> => {
        e.preventDefault()

        // Validate credit card details
        const isCreditCardValid = validateCreditCard(creditCardDetails)

        if (!isCreditCardValid) {
            setValidationError(
                'Invalid credit card details. Please check and try again.'
            )
        } else {
            setValidationError('')

            const form = e.currentTarget
            const formData = new FormData(form)

            try {
                const response = await fetch('/post/payment', {
                    method: 'post',
                    body: formData,
                })

                if (!response.ok) {
                    // Check if the response status is not in the 200-299 range (e.g., 404, 500)
                    throw new Error(
                        `HTTP Error: ${response.status} - ${response.statusText}`
                    )
                }

                const responseData = await response.json()
                console.log('response', responseData)
            } catch (error: any) {
                if (error instanceof TypeError) {
                    console.error('Network error:', error.message)
                } else {
                    console.error('Error:', error.message)
                }

                if (!validationError) {
                    setNetworkError(error.message)
                }
            }
        }
    }

    return (
        <CardFormWrapper $style={$cardFormStyle}>
            <FormHeading>Payment Information</FormHeading>
            <Form onSubmit={handleSubmit}>
                <input
                    hidden
                    id="cardIssuer"
                    name="cardIssuer"
                    type="text"
                    value={creditCardDetails.cardIssuer}
                    readOnly
                />
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
                        maxLength={
                            creditCardType
                                ? creditCardType?.lengths[
                                      creditCardType?.lengths.length - 1
                                  ] + creditCardType?.gaps.length
                                : 19
                        }
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
                            maxLength={creditCardType?.code?.size || 3}
                            onFocus={() => setFocus(true)}
                            onBlur={() => setFocus(false)}
                        />
                        <Span>{creditCardType?.code?.name || 'CVV'}</Span>
                    </Label>
                </BottomInputs>

                <Button type="submit" disabled={!isFormValid}>
                    Pay
                </Button>
            </Form>
            {validationError && (
                <ValidationError>{validationError}</ValidationError>
            )}
            {networkError && <ValidationError>{networkError}</ValidationError>}
        </CardFormWrapper>
    )
}

export default CardForm

import React from 'react'
import { CreditCardInterface } from '../types'

type CardFormProps = {
    creditCardDetails: CreditCardInterface
    onUpdateState: any
}

const CardForm = (props: CardFormProps) => {
    const { onUpdateState, creditCardDetails } = props

    const handleFormChange = (event: {
        target: { name: string; value: string }
    }) => {
        const { name, value } = event.target
        onUpdateState(name, value)
    }

    return (
        <div className="p-10 pt-44 rounded-md bg-white">
            <form className="flex w-full flex-wrap gap-4">
                <label className="relative w-full flex flex-col">
                    <span className="mb-2">Card Number</span>
                    <input
                        className="pl-4 py-4 border-2 border-black placeholder-gray-300"
                        type="text"
                        name="cardNumber"
                        placeholder="0000 0000 0000"
                        value={creditCardDetails.cardNumber}
                        autoComplete="off"
                        onChange={handleFormChange}
                        maxLength={16}
                        // isInvalid={}
                    />
                </label>

                <label className="relative w-full flex flex-col">
                    <span className="mb-2">Card Name</span>
                    <input
                        className="pl-4 py-4 border-2 border-black placeholder-gray-300"
                        type="text"
                        name="cardHolder"
                        value={creditCardDetails.cardHolder}
                        onChange={handleFormChange}
                    />
                </label>

                <label className="relative w-2/4 flex-1 flex flex-col">
                    <span className="mb-2">Expiration Date</span>
                    <input
                        className="pl-4 py-4 border-2 border-black placeholder-gray-300"
                        type="text"
                        name="expirationDate"
                        placeholder="MM/YY"
                        value={creditCardDetails.expirationDate}
                        onChange={handleFormChange}
                    />
                </label>

                <label className="relative w-2/4 flex-1 flex flex-col">
                    <span className="mb-2">
                        CVC/CVV
                        {/* CVV is the method used by Visa and CVC is used by Mastercard. */}
                    </span>
                    <input
                        className="pl-4 py-4 border-2 border-black placeholder-gray-300"
                        type="text"
                        name="cardCvv"
                        value={creditCardDetails.expirationDate}
                        onChange={handleFormChange}
                    />
                </label>
            </form>
        </div>
    )
}

export default CardForm

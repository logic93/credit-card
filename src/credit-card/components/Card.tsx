import React from 'react'
import { CreditCardInterface } from '../types'

const Card = (props: CreditCardInterface) => {
    const {
        cardCvv,
        cardHolder,
        cardMonth,
        cardNumber,
        cardYear,
        expirationDate,
        id,
    } = props

    return (
        <div className="max-w-screen-sm w-4/5 h-72 bg-red-100 rounded-xl relative text-white shadow-2xl top-24 m-auto">
            <img
                className="relative object-cover w-full h-full rounded-xl"
                src="/background.jpg"
            />

            <div className="w-full h-full absolute top-0 p-8 flex flex-col justify-between">
                <div className="flex justify-between">
                    <img className="w-14 h-14" src="/chip.png" />

                    <img className="w-14 h-14" src="/ma_symbol.svg" />
                </div>

                <div className="pt-1">
                    <p className="font-light">Card Number</p>
                    {cardNumber ? (
                        <p className="font-medium">{cardNumber}</p>
                    ) : (
                        <p className="font-medium">#### #### #### ####</p>
                    )}
                </div>

                <div className="flex justify-between">
                    <div className="">
                        <p className="font-light">Card Holder</p>
                        <p className="font-medium">Jean-Michel Melki</p>
                    </div>

                    <div className="">
                        <p className="font-light">Expires</p>
                        <p className="font-medium">02/24</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card

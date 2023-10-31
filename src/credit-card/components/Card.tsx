import React from 'react'
import styled, { css } from 'styled-components'
import { CreditCardProps } from '../types/types'
import { useFocus } from './FocusContext'

const CardWrapper = styled.div`
    background: transparent;
    align-self: center;
    border-radius: 8px;
    color: #d3d3d3;
    display: flex;
    flex-direction: row;
    font-family: 'OCRB';
    font-size: 20px;
    perspective: 1000px;
`

const CardInfo = styled.div<{ $style?: any }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    width: 310px;
    height: 185px;
    padding: 1em 1.3em;
    transition: transform 600ms ease;
    transform-style: preserve-3d;
    ${({ $style }) => $style && css($style)}
`

const CardItem = styled.div`
    width: 100%;
    height: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    overflow: hidden;
    z-index: 1;
    backface-visibility: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`

const Front = styled(CardItem)`
    transition: transform 300ms ease-in-out;
`

const Back = styled(CardItem)`
    transform: rotateY(180deg);
`

const TopImage = styled.img`
    height: 32px;
    position: absolute;
    top: 1em;
`

const Chip = styled(TopImage)`
    left: 1.3em;
`

const Issuer = styled(TopImage)`
    right: 1.3em;
`

const CardNumber = styled.div`
    font-size: 23.41px;
    letter-spacing: 2px;
    position: absolute;
    bottom: 3em;
    left: 0;
    right: 0;
    margin: 0 1.2em;
    text-align: start;
`

const CardHolder = styled.div`
    position: absolute;
    bottom: 1em;
    left: 1.3em;
    text-transform: uppercase;
    letter-spacing: -0.3px;
    width: 235px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const ValidThru = styled.div`
    position: absolute;
    bottom: 1em;
    right: 1.3em;
`

const Cvv = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #000;
    font-size: 16px;
`

const CvvLabel = styled(Cvv)`
    bottom: 44px;
`

const CvvBackground = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #f5f5f5;
    background-image: linear-gradient(
            45deg,
            #eee 25%,
            transparent 25%,
            transparent 75%,
            #eee 75%,
            #eee
        ),
        linear-gradient(
            45deg,
            #eee 25%,
            transparent 25%,
            transparent 75%,
            #eee 75%,
            #eee
        );
    background-size: 20px 20px;
    background-position:
        0 0,
        10px 10px;
`

const MagneticStripe = styled.div`
    background-color: #2a1d16;
    height: 22%;
    left: 0;
    position: absolute;
    top: 9%;
    width: 100%;
`

const Card: React.FC<CreditCardProps> = ({
    cardCvv,
    cardHolder,
    cardNumber,
    validThru,
}) => {
    const { isInputFocused } = useFocus()

    const unmask = (maskedValue: string, input: string): string => {
        const digits = input.replace(/\D/g, '')
        let inputIndex = 0

        return maskedValue.replace(/\*/g, () =>
            inputIndex < digits.length ? digits[inputIndex++] : '•'
        )
    }

    const maskedCardNumber = '**** **** **** ****'
    const maskedValidThru = '**/**'
    const maskedCvv = '****'
    const unmaskedCardNumber = unmask(maskedCardNumber, cardNumber)
    const unmaskedValidThru = unmask(maskedValidThru, validThru)
    const unmaskedCvv = unmask(maskedCvv, cardCvv)

    function replacePlaceholderWithText(
        placeholder: string,
        input: string
    ): string {
        return input.length > 0
            ? placeholder.replace(placeholder, input)
            : 'YOUR NAME HERE'
    }

    const updatedCardHolder = replacePlaceholderWithText(
        'YOUR NAME HERE',
        cardHolder
    )

    return (
        <CardWrapper>
            <CardInfo
                $style={{
                    transform: isInputFocused ? 'rotateY(-180deg)' : null,
                }}
            >
                <Front>
                    <Chip src="chip2.png" alt="chip" />
                    <Issuer src="visa.svg" alt="issuer" />
                    <CardNumber>{unmaskedCardNumber}</CardNumber>
                    <CardHolder>{updatedCardHolder}</CardHolder>
                    <ValidThru>{unmaskedValidThru}</ValidThru>
                </Front>

                <Back>
                    <CvvBackground>
                        <MagneticStripe />
                        <CvvLabel>Cvv</CvvLabel>
                        <Cvv>{unmaskedCvv}</Cvv>
                    </CvvBackground>
                </Back>
            </CardInfo>
        </CardWrapper>
    )
}

export default Card
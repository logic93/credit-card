import {
    Back,
    CardHolder,
    CardInfo,
    CardNumber,
    CardWrapper,
    Chip,
    Cvv,
    CvvBackground,
    CvvLabel,
    Front,
    Issuer,
    MagneticStripe,
    ValidThru,
} from './styles/card-styles'
import { ICreditCard } from '../types'
import { useFocus } from '../context/FocusContext'
import { getSVGImage } from '../utils'
const imgUrl = new URL('./assets/img.png', import.meta.url).href

interface CardProps {
    creditCardDetails: ICreditCard
    creditCardType?: any
    maskedCardNumber: string
}

const Card = ({
    creditCardType,
    maskedCardNumber,
    creditCardDetails,
}: CardProps) => {
    const { isInputFocused } = useFocus()

    const unmask = (maskedValue: string, input: string): string => {
        const digits = input.replace(/\D/g, '')
        let inputIndex = 0

        return maskedValue.replace(/\*/g, () =>
            inputIndex < digits.length ? digits[inputIndex++] : '•'
        )
    }

    const maskedValidThru = '**/**'
    const maskedCvv = '*'.repeat(creditCardType?.code?.size || 3)

    const unmaskedCardNumber = unmask(
        maskedCardNumber,
        creditCardDetails.cardNumber
    )
    const unmaskedValidThru = unmask(
        maskedValidThru,
        creditCardDetails.validThru
    )
    const unmaskedCvv = unmask(maskedCvv, creditCardDetails.cardCvv)

    function replacePlaceholderWithText(
        placeholder: string,
        input: string
    ): string {
        return input.length > 0
            ? 'YOUR NAME HERE'.replace(
                  placeholder,
                  creditCardDetails.cardHolder
              )
            : 'YOUR NAME HERE'
    }

    const updatedCardHolder =
        creditCardDetails.cardHolder.length > 0
            ? 'YOUR NAME HERE'.replace(
                  'YOUR NAME HERE',
                  creditCardDetails.cardHolder
              )
            : 'YOUR NAME HERE'

    return (
        <CardWrapper>
            <CardInfo
                $cardInfoStyle={{
                    transform: isInputFocused ? 'rotateY(-180deg)' : null,
                    color: creditCardType?.type && '#343434',
                }}
            >
                <Front
                    $cardItemStyle={{
                        background:
                            creditCardType?.type &&
                            'linear-gradient(25deg, #fff, #eee)',
                    }}
                >
                    <Chip src={getSVGImage('chip')} alt="chip" />
                    {creditCardType?.type && (
                        <Issuer
                            src={getSVGImage(creditCardType?.type)}
                            alt="issuer"
                        />
                    )}
                    <CardNumber>{unmaskedCardNumber}</CardNumber>
                    <CardHolder>{updatedCardHolder}</CardHolder>
                    <ValidThru>{unmaskedValidThru}</ValidThru>
                </Front>

                <Back>
                    <CvvBackground>
                        <MagneticStripe />
                        <CvvLabel>
                            {creditCardType?.code?.name || 'CVV'}
                        </CvvLabel>
                        <Cvv>{unmaskedCvv}</Cvv>
                    </CvvBackground>
                </Back>
            </CardInfo>
        </CardWrapper>
    )
}

export default Card

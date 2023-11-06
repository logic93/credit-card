import styled, { css } from 'styled-components'

export const CardWrapper = styled.div<{ $style?: any }>`
    background: transparent;
    align-self: center;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    font-family: 'OCR B';
    font-size: 20px;
    perspective: 1000px;
    color: #fff;
`

export const CardInfo = styled.div<{ $cardInfoStyle?: any }>`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    position: relative;
    width: 310px;
    height: 185px;
    padding: 1em 1.3em;
    transition:
        600ms ease transform,
        0.3s linear background,
        0.3s linear color;
    transform-style: preserve-3d;
    ${({ $cardInfoStyle }) => $cardInfoStyle && css($cardInfoStyle)}

    @media (max-width: 375px) {
        padding: 0;
    }
`

export const CardItem = styled.div<{ $cardItemStyle?: any }>`
    width: 100%;
    height: 100%;
    background: #343434;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 8px;
    overflow: hidden;
    z-index: 1;
    backface-visibility: hidden;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    ${({ $cardItemStyle }) => $cardItemStyle && css($cardItemStyle)}
`

export const Front = styled(CardItem)`
    transition: 300ms ease-in-out transform;
`

export const Back = styled(CardItem)`
    transform: rotateY(180deg);
`

export const Chip = styled.img`
    position: absolute;
    top: 1em;
    height: 32px;
    left: 1.3em;
`

export const Issuer = styled.img`
    position: absolute;
    top: 1em;
    height: 42px;
    right: 1.3em;
`

export const CardNumber = styled.div`
    position: absolute;
    bottom: 3em;
    left: 0;
    right: 0;
    margin: 0 1.2em;
    text-align: start;
    font-size: 23px;
`

export const CardHolder = styled.div`
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

export const ValidThru = styled.div`
    position: absolute;
    bottom: 1em;
    right: 1.3em;
`

export const Cvv = styled.div`
    position: absolute;
    bottom: 20px;
    right: 20px;
    color: #343434;
    font-size: 16px;
`

export const CvvLabel = styled(Cvv)`
    bottom: 44px;
`

export const CvvBackground = styled.div`
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

export const MagneticStripe = styled.div`
    background-color: #000;
    height: 22%;
    left: 0;
    position: absolute;
    top: 9%;
    width: 100%;
`

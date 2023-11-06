import styled, { css } from 'styled-components'

export const CardFormWrapper = styled.div<{ $style: any }>`
    background-color: #fff;
    border-radius: 8px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 0;
    padding: 20px;
    ${({ $style }) => $style && css($style)}
    font-family: 'Petra Sans';
    line-height: 1.5;

    @media (max-width: 560px) {
        width: calc(100% - 40px - 3em);
    }

    @media (max-width: 425px) {
        width: calc(362px - 40px);
    }

    @media (max-width: 375px) {
        width: calc(280px + 10px);
    }

    @media (max-width: 350px) {
        width: calc(250px + 10px);
    }
`

export const FormHeading = styled.h1`
    margin: 0;
    font-size: calc(24px + 0.390625vw);
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    margin: 64px 0 0;
`

export const Label = styled.label<{ $noMargin?: boolean }>`
    display: flex;
    flex-direction: column;
    margin: ${({ $noMargin }) => ($noMargin ? 0 : '0 0 52px 0')};
    position: relative;
`

export const Span = styled.span`
    color: #a4a4a4;
    display: block;
    font-weight: 500;
    position: absolute;
    top: -32px;
    transition: 0.3s ease all;
`

export const Input = styled.input`
    background: transparent;
    border-radius: 2px;
    border: 1px solid #a4a4a4;
    color: #343434;
    font-size: 20px;
    height: 3em;
    outline: none;
    padding: 0 12px;
    transition: 0.3s ease all;
    text-transform: capitalize;
    font-family: 'Petra Sans';

    &:focus {
        border: 1px solid #343434;
    }

    &:focus + ${Span} {
        color: #343434;
    }
`

export const BottomInputs = styled.div`
    column-gap: 16px;
    display: flex;
    flex-direction: row;
    margin: 0 0 32px 0;
    position: relative;

    ${Label} {
        width: 100%;
        overflow: auto;
        position: static;
    }
`

export const Button = styled.button`
    background-color: #343434;
    color: #fff;
    height: 3em;
    border: none;
    border-radius: 2px;
    font-size: 16px;
    transition: 0.3s ease all;
    outline: none;

    &:disabled {
        background-color: rgba(52, 52, 52, 0.3);
    }

    &:hover:not([disabled]) {
        cursor: pointer;
    }
`

export const ValidationError = styled.div<{ $isOpen?: boolean }>`
    padding: 20px 0 0 0;
    margin: 0;
    color: #cf0a0a;
    text-align: center;
    font-weight: 600;
`

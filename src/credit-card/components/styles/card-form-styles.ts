import styled, { css } from 'styled-components'

export const CardFormWrapper = styled.div<{ $style: any }>`
    background-color: #fff;
    border-radius: 4px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    display: flex;
    flex-direction: column;
    margin: 2em 0 0 0;
    padding: calc(28px + 1em) 1em 1em;
    ${({ $style }) => $style && css($style)}

    @media (max-width: 550px) {
        width: unset;
        align-self: auto;
        margin: 2em;
    }
`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
`

export const Label = styled.label<{ $noMargin?: boolean }>`
    display: flex;
    flex-direction: column;
    margin: ${({ $noMargin }) => ($noMargin ? 0 : '0 0 3em 0')};
    position: relative;
`

export const Span = styled.span`
    color: #a4a4a4;
    display: block;
    font-weight: bold;
    position: absolute;
    top: -28px;
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
    padding: 0 0 0 12px;
    transition: 0.3s ease all;
    text-transform: capitalize;

    &:focus {
        border: 1px solid #343434;
    }

    &:focus + ${Span} {
        color: #343434;
    }
`

export const BottomInputs = styled.div`
    column-gap: 1em;
    display: flex;
    flex-direction: row;
    margin: 0 0 2em 0;
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
    height: 40px;
    border: none;
    border-radius: 4px;
    font-size: 1em;
    transition: 0.3s ease all;
    outline: none;

    &:disabled {
        background-color: rgba(0, 0, 0, 0.2);
    }

    &:hover:not([disabled]) {
        cursor: pointer;
    }
`

export const ValidationError = styled.div<{ $isOpen?: boolean }>`
    padding: 1em 0 0 0;
    margin: 0;
    color: #cf0a0a;
`

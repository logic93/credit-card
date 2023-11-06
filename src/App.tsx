import { useEffect, useState } from 'react'
import CreditCard from './credit-card/CreditCard'
import { FocusProvider } from './credit-card/context/FocusContext'
import styled from 'styled-components'

const App = () => {
    const THEME_COLORS = {
        light: '#fff',
        dark: '#000',
    }

    const [bgColor, setBgColor] = useState(THEME_COLORS['light'])

    const Themes = styled.div`
        z-index: 10;
        position: fixed;
        left: calc(max(34px, 2vmin) - 0.15em);
        bottom: max(24px, 2vmin);
        transform-origin: left bottom;
        transform: rotate(-90deg);
        mix-blend-mode: difference;
        display: flex;
        column-gap: 16px;
        cursor: pointer;
        color: #fff;
    `

    const ThemeButton = styled.div`
        font-weight: 600;
        display: flex;
        align-items: center;
        column-gap: 5px;
        font-weight: 400;
        text-transform: uppercase;
    `

    const Box = styled.div<{ before?: any }>`
        &:before {
            content: '${(props) => props.before}'
    `

    const Text = styled.div`
        font-size: 16px;
        letter-spacing: 0.3px;
    `

    const handleTheme = (e: { currentTarget: { id: string } }) => {
        if (e.currentTarget.id === THEME_COLORS['dark']) {
            setBgColor(THEME_COLORS['dark'])
        }

        if (e.currentTarget.id === THEME_COLORS['light']) {
            setBgColor(THEME_COLORS['light'])
        }
    }

    useEffect(() => {
        document.body.style.backgroundColor = bgColor
    }, [bgColor])

    return (
        <FocusProvider>
            <div className="App">
                <CreditCard
                    $style={{
                        justifyContent: 'center',
                        height: '100%',
                    }}
                    $cardFormStyle={{ width: 'auto', alignSelf: 'center' }}
                />
            </div>

            {/* <Themes>
                <ThemeButton id={THEME_COLORS['light']} onClick={handleTheme}>
                    <Box
                        before={bgColor === THEME_COLORS['light'] ? '■' : '□'}
                    ></Box>
                    <Text>Light</Text>
                </ThemeButton>

                <ThemeButton id={THEME_COLORS['dark']} onClick={handleTheme}>
                    <Box
                        before={bgColor === THEME_COLORS['dark'] ? '■' : '□'}
                    ></Box>
                    <Text>Dark</Text>
                </ThemeButton>
            </Themes> */}
        </FocusProvider>
    )
}

export default App

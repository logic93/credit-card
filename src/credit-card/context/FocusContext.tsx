import { createContext, useContext, ReactNode, useState } from 'react'

interface FocusContextType {
    isInputFocused: boolean
    setFocus: (isFocused: boolean) => void
}

const FocusContext = createContext<FocusContextType | undefined>(undefined)

export const useFocus = () => {
    const context = useContext(FocusContext)
    if (context === undefined) {
        throw new Error('useFocus must be used within a FocusProvider')
    }
    return context
}

interface FocusProviderProps {
    children: ReactNode
}

export const FocusProvider = ({ children }: FocusProviderProps) => {
    const [isInputFocused, setIsInputFocused] = useState(false)

    const setFocus = (isFocused: boolean) => {
        setIsInputFocused(isFocused)
    }

    return (
        <FocusContext.Provider value={{ isInputFocused, setFocus }}>
            {children}
        </FocusContext.Provider>
    )
}

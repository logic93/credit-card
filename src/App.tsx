import CreditCard from './credit-card/CreditCard'
import { FocusProvider } from './credit-card/components/FocusContext'

const App = () => {
    return (
        <FocusProvider>
            <div className="App">
                <CreditCard $style={{ margin: 'auto' }} />
            </div>
        </FocusProvider>
    )
}

export default App

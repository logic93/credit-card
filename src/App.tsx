import CreditCard from './credit-card/CreditCard'
import { FocusProvider } from './credit-card/context/FocusContext'

const App = () => (
    <FocusProvider>
        <div className="App">
            <CreditCard
                $style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    justifyContent: 'center',
                    height: '100%',
                }}
                $cardFormStyle={{ width: 'auto', alignSelf: 'center' }}
            />
        </div>
    </FocusProvider>
)

export default App

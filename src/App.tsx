import CreditCard from './credit-card/CreditCard'
import { FocusProvider } from './credit-card/context/FocusContext'

const App = () => (
    <FocusProvider>
        <div className="App">
            <CreditCard
                $style={{
                    backgroundColor: '#F4F4F4',
                    justifyContent: 'center',
                    height: '100%',
                }}
                $cardFormStyle={{ width: 'auto', alignSelf: 'center' }}
            />
        </div>
    </FocusProvider>
)

export default App

import { useState } from "react"
import CreditCard from "./credit-card/CreditCard"

const App = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  return (
    <div className="App">
      <CreditCard cardNumber={cardNumber} cardHolder={cardHolder} />
    </div>
  )
}

export default App

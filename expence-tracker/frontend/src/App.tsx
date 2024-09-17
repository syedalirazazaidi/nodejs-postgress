import { useState } from 'react'

import './App.css'
import { Button } from './components/ui/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <h1 className="text-3xl bg-green-900 ">
      Hello world! this is 
      <Button variant={'destructive'}>Click Me</Button>

    </h1>
  )
}

export default App

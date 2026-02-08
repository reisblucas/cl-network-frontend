import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card'

function App() {
  const [username, setUsername] = useState('')

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to CodeLeap network!</CardTitle>
          <CardDescription>Please enter your username</CardDescription>
        </CardHeader>

        <CardFooter>
          <Button type="submit" className="w-4/12" disabled={!username}>
            Enter
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default App

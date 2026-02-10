import { AppProvider } from './app/provider'
import { AppRouter } from './app/router'
import { Flex } from './components/common'

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  )
}

export default App

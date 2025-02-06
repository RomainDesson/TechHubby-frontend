import { FrontPage } from './components/FrontPage/FrontPageLogic'
import { ChatPage } from './components/ChatPage/ChatPageLogic'
import './index.css'
import { useUserStore } from './stores/userStore'

function App() {
  const { isLoggedIn } = useUserStore()

  return (
    isLoggedIn ? <ChatPage /> : <FrontPage />
  )
}

export default App

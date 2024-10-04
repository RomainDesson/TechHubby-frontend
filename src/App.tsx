import { FrontPageLogic } from './components/FrontPage/FrontPageLogic'
import { ChatPageLogic } from './components/ChatPage/ChatPageLogic'
import './index.css'
import { useUserStore } from './stores/userStore'

function App() {
  const { isLoggedIn } = useUserStore()

  return (
    isLoggedIn ? <ChatPageLogic /> : <FrontPageLogic />
  )
}

export default App

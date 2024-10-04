import { create } from 'zustand'
import { Messages, Message } from '../components/ChatPage/types'

interface ChatStoreState {
  messages: Messages
  addMessageToMessages: (message: Message) => void
}

export const useChatStore = create<ChatStoreState>((set) => ({
  messages: [],
  addMessageToMessages: (message) => set((state) => ({
    messages: [...state.messages, message]
  })),
}))

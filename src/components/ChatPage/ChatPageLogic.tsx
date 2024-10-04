import { ChatPageUI } from './ChatPageUi'
import { socket } from '../../utils/socket'
import { useEffect, useState, useRef } from 'react'
import { useUserStore } from '../../stores/userStore'
import { useChatStore } from '../../stores/chatStore'

export const ChatPageLogic = () => {
    const { username, userInterests, setUserSocketId } = useUserStore()
    const { messages, addMessageToMessages } = useChatStore()
    const [inputMessage, setInputMessage] = useState('')
    const [isTyping, setIsTyping] = useState('')
    const [otherUserName, setOtherUserName] = useState('')
    const [otherUserInterests, setOtherUserInterests] = useState<string[]>([])
    const [waitingForOtherUser, setWaitingForOtherUser] = useState(true)
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        socket.on('connect', () => {
            if (!socket.id) return
            setUserSocketId(socket.id)
        });

        socket.emit('joinRoom', username, userInterests )

        socket.on('userJoined', (users) => {
            if (users.length === 2) {
                console.log(users)
                setOtherUserName(users.find((user: { username: string, interests: string[] }) => user.username !== username).username)
                setOtherUserInterests(users.find((user: { username: string, interests: string[] }) => user.username !== username).interests)
                setWaitingForOtherUser(false)
            }
        })

        socket.on('userDisconnected', () => {
            setWaitingForOtherUser(true)
        })

        socket.on('receiveMessage', (message, senderId) => {
            addMessageToMessages({ message, senderId })
        })

        socket.on('typing', (senderId, isTyping) => {
            if (!isTyping && senderId !== socket.id) {
                setIsTyping('')
            }
            if (senderId !== socket.id && isTyping) {
                setIsTyping(senderId)
            }
        })

    }, [])

    useEffect(() => {
        if (inputMessage.length > 0) {
            socket.emit('typing', socket.id, true)
        }
    }, [inputMessage])

    const handleSendMessage = () => {
        if (inputMessage.length === 0) return

        socket.emit('sendMessage', inputMessage, socket.id)
        setInputMessage('')
        socket.emit('typing', socket.id, false)
    }

    if (!socket.id) return null

    return (
        <ChatPageUI 
            handleSendMessage={handleSendMessage} 
            inputMessage={inputMessage} 
            setInputMessage={setInputMessage} 
            messages={messages} 
            socketId={socket.id}
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            otherUserName={otherUserName}
            waitingForOtherUser={waitingForOtherUser}
            otherUserInterests={otherUserInterests}
        />
    )
}
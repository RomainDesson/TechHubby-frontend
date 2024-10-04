import { Messages } from "./types"
import { FaCode, FaServer, FaShieldAlt, FaRobot, FaCloud, FaCubes, FaCloudDownloadAlt, FaBullhorn } from 'react-icons/fa'
interface PropsTypes {
    messages: Messages
    handleSendMessage: () => void
    inputMessage: string
    setInputMessage: (message: string) => void
    socketId: string
    isTyping: string
    messagesEndRef: React.RefObject<HTMLDivElement>
    otherUserName: string
    waitingForOtherUser: boolean
    otherUserInterests: string[]
}

export const ChatPageUI = ({ handleSendMessage, inputMessage, setInputMessage, messages, socketId, isTyping, messagesEndRef, otherUserName, waitingForOtherUser, otherUserInterests }: PropsTypes) => {

    if (waitingForOtherUser) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-300">
                <div className="text-2xl font-semibold mb-4">En attente d'un autre utilisateur...</div>
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    const interests = [
        { name: 'Development', icon: <FaCode size={24} color="#818cf8"/> },
        { name: 'DevOps', icon: <FaServer size={24} color="#818cf8"/> },
        { name: 'Security', icon: <FaShieldAlt size={24} color="#818cf8"/> },
        { name: 'AI', icon: <FaRobot size={24} color="#818cf8"/> },
        { name: 'Cloud', icon: <FaCloud size={24} color="#818cf8"/> },
        { name: 'Web3', icon: <FaCubes size={24} color="#818cf8"/> },
        { name: 'Saas', icon: <FaCloudDownloadAlt size={24} color="#818cf8"/> },
        { name: 'Marketing', icon: <FaBullhorn size={24} color="#818cf8"/> }
    ]

    return (
        <div className="flex flex-col h-screen bg-gray-900 text-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9ImEiIHg9Ii0yMCUiIHk9Ii0yMCUiIHdpZHRoPSIxNDAlIiBoZWlnaHQ9IjE0MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgogICAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjA1IiBudW1PY3RhdmVzPSIyIiBzZWVkPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiByZXN1bHQ9InR1cmJ1bGVuY2UiLz4KICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIgaW49InR1cmJ1bGVuY2UiIHJlc3VsdD0iY29sb3JtYXRyaXgiLz4KICAgICAgPGZlQ29tcG9zaXRlIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImNvbG9ybWF0cml4IiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazE9IjAiIGsyPSIuNSIgazM9Ii41IiBrND0iMCIgcmVzdWx0PSJjb21wb3NpdGUiLz4KICAgICAgPGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iY29tcG9zaXRlIiBtb2RlPSJvdmVybGF5IiByZXN1bHQ9ImJsZW5kIi8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+Cjwvc3ZnPg==')] opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent opacity-40"></div>

            <div className="bg-gray-800/40 p-4 border-b border-blue-300/30 backdrop-blur-xl z-10">
                <h2 className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    <span className="mb-2 sm:mb-0">Discussion avec {otherUserName}</span>
                    <div className="flex flex-wrap items-center justify-start sm:justify-around gap-2 sm:gap-4">
                        <span className="text-sm text-gray-400 w-full sm:w-auto">Interests:</span>
                        {otherUserInterests.map((interest, index) => (
                            <div key={index} className="flex flex-row items-center gap-2">
                                {interests.find(i => i.name === interest)?.icon || '❓'}
                                <span className="text-sm text-gray-400">{interest}</span>
                            </div>
                        ))}
                    </div>
                </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10">
                {messages.map((message, index) => (
                    <div key={index} className={`flex flex-col ${message.senderId === socketId ? 'items-end' : 'items-start'}`}>
                        <span className="text-xs text-gray-400 mb-1">{message.senderId === socketId ? 'Moi' : otherUserName}</span>
                        <div className={`bg-${message.senderId === socketId ? 'blue-500/70' : 'gray-700/70'} rounded-2xl rounded-${message.senderId === socketId ? 'tr' : 'tl'}-none p-3 max-w-xs backdrop-blur-sm`}>
                            <p>{message.message}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {isTyping && isTyping !== socketId && (
                <div className="absolute bottom-40 left-0 right-0 flex justify-center z-20">
                    <p className="text-sm text-gray-400 bg-gray-700/50 rounded-full px-4 py-2 backdrop-blur-sm">L'autre personne est en train d'écrire...</p>
                </div>
            )}

            <div className="p-4 border-t border-blue-300/30 bg-gray-800/40 backdrop-blur-xl z-10">
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Tapez votre message..."
                        className="flex-1 bg-gray-700/30 text-gray-100 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSendMessage();
                            }
                        }}
                    />
                    <button 
                        className="ml-2 bg-gradient-to-r bg-blue-500 text-white rounded-full p-2 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                        onClick={() => handleSendMessage()}
                    >
                        Envoyer
                    </button>
                </div>
            </div>
        </div>
    )
}
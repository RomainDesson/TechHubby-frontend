interface PropsTypes {
    username: string
    handleUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleJoin: () => void
    interests: { name: string, icon: React.ReactNode }[]
    handleInterestToggle: (interest: string) => void
    selectedInterests: string[]
    animate: boolean
    connectedUsers: number
}

export const FrontPageUI = ({ username, handleUsernameChange, handleJoin, interests, handleInterestToggle, selectedInterests, animate, connectedUsers }: PropsTypes) => {
    return (
        <div className="flex items-center justify-center min-h-screen w-full bg-gray-900 text-gray-300 overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj4KICA8ZGVmcz4KICAgIDxmaWx0ZXIgaWQ9ImEiIHg9Ii0yMCUiIHk9Ii0yMCUiIHdpZHRoPSIxNDAlIiBoZWlnaHQ9IjE0MCUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgcHJpbWl0aXZlVW5pdHM9InVzZXJTcGFjZU9uVXNlIiBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9InNSR0IiPgogICAgICA8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjA1IiBudW1PY3RhdmVzPSIyIiBzZWVkPSIyIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIiByZXN1bHQ9InR1cmJ1bGVuY2UiLz4KICAgICAgPGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIgaW49InR1cmJ1bGVuY2UiIHJlc3VsdD0iY29sb3JtYXRyaXgiLz4KICAgICAgPGZlQ29tcG9zaXRlIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImNvbG9ybWF0cml4IiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazE9IjAiIGsyPSIuNSIgazM9Ii41IiBrND0iMCIgcmVzdWx0PSJjb21wb3NpdGUiLz4KICAgICAgPGZlQmxlbmQgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iY29tcG9zaXRlIiBtb2RlPSJvdmVybGF5IiByZXN1bHQ9ImJsZW5kIi8+CiAgICA8L2ZpbHRlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+Cjwvc3ZnPg==')] opacity-30 animate-pulse"></div>
        
        <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent opacity-40"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
        
        <div className="absolute top-4 right-4 bg-gray-800/40 rounded-lg px-4 py-2 border border-blue-300/30 backdrop-blur-xl">
            <p className="text-lg font-medium text-blue-200">
                <span className="text-green-400 mr-2">●</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    {connectedUsers} online users
                </span>
            </p>
        </div>
        
        <div className={`w-full max-w-2xl p-8 rounded-2xl bg-gray-800/40 shadow-2xl border border-blue-300/30 backdrop-blur-xl relative z-10 transition-all duration-1000 ease-out ${animate ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <h1 className="text-5xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 animate-gradient">
            TechHubby
            </h1>
            <form onSubmit={handleJoin} className="space-y-8">
                <div className="relative group">
                    <p className="text-lg font-medium text-blue-200 mb-2 block">
                    Username
                </p>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => handleUsernameChange(e)}
                    required
                    className="w-full h-14 p-4 bg-gray-700/30 border-blue-300/30 focus:border-blue-400 text-gray-100 placeholder-gray-400 rounded-lg transition-all duration-300"
                    placeholder="Enter an username"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none"></div>
            </div>
            <div>
                <p className="text-lg font-medium text-blue-200 mb-4 block">
                Interests
                </p>
                <div className="grid grid-cols-4 gap-4">
                {interests.map((interest) => (
                    <button
                    key={interest.name}
                    type="button"
                    onClick={() => handleInterestToggle(interest.name)}
                    className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-300 ${
                        selectedInterests.includes(interest.name)
                        ? 'bg-blue-500/30 border-blue-400'
                        : 'bg-gray-700/30 border-blue-300/30 hover:bg-blue-500/20'
                    } border-2 group`}
                    >
                    <div className="w-12 h-12 mb-2 relative overflow-hidden rounded-md">
                        <div className="w-12 h-12 flex items-center justify-center text-xl">{interest.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-gray-300 group-hover:text-blue-300 transition-colors duration-300">
                        {interest.name}
                    </span>
                    </button>
                ))}
                </div>
            </div>
            <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-blue-500/50 relative overflow-hidden group"
            >
            <span className="relative z-10">Start a random chat</span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></span>
          </button>
        </form>
      </div>
    </div>
    )
}
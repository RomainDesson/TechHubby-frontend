import { useState, useEffect } from 'react'
import { FrontPageUI } from './FrontPageUI'
import { useUserStore } from '../../stores/userStore'
import { socket } from '../../utils/socket'
import { interests } from '../constants'

const FrontPageLogic = () => {
    const { username, setUsername, userInterests, setUserInterests, setIsLoggedIn } = useUserStore()
    const [connectedUsers, setConnectedUsers] = useState(0)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        socket.on('connectedUsers', (count: number) => {
            setConnectedUsers(count)
        })
        setAnimate(true)
    }, [])

    const handleUsernameChange = (newUsername: string) => {
        setUsername(newUsername)
    }

    const handleJoin = () => {
        setIsLoggedIn(true)
    }

    const handleInterestToggle = (interest: string) => {
        const updatedInterests = userInterests.includes(interest)
            ? userInterests.filter((item: string) => item !== interest)
            : [...userInterests, interest];

        setUserInterests(updatedInterests);
    }

    return (
        <FrontPageUI
            username={username}
            handleUsernameChange={handleUsernameChange}
            handleJoin={handleJoin}
            interests={interests}
            handleInterestToggle={handleInterestToggle}
            selectedInterests={userInterests}
            animate={animate}
            connectedUsers={connectedUsers}
        />
    )
}
export { FrontPageLogic as FrontPage }

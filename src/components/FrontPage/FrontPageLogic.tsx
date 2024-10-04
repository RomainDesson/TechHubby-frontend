import { useState, useEffect } from 'react'
import { FrontPageUI } from './FrontPageUI'
import { useUserStore } from '../../stores/userStore'
import { FaCode, FaServer, FaShieldAlt, FaRobot, FaCloud, FaCubes, FaCloudDownloadAlt, FaBullhorn } from 'react-icons/fa'
import { socket } from '../../utils/socket'

export const FrontPageLogic = () => {
    const { username, setUsername, userInterests, setUserInterests, setIsLoggedIn } = useUserStore()
    const [connectedUsers, setConnectedUsers] = useState(0)
    const interests = [
        { name: 'Development', icon: <FaCode /> },
        { name: 'DevOps', icon: <FaServer /> },
        { name: 'Security', icon: <FaShieldAlt /> },
        { name: 'AI', icon: <FaRobot /> },
        { name: 'Cloud', icon: <FaCloud /> },
        { name: 'Web3', icon: <FaCubes /> },
        { name: 'Saas', icon: <FaCloudDownloadAlt /> },
        { name: 'Marketing', icon: <FaBullhorn /> }
    ]
    const [animate, setAnimate] = useState(false)
    
    useEffect(() => {
        socket.on('connectedUsers', (count: number) => {
            setConnectedUsers(count)
        })
        setAnimate(true)
    }, [])
    
    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleJoin = () => {
        setIsLoggedIn(true)
    }

    const handleInterestToggle = (interest: string) => {
        if (userInterests.includes(interest)) {
            setUserInterests(userInterests.filter(i => i !== interest))
        } else {
            setUserInterests([...userInterests, interest])
        }
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
import { Menu } from 'lucide-react'
import React from 'react'


const Header = () => {
    const[isOpened, setIsOpened] = React.useState(false)

    const toggleMenu = () => {
        setIsOpened(!isOpened)
    }
  return (
    <header style={{display: "flex", justifyContent: "flex-end", justifyContent: "space-around"}}>
        <h1>DailyDumps</h1>
        <div style={{}}onClick={toggleMenu}>
            <Menu/>
        </div>

        {isOpened && (
            <div style={{top: "20", right: "0"}}>
                <ul>
                    <li>Home</li>
                    <li>Favorites</li>
                    <li><button>Log Out</button></li>
                </ul>
            </div>
        )}
    </header>
  )
}

export default Header
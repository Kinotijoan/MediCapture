import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Gallery from './componets/Gallery/Gallery'
// import Login from './Auth/Login'
import { Route, Routes } from 'react-router-dom'
import UploadImage from './componets/Gallery/UploadImage'
import Login from './componets/Auth/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Gallery/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App

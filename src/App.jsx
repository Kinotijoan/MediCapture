import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Gallery from './componets/Gallery/Gallery'
import Login from './Auth/Login'
import { Route, Routes } from 'react-router-dom'
import UploadImage from './componets/Gallery/UploadImage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Gallery/>} />
        <Route path="/login" element={<Login />} />
        <Route path='/upload'element={<UploadImage/>} />
      </Routes>
    </>
  )
}

export default App

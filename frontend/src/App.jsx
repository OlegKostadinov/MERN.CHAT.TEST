import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate} from 'react-router-dom'
import SettingsPage from './pages/SettingsPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import SignUpPage from './pages/SignUpPage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'

function App() {
  
   const {authUser, checkAuth, isCheckingAuth,onlineUsers} = useAuthStore();
   console.log({onlineUsers})
    useEffect(() => {
      checkAuth()
    },[checkAuth]);

    console.log({authUser});

    if (isCheckingAuth && !authUser)
     
       return (
      <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-ping'></Loader>
      </div>
    )
  return (
    <div>
    
    <Navbar />

    <Routes>
    <Route path="/" element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
    <Route path="/login" element={!authUser ? <LoginPage/> : <Navigate to="/"/>}/>
    <Route path="/signup" element={!authUser ? <SignUpPage/>:<Navigate to="/"/>}/>
    <Route path="/settings" element={authUser ? <SettingsPage/> : <Navigate to="/login"/>}/>
    <Route path="*" element={<NotFoundPage/>}/>
    </Routes>
    
    <Toaster/>

    </div>
    
  )
}

export default App

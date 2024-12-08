import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import '../src/index.css'
import Chat from './pages/chat'
import ChatBoard from './components/chatdash'
const router = createBrowserRouter([{
  children: [{
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/',
    element: <Chat></Chat>
  },
  {
    path: '/chat',
    element: <ChatBoard></ChatBoard>
  }
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
    </RouterProvider>
  </React.StrictMode>,
)

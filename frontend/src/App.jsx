import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import Dashboard from './Dashboard' // <--- 1. Import Dashboard

function App() {
  return (
    <BrowserRouter>
      
      <nav className="bg-gray-800 p-4 text-white flex justify-center gap-8 border-b border-gray-700">
        <Link to="/register" className="text-blue-400 font-bold hover:underline">Register</Link>
        <Link to="/login" className="text-green-400 font-bold hover:underline">Login</Link>
        {/* Dashboard Link for testing */}
        <Link to="/dashboard" className="text-yellow-400 font-bold hover:underline">Dashboard (VIP)</Link>
      </nav>

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* <--- 2. Add Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} /> 
        
        <Route path="/" element={<Register />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
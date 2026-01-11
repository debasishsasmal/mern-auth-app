import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom' 

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const [message, setMessage] = useState('')
  const navigate = useNavigate() // Hook for navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('Logging in... ⏳')

    try {
      const response = await axios.post('http://localhost:3000/api/login', formData)
      
      setMessage('Login Successful! ✅')
      
      // Save the token to the browser's Local Storage
      localStorage.setItem('token', response.data.token)
      
      // Log the token to the console for debugging/testing
      console.log("Token received:", response.data.token)

      // Alert the user after 1 second
      setTimeout(() => {
        alert("Login Successful! Check Console for Token.")
      }, 1000)

    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || 'Invalid Credentials'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-green-400">Login</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <input 
            type="email" 
            name="email" 
            placeholder="Enter Email" 
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-500"
            onChange={handleChange}
          />

          <input 
            type="password" 
            name="password" 
            placeholder="Enter Password" 
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-green-500"
            onChange={handleChange}
          />

          <button type="submit" className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded transition">
            Login Now 🔓
          </button>

        </form>

        {message && <p className="mt-4 text-center text-yellow-300">{message}</p>}
      
      </div>
    </div>
  )
}

export default Login
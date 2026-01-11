import { useState } from 'react'
import axios from 'axios'

function Register() {
  // 1. State to store user input
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // State for showing messages (Success/Error)
  const [message, setMessage] = useState('')

  // 2. Handle Input Change (Jab user type karega)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // 3. Handle Form Submit (Jab button dabayenge)
  const handleSubmit = async (e) => {
    e.preventDefault() // Page reload hone se roko
    setMessage('Sending Data... ⏳')

    try {
      // Backend ko request bhejo (Make sure URL is correct)
      const response = await axios.post('http://localhost:3000/api/register', formData)
      
      // Agar success hua:
      setMessage('Success! User Registered. 🎉')
      console.log(response.data)
      
    } catch (error) {
      // Agar error aaya:
      setMessage('Error: ' + (error.response?.data?.message || 'Something went wrong'))
      console.error(error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Register</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {/* Name Input */}
          <input 
            type="text" 
            name="name" 
            placeholder="Enter Name" 
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          {/* Email Input */}
          <input 
            type="email" 
            name="email" 
            placeholder="Enter Email" 
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          {/* Password Input */}
          <input 
            type="password" 
            name="password" 
            placeholder="Enter Password" 
            className="p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />

          {/* Submit Button */}
          <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded transition">
            Register Now 🚀
          </button>

        </form>

        {/* Message Show karne ke liye */}
        {message && <p className="mt-4 text-center text-yellow-300">{message}</p>}
      
      </div>
    </div>
  )
}

export default Register
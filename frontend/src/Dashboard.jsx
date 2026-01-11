import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null); // State to store user data

    useEffect(() => {
        // 1. Get the token from browser storage
        const token = localStorage.getItem('token');

        // 2. If no token found, redirect to Login Page immediately
        if (!token) {
            navigate('/login');
            return;
        }

        // 3. If token exists, fetch data from Backend
        axios.get('http://localhost:3000/api/dashboard', {
            headers: {
                'auth-token': token // Send token in header (Like we did in Thunder Client)
            }
        })
        .then(response => {
            // Success: Store user data in state
            setUser(response.data.user);
        })
        .catch(error => {
            // Error: If token is invalid/expired, redirect to login
            console.error("Access Denied:", error);
            localStorage.removeItem('token'); // Clear invalid token
            navigate('/login');
        });

    }, [navigate]); // Run this logic when page loads

    // Logout Function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Delete token
        navigate('/login'); // Go back to login
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
            
            {/* Show this only when user data is loaded */}
            {user ? (
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg text-center w-96">
                    <h1 className="text-3xl font-bold text-yellow-400 mb-4">🎉 VIP Dashboard</h1>
                    
                    <div className="mb-6 text-left bg-gray-700 p-4 rounded">
                        <p className="text-gray-400 text-sm">User ID:</p>
                        <p className="font-mono text-green-400 mb-2">{user.id}</p>
                        
                        <p className="text-gray-400 text-sm">Name:</p>
                        <p className="text-xl font-semibold mb-2">{user.name || "User"}</p>
                        
                        <p className="text-gray-400 text-sm">Email:</p>
                        <p className="text-blue-300">{user.email}</p>
                    </div>

                    <button 
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-6 rounded transition w-full"
                    >
                        Logout 🚪
                    </button>
                </div>
            ) : (
                <p className="text-xl animate-pulse">Loading VIP Data... ⏳</p>
            )}

        </div>
    );
}

export default Dashboard;
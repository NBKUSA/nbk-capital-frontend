import React, { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('Loading...')

  useEffect(() => {
    fetch('https://nbk-capital-backend.onrender.com/api/transaction/status') 
      .then(response => response.json())
      .then(data => {
        setStatus('Backend Connected: ' + JSON.stringify(data))
      })
      .catch(error => {
        console.error('Error:', error)
        setStatus('Failed to connect to backend.')
      })
  }, [])

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '2rem' }}>
      <h1>DEFENDER</h1>
      <p>Welcome to the frontend deployed on Vercel.</p>
      <p>Status: {status}</p>
    </div>
  )
}

export default App

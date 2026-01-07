import React from 'react'
import UserTable from './components/UserTable'

export default function App(){
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Customer Management</h1>
          <p className="text-gray-600 mt-2 text-lg">View and manage all customers</p>
        </header>
        <UserTable />
      </div>
    </div>
  )
}

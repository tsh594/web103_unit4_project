import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewCars from './pages/ViewCars'
import EditCar from './pages/EditCar'
import CreateCar from './pages/CreateCar'
import CarDetails from './pages/CarDetails'
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <Navigation />

      <Routes>
        <Route path='/' element={<CreateCar title='BOLT BUCKET | Customize' />} />
        <Route path='/customcars' element={<ViewCars title='BOLT BUCKET | Custom Cars' />} />
        <Route path='/customcars/:id' element={<CarDetails title='BOLT BUCKET | View' />} />
        <Route path='/edit/:id' element={<EditCar title='BOLT BUCKET | Edit' />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>

    </div>
  )
}

export default App
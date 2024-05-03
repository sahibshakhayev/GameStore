import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Games from './components/Games'
import Cart from './components/Cart'
import Admin from './components/Admin'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/games' element={<Games/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
    </>
  )
}

export default App

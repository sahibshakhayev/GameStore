import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App

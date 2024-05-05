import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './components/Home'
import Catalog from './components/Catalog'
import Game from './components/Game'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/catalog' element={<Catalog/>}/>
        <Route path='/games'>
          <Route path=':gameId' element={<Game/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/admin' element={<Admin/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App

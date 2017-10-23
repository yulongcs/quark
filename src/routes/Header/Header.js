import React from 'react'
import { Link } from 'react-router-dom'
import logo from './logo.svg'
import './style.css'

function Header() {
  return (
    <div className='header'>
      <div className='header-main'>
        <img src={logo} className='header-logo' alt='logo' />
        <h2>Welcome to react_sail</h2>
      </div>
      <nav className='header-nav'>
        <Link to='/' className='header-nav-item'>Home</Link>
        <Link to='/test' className='header-nav-item'>Test</Link>
        <Link to='/about' className='header-nav-item'>About</Link>
        <Link to='/help' className='header-nav-item'>Help</Link>
      </nav>
    </div>
  )
}

export default Header

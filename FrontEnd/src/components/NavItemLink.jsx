import React from 'react'
import { navigateTo } from '../utils/router'

const NavItemLink = ({ to, children, className = '', activeClassName = '', isActive = false }) => {
  const onNavigate = (event) => {
    event.preventDefault()
    navigateTo(to)
  }

  return (
    <a href={to} onClick={onNavigate} className={`${className} ${isActive ? activeClassName : ''}`.trim()}>
      {children}
    </a>
  )
}

export default NavItemLink

import React from 'react'
import { navigateTo } from '../utils/router'

const NavItemLink = ({ to, children, className = '', activeClassName = '', isActive = false, onClick }) => {
  const onNavigate = (event) => {
    event.preventDefault()
    if (onClick) onClick(event)
    navigateTo(to)
  }

  return (
    <a href={to} onClick={onNavigate} className={`${className} ${isActive ? activeClassName : ''}`.trim()}>
      {children}
    </a>
  )
}

export default NavItemLink

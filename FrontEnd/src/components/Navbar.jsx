import React from 'react'
import NavItemLink from './NavItemLink'
import { mainNavItems, topNavItems } from '../utils/navigation'

const hasActiveChild = (currentPath, path) => currentPath === path || currentPath.startsWith(`${path}/`)

const Navbar = ({ pathname }) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-20 bg-gradient-to-b from-black/85 via-black/60 to-black/35 backdrop-blur-md text-white shadow-[0_14px_34px_rgba(0,0,0,0.45)]">
      <div className="mx-auto flex w-[94%] max-w-[1340px] items-center justify-between py-2">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center leading-none text-white gap-y-1 py-1">
          <h1 className="m-0 text-[32px] font-bold tracking-[2px]">ARUNAI</h1>
          <p className="m-0 text-[11px] font-semibold tracking-[0.5px]">ENGINEERING COLLEGE</p>
          <span className="text-[10px] font-medium tracking-[0.5px]">(AUTONOMOUS)</span>
        </div>

        {/* Top Links & Button */}
        <div className="flex items-center gap-6">
          <nav className="flex items-center gap-10">
            {topNavItems.map((item) => (
              <NavItemLink
                key={item.path}
                to={item.path}
                isActive={hasActiveChild(pathname, item.path)}
                className="text-[15px] tracking-wide text-white/95 hover:text-[#f7932f] transition-colors"
                activeClassName="text-[#f7932f]"
              >
                {item.label}
                {item.label === 'ERP' && <span className="ml-1 text-[10px]">⌄</span>}
              </NavItemLink>
            ))}
          </nav>
          <button
            type="button"
            className="rounded bg-[#f7932f] px-5 py-2.5 text-[12px] uppercase tracking-wide text-white shadow-lg transition hover:bg-[#e67e15]"
          >
            Counselling code :1504
          </button>
        </div>
      </div>

      {/* Main Nav Items */}
      <div className="border-t border-white/10">
        <nav className="mx-auto flex w-[98%] max-w-[1400px] items-center justify-center gap-x-12 py-3">
          {mainNavItems.map((item) => (
            <NavItemLink
              key={item.path}
              to={item.path}
              isActive={item.path === '/' ? pathname === '/' : hasActiveChild(pathname, item.path)}
              className="text-[15px] font-bold tracking-wide text-white/95 hover:text-[#f7932f] transition-colors"
              activeClassName="text-[#f7932f]"
            >
              {item.label}
              {['ABOUT', 'ACADEMICS', 'ADMISSION', 'RESEARCH'].includes(item.label) && <span className="ml-1 text-[12px]">⌄</span>}
            </NavItemLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
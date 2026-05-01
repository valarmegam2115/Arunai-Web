import React, { useState, useEffect } from 'react'
import NavItemLink from './NavItemLink'
import { mainNavItems, topNavItems } from '../utils/navigation'

const hasActiveChild = (currentPath, path) => currentPath === path || currentPath.startsWith(`${path}/`)

const Navbar = ({ pathname }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 680) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const mobileMainItems = mainNavItems.filter(item => item.label !== 'COE')
  const coeItem = mainNavItems.find(item => item.label === 'COE')

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-[#001a66] shadow-lg'
          : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'
        } text-white`}>
        <div className="mx-auto flex w-[94%] max-w-[1340px] items-center justify-between py-2">
          {/* Logo Section */}
          <div className="flex flex-col items-center text-center leading-none text-white gap-y-1 py-1">
            <h1 className="m-0 text-[24px] sm:text-[32px] font-bold tracking-[2px]">ARUNAI</h1>
            <p className="m-0 text-[9px] sm:text-[11px] font-semibold tracking-[0.5px]">ENGINEERING COLLEGE</p>
            <span className="text-[8px] sm:text-[10px] font-medium tracking-[0.5px]">(AUTONOMOUS)</span>
          </div>

          {/* Top Links & Button - Hidden on Mobile */}
          <div className="hidden lg:flex items-center gap-6">
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

          {/* Hamburger Button (Mobile) */}
          <button
            className="lg:hidden p-2 text-white relative z-30"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Main Nav Items - Hidden on Mobile */}
        <div className={`hidden lg:block transition-all duration-300 ${isScrolled ? 'bg-white border-transparent py-1' : 'border-white/10 py-3'
          }`}>
          <nav className="mx-auto flex w-[98%] max-w-[1400px] items-center justify-center gap-x-12 py-3">
            {mainNavItems.map((item) => (
              <NavItemLink
                key={item.path}
                to={item.path}
                isActive={item.path === '/' ? pathname === '/' : hasActiveChild(pathname, item.path)}
                className={`text-[15px] font-bold tracking-wide transition-colors ${isScrolled ? 'text-[#061a66] hover:text-[#f7932f]' : 'text-white/95 hover:text-[#f7932f]'
                  }`}
                activeClassName="text-[#f7932f]"
              >
                {item.label}
                {['ABOUT', 'ACADEMICS', 'ADMISSION', 'RESEARCH'].includes(item.label) && <span className="ml-1 text-[12px]">⌄</span>}
              </NavItemLink>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Menu Overlay - Outside header to avoid stacking context issues */}
      <div className={`fixed inset-0 z-[100] bg-white transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 lg:hidden overflow-y-auto flex flex-col`}>
        {/* Mobile Header */}
        <div className="bg-[#001a66] p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex flex-col leading-none">
            <h1 className="text-[20px] font-bold tracking-[1px] m-0">ARUNAI</h1>
            <p className="text-[8px] font-semibold tracking-[0.5px] m-0">ENGINEERING COLLEGE</p>
            <span className="text-[7px] font-medium tracking-[0.5px] m-0">(AUTONOMOUS)</span>
          </div>
          <button
            className="bg-[#990000] px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase rounded shadow-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="text-lg">×</span> Close
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex-1 flex flex-col text-[#061a66] bg-white">
          {/* Top Grid (Main Items) */}
          <div className="grid grid-cols-2 border-b border-gray-200">
            {mobileMainItems.map((item, idx) => (
              <div
                key={item.path}
                className={`
                border-b border-gray-200 py-6 flex items-center justify-center font-bold text-[13px] tracking-widest uppercase
                ${idx % 2 === 0 ? 'border-r' : ''}
              `}
              >
                <NavItemLink
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-1 text-[#061a66]"
                >
                  {item.label}
                  {['ABOUT', 'ACADEMICS', 'ADMISSION', 'RESEARCH'].includes(item.label) && <span className="text-[12px] font-normal">⌄</span>}
                </NavItemLink>
              </div>
            ))}
          </div>

          {/* COE Item (Full Width) */}
          {coeItem && (
            <div className="border-b border-gray-200 py-6 flex items-center justify-center font-bold text-[13px] tracking-widest uppercase">
              <NavItemLink to={coeItem.path} onClick={() => setIsMenuOpen(false)} className="text-[#061a66]">
                {coeItem.label}
              </NavItemLink>
            </div>
          )}

          {/* Information For Section */}
          <div className="bg-gray-100 py-3 text-center border-b border-gray-200">
            <span className="text-[13px] font-extrabold text-black uppercase tracking-tight">Information for</span>
          </div>

          {/* Secondary Links (ERP, NIRF, etc.) */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 py-8 px-4 border-b border-gray-200 bg-white">
            {topNavItems.filter(i => i.label !== 'CONTACT').map(item => (
              <NavItemLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="text-[13px] font-bold uppercase tracking-widest flex items-center gap-1 text-[#061a66]"
              >
                {item.label}
                {item.label === 'ERP' && <span className="text-[12px] font-normal">⌄</span>}
              </NavItemLink>
            ))}
          </div>

          {/* Contact (Bottom) */}
          <div className="py-8 flex items-center justify-center font-bold text-[13px] tracking-widest uppercase bg-white">
            <NavItemLink
              to={topNavItems.find(i => i.label === 'CONTACT')?.path || '/contact'}
              onClick={() => setIsMenuOpen(false)}
              className="text-[#061a66]"
            >
              CONTACT
            </NavItemLink>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar
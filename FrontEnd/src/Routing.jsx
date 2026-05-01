import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { usePathname } from './utils/router'
import Home from './pages/Home'
const Routing = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const innerStyle = {
    background: 'linear-gradient(120deg, rgba(7,17,33,0.97), rgba(12,33,64,0.9))',
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar pathname={pathname} />
      {isHome ? (
        <Home showHero />
      ) : (
        <section
          className="relative min-h-screen overflow-hidden bg-cover bg-center text-white"
          style={innerStyle}
        >
          <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/10 via-black/5 to-black/25" />
          <Home />
        </section>
      )}
      <aside className="fixed right-0 top-[50%] z-40 hidden -translate-y-1/2 flex-col gap-2 pr-2 sm:flex">
        <a
          href="#"
          aria-label="Facebook"
          className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#043ea4] text-white transition-transform hover:scale-110"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.89C10.059 0 9 1.583 9 4.389V8z"/></svg>
        </a>
        <a
          href="#"
          aria-label="Instagram"
          className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#043ea4] text-white transition-transform hover:scale-110"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
        </a>
        <a
          href="#"
          aria-label="YouTube"
          className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#043ea4] text-white transition-transform hover:scale-110"
        >
          <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
        </a>
      </aside>
      {isHome && (
        <span className="fixed bottom-0 left-0 right-0 z-40 bg-orange-500 px-4 py-3 text-sm font-bold text-white shadow-[0_-4px_10px_rgba(0,0,0,0.1)] text-center sm:bottom-4 sm:left-4 sm:right-auto sm:w-auto sm:rounded-3xl sm:px-6 sm:py-3 sm:text-md">
          Admissions Open 2026 - 2027
        </span>
      )}
      <Footer />
    </div>
  )
}

export default Routing
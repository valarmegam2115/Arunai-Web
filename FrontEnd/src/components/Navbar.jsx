import React, { useState, useRef, useEffect } from 'react'
import { navigateTo } from '../utils/router'
import { usePathname } from '../utils/router'

// ── Nav Data ──────────────────────────────────────────────────────────────────
const topNavConfig = [
  {
    label: 'ERP',
    dropdown: [
      { label: 'GREYTHR', path: '#' },
      { label: 'ARUNAI ERP', path: '#' },
    ],
  },
  { label: 'NISP', path: '/nisp' },
  { label: 'IIC', path: '/iic' },
  { label: 'NIRF', path: '/nirf' },
  { label: 'IQAC', path: '/iqac' },
  { label: 'GALLERY', path: '/gallery' },
  { label: 'CONTACT', path: '/contact' },
]

const mainNavConfig = [
  { label: 'HOME', path: '/' },
  {
    label: 'ABOUT',
    dropdown: [
      { label: 'About AEC', path: '/about' },
      { label: 'Founder Chairman', path: '/about/founder' },
      { label: 'Chairperson', path: '/about/chairperson' },
      { label: 'Vice Chairman', path: '/about/vice-chairman' },
      { label: 'The Principal', path: '/about/principal' },
      { label: 'Governing Body Members', path: '/about/governing-body' },
      { label: 'Key Functionaries', path: '/about/key-functionaries' },
      { label: 'Academic Council Members', path: '/about/academic-council' },
      { label: 'Academic Calendar', path: '/about/academic-calendar' },
      { label: 'Code of Conduct', path: '/about/code-of-conduct' },
      { label: 'Organizational Structure', path: '/about/org-structure' },
    ],
  },
  {
    label: 'ACADEMICS',
    dropdown: [
      {
        label: 'COURSES OFFERED',
        path: '/academics/courses',
        children: [
          { label: 'UG', path: '/academics/courses/ug' },
          { label: 'PG', path: '/academics/courses/pg' },
        ],
      },
      {
        label: 'DEPARTMENT',
        path: '/academics/departments',
        children: [
          { label: 'Civil Engineering', path: '/academics/dept/civil' },
          { label: 'Computer Science & Engineering', path: '/academics/dept/cse' },
          { label: 'CSE – Cyber Security', path: '/academics/dept/cse-cs' },
          { label: 'CSE – Artificial Intelligence & ML', path: '/academics/dept/cse-aiml' },
          { label: 'Electronics & Communication Engineering', path: '/academics/dept/ece' },
          { label: 'Electrical & Electronics Engineering', path: '/academics/dept/eee' },
          { label: 'Mechanical Engineering', path: '/academics/dept/mech' },
          { label: 'Agricultural Engineering', path: '/academics/dept/agri' },
          { label: 'Artificial Intelligence & Data Science', path: '/academics/dept/aids' },
          { label: 'Bio Technology', path: '/academics/dept/biotech' },
          { label: 'Chemical Engineering', path: '/academics/dept/chemical' },
          { label: 'Information Technology', path: '/academics/dept/it' },
          { label: 'Master of Business Administration', path: '/academics/dept/mba' },
        ],
      },
    ],
  },
  {
    label: 'ADMISSION',
    dropdown: [
      { label: 'UG Admission', path: '/admission/ug' },
      { label: 'PG Admission', path: '/admission/pg' },
      { label: 'Lateral Entry', path: '/admission/lateral' },
    ],
  },
  { label: 'FACILITIES', path: '/facilities' },
  {
    label: 'RESEARCH',
    dropdown: [
      { label: 'About Research', path: '/research' },
      { label: 'Research Advisory Committee', path: '/research/advisory' },
      { label: 'Research Centres', path: '/research/centres' },
      { label: 'Recognized Supervisor List', path: '/research/supervisors' },
      { label: 'Funded Projects', path: '/research/funded-projects' },
      { label: 'Publication', path: '/research/publication' },
      { label: 'Patent', path: '/research/patent' },
      { label: 'Memorandum of Understanding', path: '/research/mou' },
    ],
  },
  { label: 'PLACEMENT', path: '/placement' },
  { label: 'MANDATORY DISCLOSURE', path: '/mandatory-disclosure' },
  { label: 'COE', path: '/coe' },
]

const go = (path, e) => {
  e?.preventDefault()
  if (path && path !== '#') navigateTo(path)
}

const isActivePath = (pathname, path) =>
  path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(path + '/')

const DropdownItem = ({ item, pathname, closeParent }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div 
      className="relative"
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={item.path}
        onClick={e => { if(!hasChildren) { go(item.path, e); closeParent() } else { e.preventDefault() } }}
        className="flex items-center justify-between px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-[#f7932f] hover:text-white transition-colors cursor-pointer"
      >
        {item.label}
        {hasChildren && (
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z" /></svg>
        )}
      </a>
      {hasChildren && open && (
        <div className="absolute left-full top-0 z-50 min-w-[260px] bg-[#0d1f6e] shadow-xl">
          {item.children.map((c, i) => (
            <a
              key={i}
              href={c.path}
              onClick={e => { go(c.path, e); setOpen(false); closeParent() }}
              className="block px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-[#f7932f] hover:text-white transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

const SimpleDropdown = ({ item, pathname, scrolled }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const active = item.dropdown?.some(d => isActivePath(pathname, d.path) || d.children?.some(c => isActivePath(pathname, c.path)))

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={`flex items-center gap-1 text-[14px] font-bold tracking-wide transition-colors
          ${scrolled
            ? (active ? 'text-[#f7932f]' : 'text-[#061a66] hover:text-[#f7932f]')
            : (active ? 'text-[#f7932f]' : 'text-white/95 hover:text-[#f7932f]')
          }`}
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <svg className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] bg-[#0d1f6e] shadow-xl border-t-2 border-white">
          {item.dropdown.map((d, i) => (
            <DropdownItem key={i} item={d} pathname={pathname} closeParent={() => setOpen(false)} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── TopSimpleDropdown (for top nav, e.g. ERP) ─────────────────────────────────
const TopDropdown = ({ item, pathname }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1 text-[15px] tracking-wide text-white/95 hover:text-[#f7932f] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <svg className={`h-3 w-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[170px] bg-[#0d1f6e] shadow-xl">
          {item.dropdown.map((d, i) => (
            <a
              key={i}
              href={d.path}
              onClick={e => { go(d.path, e); setOpen(false) }}
              className="block px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-[#f7932f] transition-colors"
            >
              {d.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const Navbar = () => {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState({})

  useEffect(() => {
    const handle = () => setIsScrolled(window.scrollY > 680)
    window.addEventListener('scroll', handle)
    return () => window.removeEventListener('scroll', handle)
  }, [])

  const scrolled = isHome ? isScrolled : true

  const toggleMobile = (label) =>
    setMobileExpanded(prev => ({ ...prev, [label]: !prev[label] }))

  return (
    <>
      <header className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-[#001a66] shadow-lg' : 'bg-gradient-to-b from-black/90 via-black/60 to-transparent'}
        text-white`}
      >
        {/* ── Top row ── */}
        <div className="mx-auto flex w-[94%] max-w-[1340px] items-center justify-between py-2">
          {/* Logo */}
          <a href="/" onClick={e => go('/', e)} className="flex flex-col items-center text-center leading-none text-white gap-y-1 py-1">
            <span className="text-[24px] sm:text-[32px] font-bold tracking-[2px]">ARUNAI</span>
            <span className="text-[9px] sm:text-[11px] font-semibold tracking-[0.5px]">ENGINEERING COLLEGE</span>
            <span className="text-[8px] sm:text-[10px] font-medium tracking-[0.5px]">(AUTONOMOUS)</span>
          </a>

          {/* Top nav links (desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex items-center gap-8">
              {topNavConfig.map((item, i) =>
                item.dropdown ? (
                  <TopDropdown key={i} item={item} pathname={pathname} />
                ) : (
                  <a
                    key={i}
                    href={item.path}
                    onClick={e => go(item.path, e)}
                    className={`text-[15px] tracking-wide transition-colors
                      ${isActivePath(pathname, item.path) ? 'text-[#f7932f]' : 'text-white/95 hover:text-[#f7932f]'}`}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
            <button
              type="button"
              className="rounded bg-[#f7932f] px-5 py-2.5 text-[12px] uppercase tracking-wide text-white shadow-lg transition hover:bg-[#e67e15]"
            >
              Counselling code : 1504
            </button>
          </div>

          {/* Mobile hamburger */}
          <button className="lg:hidden p-2 text-white" onClick={() => setMobileOpen(true)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* ── Main nav row (desktop) ── */}
        <div className={`hidden lg:block transition-all duration-300 ${scrolled ? 'bg-white py-1' : 'py-3'}`}>
          <nav className="mx-auto flex w-[98%] max-w-[1400px] items-center justify-center gap-x-8 py-3 flex-wrap">
            {mainNavConfig.map((item, i) => {
              if (item.dropdown) return <SimpleDropdown key={i} item={item} pathname={pathname} scrolled={scrolled} />
              return (
                <a
                  key={i}
                  href={item.path}
                  onClick={e => go(item.path, e)}
                  className={`text-[14px] font-bold tracking-wide transition-colors whitespace-nowrap
                    ${scrolled
                      ? (isActivePath(pathname, item.path) ? 'text-[#f7932f]' : 'text-[#061a66] hover:text-[#f7932f]')
                      : (isActivePath(pathname, item.path) ? 'text-[#f7932f]' : 'text-white/95 hover:text-[#f7932f]')
                    }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        </div>
      </header>

      {/* ── Mobile Menu ── */}
      <div className={`fixed inset-0 z-[100] bg-white transform ${mobileOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 lg:hidden overflow-y-auto flex flex-col`}>
        <div className="bg-[#001a66] p-4 flex justify-between items-center text-white shrink-0">
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-bold tracking-[1px]">ARUNAI</span>
            <span className="text-[8px] font-semibold tracking-[0.5px]">ENGINEERING COLLEGE (AUTONOMOUS)</span>
          </div>
          <button
            className="bg-[#990000] px-4 py-2 flex items-center gap-2 text-xs font-bold uppercase rounded"
            onClick={() => setMobileOpen(false)}
          >
            <span className="text-lg">×</span> Close
          </button>
        </div>

        <nav className="flex-1 divide-y divide-gray-100 text-[#061a66]">
          {mainNavConfig.map((item, i) => {
            const hasChildren = !!item.dropdown
            const children = item.dropdown?.flatMap(d => [
              { label: d.label, path: d.path },
              ...(d.children ? d.children.map(c => ({ label: `— ${c.label}`, path: c.path })) : [])
            ])
            return (
              <div key={i}>
                <div className="flex items-center justify-between px-5 py-4">
                  <a
                    href={item.path ?? '#'}
                    onClick={e => { if (!hasChildren) { go(item.path, e); setMobileOpen(false) } else e.preventDefault() }}
                    className="flex-1 text-[13px] font-extrabold uppercase tracking-widest"
                  >
                    {item.label}
                  </a>
                  {hasChildren && (
                    <button onClick={() => toggleMobile(item.label)} className="p-1">
                      <svg className={`h-4 w-4 transition-transform ${mobileExpanded[item.label] ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7 10l5 5 5-5z" />
                      </svg>
                    </button>
                  )}
                </div>
                {hasChildren && mobileExpanded[item.label] && (
                  <div className="bg-gray-50 pl-6">
                    {children?.map((c, ci) => (
                      <a
                        key={ci}
                        href={c.path}
                        onClick={e => { go(c.path, e); setMobileOpen(false) }}
                        className="block py-3 text-[12px] font-semibold uppercase tracking-wide text-[#061a66] hover:text-[#f7932f] border-b border-gray-100"
                      >
                        {c.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default Navbar
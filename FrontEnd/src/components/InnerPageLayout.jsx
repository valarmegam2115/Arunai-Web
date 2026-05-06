import React, { useState } from 'react'
import { navigateTo } from '../utils/router'
import { usePathname } from '../utils/router'

// ── Icon components ──────────────────────────────────────────────
const icons = {
  info:      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>,
  people:    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>,
  person:    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>,
  building:  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>,
  list:      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/></svg>,
  doc:       <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zm4 18H6V4h7v5h5v11z"/></svg>,
  award:     <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2a5 5 0 100 10A5 5 0 0012 2zm-7 18a7 7 0 1114 0H5z"/></svg>,
  star:      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  flask:     <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 2v6l-2 4a4 4 0 007.32 2.08A4 4 0 0020 12l-2-4V2H6zm8 0H10v5l2 4 2-4V2z"/></svg>,
  book:      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>,
  handshake: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11 6.5A2.5 2.5 0 0113.5 4H20V2H13.5A4.5 4.5 0 009 6.5V8H7.5A2.5 2.5 0 005 10.5v.5H3v2h2v6h2v-6h1v7h2v-7h1v6h2v-6h1v7h2V10.5A2.5 2.5 0 0013.5 8H11V6.5z"/></svg>,
  gear:      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.49.49 0 00-.59-.22l-2.39.96a6.97 6.97 0 00-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.486.486 0 00-.59.22L2.74 8.87a.47.47 0 00.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.47.47 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 00-.12-.61l-2.01-1.58zM12 15.6a3.6 3.6 0 110-7.2 3.6 3.6 0 010 7.2z"/></svg>,
  calendar:  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>,
  chart:     <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>,
  image:     <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>,
  courses:   <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>,
  placement: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-2.18c.07-.44.18-.88.18-1.36C18 2.51 16.49 1 14.64 1 13.45 1 12.5 1.56 11.8 2.38L11 3.3l-.8-.93C9.5 1.56 8.55 1 7.36 1 5.51 1 4 2.51 4 4.36c0 .48.11.92.18 1.36H2a2 2 0 00-1.99 2l-.01 11c0 1.1.9 2 2 2h18a2 2 0 002-2V8a2 2 0 00-2-2z"/></svg>,
  feedback:  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>,
}

// ── SidebarLink ──────────────────────────────────────────────────
const SidebarLink = ({ item, currentPath, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(() =>
    item.children?.some(c => c.path === currentPath) ?? false
  )
  const isActive = item.path === currentPath
  const hasChildren = item.children?.length > 0
  const icon = icons[item.icon] ?? icons.info

  const handleClick = (e) => {
    e.preventDefault()
    if (hasChildren) {
      setIsOpen(o => !o)
    } else {
      navigateTo(item.path)
    }
  }

  return (
    <li>
      <a
        href={item.path}
        onClick={handleClick}
        className={`
          flex items-center gap-2 px-4 py-[10px] text-[13px] font-semibold transition-all
          ${depth > 0 ? 'pl-10' : ''}
          ${isActive
            ? 'bg-[#1a3080] text-[#f5c518] border-l-4 border-[#f5c518]'
            : 'text-white/80 hover:bg-[#1a3080] hover:text-white border-l-4 border-transparent'
          }
        `}
      >
        <span className={`flex-shrink-0 ${isActive ? 'text-[#f5c518]' : 'text-white/60'}`}>
          {depth > 0
            ? <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            : icon
          }
        </span>
        <span className="flex-1 leading-tight">{item.label}</span>
        {hasChildren && (
          <svg
            className={`h-3.5 w-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="currentColor" viewBox="0 0 24 24"
          >
            <path d="M7 10l5 5 5-5z"/>
          </svg>
        )}
      </a>
      {hasChildren && isOpen && (
        <ul>
          {item.children.map(child => (
            <SidebarLink key={child.path} item={child} currentPath={currentPath} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

// ── InnerPageLayout ──────────────────────────────────────────────
/**
 * Props:
 *   sidebarTitle:  string  — header text, e.g. "RESEARCH"
 *   sidebarLinks:  array   — [{ label, path, icon, children? }]
 *   headerColor:   string  — tailwind bg class for sidebar header (default amber)
 *   children:      node    — the page content
 */
const InnerPageLayout = ({
  sidebarTitle,
  sidebarLinks = [],
  headerColor = 'bg-[#f5c518]',
  children,
}) => {
  const currentPath = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex gap-6 items-start">

          {/* ── Sidebar ──────────────────────────── */}
          <aside className="hidden lg:block w-[260px] flex-shrink-0 sticky top-28">
            {/* Header */}
            <div className={`${headerColor} px-4 py-3 rounded-t`}>
              <h2 className="text-[15px] font-extrabold uppercase tracking-wider text-[#001a66] text-center">
                {sidebarTitle}
              </h2>
            </div>
            {/* Links */}
            <nav className="bg-[#0d2060] rounded-b shadow-lg">
              <ul className="py-1">
                {sidebarLinks.map(item => (
                  <SidebarLink key={item.path} item={item} currentPath={currentPath} />
                ))}
              </ul>
            </nav>
          </aside>

          {/* ── Mobile Sidebar Toggle ───────────── */}
          <div className="lg:hidden w-full mb-4">
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="flex w-full items-center justify-between rounded bg-[#0d2060] px-4 py-3 text-white"
            >
              <span className="font-bold tracking-wide">{sidebarTitle}</span>
              <svg className={`h-5 w-5 transition-transform ${mobileOpen ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 24 24">
                <path d="M7 10l5 5 5-5z"/>
              </svg>
            </button>
            {mobileOpen && (
              <nav className="bg-[#0d2060] rounded-b shadow-lg">
                <ul className="py-1">
                  {sidebarLinks.map(item => (
                    <SidebarLink key={item.path} item={item} currentPath={currentPath} />
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* ── Main Content ─────────────────────── */}
          <main className="flex-1 min-w-0 rounded-xl bg-white shadow-sm border border-gray-100 p-8">
            {children}
          </main>

        </div>
      </div>
    </div>
  )
}

export default InnerPageLayout

import React from 'react'

// ── PageHeader ────────────────────────────────────────────────────
// Title + blue/red split underline used at the top of every inner page
export const PageHeader = ({ title }) => (
  <div className="mb-10 text-center">
    <h1 className="text-2xl font-extrabold tracking-tight text-[#1a202c] sm:text-3xl">
      {title}
    </h1>
    <div className="mx-auto mt-3 flex h-[3px] w-16 overflow-hidden">
      <div className="h-full w-1/2 bg-[#001a66]" />
      <div className="h-full w-1/2 bg-[#e53e3e]" />
    </div>
  </div>
)

// ── SectionBlock ──────────────────────────────────────────────────
// Red left-bar section heading + arbitrary children
export const SectionBlock = ({ title, children, className = '' }) => (
  <section className={`mb-10 ${className}`}>
    {title && (
      <div className="mb-4 flex items-center gap-3">
        <div className="h-6 w-[5px] flex-shrink-0 bg-[#990000]" />
        <h2 className="text-lg font-bold tracking-wide text-[#1a202c]">{title}</h2>
      </div>
    )}
    {children}
  </section>
)

// ── BodyText ──────────────────────────────────────────────────────
// Standard paragraph styling
export const BodyText = ({ children, className = '' }) => (
  <p className={`text-[15px] leading-8 text-gray-700 text-justify ${className}`}>
    {children}
  </p>
)

// ── PolicyTable ───────────────────────────────────────────────────
// Sl.No + Statement table (used in NISP, Vision/Mission, etc.)
export const PolicyTable = ({ rows = [] }) => (
  <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
    <table className="w-full border-collapse text-left">
      <thead>
        <tr className="bg-[#feb2b2] text-[#1a202c]">
          <th className="w-20 border-r border-white/20 px-5 py-3 text-[13px] font-black uppercase tracking-widest">
            Sl.No.
          </th>
          <th className="px-6 py-3 text-center text-[13px] font-black uppercase tracking-widest">
            {rows[0]?.heading ?? 'Statement'}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={i}
            className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#ebf4ff]' : 'bg-white'}`}
          >
            <td className="border-r border-gray-100 px-5 py-5 text-center font-bold text-gray-800">
              {i + 1}
            </td>
            <td className="px-8 py-5 text-center text-[15px] font-medium leading-relaxed text-gray-700">
              {row.text ?? row}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ── DataTable ─────────────────────────────────────────────────────
// Generic table with arbitrary columns
export const DataTable = ({ columns = [], rows = [], headerBg = 'bg-[#001a66]' }) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
    <table className="w-full border-collapse text-left text-sm">
      <thead>
        <tr className={`${headerBg} text-white`}>
          {columns.map((col, i) => (
            <th key={i} className="px-5 py-3 font-bold tracking-wide">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} className={`border-t border-gray-100 ${ri % 2 === 1 ? 'bg-slate-50' : 'bg-white'}`}>
            {row.map((cell, ci) => (
              <td key={ci} className="px-5 py-4 text-gray-700 leading-relaxed">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

// ── DocumentLink ──────────────────────────────────────────────────
// External link row with open-in-new icon
export const DocumentLink = ({ title, href = '#' }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4 transition-all hover:border-blue-300 hover:shadow-sm mb-3"
  >
    <span className="text-[16px] font-bold text-[#001a66] transition-colors group-hover:text-blue-700">
      {title}
    </span>
    <svg
      className="h-5 w-5 flex-shrink-0 text-blue-500 transition-transform group-hover:scale-110"
      fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  </a>
)

// ── ProfileCard ───────────────────────────────────────────────────
// Person profile: optional image on the left, name/title/bio on right
export const ProfileCard = ({ name, title, qualification, image, bio }) => (
  <div className="flex flex-col sm:flex-row gap-6 rounded-xl border border-gray-100 bg-slate-50 p-6">
    {image && (
      <div className="flex-shrink-0">
        <img
          src={image}
          alt={name}
          className="h-40 w-36 rounded-lg object-cover shadow-sm border border-gray-200"
        />
      </div>
    )}
    <div className="flex-1">
      <h3 className="text-xl font-extrabold text-[#001a66]">{name}</h3>
      {title && <p className="mt-0.5 text-[14px] font-semibold text-gray-600">{title}</p>}
      {qualification && (
        <p className="mt-0.5 text-[13px] text-gray-500 italic">{qualification}</p>
      )}
      {bio && (
        <p className="mt-4 text-[14px] leading-7 text-gray-700 text-justify">{bio}</p>
      )}
    </div>
  </div>
)

// ── BannerImage ───────────────────────────────────────────────────
// Full-width image at the top of a page (like college gate, dept lab)
export const BannerImage = ({ src, alt = '' }) => (
  <div className="mb-8 overflow-hidden rounded-xl shadow-md">
    <img src={src} alt={alt} className="h-64 w-full object-cover" />
  </div>
)

// ── InfoGrid ──────────────────────────────────────────────────────
// Grid of key→value pairs (e.g., stats, course details)
export const InfoGrid = ({ items = [], cols = 2 }) => (
  <div className={`grid gap-4 grid-cols-1 sm:grid-cols-${cols}`}>
    {items.map((item, i) => (
      <div key={i} className="rounded-lg border border-blue-100 bg-[#f0f5ff] px-5 py-4">
        <p className="text-[12px] font-bold uppercase tracking-wider text-[#001a66]/60">{item.label}</p>
        <p className="mt-1 text-[15px] font-semibold text-[#001a66]">{item.value}</p>
      </div>
    ))}
  </div>
)

// ── CourseChip ────────────────────────────────────────────────────
// Dark navy pill used for listing course names (like Dept page)
export const CourseChip = ({ label, icon }) => (
  <div className="flex items-center gap-3 rounded-md bg-[#0d2060] px-5 py-3 text-white">
    {icon && <span className="flex-shrink-0 text-[#f5c518]">{icon}</span>}
    <span className="text-[14px] font-semibold">{label}</span>
  </div>
)

// ── BulletList ────────────────────────────────────────────────────
// Simple styled bullet list
export const BulletList = ({ items = [] }) => (
  <ul className="space-y-2">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-[15px] text-gray-700 leading-7">
        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#990000]" />
        {item}
      </li>
    ))}
  </ul>
)

import React from 'react'

const Footer = () => {
  const quickLinks = ['Home', 'About Us', 'Facilities', 'Governing Body', 'Academic Council', 'Academic Calendar']
  const exploreLinks = ['Alumni', 'Committees in AEC', 'Club and Societies', 'Research Advisory Committee', 'Research Centres', 'Mandatory Disclosure']

  return (
    <footer className="bg-[#0a1e6e] text-white">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 - About Us */}
          <div>
            <h3 className="mb-4 border-b-2 border-[#e8b93a] pb-2 text-[17px] font-bold text-white">
              About Us
            </h3>
            <p className="text-[13.5px] leading-7 text-white/80">
              Arunai Engineering College (AEC) is committed to equipping students with these essential
              competencies, ensuring they are well-prepared to succeed in their careers and contribute
              meaningfully to society.
            </p>
            <div className="mt-5 h-[3px] w-12 rounded-full bg-[#e8b93a]" />
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="mb-4 border-b-2 border-[#e8b93a] pb-2 text-[17px] font-bold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[13.5px] text-white/80 transition-colors duration-200 hover:text-[#e8b93a]"
                  >
                    <span className="text-[#e8b93a] text-xs">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Explore */}
          <div>
            <h3 className="mb-4 border-b-2 border-[#e8b93a] pb-2 text-[17px] font-bold text-white">
              Explore
            </h3>
            <ul className="space-y-2">
              {exploreLinks.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="flex items-center gap-2 text-[13.5px] text-white/80 transition-colors duration-200 hover:text-[#e8b93a]"
                  >
                    <span className="text-[#e8b93a] text-xs">›</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h3 className="mb-4 border-b-2 border-[#e8b93a] pb-2 text-[17px] font-bold text-white">
              Contact Info
            </h3>
            <ul className="space-y-4">
              {/* Address */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a3080] text-[#e8b93a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
                  </svg>
                </span>
                <p className="text-[13px] leading-6 text-white/80">
                  Velu Nagar, Tiruvannamalai, Tamil Nadu - 606603
                </p>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a3080] text-[#e8b93a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </span>
                <p className="text-[13px] text-white/80">04175-222001 / 222002</p>
              </li>

              {/* Email 1 */}
              <li className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a3080] text-[#e8b93a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <p className="text-[13px] text-white/80">aectvm1993@gmail.com</p>
              </li>

              {/* Email 2 */}
              <li className="flex items-start gap-3">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a3080] text-[#e8b93a]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-[12px] leading-5 text-white/70">Student Verification Mail ID</p>
                  <p className="text-[13px] text-white/80">coearunai@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-[#071558]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-6 py-4">
          <p className="text-[12.5px] text-white/70">
            © {new Date().getFullYear()} Arunai Engineering College. All rights reserved.
          </p>
          <p className="text-[12.5px] text-white/70">
            Accredited NAAC A+ | Affiliated to Anna University
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/70 transition-colors hover:text-[#e8b93a]" aria-label="Facebook">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.89C10.059 0 9 1.583 9 4.389V8z"/></svg>
            </a>
            <a href="#" className="text-white/70 transition-colors hover:text-[#e8b93a]" aria-label="Instagram">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="#" className="text-white/70 transition-colors hover:text-[#e8b93a]" aria-label="YouTube">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
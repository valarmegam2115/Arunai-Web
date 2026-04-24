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
        </div>
      </div>
    </footer>
  )
}

export default Footer
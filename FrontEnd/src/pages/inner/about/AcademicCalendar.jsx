import React, { useState, useEffect } from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const AcademicCalendar = () => {
  const [calendars, setCalendars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCalendars = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/academic-calendars')
        const data = await res.json()
        if (data.success) {
          setCalendars(data.data)
        }
      } catch (err) {
        console.error('Error fetching academic calendars:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCalendars()
  }, [])

  return (
    <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
      <PageHeader title="Academic Calendar" />
      <SectionBlock>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600/20 border-t-blue-600"></div>
          </div>
        ) : calendars.length === 0 ? (
          <p className="py-12 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
            No academic calendars available yet.
          </p>
        ) : (
          <div className="space-y-3">
            {calendars.map((cal) => (
              <a
                key={cal.id}
                href={cal.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border-2 border-[#001a66]/10 bg-white px-6 py-5 transition-all duration-300 hover:border-[#001a66] hover:shadow-lg hover:shadow-blue-900/5"
              >
                <span className="text-[15px] font-bold text-[#001a66] transition-transform group-hover:translate-x-1">
                  {cal.title}
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 uppercase tracking-widest">
                    Open PDF
                  </span>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-blue-600 transition-transform group-hover:scale-110"
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        )}
      </SectionBlock>
    </InnerPageLayout>
  )
}

export default AcademicCalendar

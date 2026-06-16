import React, { useState, useEffect } from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const CodeOfConduct = () => {
  const [conducts, setConducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchConducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/code-of-conduct')
        const data = await res.json()
        if (data.success) {
          setConducts(data.data)
        }
      } catch (err) {
        console.error('Error fetching code of conducts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchConducts()
  }, [])

  return (
    <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
      <PageHeader title="Code of Conduct" />
      <SectionBlock>
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600/20 border-t-blue-600"></div>
          </div>
        ) : conducts.length === 0 ? (
          <p className="py-12 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
            No code of conduct documents available yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {conducts.map((item) => (
              <a
                key={item.id}
                href={item.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-r-lg border border-slate-150 border-l-[6px] border-l-[#001a66] bg-white p-6 transition-all duration-300 hover:bg-slate-50 hover:shadow-md hover:shadow-slate-100"
              >
                <span className="text-[16px] font-semibold text-[#001a66]">
                  {item.title}
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

export default CodeOfConduct

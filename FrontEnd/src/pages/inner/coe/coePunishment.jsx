import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { coeSidebar } from '../../../utils/sidebarConfig'

const CoePunishment = () => (
  <InnerPageLayout sidebarTitle={coeSidebar.title} sidebarLinks={coeSidebar.links}>
    <PageHeader title="Malpractice Punishment" />

    <SectionBlock>
      <div className="max-w-4xl mx-auto mt-6">
        <a
          href="https://arunai.org/wp-content/uploads/controller-of-examination/pdf/AEC-COE-Guidelines.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between p-5 bg-slate-50 hover:bg-slate-100 rounded-r-lg border-l-[6px] border-[#0d2060] shadow-sm transition-all group"
        >
          <span className="font-semibold text-gray-800 group-hover:text-[#0d2060] transition-colors text-[15px]">
            Malpractice Punishment Guidelines
          </span>
          <div className="flex items-center gap-3 text-red-600 font-medium text-sm">
            <svg className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-3v1.5h2.5V11H18v2h-1.5V7h4v1.5zM9 8.5H10v1H9v-1zm5 1.5h1v1.5h-1V10zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
            </svg>
            <span className="bg-red-100 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider text-red-700">PDF</span>
          </div>
        </a>
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default CoePunishment

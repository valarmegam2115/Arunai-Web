import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const mouList = [
  'INTI International University in Malaysia',
  'WCC World citi College Philippines.',
  'WCC Aeronautical & Technological college, Philippines.',
  'MAHSA University Malaysia.',
  'VDT EDU TANTR VENTURES Private Ltd Bangalore.',
  'Thai Green Power Solutions (TGPS GLOBAL) & Green Carpet foundation in Thailand.',
  'SV Chem & intermediates, Chennai.',
  'Techxonic Solutions, Bengaluru.',
  'Towards Technology, Ariyalur',
  'Careerchool hr solutions, Chennai.',
  'L&T Chennai',
  'Atal Incubation Center Pondicherry',
  'Kineco Pvt.Ltd Goa.',
  'Shri Sai NDT, Pondicherry',
  'CIX Inc USA',
  'SV Chem & intermediates, Chennai',
  'Geo Tech Engineering Services & Solution, Coimbatore.',
  'NaSSCom Foundation, Chennai',
  'HebeSec Pvt.Ltd Coimbatore.',
  'Capricio Securities Pvt.Ltd Chennai',
  'Approtech Pvt.Ltd Chennai',
]

const MoU = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Memorandum of Understanding" />

    <SectionBlock>
      <div className="space-y-3">
        {mouList.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-lg border border-gray-100 bg-slate-50 px-5 py-4 transition-all hover:border-blue-200 hover:shadow-sm"
          >
            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#001a66] text-xs font-bold text-white">
              {index + 1}
            </span>
            <span className="text-[15px] font-medium text-gray-700 leading-relaxed pt-1">
              {item}
            </span>
          </div>
        ))}
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default MoU

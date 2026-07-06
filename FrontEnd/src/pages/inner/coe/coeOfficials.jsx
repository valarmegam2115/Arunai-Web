import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, DataTable } from '../../../components/blocks'
import { coeSidebar } from '../../../utils/sidebarConfig'

const coeOfficialsData = [
  [
    '1',
    <div>
      <div className="font-bold text-gray-900">Dr. S. Thirumalvalavan</div>
      <div className="text-xs text-gray-500 mt-0.5">Professor / Mechanical</div>
    </div>,
    'Controller of Examinations'
  ],
  [
    '2',
    <div>
      <div className="font-bold text-gray-900">Mr. S. Arivumani Samson</div>
      <div className="text-xs text-gray-500 mt-0.5">Assistant Professor / ECE</div>
    </div>,
    'Deputy Controller of Examinations'
  ],
  [
    '3',
    <div>
      <div className="font-bold text-gray-900">Mr. P. Raja</div>
      <div className="text-xs text-gray-500 mt-0.5">Assistant Professor / EEE</div>
    </div>,
    'Assistant Controller of Examinations'
  ]
]

const CoeOfficials = () => (
  <InnerPageLayout sidebarTitle={coeSidebar.title} sidebarLinks={coeSidebar.links}>
    <PageHeader title="COE Officials" />

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Name of the Staff', 'Designation']}
        rows={coeOfficialsData}
        headerBg="bg-red-200 text-[#1a202c]"
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default CoeOfficials

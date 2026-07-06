import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, DataTable } from '../../../components/blocks'
import { coeSidebar } from '../../../utils/sidebarConfig'

const formsData = [
  {
    name: 'Application for Correction in Grade Sheet',
    url: 'https://arunai.org/wp-content/coe/download-form/Application for Correction in Grade Sheet.pdf'
  },
  {
    name: 'Application for Duplicate Grade Sheet',
    url: 'https://arunai.org/wp-content/coe/download-form/Application for Duplicate Grade Sheet.pdf'
  },
  {
    name: 'CGPA into Percentage Conversion',
    url: 'https://arunai.org/wp-content/coe/download-form/CGPA into Percentage Conversion.pdf'
  },
  {
    name: 'Medium of Instructions',
    url: 'https://arunai.org/wp-content/coe/download-form/Medium of Instructions.pdf'
  },
  {
    name: 'Procedure For Applying Photocopy',
    url: 'https://arunai.org/wp-content/coe/download-form/Procedure For Applying Photocopy.pdf'
  },
  {
    name: 'Procedure For Applying Revaluation',
    url: 'https://arunai.org/wp-content/coe/download-form/Procedure For Applying Revaluation.pdf'
  },
  {
    name: 'Revaluation Form',
    url: 'https://arunai.org/wp-content/coe/download-form/Revaluation Form.pdf'
  },
  {
    name: 'Usage of Calculator',
    url: 'https://arunai.org/wp-content/coe/download-form/Usage of Calculator.pdf'
  }
]

const coeFormsRows = formsData.map((form, i) => [
  <div className="text-center font-semibold">{i + 1}</div>,
  <div className="font-medium text-gray-800">{form.name}</div>,
  <div className="flex justify-center">
    <a
      href={form.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-800 transition-colors group"
      title="Download PDF"
    >
      <svg className="h-6 w-6 text-red-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3.5h-3v1.5h2.5V11H18v2h-1.5V7h4v1.5zM9 8.5H10v1H9v-1zm5 1.5h1v1.5h-1V10zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z" />
      </svg>
    </a>
  </div>
])

const CoeForms = () => (
  <InnerPageLayout sidebarTitle={coeSidebar.title} sidebarLinks={coeSidebar.links}>
    <PageHeader title="Download Forms" />

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Download Forms', 'View']}
        rows={coeFormsRows}
        headerBg="bg-red-200 text-[#1a202c]"
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default CoeForms

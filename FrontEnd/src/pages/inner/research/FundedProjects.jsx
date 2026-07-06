import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, DataTable } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const fundedProjectsData = [
  ['1', 'Design, development and deployment of Grid interfaced power conversion unit for solar – wind power generation system', '01.06.2016 – 30.05.2018', '3,40,000.00', 'Central Power Research Institute, A Government of India Society, Bangalore, Ministry of Power, Government of India (RSOP Project)', 'Dr. V. Saravanan'],
  ['2', 'Design and development of efficient power conditioning system for grid connected Wind – Solar hybrid power generation in Tiruvannamalai district', '23.02.2017 – 23.02.2019', '17,04,000.00', 'Wind Energy Division, Ministry of New & Renewable Energy, Government of India', 'Dr. V. Saravanan'],
  ['3', 'Reconfigurable architecture for solar photovoltaic microgrid systems', '13.06.2018 – 30.06.2020', '12,15,000.00', 'Department of Science & Technology (International Bilateral Cooperation Division) Ministry of Science and Technology Government of India', 'Dr. V. Saravanan'],
  ['4', 'Smart Farming', '18.03.2020 – 18.03.2021', '7,500.00', 'Tamilnadu State Council for Science & Technology, Chennai', 'Dr. V. Saravanan'],
]

const FundedProjects = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Funded Projects" />

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Title of the Research Project', 'Project Duration', 'Amount (Rs.)', 'Funding Agency', 'Principal Investigator']}
        rows={fundedProjectsData}
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default FundedProjects

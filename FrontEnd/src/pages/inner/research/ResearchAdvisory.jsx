import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, DataTable } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const committeeData = [
  ['1', 'Dr.C. Elanchezhian', 'Principal', 'Chairman'],
  ['2', 'Dr.P.Anandan', 'HOD/CSE', 'Coordinator'],
  ['3', 'Dr.L.Jayakumar', 'HOD/Mech', 'Member'],
  ['4', 'Dr.S.Sivarathnakumar', 'HOD/Chemical', 'Member'],
  ['5', 'Dr.S.Mohanarangan', 'HOD/CYBER', 'Member'],
  ['6', 'Dr.S.Elango', 'HOD/ECE', 'Member'],
  ['7', 'Dr.S.Sivakumar', 'HOD/EEE', 'Member'],
  ['8', 'Dr.K.Anitha', 'HOD/IT', 'Member'],
  ['9', 'Dr.M. Ayyampillai', 'HOD/HAS', 'Member'],
  ['10', 'Dr.S. Ramamoorthy', 'HOD/HAS', 'Member'],
  ['11', 'Dr.R.Selvaraj', 'AP/BT', 'Member'],
  ['12', 'Dr.V.Saravanan', 'Prof/EEE', 'Member'],
  ['13', 'Dr.K.Yogitha', 'Prof/ECE', 'Member'],
  ['14', 'Dr.S.Manikandan', 'Scientist (DRDO)', 'Research Institute Member'],
  ['15', 'Mr.C.D.Senthilraj', 'CEO/CTO', 'Industry Member'],
]

const ResearchAdvisory = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Research Advisory Committee Members" />

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Faculty Name', 'Designation/Department', 'Position']}
        rows={committeeData}
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default ResearchAdvisory

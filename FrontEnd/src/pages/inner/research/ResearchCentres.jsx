import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, DataTable } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const centresData = [
  ['1', 'Electrical & Electronics Engineering', '4150408', 'Anna University, Chennai'],
  ['2', 'Mechanical Engineering', '4150417', 'Anna University, Chennai'],
]

const ResearchCentres = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Recognized Research Centres" />

    <SectionBlock>
      <BodyText>
        The following departments have been officially approved as Research Centres by Anna University to offer Ph.D. and M.S. (By Research) programmes. These centres are well-equipped with modern laboratories and advanced research infrastructure to support academic excellence and innovation.
      </BodyText>
    </SectionBlock>

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Department', 'Code', 'Affiliating Body']}
        rows={centresData}
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default ResearchCentres

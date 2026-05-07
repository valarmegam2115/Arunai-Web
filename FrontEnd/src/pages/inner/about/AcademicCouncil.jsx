import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const AcademicCouncil = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Academic Council Members" />
    <SectionBlock>
      <BodyText>
        Content for the Academic Council Members goes here.
      </BodyText>
    </SectionBlock>
  </InnerPageLayout>
)

export default AcademicCouncil

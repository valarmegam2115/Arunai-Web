import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const OrgStructure = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Organizational Structure" />
    <SectionBlock>
      <BodyText>
        Content for Organizational Structure goes here. You can include an organizational chart image here.
      </BodyText>
    </SectionBlock>
  </InnerPageLayout>
)

export default OrgStructure

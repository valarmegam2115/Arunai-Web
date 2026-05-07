import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const GoverningBody = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Governing Body Members" />
    <SectionBlock>
      <BodyText>
        Content for the Governing Body Members goes here. You can replace this with a table or list of members.
      </BodyText>
    </SectionBlock>
  </InnerPageLayout>
)

export default GoverningBody

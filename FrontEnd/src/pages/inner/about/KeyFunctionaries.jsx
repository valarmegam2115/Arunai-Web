import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const KeyFunctionaries = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Key Functionaries" />
    <SectionBlock>
      <BodyText>
        Content for Key Functionaries goes here. Replace this with a list or table of key roles and the people in them.
      </BodyText>
    </SectionBlock>
  </InnerPageLayout>
)

export default KeyFunctionaries

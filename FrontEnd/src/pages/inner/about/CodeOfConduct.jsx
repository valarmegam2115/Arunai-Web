import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const CodeOfConduct = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Code of Conduct" />
    <SectionBlock>
      <BodyText>
        Content for Code of Conduct goes here.
      </BodyText>
    </SectionBlock>
  </InnerPageLayout>
)

export default CodeOfConduct

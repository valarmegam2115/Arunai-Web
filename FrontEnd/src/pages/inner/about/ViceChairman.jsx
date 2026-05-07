import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const ViceChairman = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Vice Chairman" />
    <SectionBlock>
      <ProfileCard 
        name="Thiru E.V. Kumaran"
        title="Vice Chairman"
        bio="Content for the Vice Chairman goes here. You can update this section with the actual biography and contributions."
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default ViceChairman

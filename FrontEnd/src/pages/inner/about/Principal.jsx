import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const Principal = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="The Principal" />
    <SectionBlock>
      <ProfileCard 
        name="Dr. R. Sathiyaseelan"
        title="Principal"
        bio="Content for the Principal goes here. You can update this section with the actual biography and contributions."
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default Principal

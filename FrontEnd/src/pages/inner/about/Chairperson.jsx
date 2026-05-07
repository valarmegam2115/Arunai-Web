import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const Chairperson = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Chairperson" />
    <SectionBlock>
      <ProfileCard 
        name="Tmt. V. Muthukarasi Velu"
        title="Chairperson"
        bio="Content for the Chairperson goes here. You can update this section with the actual biography and contributions."
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default Chairperson

import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage } from '../../../components/blocks'
import { placementSidebar } from '../../../utils/sidebarConfig'

const Overview = () => (
  <InnerPageLayout sidebarTitle={placementSidebar.title} sidebarLinks={placementSidebar.links}>


    <PageHeader title="Placement" />

    <SectionBlock>
      <BodyText>
       Hello
      </BodyText>

    </SectionBlock>


  </InnerPageLayout>
)

export default Overview

import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage } from '../../../components/blocks'
import { approvalSidebar } from '../../../utils/sidebarConfig'

const MandatoryDisclosure = () => (
  <InnerPageLayout sidebarTitle={approvalSidebar.title} sidebarLinks={approvalSidebar.links}>


    <PageHeader title="Mandatory Disclosure" />

    <SectionBlock>
      <BodyText>
       Hello
      </BodyText>

    </SectionBlock>


  </InnerPageLayout>
)

export default MandatoryDisclosure

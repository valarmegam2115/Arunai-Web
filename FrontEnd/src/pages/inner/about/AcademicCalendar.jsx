import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const AcademicCalendar = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Academic Calendar" />
    <SectionBlock>
      <BodyText>
        Content for the Academic Calendar goes here. You can embed a PDF or link to the calendar documents.
      </BodyText>
    </SectionBlock>
  </InnerPageLayout>
)

export default AcademicCalendar

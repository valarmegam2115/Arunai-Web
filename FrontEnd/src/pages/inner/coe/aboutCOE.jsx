import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage } from '../../../components/blocks'
import { coeSidebar } from '../../../utils/sidebarConfig'

const AboutCOE = () => (
  <InnerPageLayout sidebarTitle={coeSidebar.title} sidebarLinks={coeSidebar.links}>
   

    <PageHeader title="About Controller Of Examinations" />

    <SectionBlock>
      <BodyText>
        The office of the Controller of Examinations has been established from the month of August 2024 following the conferment of autonomous status to the institution. The Office of the Controller of Examinations is responsible for assessing the continuous learning process of students by maintaining high quality and standards in the examination process while ensuring confidentiality. It is the duty of this office to arrange, prepare, schedule, conduct, publish, and maintain records of Continuous Internal Assessments (CIA) and End Semester Examinations for all UG, PG, and Ph.D. programmes.
      </BodyText>
     
    </SectionBlock>


  </InnerPageLayout>
)

export default AboutCOE

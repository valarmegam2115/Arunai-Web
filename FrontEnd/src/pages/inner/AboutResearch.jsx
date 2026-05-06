import React from 'react'
import InnerPageLayout from '../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BulletList } from '../../components/blocks'
import { researchSidebar } from '../../utils/sidebarConfig'

const AboutResearch = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Research" />

    <SectionBlock>
      <BodyText>
        Research at Arunai is vibrant, dynamic and innovative providing an exciting environment to
        excellence and discovery. With a strong emphasis on learning, teaching and research quality,
        Arunai provides opportunities for students to read in an environment where knowledge is
        constantly created and disseminated. Through engagement with accomplished faculty and
        researchers who are actively engaged in advancing their fields, they gain invaluable exposure
        to the profession.
      </BodyText>
      <BodyText className="mt-4">
        Research Culture at Arunai plays an important role in around student(s) development.
        Students are taught the basics of research, recent advancement in their discipline and need
        for innovation as a tool to address real life challenges during the initial phases of study.
        This groundwork stimulates curiosity, critical thinking and ingenuity.
      </BodyText>
      <BodyText className="mt-4">
        Arunai has facilitated partnerships with industries, academic institutions, research
        organizations and professional bodies to turn students' research ideas into practical
        applications. Such partnerships give rise to internships, consultancy projects, funded
        research, incubating entrepreneurial talent and technology transfer.
      </BodyText>
    </SectionBlock>

    <SectionBlock title="Objectives">
      <BulletList items={[
        'Encourage faculty and students to conduct research relevant to the needs of industry and of society.',
        'To promote scientific projects and innovative businesses using new technologies supporting entrepreneurship activities and industrial development.',
        'Several outcomes of research may include publication in reputed journals, representation in conferences, patents filed and IP rights generated.',
        'Development of sustainable solutions for the future.',
      ]} />
    </SectionBlock>

    <SectionBlock title="Research Highlights">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Research Centres',  value: '10+' },
          { label: 'Publications',      value: '500+' },
          { label: 'Patents Filed',     value: '25+' },
          { label: 'Funded Projects',   value: '30+' },
          { label: 'MoU Signed',        value: '15+' },
          { label: 'PhD Scholars',      value: '100+' },
        ].map((s, i) => (
          <div key={i} className="rounded-lg border border-blue-100 bg-[#f0f5ff] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#001a66]/60">{s.label}</p>
            <p className="mt-1 text-[22px] font-extrabold text-[#001a66]">{s.value}</p>
          </div>
        ))}
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default AboutResearch

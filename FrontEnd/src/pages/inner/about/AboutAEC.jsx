import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const AboutAEC = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <BannerImage src="/hero-image.png" alt="Arunai Engineering College" />

    <PageHeader title="About Arunai Engineering College" />

    <SectionBlock>
      <BodyText>
        A rapidly changing world is one of the biggest challenges facing today's graduates. New
        technologies, new working practices and changes in tastes and fashions require graduates who
        are equipped with flexible attitudes. AEC provides students to meet with such skills to
        succeed.
      </BodyText>
      <BodyText className="mt-4">
        AEC, a Co-Educational institution was established in the year 1993. The college is spread
        out on serene sylvan settings on the Chittoor – Cuddalore national highway, providing a
        holistic environment, ideal for dedicated study with discipline, away from the hustle and
        bustle of the modern cities. The serene spiritual atmosphere at AEC helps an individual to
        discover himself and the contribution he can make to the world.
      </BodyText>
      <BodyText className="mt-4">
        In a rapidly evolving world, today's graduates face constant challenges brought by emerging
        technologies, dynamic work environments, and changing global trends. To thrive in such a
        landscape, students require adaptable mindsets and versatile skill sets. Arunai Engineering
        College (AEC) is committed to equipping students with these essential competencies, ensuring
        they are well-prepared to succeed in their careers and contribute meaningfully to society.
      </BodyText>
    </SectionBlock>

    <SectionBlock title="Vision">
      <BodyText>
        To be a world-class institution of Engineering and Technology, nurturing talent and
        fostering innovation, in harmony with nature, for sustainable global development.
      </BodyText>
    </SectionBlock>

    <SectionBlock title="Mission">
      <ul className="space-y-3">
        {[
          'To provide quality education in engineering and technology to students from all sections of society.',
          'To produce competent engineers and technologists with strong ethical values, communication skills, and leadership qualities.',
          'To promote research, entrepreneurship, and innovation to meet the needs of industries and society.',
          'To create an environment that cultivates discipline, teamwork, and social responsibility.',
        ].map((m, i) => (
          <li key={i} className="flex items-start gap-3 text-[15px] leading-7 text-gray-700">
            <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#990000]" />
            {m}
          </li>
        ))}
      </ul>
    </SectionBlock>

    <SectionBlock title="Why Arunai?">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[
          { label: 'Established',  value: '1993' },
          { label: 'Campus Area',  value: '25,000+ sq.m' },
          { label: 'Students',     value: '20,000+' },
          { label: 'Departments',  value: '13+' },
          { label: 'Publications', value: '500+' },
          { label: 'Alumni',       value: '15,000+' },
        ].map((s, i) => (
          <div key={i} className="rounded-lg border border-blue-100 bg-[#f0f5ff] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#001a66]/60">{s.label}</p>
            <p className="mt-1 text-[18px] font-extrabold text-[#001a66]">{s.value}</p>
          </div>
        ))}
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default AboutAEC

import React from 'react'
import InnerPageLayout from '../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage, CourseChip, BulletList } from '../../components/blocks'
import { deptSidebar } from '../../utils/sidebarConfig'

const sidebar = deptSidebar('CSE', '/academics/dept/cse')

const DeptCSE = () => (
  <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
    <BannerImage src="/course/course-pg.png" alt="Department of Computer Science & Engineering" />

    <PageHeader title="Department of Computer Science & Engineering" />

    <SectionBlock title="Courses Offered">
      <div className="space-y-3">
        <CourseChip label="UG – B.E. Computer Science & Engineering" />
        <CourseChip label="PG – M.E. Computer Science & Engineering" />
      </div>
    </SectionBlock>

    <SectionBlock title="Introduction">
      <BodyText>
        The Department of Computer Science & Engineering was established in 1993. The department
        offers B.E. and M.E. programs affiliated to Anna University, Chennai. The department has
        well-equipped laboratories with the latest hardware and software tools to provide hands-on
        training to the students.
      </BodyText>
      <BodyText className="mt-4">
        The department has a team of highly qualified, dedicated and experienced faculty members
        committed to achieving the highest standards of academic excellence. The faculty actively
        engage in research and development activities and regularly publish papers in national and
        international journals and conferences.
      </BodyText>
    </SectionBlock>

    <SectionBlock title="Vision">
      <BodyText>
        To be a centre of excellence in Computer Science & Engineering education and research,
        producing globally competent professionals with ethical values.
      </BodyText>
    </SectionBlock>

    <SectionBlock title="Mission">
      <BulletList items={[
        'To impart quality education in Computer Science & Engineering through updated curriculum and pedagogy.',
        'To enhance research, innovation and problem-solving skills among students and faculty.',
        'To develop professionals with strong ethical values, communication skills and social responsibility.',
        'To collaborate with industries and research organizations for mutual benefit.',
      ]} />
    </SectionBlock>

    <SectionBlock title="Department Highlights">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: 'Established',    value: '1993' },
          { label: 'UG Intake',      value: '240' },
          { label: 'PG Intake',      value: '18' },
          { label: 'Faculty',        value: '30+' },
          { label: 'Publications',   value: '100+' },
          { label: 'Placement %',    value: '92%' },
        ].map((s, i) => (
          <div key={i} className="rounded-lg border border-blue-100 bg-[#f0f5ff] px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#001a66]/60">{s.label}</p>
            <p className="mt-1 text-[20px] font-extrabold text-[#001a66]">{s.value}</p>
          </div>
        ))}
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default DeptCSE

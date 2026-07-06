import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage } from '../../../components/blocks'
import { placementSidebar } from '../../../utils/sidebarConfig'

const stats = [
  { value: '7', suffix: 'LPA', label: 'Highest Offer' },
  { value: '642', suffix: '+', label: 'Total Offers' },
  { value: '423', suffix: '+', label: 'No of Students Recruited' },
  { value: '60', suffix: '+', label: 'No of Recruiters' },
]

const methodology = [
  {
    title: 'Industry-Synced Training',
    description: 'Our hands-on approach, through Centers of Excellence and live projects, prepares learners for real-world challenges.',
  },
  {
    title: 'Strategic Placement Preparation',
    description: 'From day one, we integrate placement training with academics. Tailored workshops, resume building, and interview prep sessions, guided by experts, equip you for top-tier job opportunities.',
  },
  {
    title: 'Robust Industry Links',
    description: 'Leverage our strong connections with leading companies for internships and in-plant training, giving learners a competitive edge in the job market.',
  },
]

const Overview = () => (
  <InnerPageLayout sidebarTitle={placementSidebar.title} sidebarLinks={placementSidebar.links}>

    {/* Banner Image */}
    <BannerImage src="/course/placements.jpg" alt="Arunai Engineering College Placements - Achievers Day" />

    {/* Page Title */}
    <div className="mb-8 text-center">
      <h1 className="text-xl font-extrabold tracking-tight text-[#1a202c] sm:text-2xl">
        About Training and Placement Departments at AEC
      </h1>
      <div className="mx-auto mt-3 flex h-[3px] w-16 overflow-hidden">
        <div className="h-full w-1/2 bg-[#001a66]" />
        <div className="h-full w-1/2 bg-[#e53e3e]" />
      </div>
    </div>

    {/* Stats Section */}
    <SectionBlock>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center py-4">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-3xl sm:text-4xl font-extrabold text-[#001a66]">{stat.value}</span>
              <span className="text-sm sm:text-base font-bold text-[#e53e3e]">{stat.suffix}</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionBlock>

    {/* Introduction */}
    <SectionBlock title="Introduction">
      <BodyText>
        At AEC – Arunai Engineering College (Autonomous), we offer a dynamic blend of 'Training and Placement' strategies designed to empower learners to secure their dream jobs. This unique integrated approach is woven into the academic fabric from Year One, ensuring that learners develop not just technical prowess but also the soft skills crucial for professional success. With faculty who bring extensive industrial experience to the classroom, AEC is more than an institution; it's a launchpad for super dream offers and illustrious careers.
      </BodyText>
    </SectionBlock>

    {/* Our Unique Methodology */}
    <SectionBlock title="Our Unique Methodology">
      <div className="space-y-5">
        {methodology.map((item, index) => (
          <div key={index} className="flex items-start gap-4 rounded-lg border border-gray-100 bg-slate-50 p-5 transition-all hover:border-blue-200 hover:shadow-sm">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#001a66] text-white text-sm font-bold mt-0.5">
              {index + 1}
            </div>
            <div className="flex-1">
              <h3 className="text-[15px] font-bold text-[#001a66] mb-1">{item.title}</h3>
              <p className="text-[14px] leading-7 text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>

  </InnerPageLayout>
)

export default Overview

import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'
import PrincipalPhoto from '../../../assets/about_images/Principal.jpg'

const Principal = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Principal" />
    
    <SectionBlock className="mt-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left: Image Card */}
        <div className="flex-shrink-0 w-full md:w-[280px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
          <img 
            src={PrincipalPhoto}
            alt="Dr. C. Elanchezhian, M.E., Ph.D.," 
            className="w-full h-64 object-cover object-top"
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=EV+Velu&size=300&background=random' }}
          />
          <div className="p-6 text-center flex-1 flex flex-col justify-center">
            <h3 className="text-[16px] font-black text-red-600 uppercase tracking-wide">Dr. C. Elanchezhian, M.E., Ph.D.,</h3>
            <p className="mt-1.5 text-[13px] font-extrabold text-[#001a66]">Principal</p>
          </div>
        </div>

        {/* Right: Message Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center p-6 sm:p-8">
          <div className="relative w-full bg-[#ffffff] rounded-[25px] py-6 px-5 sm:py-8 sm:px-10 overflow-hidden">  
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#dc2626] rounded-l-[25px]" />

            <p className="pl-4 sm:pl-8 text-[15px] sm:text-[16px] leading-relaxed sm:leading-[2.2] text-gray-700 text-left sm:text-justify tracking-wide font-medium">
              Dr. C. Elanchezhian has been appointed as the Principal of Arunai Engineering College, Tiruvannamalai. With illustrious teaching career spanning over three decades, he boasts an impressive academic profile.
              <br className="my-2"/>
              He has a teaching experience more than 30 years in various Engineering colleges in India. He is distinguished member of the international association of engineers and the Indian society of technical education.
            </p>

          </div>
        </div>
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default Principal

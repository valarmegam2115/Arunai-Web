import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'
import Vice from '../../../assets/about_images/Vice-Chairman.jpeg'

const ViceChairman = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Vice Chairman" />
    
    <SectionBlock className="mt-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left: Image Card */}
        <div className="flex-shrink-0 w-full md:w-[280px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
          <img 
            src={Vice}
            alt="Er. E.V. KUMARAN, M.E.," 
            className="w-full h-64 object-cover object-top"
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=EV+Velu&size=300&background=random' }}
          />
          <div className="p-6 text-center flex-1 flex flex-col justify-center">
            <h3 className="text-[16px] font-black text-red-600 uppercase tracking-wide">Er. E.V. KUMARAN, M.E.,</h3>
            <p className="mt-1.5 text-[13px] font-extrabold text-[#001a66]">Vice - Chairman</p>
          </div>
        </div>

        {/* Right: Message Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center p-6 sm:p-8">
          <div className="relative w-full bg-[#ffffff] rounded-[25px] py-6 px-5 sm:py-8 sm:px-10 overflow-hidden">  
            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#dc2626] rounded-l-[25px]" />

            <p className="pl-4 sm:pl-8 text-[15px] sm:text-[16px] leading-relaxed sm:leading-[2.2] text-gray-700 text-left sm:text-justify tracking-wide font-medium">
              Education is a very important contributing element to both society mobility and economic developments, we reflect quality education and links between educational system and technical skill demanded by growing economics.
            </p>

          </div>
        </div>
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default ViceChairman

import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const FounderChairman = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Founder Chairman" />
    
    <SectionBlock className="mt-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left: Image Card */}
        <div className="flex-shrink-0 w-full md:w-[280px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
          <img 
            src="/founder.jpg" 
            alt="Thiru. E.V. VELU" 
            className="w-full h-64 object-cover object-top"
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=EV+Velu&size=300&background=random' }}
          />
          <div className="p-6 text-center flex-1 flex flex-col justify-center">
            <h3 className="text-[16px] font-black text-red-600 uppercase tracking-wide">Thiru. E.V. VELU</h3>
            <p className="mt-1.5 text-[13px] font-extrabold text-[#001a66]">Founder Chairman</p>
          </div>
        </div>

        {/* Right: Message Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center py-8">
          <div className="w-[6px] h-3/4 bg-red-600 rounded-r-md flex-shrink-0"></div>
          <div className="px-8 sm:px-12 py-4">
            <p className="text-[15.5px] leading-[2.4] text-gray-700 text-justify tracking-wide font-medium">
              It gives me immense pleasure to present Arunai Engineering College for the society. The purpose of establishing Arunai Engineering College is to train students in the field of Engineering and Technology within a human relations approach framework.
            </p>
          </div>
        </div>
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default FounderChairman

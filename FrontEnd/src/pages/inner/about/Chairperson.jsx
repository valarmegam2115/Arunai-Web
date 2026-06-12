import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, ProfileCard } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'
import CP from '../../../assets/about_images/Chairperson.jpg'

const Chairperson = () => (
  <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
    <PageHeader title="Chairperson" />
    
    <SectionBlock className="mt-12">
      <div className="flex flex-col md:flex-row gap-8 items-stretch">
        {/* Left: Image Card */}
        <div className="flex-shrink-0 w-full md:w-[280px] rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col">
          <img 
            src={CP}
            alt="Tmt. SANKARI" 
            className="w-full h-64 object-cover object-top"
            onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=EV+Velu&size=300&background=random' }}
          />
          <div className="p-6 text-center flex-1 flex flex-col justify-center">
            <h3 className="text-[16px] font-black text-red-600 uppercase tracking-wide">Tmt. SANKARI</h3>
            <p className="mt-1.5 text-[13px] font-extrabold text-[#001a66]">Chairperson</p>
          </div>
        </div>

        {/* Right: Message Box */}
        <div className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center py-8">
          <div className="relative bg-[#ffffff] rounded-[25px] py-8 px-10 overflow-hidden">  
          <div
            className="absolute left-2 top-0 h-full w-5"
            style={{
              borderLeft: "5px solid #dc2626",
              borderRadius: "30px 0 0 30px",
            }}
          />

          <p className="pl-8 text-[15.5px] leading-[2.4] text-gray-700 text-justify tracking-wide font-medium">
              You are our safe source and we bank all our efforts on you. We create not the future instead we craft you for the future.
            </p>
          </div>
        </div>
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default Chairperson

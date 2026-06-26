import React from 'react';
import InnerPageLayout from '../../../components/InnerPageLayout';
import { PageHeader, SectionBlock } from '../../../components/blocks';
import { aboutSidebar } from '../../../utils/sidebarConfig';
import orgStructureImg from "../../../assets/about_images/org_structure.jpg";

const OrgStructure = () => {
  return (
    <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
      <PageHeader title="Organizational Structure" />
      
      <SectionBlock>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src={orgStructureImg} 
              alt="Arunai Engineering College Organizational Structure" 
              className="w-full h-[700px] object-contain rounded-lg"
            />
          </div>
          <p className="mt-4 text-center text-sm font-semibold text-gray-500 tracking-wide uppercase">
            Organizational Structure Hierarchy Chart
          </p>
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default OrgStructure;

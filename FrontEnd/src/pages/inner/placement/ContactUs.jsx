import React from 'react';
import InnerPageLayout from '../../../components/InnerPageLayout';
import { PageHeader, SectionBlock } from '../../../components/blocks';
import { placementSidebar } from '../../../utils/sidebarConfig';

const ContactUs = () => {
  return (
    <InnerPageLayout sidebarTitle={placementSidebar.title} sidebarLinks={placementSidebar.links}>
      

      <SectionBlock>
        <div className="w-full max-w-4xl mx-auto ">
          <div className="bg-white rounded-2xl ">
            <h2 className="text-[22px] font-bold text-gray-800 mb-8 flex items-center">
              <span className="w-1.5 h-6 bg-red-700 mr-3"></span>
              Contact
            </h2>
            
            <div className="space-y-1 text-gray-700">
              <div className="space-y-1">
                <p className="font-bold text-lg text-gray-900">Prof. K.Angappan</p>
                <p className="font-bold text-gray-800">(Placement Officer)</p>
                <p className="font-bold text-gray-800 mt-2">Arunai Engineering College (Autonomous)</p>
                <p>Velu Nagar, Mathur,</p>
                <p>Tiruvannamalai &ndash; 606603</p>
                <p>Tamilnadu, India</p>
              </div>

              <div className="pt-4 space-y-2">
                <p>
                  <span className="font-bold text-gray-900">Phone: </span> 
                  <a href="tel:+919443435797" className="text-blue-600 hover:underline">+91 9443435797</a>
                </p>
                <p>
                  <span className="font-bold text-gray-900">Email: </span> 
                  <a href="mailto:arunaiplacement@gmail.com" className="text-blue-600 hover:underline">arunaiplacement@gmail.com</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default ContactUs;

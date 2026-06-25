import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { placementSidebar } from '../../../utils/sidebarConfig'


const rules = [
  "Students should register their names in Training and Placement Cell by submitting their willingness to participate in Recruitment Process. Only those students who have registered are eligible to participate in the campus recruitment & training.",

  "Students must register their Personal Information such as Name, 10th/12th/Degree CGPA, Email id and Mobile No during their registration in the placement cell.",
  "Students having backlog of 2 or more arrears are not permitted to register for placement. Such students are advised to clear the backlogs and then register after clearing the pending backlogs.",
  "The eligibility criteria imposed by the visiting company will be the final.",
  "The eligible / registered students must compulsorily attend all the training programmes.",
  "Without prior intimation, if students absent themselves for any training program, then they will be blacklisted from the Training & Placement Cell.",
  "The Blacklisted students will not be allowed to participate in any training & placement process unless they give proper reason for their absence along with their parents.",
  "Once shown Interest in any of Company, student should follow the entire selection process and they will not be allowed to withdraw their candidature at a later point of time, without any prior information and with a genuine reason. Failing which, student will be barred to appear in future campus recruitment process.",
  "Once student placed in any one company, then they will not be allowed to attend any future campus recruitment process.",
  "However with the permission of placement cell, already placed students are allowed to attend dream company placement process. Dream company status are given to some reputed organizations those who offer an Exceptionally big pay-package (CTC) to the students. The decision of the placement office is final in this regard."
]

const Rules = () => (
  <InnerPageLayout
    sidebarTitle={placementSidebar.title}
    sidebarLinks={placementSidebar.links}
  >
    <PageHeader title="Rules & Regulations" />

    <SectionBlock className="mt-10">
      <div className="rounded-xl bg-gray-50 p-8">
        <div className="space-y-8">
          {rules.map((rule, index) => (
            <div key={index} className="flex items-start gap-4">
              {/* Icon */}
              <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                ✓
                </div>

              {/* Rule Text */}
              <p className="text-lg leading-9 text-gray-700 text-justify">
                {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  </InnerPageLayout>
)

export default Rules
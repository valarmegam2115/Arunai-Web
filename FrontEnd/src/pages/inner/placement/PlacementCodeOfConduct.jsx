import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { placementSidebar } from '../../../utils/sidebarConfig'


const codeofconduct = [
  "It is mandatory for all students appearing for any process of campus drive to come in formal dress code.",
  "Students must bring their identity cards & resumes with them during the placement process.",
  "Direct communication of students with the company officials is not allowed.",
  "It is mandatory for students to register themselves to participate in the placement process of the company.",
  "Any kind of misbehavior / complaints reported by the company officials will be taken seriously and if proved, the student will be debarred from further campus recruitment process.",
  "The student who was placed already, willing to pursue higher studies (in India or abroad), needs to inform the placement cell as soon as possible along with the letter received by the university."

  
]

const PlacementCodeOfConduct = () => (
  <InnerPageLayout
    sidebarTitle={placementSidebar.title}
    sidebarLinks={placementSidebar.links}
  >
    <PageHeader title="Code of Conduct" />

    <SectionBlock className="mt-10">
      <div className="rounded-xl bg-gray-50 p-8">
        <div className="space-y-8">
          {codeofconduct.map((rule, index) => (
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

export default PlacementCodeOfConduct
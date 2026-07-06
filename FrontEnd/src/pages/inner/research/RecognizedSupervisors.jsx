import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, DataTable } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const supervisorData = [
  ['1', '2620013', 'Jayakumar L', 'Mechanical Engineering', 'Composite Materials, Wear Characterization, Manufacturing, Impact Characterization', 'jkpathy@gmail.com'],
  ['2', '4220026', 'Ravichandaran R', 'Mechanical Engineering', 'Composite Materials, Fracture Mechanics, Natural Composites, Characterization of Materials', 'easternravi@gmail.com'],
  ['3', '4220018', 'Selvarasu S', 'Mechanical Engineering', 'Composite Materials, Wear, Optimization Techniques, IC Engines', 'selvarasu2007@gmail.com'],
  ['4', '4120187', 'Sivakumar S', 'Mechanical Engineering', 'Vibration Analysis, Composite Materials, Fluid Dynamics, Manufacturing', 'sivakumarsolaiachari@gmail.com'],
  ['5', '4120044', 'Thirumalvalavan S', 'Mechanical Engineering', 'Material Science, Coatings, Tribology, Optimization Techniques', 'stnmech@gmail.com'],
  ['6', '2730073', 'Saravanan V', 'Electrical and Electronics Engineering', 'Solar Photovoltaic Systems, Embedded Applications to Hybrid Energy Systems', 'vsaranaec@yahoo.co.in'],
  ['7', '4430020', 'Velmurugan V', 'Electrical and Electronics Engineering', 'Process Control, Intelligent Controller, Electrical Engineering, Embedded Systems', 'velnathan@gmail.com'],
  ['8', '2640094', 'Anandan P', 'Computer Science and Engineering', 'Device Modeling, VLSI, Image Processing, Nano Electronics, Machine Learning', 'anandanvp2000@gmail.com'],
]

const RecognizedSupervisors = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Recognized Supervisor List" />

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Ref.No', 'Name', 'Department', 'Research Area', 'Email']}
        rows={supervisorData}
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default RecognizedSupervisors

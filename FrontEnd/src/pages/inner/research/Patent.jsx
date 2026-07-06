import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, DataTable } from '../../../components/blocks'
import { researchSidebar } from '../../../utils/sidebarConfig'

const patentData = [
  ['1', '202441066215 A', 'Published', 'V.Bindu', 'Leverging supercomputing and AI to transfer heat mass processes for environmental improvements'],
  ['2', '202341014546 A', 'Published', 'Dr. S. Priyadharsini', 'Design modified rotor for wind turbine to enhance the efficiency'],
  ['3', '202441062454', 'Published', 'Dr. S. Priyadharsini', '3D modelling and printing in smart transportation by deep learning for agriculture'],
  ['4', '202541008328A', 'Published', 'Dr.L.Jayakumar', 'Quasi-Zero-Stiffness Vibration Isolated with Fluid Actuators and Composite Material'],
  ['5', '2019219000055A', 'Published', 'Dr.S.Thirumalvalavan', 'Advanced 3D printing of metal and textile-integrated parts with high'],
  ['6', '202441093942', 'Published', 'Mr.S.Venkatesan, Mrs.S.Latha', 'Intelligent drone system for automated inspection of industrial infrastructure using machine learning'],
  ['7', '202441073412', 'Published', 'Dr.S.Selvarasu, Dr.P.Arulraj, Dr.S.Thirumalvalavan', 'A system for sub-surface tsunami early-warning integrated with autonomous winch and real-time data transmission mechanisms'],
  ['8', '202441041557', 'Published', 'Mr.R.Senthil, Mr.S.Venkatesan', 'Development of Low Cost Floor Cleaning Machine'],
  ['9', '202441033737', 'Published', 'Mr.S.Venkatesan, Mr.R.Senthil', 'Next-Generation Robotics Arm With Adaptive Gripping Technology'],
  ['10', '404231001', 'Published', 'Dr.S.Selvarasu', 'IOT Based Agriculture Robot for Pesticides Spraying'],
  ['11', '202441014309', 'Published', 'Mr.A.Eakambaram', 'Trailer/Tow Hitch Remote Access & Control'],
  ['12', '399732001', 'Published', 'Dr.S.Thirumalvalavan, Dr.S.Selvarasu', 'Organic Waste Sorting Machine'],
  ['13', '202341040255', 'Published', 'Mr.A.Eakambaram', 'An Intelligent turn indicator system for Road Transport Vehicle'],
  ['14', '202241012929', 'Published', 'Dr.S.Thirumalvalavan', 'Optimization of Thermal Conductivity and Viscosity of Refrigents'],
  ['15', '202211006188', 'Published', 'Mr.A.Eakambaram', 'A Method for Developing a Low-Metallic Brake Pad Mixture.'],
  ['16', '202541087332 A', 'Published', 'Mr. Venkatesan S', 'Intelligent Machining Process Optimization for Polymer Composites Using AI and Machine Learning'],
  ['17', '406690-001', 'Published', 'Mr. Venkatesan S', 'Design to WELDING TOOL'],
  ['18', '414286-001', 'Granted', 'Dr.S.SIVAKUMAR', 'Autonomous Navigation System for Electric Bike'],
  ['19', '202141018763', 'Granted', 'Dr.S.SIVAKUMAR', 'An apparatus and a method for the automatic segregation and recycling of waste materials'],
  ['20', 'L-155699/2024', 'Granted', 'Dr.R.Suresh', 'Advanced Power Electronics for Renewable'],
]

const Patent = () => (
  <InnerPageLayout sidebarTitle={researchSidebar.title} sidebarLinks={researchSidebar.links}>
    <PageHeader title="Patent" />

    <SectionBlock>
      <DataTable
        columns={['S.No', 'Patent Application No.', 'Status of Patent (Published / Granted)', 'Inventor/s Name', 'Title of the Patent']}
        rows={patentData}
      />
    </SectionBlock>
  </InnerPageLayout>
)

export default Patent

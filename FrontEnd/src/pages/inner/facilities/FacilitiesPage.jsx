import React from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText } from '../../../components/blocks'
import { facilitiesSidebar } from '../../../utils/sidebarConfig'

// ── Static content for each facility ──────────────────────────────
const facilitiesContent = {
  library: {
    title: 'Library',
    paragraphs: [
      `The Central Library of Arunai Engineering College, established in 1993, stands as one of the important academic support centers of the institution, dedicated to enhancing teaching, learning, and research activities. Located in a spacious area of 1,260 sq. m., the library provides a calm and resourceful environment for students and faculty members. It possesses an impressive collection of 45,912 volumes and 19,286 titles covering engineering, technology, science, management, humanities, and general studies. In comparison with many self-financing engineering college libraries, the collection is highly substantial and reflects the institution's commitment to academic excellence. The library also subscribes to 110 Indian journals and magazines and 103 foreign journals, ensuring that users remain updated with the latest developments in various fields. In addition, 4,601 back volumes and 4,931 project reports are maintained for reference and research purposes.`,
      `To meet the growing demand for digital learning, the library offers access to 911 e-journals and online academic resources, which is comparable to the digital facilities available in several reputed engineering colleges. The library also preserves non-book materials such as 3,223 CDs/floppies, 22 audio cassettes, and 51 video cassettes, which support multimedia learning. Its memberships with IEI, DELNET, ISTE, and IEEE place it on par with libraries of well-established technical institutions by providing wider academic connectivity and access to global knowledge databases. Operating from 9:00 AM to 6:00 PM, the library offers modern services such as OPAC, photocopying, Inter Library Loan (ILL), and Current Awareness Service (CAS). When compared with many college library websites, the facilities and resources of Arunai Engineering College Library demonstrate a balanced combination of traditional collections, digital resources, and student-centered services, making it a valuable asset to the institution.`,
    ],
  },
  hostel: {
    title: 'Hostel',
    paragraphs: [
      `Arunai Engineering College provides comfortable, safe, and well-maintained hostel facilities for both boys and girls to ensure a pleasant residential experience for students coming from different regions. The college offers separate hostel accommodations for male and female students, namely the Dr. A. P. J. Abdul Kalam Men's Hostel and the Mother Teresa Women's Hostel. Both hostels are designed to create a homely atmosphere with a focus on safety, discipline, and convenience. Students are provided with spacious rooms featuring individual attached bathrooms for better comfort and privacy. Wi-Fi connectivity is available throughout the hostel premises to support academic learning and communication needs.`,
      `To ensure safety and security, the hostel campus is monitored through surveillance cameras and supervised by responsible wardens. Separate visitors' halls are arranged for meeting parents and guests in a secure environment. Hygienic food is served in separate mess halls with a seating capacity of 200 students, and purified RO drinking water is available at all times. The hostels also include recreation halls where students can relax and socialize after academic hours. Sports facilities and television rooms are provided for entertainment and physical fitness. In addition, healthcare support is available for students whenever needed. Laundry services are provided for convenience, and a mini library is maintained within the hostel to encourage reading and study. With these modern amenities, the hostel facilities of Arunai Engineering College ensure a safe, disciplined, and comfortable living environment for students.`,
    ],
  },
  computing: {
    title: 'Computing & Internet Facility',
    paragraphs: [
      `Arunai Engineering College provides excellent computing and internet facilities to support modern teaching, learning, research, and innovation. The institution is equipped with a high-speed 100 Mbps internet connection that enables students and faculty members to access online learning resources, digital libraries, research journals, software tools, and communication platforms without interruption. Internet connectivity is available across various departments and laboratories, helping students stay updated with current technological developments and industry trends. These facilities play a significant role in enhancing technical knowledge, project work, coding skills, and research activities.`,
      `The college has 672 advanced computer systems installed in various laboratories to meet the academic requirements of students from different disciplines. Spacious and well-equipped computing labs are designed with the latest hardware and software configurations to provide hands-on practical experience. A dedicated research laboratory is also available to encourage innovation, experimentation, and project development among students and faculty members. In addition, the institution maintains specialized laboratories for Mechanical Engineering, Civil Engineering, Electronics and Communication Engineering (ECE), Electrical and Electronics Engineering (EEE), Biotechnology, and Chemical Engineering. These domain-specific labs are furnished with modern equipment and tools that help students gain practical exposure aligned with industry standards. Through its strong computing infrastructure and advanced laboratory facilities, Arunai Engineering College creates an ideal environment for technical education and research excellence.`,
    ],
  },
  ict: {
    title: 'ICT Class rooms',
    paragraphs: [
      `Arunai Engineering College has established modern ICT-enabled classrooms to create an interactive and technology-driven learning environment for students. These smart classrooms are equipped with advanced teaching aids such as LCD projectors, digital presentation systems, audio-visual tools, and internet connectivity, enabling faculty members to deliver lessons in a more effective and engaging manner. ICT classrooms help students understand complex concepts through visual demonstrations, presentations, simulations, and multimedia content, thereby improving learning outcomes. The use of technology in classrooms also encourages active participation, collaborative learning, and better communication between students and teachers.`,
      `The institution continuously upgrades its ICT infrastructure to align with evolving educational technologies and teaching methodologies. Each department is equipped with dedicated ICT-enabled classrooms that support a wide range of academic activities including seminars, workshops, guest lectures, and interactive sessions. The integration of digital learning tools with traditional teaching methods ensures that students receive a well-rounded educational experience. With these modern ICT classrooms, Arunai Engineering College strengthens its commitment to delivering quality education through innovative and technology-enhanced learning environments.`,
    ],
  },
  healthcare: {
    title: 'Health Care',
    paragraphs: [
      `Arunai Engineering College provides effective healthcare support for students and staff by utilizing the medical facilities available near the campus, including access to the institution's nearby medical college and hospital. In case of emergencies, students can receive immediate medical attention for sudden illness, injuries, or other health-related concerns through quick referral and transportation arrangements. The close proximity of the medical college ensures timely treatment, expert consultation, and better healthcare support whenever required.`,
      `The college prioritizes the safety and well-being of all students by maintaining first-aid facilities on campus and ensuring prompt response during emergencies. Regular health check-ups, awareness programs, and preventive healthcare measures are also encouraged to maintain a healthy academic environment. The availability of a nearby medical college and hospital gives confidence to students, parents, and staff, ensuring that quality medical care is easily accessible at all times.`,
    ],
  },
  transport: {
    title: 'Transport',
    paragraphs: [
      `Arunai Engineering College operates a full-fledged Transport Department to provide safe, comfortable, and convenient transportation facilities for students and staff members travelling from various locations. The college gives high priority to ensuring hassle-free daily commuting so that students can reach the campus on time and focus on their academic activities without transportation concerns. Well-planned bus routes cover different parts of the city and surrounding areas, making the institution easily accessible to day scholars and employees.`,
      `The fleet of college buses is regularly maintained and inspected to ensure safe travel conditions. Experienced and trained drivers are employed to operate the vehicles, and supervisors accompany each bus to maintain discipline and safety during the journey. The transport department coordinates with students and parents to plan convenient pick-up and drop-off points across multiple routes. This well-organized transport system reflects the institution's dedication to providing a comprehensive support infrastructure that enables students to travel safely and comfortably every day.`,
    ],
  },
  sports: {
    title: 'Sports',
    paragraphs: [
      `Arunai Engineering College strongly promotes physical fitness, discipline, leadership qualities, and team spirit by providing excellent sports infrastructure and encouraging students to actively participate in games and athletic activities. The institution believes that sports play a vital role in the overall development of students by improving physical health, mental strength, concentration, and teamwork skills. A spacious and well-maintained cricket ground is available for practice sessions and tournaments, enabling students to develop their talent and participate in intercollegiate competitions. The college also provides dedicated football and basketball courts where students regularly engage in training, friendly matches, and competitive events.`,
      `To support students interested in athletics, the campus includes athletic tracks for running, fitness training, and field events. In addition to outdoor sports, the college offers facilities for indoor games such as table tennis, badminton, and chess, helping students sharpen their reflexes, strategic thinking, and coordination skills. A well-equipped gymnasium is also available for students to maintain physical fitness and build stamina through regular exercise. Through these modern sports facilities and continuous encouragement, Arunai Engineering College creates a healthy and energetic campus environment, motivating students to balance academics with sports and recreational activities.`,
    ],
  },
  auditorium: {
    title: 'Auditorium',
    paragraphs: [
      `Arunai Engineering College provides excellent auditorium facilities to conduct academic, cultural, technical, and social events in a professional environment. The college has a modern air-conditioned auditorium equipped with advanced amenities to host seminars, conferences, workshops, guest lectures, placement training programs, and student development activities. The spacious seating arrangement, quality sound system, proper lighting, and multimedia presentation facilities create an ideal atmosphere for large gatherings and institutional functions.`,
      `One of the prominent venues on the campus is the Stalin Auditorium, which serves as an important center for major college events and celebrations. This auditorium is designed to accommodate a large audience and is frequently used for annual day programs, cultural festivals, technical symposiums, orientation programs, and special ceremonies. With its well-planned infrastructure and modern facilities, the auditorium offers a comfortable and organized setting for participants and guests.`,
      `In addition to indoor venues, the college also features an open-air auditorium that provides a spacious and vibrant platform for outdoor events and performances. It is ideal for cultural programs, student gatherings, entertainment events, awareness campaigns, and public functions conducted in a natural atmosphere. The open-air auditorium is equipped with essential facilities for stage performances and audience seating. With both indoor and outdoor auditorium facilities, Arunai Engineering College ensures a dynamic campus environment that supports talent, creativity, learning, and community engagement.`,
    ],
  },
}

const FacilitiesPage = ({ facility = 'library' }) => {
  const content = facilitiesContent[facility]

  if (!content) {
    return (
      <InnerPageLayout sidebarTitle={facilitiesSidebar.title} sidebarLinks={facilitiesSidebar.links}>
        <PageHeader title="Facilities" />
        <SectionBlock>
          <div className="text-center py-20 border border-dashed border-gray-300 rounded-xl bg-gray-50">
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Content coming soon</p>
            <p className="text-gray-400 text-xs">This facility page is under construction.</p>
          </div>
        </SectionBlock>
      </InnerPageLayout>
    )
  }

  return (
    <InnerPageLayout sidebarTitle={facilitiesSidebar.title} sidebarLinks={facilitiesSidebar.links}>
      <PageHeader title={content.title} />

      <SectionBlock>
        <div className="space-y-6">
          {content.paragraphs.map((para, index) => (
            <BodyText key={index}>{para}</BodyText>
          ))}
        </div>
      </SectionBlock>
    </InnerPageLayout>
  )
}

export default FacilitiesPage

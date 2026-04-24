import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Img from '../../public/hero-image.png'
import Coursepg from '../../public/course/course-pg.png'
import Courseug from '../../public/course/course-ug.png'
import CourseResearch from '../../public/course/course-research.png'

// Add CSS for auto-scroll animation
const style = document.createElement('style')

document.head.appendChild(style)
// Using existing course images as placeholders until facility images are added
const DigitalClassrooms = Courseug
const DigitalLibrary = Coursepg
const Transportation = CourseResearch
const Hostels = Courseug
const WifiCampus = Coursepg
const SportsFacilities = CourseResearch

const Home = ({ showHero = false }) => {
  const heroStyle = {
    backgroundImage: `url(${Img})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    maxHeight: '80vh',
  }

  // Replace this static structure with API/admin data later.
  const campusNewsCards = [
    {
      id: 'news',
      title: 'NEWS & ANNOUNCEMENTS',
      titleColor: 'text-[#d0a622]',
      items: [
        { id: 'n1', day: '15th', month: 'APRIL', year: '2026', text: 'Fees is 15 April 2026' },
        { id: 'n2', day: '18th', month: 'APRIL', year: '2026', text: 'University Theory Exams for both UG & PG will commence on 13-05-2026' },
        { id: 'n3', day: '16th', month: 'APRIL', year: '2026', text: 'University practical exams for PG will commence on 08-05-2026.' },
      ],
    },
    {
      id: 'events',
      title: 'EVENTS UPCOMING',
      titleColor: 'text-[#d0a622]',
      items: [
        { id: 'e1', day: '27th', month: 'MARCH', year: '2026', text: "INNOVISTA'2026 - Department of IT" },
        { id: 'e2', day: '31st', month: 'MARCH', year: '2026', text: "ACHIEVERS DAY'2026" },
        { id: 'e3', day: '07th', month: 'APRIL', year: '2026', text: "NEXZEN'2026 - Department of Management Studies" },
      ],
    },
    {
      id: 'achievements',
      title: 'ACHIEVEMENTS',
      titleColor: 'text-[#111827]',
      items: [
        { id: 'a1', day: '08th', month: 'APRIL', year: '2026', text: 'Mr. J.Joyal (EEE Dept) won 3rd Prize Rs. 50000 in TM IMPACT Hackathon conducted by TANCAM at KIT, Coimbatore' },
        { id: 'a2', day: '10th', month: 'APRIL', year: '2026', text: 'Mr. J.Joyal (EEE Dept) won 3rd Prize Rs. 50000 in TM IMPACT Hackathon conducted by TANCAM at KIT, Coimbatore' },
        { id: 'a3', day: '15th', month: 'APRIL', year: '2026', text: 'Department toppers honored during annual academic excellence ceremony' },
        { id: 'a4', day: '18th', month: 'APRIL', year: '2026', text: 'Guest lecture on Artificial Intelligence organized by CSE Department' },
        { id: 'a5', day: '20th', month: 'APRIL', year: '2026', text: 'Sports meet concludes with record participation from all departments' },
        { id: 'a6', day: '22nd', month: 'APRIL', year: '2026', text: 'Industry visit arranged for Mechanical Engineering students' },
        { id: 'a7', day: '25th', month: 'APRIL', year: '2026', text: 'Workshop on Cyber Security conducted by IT Department' },
        { id: 'a8', day: '28th', month: 'APRIL', year: '2026', text: 'Cultural festival "TechnoFest 2026" announced for next month' },
        { id: 'a9', day: '30th', month: 'APRIL', year: '2026', text: 'Placement drive scheduled with leading MNCs' },
        { id: 'a10', day: '02nd', month: 'MAY', year: '2026', text: 'Alumni meet organized for batch of 2015-2019' },
        { id: 'a11', day: '05th', month: 'MAY', year: '2026', text: 'Research paper presentation by faculty members' },

      ],
    },
  ]

  const renderCardItems = (items, prefix = 'item') =>
    items.map((item, index) => (
      <div key={`${prefix}-${item.id}-${index}`} className="flex h-[118px] gap-3 border-b border-[#eceef2] py-3">
        <div className="w-[78px] overflow-hidden border border-[#d0d4db] text-center text-[12px] font-bold">
          <div className="bg-[#f3be00] py-1.5 text-black">{item.day}</div>
          <div className="bg-[#f3be00] py-1.5 text-black">{item.month}</div>
          <div className="bg-[#032f73] py-1.5 text-white">{item.year}</div>
        </div>
        <p className="flex-1 overflow-hidden pt-1 text-left text-[15px] font-semibold leading-5 text-[#0f172a]">
          {item.text}
        </p>
      </div>
    ))

  const coursesOffered = [
    {
      id: 'ug',
      image: Courseug,
      description:
        'Undergraduate B.E and B.Tech programs build strong technical foundations, innovation skills, and industry-ready professionals.',
      cta: 'Undergraduate Courses',
    },
    {
      id: 'pg',
      image: Coursepg,
      description:
        'Postgraduate M.E, M.Tech, and MBA programs develop expertise, leadership abilities, and industry-focused professional skills.',
      cta: 'Postgraduate Courses',
    },
    {
      id: 'research',
      image: CourseResearch,
      description:
        'Ph.D programs foster advanced research, innovation, critical thinking, and scholarly contributions across diverse academic disciplines.',
      cta: 'Research Centre',
    },
  ]

  const facilitiesOffered = [
    {
      id: 'infrastructure',
      image: DigitalClassrooms,
      category: 'INFRASTRUCTURE',
      title: 'Digital Classrooms',
    },
    {
      id: 'library',
      image: DigitalLibrary,
      category: 'LIBRARY',
      title: 'Digital Library with eresources',
    },
    {
      id: 'transportation',
      image: Transportation,
      category: 'TRANSPORTATION',
      title: 'Transportation Facilities',
    },
    {
      id: 'hostels',
      image: Hostels,
      category: 'HOSTEL',
      title: 'Separated Hostels',
    },
    {
      id: 'campus',
      image: WifiCampus,
      category: 'CAMPUS',
      title: 'Wi-Fi campus with High speed Internet',
    },
    {
      id: 'sports',
      image: SportsFacilities,
      category: 'SPORTS',
      title: 'Sports Facilities',
    },
  ]

  const collegeStats = [
    {
      id: 'established',
      image: Courseug,
      number: '1993',
      text: 'Established in the premier co-educational institution'
    },
    {
      id: 'campus',
      image: Coursepg,
      number: '25000+',
      text: 'Square Meter of Green Campus Area'
    },
    {
      id: 'students',
      image: CourseResearch,
      number: '20000+',
      text: 'Students enrolled across UG, PG and doctoral programs'
    },
    {
      id: 'departments',
      image: Courseug,
      number: '13+',
      text: 'Academic Departments offering diverse programs'
    },
    {
      id: 'publications',
      image: Coursepg,
      number: '500+',
      text: 'Publications in reputed journals and conferences'
    },
    {
      id: 'alumni',
      image: CourseResearch,
      number: '15000+',
      text: 'Successful Alumni across various sectors'
    }
  ]

  const extraCurricularActivities = [
    {
      id: 'dance-music',
      image: Courseug,
      title: 'Dance and Music',
      description: 'Dance and music programs offer opportunities for creative expression, social interaction, and physical fitness.',
      link: '#'
    },
    {
      id: 'clubs-societies',
      image: Coursepg,
      title: 'Clubs and Societies',
      description: 'Clubs and societies provide opportunities for social interaction, leadership, and creative expression.',
      link: '#'
    },
    {
      id: 'sports',
      image: CourseResearch,
      title: 'Sports and Physical Education',
      description: 'Sports and physical education programs provide opportunities for physical fitness, leadership, and social interaction.',
      link: '#'
    }
  ]

  const alumniTestimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      graduation: 'Class of 2020, Computer Science',
      position: 'Software Engineer at Google',
      image: Courseug,
      quote: 'Arunai Engineering College provided me with the perfect foundation for my career. The faculty, infrastructure, and placement support were exceptional. I am proud to be an alumnus of this great institution.'
    },
    {
      id: 2,
      name: 'Rahul Kumar',
      graduation: 'Class of 2019, Mechanical Engineering',
      position: 'Project Manager at Tata Motors',
      image: Coursepg,
      quote: 'The practical exposure and industry connections I gained at Arunai were invaluable. The college truly prepares you for the real world and helps you achieve your dreams.'
    },
    {
      id: 3,
      name: 'Ananya Reddy',
      graduation: 'Class of 2021, Electronics & Communication',
      position: 'Design Engineer at Intel',
      image: CourseResearch,
      quote: 'The research opportunities and mentorship at Arunai helped me discover my passion for innovation. The college environment fosters creativity and critical thinking.'
    },
    {
      id: 4,
      name: 'Vikram Singh',
      graduation: 'Class of 2018, Civil Engineering',
      position: 'Senior Consultant at Deloitte',
      image: Courseug,
      quote: 'From classrooms to corporate boardrooms, Arunai Engineering College has been my guiding light. The values and skills I learned here continue to shape my professional journey.'
    },
    {
      id: 5,
      name: 'Kavya Nair',
      graduation: 'Class of 2022, Information Technology',
      position: 'Data Scientist at Microsoft',
      image: Coursepg,
      quote: 'The cutting-edge curriculum and excellent faculty at Arunai prepared me for the challenges of the tech industry. I am grateful for the lifelong friendships and memories.'
    }
  ]

  const recruiters = [
    { id: 1, name: 'TCS', image: Courseug },
    { id: 2, name: 'Infosys', image: Coursepg },
    { id: 3, name: 'Wipro', image: CourseResearch },
    { id: 4, name: 'HCL', image: Courseug },
    { id: 5, name: 'Tech Mahindra', image: Coursepg },
    { id: 6, name: 'Capgemini', image: CourseResearch },
    { id: 7, name: 'IBM', image: Courseug },
    { id: 8, name: 'Microsoft', image: Coursepg },
    { id: 9, name: 'Google', image: CourseResearch },
    { id: 10, name: 'Amazon', image: Courseug },
    { id: 11, name: 'Intel', image: Coursepg },
    { id: 12, name: 'Cisco', image: CourseResearch }
  ]

  return (
    <>
      {showHero && (
        <>
          <section
            className="relative h-[120vh] bg-cover bg-center text-white"
            style={heroStyle}
          >
            <div className="sticky top-[30%] z-40 flex items-center justify-center pointer-events-none">
              <h1
                className="text-white [text-shadow:0_4px_16px_rgba(0,0,0,0.5)]"
                style={{
                  fontSize: 'clamp(64px,15vw,180px)',
                  letterSpacing: '6px',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 400,
                }}
              >
                ARUNAI
              </h1>
            </div>

            <div className="absolute inset-0 z-0 bg-gradient-to-r from-black/10 via-black/5 to-black/25" />
          </section>
          <div className="bg-[#001a66] py-2 text-white">
            <marquee
              behavior="scroll"
              direction="left"
              scrollamount="8"
              className="text-[18px] font-semibold tracking-wide"
              onMouseEnter={(e) => e.currentTarget.stop()}
              onMouseLeave={(e) => e.currentTarget.start()}
            >
              Applications are now open for UG and PG programs for the academic year 2026 - 2027 - Apply Now
            </marquee>
          </div>
          <section className="bg-[#ffffff] px-6 py-16 text-center text-slate-900">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-[44px] font-extrabold tracking-tight text-[#061a66]">
                Welcome to Arunai Engineering College
              </h2>
              <p className="mx-auto mt-8 max-w-7xl text-[20px] leading-[2.1] text-black">


                In a rapidly evolving world, today's graduates face constant challenges brought by emerging technologies, dynamic work environments, and changing global trends. To thrive in such a landscape, students require adaptable mindsets and versatile skill sets. Arunai Engineering College (AEC) is committed to equipping students with these essential competencies, ensuring they are well-prepared to succeed in their careers and contribute meaningfully to society.

              </p>
              <button
                type="button"
                className="mt-10 mx-auto bg-[#001a66] px-12 py-2 text-[20px] font-semibold text-white shadow-md transition hover:bg-[#0b2a8a] rounded-lg cursor-pointer"
              >
                More about Arunai
              </button>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-14">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="text-[40px] font-extrabold tracking-tight text-[#061a66]">Campus News</h2>
              <p className="mt-2 text-[16px] text-[#c75b22]">
                Celebrating people, research, and innovation shaping the campus
              </p>
            </div>

            <div className="mx-auto mt-7 grid max-w-7xl gap-3 md:grid-cols-3">
              {campusNewsCards.map((card) => (
                <div key={card.id} className="border border-[#d4d6db] bg-[#fdfdfd] shadow-sm">
                  <h3 className={`border-b border-[#e6e8ed] px-4 py-3 text-left text-[20px] font-extrabold tracking-wide ${card.titleColor}`}>
                    {card.title}
                  </h3>
                  <div className="news-marquee-viewport h-[275px] overflow-hidden px-3 py-1">
                    <div
                      className="news-marquee-track"
                      style={{ animationDuration: `${Math.max(card.items.length, 1) * 7.3}s` }}
                    >
                      {renderCardItems(card.items, `${card.id}-a`)}
                      {renderCardItems(card.items, `${card.id}-b`)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-[#ffffff] px-6 pb-16 pt-4 text-center">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-[44px] font-extrabold tracking-tight text-[#061a66]">
                Courses Offered
              </h2>
              <p className="mt-2 text-[20px] text-[#2d2d2d]">
                Equipping students to lead with purpose and contribute meaningfully to a complex, evolving world.
              </p>

              <div className="mx-auto mt-9 grid max-w-7xl gap-6 md:grid-cols-3">
                {coursesOffered.map((course) => (
                  <article key={course.id} className="overflow-hidden rounded-md bg-[#001c6d] shadow-md">
                    <img src={course.image} alt={course.cta} className="h-[250px] w-full object-cover" />
                    <div className="px-6 pb-4 pt-3 text-white">
                      <p className="text-[15px] leading-[1.8]">{course.description}</p>
                      <a href="#" className="mt-3 inline-flex items-center text-[19px] font-semibold text-[#f06f61]">
                        {course.cta}
                        <span className="ml-1">{'>'}</span>
                      </a>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
          <section className="bg-[#ffffff] px-6 pb-16">
            <div className="mx-auto max-w-9xl">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {collegeStats.map((stat) => (
                  <div key={stat.id} className="relative overflow-hidden rounded-lg shadow-lg ">
                    <img
                      src={stat.image}
                      alt={stat.text}
                      className="h-64 w-full object-cover  "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                        <div className="text-3xl font-bold text-white mb-3">{stat.number}</div>
                        <p className="text-lg leading-relaxed text-white/90 max-w-xs">{stat.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-16">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="text-[44px] font-extrabold tracking-tight text-[#061a66]">
                Facilities
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[20px] text-[#2d2d2d]">
                Our college facilities provide modern infrastructure, advanced laboratories, libraries, and supportive spaces for holistic learning.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-4">
              {/* First Row: 50% + 25% + 25% */}
              <div className="lg:col-span-2 relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={facilitiesOffered[0].image}
                  alt={facilitiesOffered[0].title}
                  className="h-80 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {facilitiesOffered[0].category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {facilitiesOffered[0].title}
                  </h3>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={facilitiesOffered[1].image}
                  alt={facilitiesOffered[1].title}
                  className="h-80 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {facilitiesOffered[1].category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {facilitiesOffered[1].title}
                  </h3>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={facilitiesOffered[2].image}
                  alt={facilitiesOffered[2].title}
                  className="h-80 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {facilitiesOffered[2].category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {facilitiesOffered[2].title}
                  </h3>
                </div>
              </div>

              {/* Second Row: 25% + 25% + 50% */}
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={facilitiesOffered[3].image}
                  alt={facilitiesOffered[3].title}
                  className="h-80 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {facilitiesOffered[3].category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {facilitiesOffered[3].title}
                  </h3>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={facilitiesOffered[4].image}
                  alt={facilitiesOffered[4].title}
                  className="h-80 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {facilitiesOffered[4].category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {facilitiesOffered[4].title}
                  </h3>
                </div>
              </div>
              <div className="lg:col-span-2 relative overflow-hidden rounded-lg shadow-lg">
                <img
                  src={facilitiesOffered[5].image}
                  alt={facilitiesOffered[5].title}
                  className="h-80 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="mb-1">
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                      {facilitiesOffered[5].category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {facilitiesOffered[5].title}
                  </h3>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-16">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="text-[44px] font-extrabold tracking-tight text-[#061a66]">
                Extra-Curricular Activities
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[20px] text-[#2d2d2d]">
                Vibrant extracurricular activities encourage talent development, physical fitness, cultural expression, and student engagement.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-7xl gap-8 md:grid-cols-3">
              {extraCurricularActivities.map((activity) => (
                <div key={activity.id} className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#061a66] mb-3">
                      {activity.title}
                    </h3>
                    <p className="text-base leading-relaxed text-gray-600 mb-4">
                      {activity.description}
                    </p>
                    <a
                      href={activity.link}
                      className="inline-flex items-center text-[#f06f61] font-semibold hover:text-[#e55a4b] transition-colors"
                    >
                      Learn More
                      <span className="ml-1">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-[#EEF2F6] px-6 py-16">
            <div className="mx-auto max-w-7.5xl">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 flex flex-col lg:flex-row items-center ">
                {/* Left Column - Text Content */}
                <div className="space-y-6 px-3">
                  <h2 className="text-[40px] font-bold text-[#061a66] leading-tight">
                    Placement & Career Development Cell
                  </h2>
                  <div className="space-y-4  ">
                    <p className="text-[17px] leading-9 text-black text-justify">
                      Arunai Engineering College is committed to ensuring strong career outcomes for its students through a structured and proactive Placement & Career Development Cell. The college maintains close collaboration with leading industries, corporate organizations, and recruiters to bridge the gap between academic learning and professional requirements.
                    </p>
                    <p className="text-[17px] leading-9 text-black text-justify">
                      The Placement Cell focuses on enhancing students' employability by offering continuous training in technical skills, aptitude, communication, and personality development. Regular workshops, mock interviews, group discussions, and industry interaction programs are conducted to prepare students for competitive recruitment processes.
                    </p>
                  </div>
                  <a href="#" className="inline-flex items-center text-[#0066cc] font-semibold hover:text-[#0052a3] transition-colors">
                    Read More
                    <span className="ml-1">→</span>
                  </a>
                </div>

                {/* Right Column - Congratulations Card */}
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={Coursepg}
                    alt="Course Program"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-16">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="text-[44px] font-extrabold tracking-tight text-[#061a66]">
                Alumni Testimonials
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[20px] text-[#2d2d2d]">
                Hear from our alumni about their journey at Arunai Engineering College and beyond.
              </p>
            </div>

            <div className="mx-auto mt-12 max-w-7xl bg-white px-10 py-10 rounded-2xl relative">

              <div className="relative">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1}
                  spaceBetween={25}
                  loop={true}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: ".custom-next",
                    prevEl: ".custom-prev",
                  }}
                  pagination={{ clickable: true }}
                  breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                  className="testimonials-swiper"
                >
                  {alumniTestimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id}>
                      <div className="bg-[#F9FAFB] rounded-xl shadow-sm p-6 border border-gray-200 h-full">

                        <p className="text-[14px] text-gray-800 leading-relaxed text-justify">
                          “{testimonial.quote}”
                        </p>

                        <div className="border-t border-dashed my-4"></div>

                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-[15px] font-semibold text-red-700">
                              Alumni - AEC
                            </h4>
                            <p className="text-[13px] text-[#061a66] font-medium">
                              {testimonial.position} - {testimonial.graduation}
                            </p>
                          </div>

                          <div className="flex gap-1 text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <span key={i}>★</span>
                            ))}
                          </div>
                        </div>

                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button className="custom-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-[#1e3a5f] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md">
                  ‹
                </button>

                <button className="custom-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-[#1e3a5f] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md">
                  ›
                </button>

              </div>
            </div>
          </section>

          <section>
            <div>
              <h1>Our Recruiters</h1>
              <p>Our Placement Cell supports students through industry-focused training and campus recruitment drives, enabling them to secure opportunities with leading organizations.</p>
              
            </div>
          </section>
        </>
      )}

    </>
  )
}

export default Home 
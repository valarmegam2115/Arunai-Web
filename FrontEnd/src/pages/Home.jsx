import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
const Img = '/hero-image.png'
const Coursepg = '/course/course-pg.png'
const Courseug = '/course/course-ug.png'
const CourseResearch = '/course/course-research.png'
const nbalogo = '/logos/nba-logo.jpg'
const naaclogo = '/logos/naac-logo.jpg'
const iiclogo = '/logos/iic-logo.jpg'
const csilogo = '/logos/csi-logo.jpg'
const isologo = '/logos/iso-logo.jpg'
const ieeelogo = '/logos/ieee-logo.jpg'
const mrf = '/rec_logos/mrf-logo.png'
const cognizant = '/rec_logos/cognizant-logo.png'
const pegatron = '/rec_logos/pegatron_logo.png'
const tcs = '/rec_logos/tcs_logo.png'
const al = '/rec_logos/al_logo.png'
const reliance = '/rec_logos/reliance_logo.png'
const foxconn = '/rec_logos/foxconn_logo.png'
const icici = '/rec_logos/icici_logo.png' 
const pengaton = '/rec_logos/pengaton_logo.png'
const hexaware = '/rec_logos/hexaware_logo.png'
const focus = '/rec_logos/focus_logo.png'
const techmahindra = '/rec_logos/techmahindra_logo.png'
import { initAnimations, cleanupAnimations } from '../utils/animations'


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

  const innerStyle = {
    fontFamily: "Source Serif Pro",

  }

  // Dynamic structure from API
  const [campusNewsCards, setCampusNewsCards] = useState([
    { id: 'news', title: 'NEWS & ANNOUNCEMENTS', titleColor: 'text-[#d0a622]', items: [] },
    { id: 'events', title: 'EVENTS UPCOMING', titleColor: 'text-[#d0a622]', items: [] },
    { id: 'achievements', title: 'ACHIEVEMENTS', titleColor: 'text-[#111827]', items: [] },
  ]);

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

  const [extraCurricularActivities, setExtraCurricularActivities] = useState([]);

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
    { id: 1, name: 'MRF', image: mrf },
    { id: 2, name: 'Cognizant', image: cognizant },
    { id: 3, name: 'Pegatron', image: pegatron },
    { id: 4, name: 'TCS', image: tcs },
    { id: 5, name: 'Ashok Leyland', image: al },
    { id: 6, name: 'Reliance', image: reliance },
    { id: 7, name: 'Foxconn', image: foxconn },
    { id: 8, name: 'ICICI Bank', image: icici },
    { id: 9, name: 'Hexaware', image: hexaware },
    { id: 10, name: 'Pengaton Space', image: pengaton },
    { id: 11, name: 'Focus Edumatics', image: focus },
    { id: 12, name: 'Tech Mahindra', image: techmahindra }
  ]

  const [events, setEvents] = useState([]);

  const accreditations = [
    { id: 'nba', image: nbalogo, alt: 'NAAC A Grade' },
    { id: 'naac', image: naaclogo, alt: 'DNV ISO 9001' },
    { id: 'iic', image: iiclogo, alt: 'IIC' },
    { id: 'csi', image: csilogo, alt: 'CSI' },
    { id: 'iso', image: isologo, alt: 'IEEE' },
    { id: 'ieee', image: ieeelogo, alt: 'DNV ISO 9001' },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchNews(),
          fetchOurEvents(),
          fetchExtraCurricular()
        ]);
        // Initialize animations after data is fetched and rendered
        // We use a small timeout to ensure React has finished rendering the new elements
        setTimeout(() => {
          initAnimations();
        }, 100);
      } catch (err) {
        console.error('Error fetching data:', err);
        // Still init animations even if some fetch fails
        initAnimations();
      }
    };

    const fetchNews = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/news');
        const data = await res.json();
        if (data.success) {
          const news = data.data.filter(item => item.category === 'news');
          const eventsData = data.data.filter(item => item.category === 'events');
          const achievements = data.data.filter(item => item.category === 'achievements');
          
          setCampusNewsCards([
            { id: 'news', title: 'NEWS & ANNOUNCEMENTS', titleColor: 'text-[#d0a622]', items: news },
            { id: 'events', title: 'EVENTS UPCOMING', titleColor: 'text-[#d0a622]', items: eventsData },
            { id: 'achievements', title: 'ACHIEVEMENTS', titleColor: 'text-[#111827]', items: achievements },
          ]);
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
    };

    const fetchOurEvents = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/our-events');
        const data = await res.json();
        if (data.success) {
          setEvents(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch our events:', err);
      }
    };

    const fetchExtraCurricular = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/extra-curricular');
        const data = await res.json();
        if (data.success) {
          setExtraCurricularActivities(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch extra-curricular activities:', err);
      }
    };

    fetchData();

    // Cleanup on unmount
    return () => {
      cleanupAnimations()
    }
  }, [])

  return (
    <>
      {showHero && (
        <>
          <section
            className="relative h-[120vh] bg-cover bg-center text-white"
            style={heroStyle}
          >
            <div className="absolute inset-0 z-40 flex items-center justify-center px-4">
              <div className="text-center max-w-6xl">
                <h1
                  className="hero-title text-[3rem] sm:text-[4rem] md:text-[5rem] lg:text-[6rem] leading-tight tracking-wide text-white mb-4"
                  style={innerStyle}
                >
                  ARUNAI
                </h1>
              </div>
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
          <section className="bg-[#ffffff] px-4 sm:px-6 py-12 sm:py-16 text-center text-slate-900">
            <div className="mx-auto max-w-7xl">
              <h2 className="text-[28px] sm:text-[44px] font-extrabold tracking-tight text-[#061a66] opacity-0 leading-tight">
                Welcome to Arunai Engineering College
              </h2>
              <p className="mx-auto mt-6 sm:mt-8 max-w-7xl text-[16px] sm:text-[20px] leading-[1.8] sm:leading-[2.1] text-black opacity-0 text-justify sm:text-center">

                In a rapidly evolving world, today's graduates face constant challenges brought by emerging technologies, dynamic work environments, and changing global trends. To thrive in such a landscape, students require adaptable mindsets and versatile skill sets. Arunai Engineering College (AEC) is committed to equipping students with these essential competencies, ensuring they are well-prepared to succeed in their careers and contribute meaningfully to society.

              </p>
              <button
                type="button"
                className="mt-10 mx-auto bg-[#001a66] px-12 py-2 text-[20px] font-semibold text-white shadow-md transition hover:bg-[#0b2a8a] rounded-lg cursor-pointer"
              >
                More about Arunai
              </button>
            </div>
            <div className="mt-8 overflow-hidden mask-horizontal-edges">
              <div className="flex w-max animate-scroll py-4">
                <div className="flex gap-6 pr-6">
                  {accreditations.map((item) => (
                    <div
                      key={item.id}
                      className="flex-shrink-0 w-52 h-52 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-2"
                    >
                      <img src={item.image} alt={item.alt} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-6 pr-6">
                  {accreditations.map((item) => (
                    <div
                      key={`${item.id}-clone`}
                      className="flex-shrink-0 w-52 h-52 flex items-center justify-center rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow p-2"
                    >
                      <img src={item.image} alt={item.alt} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-14">
            <div className="mx-auto max-w-7xl text-center">
              <h2 className="text-[40px] font-extrabold tracking-tight text-[#061a66] opacity-0">Campus News</h2>
              <p className="mt-2 text-[16px] text-[#c75b22] opacity-0">
                Celebrating people, research, and innovation shaping the campus
              </p>
            </div>

            <div className="mx-auto mt-7 grid max-w-7xl gap-3 md:grid-cols-3">
              {campusNewsCards.map((card) => (
                <div key={card.id} className="border border-[#d4d6db] bg-[#fdfdfd] shadow-sm opacity-0">
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
              <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#061a66] leading-tight opacity-0">
                Courses Offered
              </h2>
              <p className="mt-2 text-[16px] md:text-[20px] text-[#2d2d2d] opacity-0">
                Equipping students to lead with purpose and contribute meaningfully to a complex, evolving world.
              </p>

              <div className="mx-auto mt-9 grid max-w-7xl gap-6 md:grid-cols-3">
                {coursesOffered.map((course) => (
                  <article key={course.id} className="overflow-hidden rounded-md bg-[#001c6d] shadow-md opacity-0">
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
                  <div key={stat.id} className="relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#061a66] opacity-0 leading-tight">
                Facilities
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[16px] md:text-[20px] text-[#2d2d2d] opacity-0">
                Our college facilities provide modern infrastructure, advanced laboratories, libraries, and supportive spaces for holistic learning.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-7xl gap-6 lg:grid-cols-4">
              {/* First Row: 50% + 25% + 25% */}
              <div className="lg:col-span-2 relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <div className="relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <div className="relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <div className="relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <div className="relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <div className="lg:col-span-2 relative overflow-hidden rounded-lg shadow-lg opacity-0">
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
              <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#061a66] opacity-0 leading-tight">
                Extra-Curricular Activities
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[16px] md:text-[20px] text-[#2d2d2d] opacity-0">
                Vibrant extracurricular activities encourage talent development, physical fitness, cultural expression, and student engagement.
              </p>
            </div>

            <div className="mx-auto mt-12 grid max-w-7xl gap-8 md:grid-cols-3">
              {extraCurricularActivities.map((activity) => (
                <div key={activity.id} className="overflow-hidden rounded-lg bg-white shadow-md transition-transform duration-300 hover:scale-105 opacity-0">
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

          <section className="bg-[#EEF2F6] px-6 py-16 overflow-hidden">
            <div className="mx-auto max-w-7.5xl">
              <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 flex flex-col lg:flex-row items-center ">
                {/* Left Column - Text Content */}
                <div className="space-y-6 px-3">
                  <h2 className="text-[30px] md:text-[40px] font-bold text-[#061a66] leading-tight">
                    Placement & Career Development Cell
                  </h2>
                  <div className="space-y-4  ">
                    <p className="text-[17px] leading-7 md:leading-9 text-black text-justify">
                      Arunai Engineering College is committed to ensuring strong career outcomes for its students through a structured and proactive Placement & Career Development Cell. The college maintains close collaboration with leading industries, corporate organizations, and recruiters to bridge the gap between academic learning and professional requirements.
                    </p>
                    <p className="text-[17px] leading-7 md:leading-9 text-black text-justify">
                      The Placement Cell focuses on enhancing students' employability by offering continuous training in technical skills, aptitude, communication, and personality development. Regular workshops, mock interviews, group discussions, and industry interaction programs are conducted to prepare students for competitive recruitment processes.
                    </p>
                  </div>
                  <a href="#" className="inline-flex items-center text-[#0066cc] font-semibold hover:text-[#0052a3] transition-colors">
                    Read More
                    <span className="ml-1">→</span>
                  </a>
                </div>

                
                <div className="relative pr-4 py-7 ">
                  {/* The Blue Background Box (The "Plate") */}
                  <div className="absolute inset-0 bg-[#061a66] rounded-[2rem] shadow-xl translate-x-[10%] -translate-y-0 hidden sm:block" />

                  {/* The Image Box */}
                  <div className="relative z-10 overflow-hidden rounded-2xl shadow-2xl ">
                    <img
                      src={Coursepg}
                      alt="Placement Cell"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-16">
            <div className="mx-auto max-w-7.5xl text-center">
              <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#061a66] opacity-0 leading-tight">
                Alumni Testimonials
              </h2>
              <p className="mx-auto mt-4 max-w-4xl text-[16px] md:text-[20px] text-[#2d2d2d] opacity-0">
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

                <button className="custom-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-[#1e3a5f] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                  ‹
                </button>

                <button className="custom-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-[#1e3a5f] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                  ›
                </button>

              </div>
            </div>
          </section>

          <section className="bg-white px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#061a66] mb-4 opacity-0 leading-tight">
                  Our Recruiters
                </h2>
                <p className="mx-auto max-w-4xl text-[16px] md:text-[20px] text-[#2d2d2d] leading-relaxed opacity-0">
                  Our Placement Cell supports students through industry-focused training and campus recruitment drives, enabling them to secure opportunities with leading organizations.
                </p>
              </div>

              <div className="space-y-8">
                {/* First Row - Left to Right */}
                <div className="overflow-hidden mask-horizontal-edges">
                  <div className="flex w-max animate-scroll">
                    <div className="flex gap-8 pr-8">
                      {recruiters.map((recruiter) => (
                        <div key={`${recruiter.id}-top`} className="flex-shrink-0">
                          <div className="w-45 h-32 bg-gray-50 rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                            <img
                              src={recruiter.image}
                              alt={recruiter.name}
                              className="w-45 h-32 object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-8 pr-8">
                      {recruiters.map((recruiter) => (
                        <div key={`${recruiter.id}-top-clone`} className="flex-shrink-0">
                          <div className="w-45 h-32 bg-gray-50 rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                            <img
                              src={recruiter.image}
                              alt={recruiter.name}
                              className="w-45 h-32 object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Second Row - Right to Left */}
                <div className="overflow-hidden mask-horizontal-edges">
                  <div className="flex w-max animate-scroll-right-to-left">
                    <div className="flex gap-8 pr-8">
                      {recruiters.map((recruiter) => (
                        <div key={`${recruiter.id}-bottom`} className="flex-shrink-0">
                          <div className="w-45 h-32 bg-gray-50 rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                            <img
                              src={recruiter.image}
                              alt={recruiter.name}
                              className="w-45 h-32 object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-8 pr-8">
                      {recruiters.map((recruiter) => (
                        <div key={`${recruiter.id}-bottom-clone`} className="flex-shrink-0">
                          <div className="w-45 h-32 bg-gray-50 rounded-lg shadow-sm flex items-center justify-center border border-gray-200 hover:shadow-md transition-shadow duration-300">
                            <img
                              src={recruiter.image}
                              alt={recruiter.name}
                              className="w-45 h-32 object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="bg-[#EEF2F6] px-6 py-16">
            <div className="mx-auto max-w-7xl">
              <div className="text-center mb-12">
                <h2 className="text-[32px] md:text-[44px] font-extrabold tracking-tight text-[#061a66] mb-4 opacity-0 leading-tight">
                  Our Events
                </h2>
                <p className="mx-auto max-w-4xl text-[16px] md:text-[20px] text-[#2d2d2d] leading-relaxed opacity-0">
                  Our events inspire learning, collaboration, innovation, and vibrant campus community life.
                </p>
              </div>

              <div className="mx-auto mt-12 max-w-7xl relative">

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
                      nextEl: ".events-custom-next",
                      prevEl: ".events-custom-prev",
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                      768: { slidesPerView: 2 },
                      1024: { slidesPerView: 3 },
                    }}
                    className="events-swiper"
                  >
                    {events.map((event) => (
                      <SwiperSlide key={event.id}>
                        <div className="bg-[#F9FAFB] rounded-xl shadow-sm p-6 border border-gray-200 h-full">
                          <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-sm">
                              <span className="text-xs font-semibold text-[#061a66]">
                                {event.date}
                              </span>
                            </div>
                          </div>
                          <h3 className="text-[16px] font-bold text-[#1e3a5f] mb-3">
                            {event.title}
                          </h3>
                          <p className="text-[14px] text-gray-700 leading-relaxed mb-4">
                            {event.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="text-[15px] font-semibold text-red-700">
                                Event - AEC
                              </h4>
                              <p className="text-[13px] text-[#061a66] font-medium">
                                {event.date}
                              </p>
                            </div>

                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Custom Navigation Arrows */}
                  <button className="events-custom-prev absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-[#1e3a5f] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                    ‹
                  </button>

                  <button className="events-custom-next absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-[#1e3a5f] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md cursor-pointer">
                    ›
                  </button>

                </div>
              </div>
            </div>
          </section>

        </>
      )}

    </>
  )
}

export default Home 
import React, { useState, useEffect } from 'react'
import InnerPageLayout from '../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage, CourseChip, BulletList } from '../../components/blocks'
import { deptSidebar } from '../../utils/sidebarConfig'
import { staticDepartments } from '../../utils/departmentsStatic'

/**
 * Generic dynamic department page.
 * Receives `slug` prop (e.g. 'cse', 'civil') and fetches content from the API.
 * Courses are stored in the DB but displayed as static chips.
 */
const DeptPage = ({ slug, subpage }) => {
  const [dept, setDept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [notableIndex, setNotableIndex] = useState(0)
  const [feedbackIndex, setFeedbackIndex] = useState(0)

  const achievements = dept?.achievements || []
  const galleryImages = achievements.filter(ach => ach.image_url)

  const alumni = dept?.alumni || []
  const notableAlumni = alumni.filter(al => al.is_notable)
  const regularAlumni = alumni.filter(al => !al.is_notable)

  useEffect(() => {
    if (subpage === 'achievements' && galleryImages.length > 1) {
      const interval = setInterval(() => {
        setCarouselIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [subpage, galleryImages.length])

  useEffect(() => {
    if (subpage === 'alumni' && notableAlumni.length > 1) {
      const interval = setInterval(() => {
        setNotableIndex((prev) => (prev + 1) % notableAlumni.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [subpage, notableAlumni.length])

  useEffect(() => {
    if (subpage === 'alumni' && regularAlumni.length > 1) {
      const interval = setInterval(() => {
        setFeedbackIndex((prev) => (prev + 1) % regularAlumni.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [subpage, regularAlumni.length])

  useEffect(() => {
    const fetchDept = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`http://localhost:5000/api/departments/${slug}`)
        const data = await res.json()
        if (data.success) {
          setDept(data.data)
        } else {
          setError(data.message || 'Department not found')
        }
      } catch (err) {
        console.error('Error fetching department:', err)
        setError('Failed to connect to the server.')
      } finally {
        setLoading(false)
      }
    }
    fetchDept()
  }, [slug])

  const staticData = staticDepartments[slug]

  // Build sidebar from slug
  const deptNameForSidebar = staticData?.dept_name || dept?.dept_name || slug.toUpperCase()
  const sidebar = deptSidebar(deptNameForSidebar, `/academics/dept/${slug}`)

  // Render static general (courses) page immediately if available
  if ((subpage === 'courses' || !subpage) && staticData) {
    const courses = staticData.courses || []
    const mission = staticData.mission || []
    const highlights = staticData.highlights || []
    const introParas = (staticData.introduction || '').split('\n').filter(p => p.trim())

    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        {/* Banner */}
        {staticData.banner_image && (
          <BannerImage src={staticData.banner_image} alt={`Department of ${staticData.dept_name}`} />
        )}

        {/* Title */}
        <PageHeader title={`Department of ${staticData.dept_name}`} />

        {/* Courses Offered */}
        {courses.length > 0 && (
          <SectionBlock title="Courses Offered">
            <div className="space-y-3">
              {courses.map((c, i) => (
                <CourseChip key={i} label={c} />
              ))}
            </div>
          </SectionBlock>
        )}

        {/* Introduction */}
        {staticData.introduction && (
          <SectionBlock title="Introduction">
            {introParas.map((para, i) => (
              <BodyText key={i} className={i > 0 ? 'mt-4' : ''}>
                {para}
              </BodyText>
            ))}
          </SectionBlock>
        )}

        {/* Vision */}
        {staticData.vision && (
          <SectionBlock title="Vision">
            <BodyText>{staticData.vision}</BodyText>
          </SectionBlock>
        )}

        {/* Mission */}
        {mission.length > 0 && (
          <SectionBlock title="Mission">
            <BulletList items={mission} />
          </SectionBlock>
        )}

        {/* Highlights */}
        {highlights.length > 0 && (
          <SectionBlock title="Department Highlights">
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((s, i) => (
                <div key={i} className="rounded-lg border border-blue-100 bg-[#f0f5ff] px-5 py-4">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#001a66]/60">{s.label}</p>
                  <p className="mt-1 text-[20px] font-extrabold text-[#001a66]">{s.value}</p>
                </div>
              ))}
            </div>
          </SectionBlock>
        )}
      </InnerPageLayout>
    )
  }

  // Loading state
  if (loading) {
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Loading department...</p>
          </div>
        </div>
      </InnerPageLayout>
    )
  }

  // Error state
  if (error || !dept) {
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <div className="flex items-center justify-center py-32">
          <div className="text-center">
            <p className="text-4xl mb-4 opacity-30">🏫</p>
            <p className="text-xl font-bold text-slate-700">Department Not Found</p>
            <p className="text-slate-400 mt-2 text-sm">{error || 'This department has not been set up yet.'}</p>
          </div>
        </div>
      </InnerPageLayout>
    )
  }

  const courses = dept.courses || []
  const mission = dept.mission || []
  const highlights = dept.highlights || []

  if (subpage === 'curriculum') {
    const curriculum = dept.curriculum || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Curriculum & Syllabus" />
        <div className="grid gap-4 sm:grid-cols-2">
          {curriculum.length > 0 ? (
            curriculum.map((c, i) => (
              <a
                key={i}
                href={c.file_url && c.file_url !== '#' ? c.file_url : '#'}
                target={c.file_url && c.file_url !== '#' ? '_blank' : '_self'}
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-6 bg-white border border-slate-200 border-l-4 border-l-[#001a66] rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="font-extrabold text-[#001a66] text-lg group-hover:text-blue-700 transition-colors">
                  {c.name}
                </span>
                <span className="text-xl text-slate-400 group-hover:text-[#001a66] transition-colors">
                  📄
                </span>
              </a>
            ))
          ) : (
            <div className="col-span-2 py-16 text-center">
              <p className="text-4xl mb-4 opacity-20">📚</p>
              <p className="text-slate-400 font-medium text-sm">Curriculum & Syllabus details are being updated. Please check back soon.</p>
            </div>
          )}
        </div>
      </InnerPageLayout>
    )
  }

  if (subpage === 'peo-pso-po') {
    const peos = (dept.peo_pso_po || []).filter(p => p.type === 'PEO')
    const psos = (dept.peo_pso_po || []).filter(p => p.type === 'PSO')
    const pos = (dept.peo_pso_po || []).filter(p => p.type === 'PO')

    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm space-y-10">

          {/* Centered Heading */}
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Programme's <span className="underline decoration-[#001a66] decoration-2 underline-offset-4">PEO's</span>, <span className="underline decoration-red-600 decoration-2 underline-offset-4">PSO's</span> and <span className="underline decoration-[#001a66] decoration-2 underline-offset-4">PO's</span>
            </h2>
            <div className="flex justify-center items-center mt-3 gap-0.5">
              <div className="w-12 h-1 bg-red-600 rounded-l"></div>
              <div className="w-12 h-1 bg-[#001a66] rounded-r"></div>
            </div>
          </div>

          {/* PEO Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-l-4 border-l-[#001a66] pl-3">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Program Educational Objectives (PEO)
              </h3>
            </div>

            {peos.length > 0 ? (
              <div className="space-y-5 pl-1">
                {peos.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {/* Red document/pdf icon badge */}
                    <div className="flex-shrink-0 mt-1 bg-red-600 text-white rounded p-0.5 w-5 h-5 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-700 font-semibold text-[15px] leading-relaxed">
                      <span className="font-extrabold text-slate-900">{p.code}: </span>
                      {p.statement}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm pl-4">Objectives details are being updated.</p>
            )}
          </div>

          {/* PSO Section */}
          {psos.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-l-4 border-l-red-600 pl-3">
                <h3 className="text-xl font-black text-slate-800 tracking-tight">
                  Program Specific Outcomes (PSO)
                </h3>
              </div>

              <div className="space-y-5 pl-1">
                {psos.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {/* Red document/pdf icon badge */}
                    <div className="flex-shrink-0 mt-1 bg-red-600 text-white rounded p-0.5 w-5 h-5 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-700 font-semibold text-[15px] leading-relaxed">
                      <span className="font-extrabold text-slate-900">{p.code}: </span>
                      {p.statement}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PO Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-l-4 border-l-[#001a66] pl-3">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Program Outcomes (POs)
              </h3>
            </div>

            {pos.length > 0 ? (
              <div className="space-y-5 pl-1">
                {pos.map((p, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {/* Red document/pdf icon badge */}
                    <div className="flex-shrink-0 mt-1 bg-red-600 text-white rounded p-0.5 w-5 h-5 flex items-center justify-center">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <p className="text-slate-700 font-semibold text-[15px] leading-relaxed">
                      <span className="font-extrabold text-slate-900">{p.code}: </span>
                      {p.statement}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm pl-4">Program Outcomes are being updated.</p>
            )}
          </div>

        </div>
      </InnerPageLayout>
    )
  }

  if (subpage === 'faculty') {
    const faculty = dept.faculty || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Faculty Members" />
        {faculty.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {faculty.map((f, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
                <div className="h-48 bg-slate-100 flex items-center justify-center overflow-hidden border-b border-slate-100 relative group">
                  <img
                    src={f.image_url && f.image_url !== '/default-avatar.png' ? (f.image_url.startsWith('/') ? `http://localhost:5000${f.image_url}` : f.image_url) : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'}
                    alt={f.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop';
                    }}
                  />
                  <div className="absolute bottom-3 left-3 bg-[#001a66] text-white px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider">
                    {f.qualification || 'M.E., Ph.D.'}
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-base font-black text-slate-800 tracking-tight leading-snug">{f.name}</h4>
                    <p className="text-xs text-slate-500 font-bold mt-1 uppercase tracking-wider">{f.designation}</p>
                  </div>
                  {f.specialization && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Specialization</p>
                      <p className="text-xs text-slate-600 font-semibold mt-0.5 truncate">{f.specialization}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🧑‍🏫</p>
            <p className="text-slate-400 font-medium text-sm">Faculty details are being updated. Please check back soon.</p>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'infrastructure') {
    const infrastructure = dept.infrastructure || []
    const listItems = infrastructure.filter(inf => !inf.image_url)
    const cardItems = infrastructure.filter(inf => inf.image_url)

    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <div className="bg-white border border-slate-200 rounded-[32px] p-8 md:p-12 shadow-sm space-y-10">

          {/* Centered Heading */}
          <div className="text-center mb-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Facilities
            </h2>
            <div className="flex justify-center items-center mt-3 gap-0.5">
              <div className="w-12 h-1 bg-red-600 rounded-l"></div>
              <div className="w-12 h-1 bg-[#001a66] rounded-r"></div>
            </div>
          </div>

          {/* Infrastructure Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-l-4 border-l-red-600 pl-3">
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Infrastructure Facilities
              </h3>
            </div>

            {infrastructure.length > 0 ? (
              <div className="space-y-8">
                {/* List items (e.g. Classrooms, etc.) */}
                {listItems.length > 0 && (
                  <div className="space-y-5 pl-1">
                    {listItems.map((inf, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {/* Red book/document icon badge */}
                        <div className="flex-shrink-0 mt-1 bg-red-600 text-white rounded p-0.5 w-5 h-5 flex items-center justify-center">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-slate-700 font-semibold text-[15px] leading-relaxed">
                          <span className="font-extrabold text-slate-900">{inf.name}: </span>
                          {inf.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Card items (e.g. Labs with photos) */}
                {cardItems.length > 0 && (
                  <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
                    {cardItems.map((inf, i) => (
                      <div key={i} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
                        <div className="h-48 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                          <img
                            src={inf.image_url.startsWith('/') ? `http://localhost:5000${inf.image_url}` : inf.image_url}
                            alt={inf.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=300&auto=format&fit=crop';
                            }}
                          />
                        </div>
                        <div className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-lg font-black text-slate-800 tracking-tight">{inf.name}</h4>
                            <p className="text-slate-600 font-semibold text-sm leading-relaxed mt-2">{inf.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400 italic text-sm pl-4">Infrastructure details are being updated.</p>
            )}
          </div>
        </div>
      </InnerPageLayout>
    )
  }

  if (subpage === 'advisory') {
    const advisory = dept.advisory || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Advisory Committee" />
        {advisory.length > 0 ? (
          <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-5 text-xs font-black uppercase text-slate-500 tracking-wider">Member Name</th>
                    <th className="p-5 text-xs font-black uppercase text-slate-500 tracking-wider">Designation</th>
                    <th className="p-5 text-xs font-black uppercase text-slate-500 tracking-wider">Organization / Affiliation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {advisory.map((a, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5 text-sm font-extrabold text-slate-800">{a.name}</td>
                      <td className="p-5 text-sm font-semibold text-slate-600">{a.designation}</td>
                      <td className="p-5 text-sm font-bold text-blue-900">{a.organization}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🤝</p>
            <p className="text-slate-400 font-medium text-sm">Advisory Committee details are being updated. Please check back soon.</p>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'activities') {
    const activities = dept.activities || []

    // Group events by 4-digit year found in date, or fallback to 'Recent'
    const groupedEvents = {}
    activities.forEach(act => {
      const match = act.date ? act.date.match(/\b(20\d{2})\b/) : null
      const year = match ? match[1] : 'Recent'
      if (!groupedEvents[year]) {
        groupedEvents[year] = []
      }
      groupedEvents[year].push(act)
    })

    // Sort years descendingly
    const sortedYears = Object.keys(groupedEvents).sort((a, b) => {
      if (a === 'Recent') return 1
      if (b === 'Recent') return -1
      return b - a
    })

    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Events" />
        {activities.length > 0 ? (
          <div className="space-y-8">
            {sortedYears.map((year) => (
              <div key={year}>
                {/* Year Banner */}
                <div className="w-full bg-[#c9a215] border border-[#b8920e] text-white text-center font-bold text-base py-2 rounded-md mb-5">
                  {year}
                </div>

                {/* Event Cards */}
                <div className="space-y-5">
                  {groupedEvents[year].map((act, i) => (
                    <div key={i} className="rounded-lg overflow-hidden border border-slate-200 flex flex-col sm:flex-row shadow-sm">
                      {/* Left – Image */}
                      {act.image_url ? (
                        <div className="w-full sm:w-[200px] flex-shrink-0 bg-slate-100">
                          <img
                            src={act.image_url.startsWith('/') ? `http://localhost:5000${act.image_url}` : act.image_url}
                            alt={act.title}
                            className="w-full h-full object-cover min-h-[160px]"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        </div>
                      ) : (
                        <div className="w-full sm:w-[200px] flex-shrink-0 bg-slate-100 flex items-center justify-center min-h-[160px]">
                          <svg className="w-12 h-12 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zm14.25-11.25a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          </svg>
                        </div>
                      )}

                      {/* Right – Dark Maroon Content Panel */}
                      <div className="flex-1 bg-[#4a0e0e] text-white p-5 flex flex-col justify-center">
                        <h4 className="text-sm font-bold leading-snug mb-2">
                          {act.title}
                        </h4>
                        {act.description && (
                          <p className="text-white/85 text-xs leading-relaxed whitespace-pre-line">
                            {act.description}
                          </p>
                        )}
                        {act.date && (
                          <p className="text-white/85 text-xs leading-relaxed mt-1">
                            {act.date}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-5">
              <svg className="w-9 h-9 text-slate-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
            </div>
            <p className="text-slate-500 font-bold text-sm">No events have been added yet.</p>
            <p className="text-slate-400 font-medium text-xs mt-1">Please check back soon for updates.</p>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'achievements') {
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Gallery" />
        {galleryImages.length > 0 ? (
          <div className="space-y-8">
            {/* Autoplay Carousel */}
            <div className="relative w-full max-w-4xl mx-auto h-[300px] sm:h-[450px] rounded-[16px] overflow-hidden shadow-md group bg-slate-900 border border-slate-200">
              {galleryImages.map((ach, idx) => {
                const isCurrent = idx === carouselIndex;
                return (
                  <div 
                    key={idx} 
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isCurrent ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  >
                    <img 
                      src={ach.image_url.startsWith('/') ? `http://localhost:5000${ach.image_url}` : ach.image_url} 
                      alt={ach.title}
                      className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-500"
                      onClick={() => setSelectedImage(ach.image_url)}
                    />
                    {/* Caption Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white z-20 flex flex-col justify-end">
                      <h4 className="text-base sm:text-xl font-black mb-1.5 uppercase tracking-wide drop-shadow-md">{ach.title}</h4>
                      {ach.description && <p className="text-[11px] sm:text-xs font-semibold opacity-90 drop-shadow">{ach.description}</p>}
                    </div>
                  </div>
                );
              })}

              {/* Left Arrow */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Arrow */}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setCarouselIndex((prev) => (prev + 1) % galleryImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/40 hover:bg-black/60 text-white p-2.5 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {galleryImages.map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCarouselIndex(idx);
                    }}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === carouselIndex ? 'bg-white w-6 shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {galleryImages.map((ach, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedImage(ach.image_url)}
                  className="bg-white border border-slate-200 rounded-[16px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col group hover:-translate-y-1"
                >
                  <div className="h-44 overflow-hidden border-b border-slate-100 relative">
                    <img
                      src={ach.image_url.startsWith('/') ? `http://localhost:5000${ach.image_url}` : ach.image_url}
                      alt={ach.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-white/90 text-slate-800 px-3 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 uppercase tracking-wide">
                        🔍 View
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs leading-snug line-clamp-2 uppercase">{ach.title}</h4>
                      {ach.description && <p className="text-slate-500 font-semibold text-[10px] mt-1.5 leading-relaxed line-clamp-2">{ach.description}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🖼️</p>
            <p className="text-slate-400 font-medium text-sm">Gallery images are being updated. Please check back soon.</p>
          </div>
        )}

        {/* Popup Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white rounded-full p-2.5 transition-all text-xl cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div 
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.startsWith('/') ? `http://localhost:5000${selectedImage}` : selectedImage} 
                alt="Enlarged View"
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
              {(() => {
                const found = galleryImages.find(img => img.image_url === selectedImage);
                return found ? (
                  <div className="mt-4 text-center text-white px-4 max-w-2xl">
                    <h4 className="text-lg font-bold uppercase">{found.title}</h4>
                    {found.description && <p className="text-sm opacity-80 mt-1">{found.description}</p>}
                  </div>
                ) : null;
              })()}
            </div>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'placement') {
    const placements = dept.placements || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Placements" />
        {placements.length > 0 ? (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
              {placements.map((pl, idx) => (
                <div key={idx} className="relative border border-red-100 rounded-[12px] bg-[#fffcfc] p-6 h-36 flex items-center justify-center shadow-sm">
                  <span className="absolute bottom-4 left-4 text-xs font-semibold text-slate-500">Placed {pl.academic_year}</span>
                  <span className="text-5xl font-black text-[#7a0000]">{pl.students_placed}</span>
                </div>
              ))}
            </div>

            <div className="border-dashed border-2 border-slate-200 rounded-[12px] bg-white p-12 text-center text-slate-400 font-semibold text-sm">
              {placements.some(pl => pl.image_or_file) ? (
                <div className="space-y-4">
                  <h4 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider text-left mb-6">Recruiters & Brochures</h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {placements.filter(pl => pl.image_or_file).map((pl, idx) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-[12px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="h-32 overflow-hidden relative group">
                          <img 
                            src={pl.image_or_file.startsWith('/') ? `http://localhost:5000${pl.image_or_file}` : pl.image_or_file} 
                            alt={`Placement ${pl.academic_year}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                "Placement company logos will appear here once added from the admin panel."
              )}
            </div>
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">💼</p>
            <p className="text-slate-400 font-medium text-sm">Placement details are being updated. Please check back soon.</p>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'alumni') {
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Alumni's Feedback" />
        <div className="space-y-12 animate-in fade-in duration-300">
          {/* Notable Alumni Section */}
          <div>
            <h3 className="text-lg font-black text-slate-800 border-l-[3px] border-red-700 pl-3 mb-6 tracking-tight">
              Notable Alumni
            </h3>
            {notableAlumni.length > 0 ? (
              <div>
                <div className="relative bg-white border border-slate-100 rounded-[16px] p-8 shadow-sm flex items-center justify-between min-h-[260px] group transition-all duration-300">
                  {/* Left Arrow */}
                  <button 
                    onClick={() => setNotableIndex((prev) => (prev - 1 + notableAlumni.length) % notableAlumni.length)}
                    className="text-blue-600 hover:text-blue-800 p-2 cursor-pointer z-10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {/* Slide Content */}
                  {(() => {
                    const item = notableAlumni[notableIndex];
                    return (
                      <div className="flex-1 text-center px-4 sm:px-12 animate-in fade-in duration-300">
                        {/* Profile Photo / Silhouette */}
                        <div className="w-20 h-20 rounded-full mx-auto border border-slate-200 overflow-hidden shadow-sm mb-4 flex items-center justify-center bg-blue-50/50">
                          {item.image_url ? (
                            <img 
                              src={item.image_url.startsWith('/') ? `http://localhost:5000${item.image_url}` : item.image_url} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg className="w-10 h-10 text-blue-500/80" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>

                        {/* Name */}
                        <h4 className="text-base font-extrabold text-[#001a66]">{item.name}</h4>
                        
                        {/* Designation & Company */}
                        <p className="text-xs font-bold text-red-600 mt-1 uppercase tracking-wide">
                          {item.designation}{item.company ? `, ${item.company}` : ''}
                        </p>

                        {/* Testimonial */}
                        <p className="text-slate-600 font-semibold text-xs leading-relaxed max-w-xl mx-auto mt-4">
                          {item.feedback}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Right Arrow */}
                  <button 
                    onClick={() => setNotableIndex((prev) => (prev + 1) % notableAlumni.length)}
                    className="text-blue-600 hover:text-blue-800 p-2 cursor-pointer z-10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {notableAlumni.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setNotableIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === notableIndex ? 'bg-blue-600 w-5 shadow-sm' : 'bg-slate-300 hover:bg-slate-400'}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-[16px] p-6 text-center text-slate-400 text-xs font-semibold">
                No notable alumni added yet.
              </div>
            )}
          </div>

          {/* Alumni's Feedback Section */}
          <div>
            <h3 className="text-lg font-black text-slate-800 border-l-[3px] border-red-700 pl-3 mb-6 tracking-tight">
              Alumni's Feedback
            </h3>
            {regularAlumni.length > 0 ? (
              <div>
                <div className="relative bg-white border border-slate-100 rounded-[16px] p-8 shadow-sm flex items-center justify-between min-h-[260px] group transition-all duration-300">
                  {/* Left Arrow */}
                  <button 
                    onClick={() => setFeedbackIndex((prev) => (prev - 1 + regularAlumni.length) % regularAlumni.length)}
                    className="text-blue-600 hover:text-blue-800 p-2 cursor-pointer z-10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {/* Slide Content */}
                  {(() => {
                    const item = regularAlumni[feedbackIndex];
                    return (
                      <div className="flex-1 text-center px-4 sm:px-12 animate-in fade-in duration-300">
                        {/* Profile Photo / Silhouette */}
                        <div className="w-20 h-20 rounded-full mx-auto border border-slate-200 overflow-hidden shadow-sm mb-4 flex items-center justify-center bg-blue-50/50">
                          {item.image_url ? (
                            <img 
                              src={item.image_url.startsWith('/') ? `http://localhost:5000${item.image_url}` : item.image_url} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <svg className="w-10 h-10 text-blue-500/80" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>

                        {/* Name */}
                        <h4 className="text-base font-extrabold text-[#001a66]">{item.name}</h4>
                        
                        {/* Designation & Company */}
                        <p className="text-xs font-bold text-red-600 mt-1 uppercase tracking-wide">
                          {item.designation}{item.company ? `, ${item.company}` : ''}
                        </p>

                        {/* Testimonial */}
                        <p className="text-slate-600 font-semibold text-xs leading-relaxed max-w-xl mx-auto mt-4">
                          {item.feedback}
                        </p>
                      </div>
                    );
                  })()}

                  {/* Right Arrow */}
                  <button 
                    onClick={() => setFeedbackIndex((prev) => (prev + 1) % regularAlumni.length)}
                    className="text-blue-600 hover:text-blue-800 p-2 cursor-pointer z-10 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Dots Indicator */}
                <div className="flex justify-center gap-2 mt-4">
                  {regularAlumni.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setFeedbackIndex(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === feedbackIndex ? 'bg-blue-600 w-5 shadow-sm' : 'bg-slate-300 hover:bg-slate-400'}`}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 border border-slate-100 rounded-[16px] p-6 text-center text-slate-400 text-xs font-semibold">
                No alumni feedback added yet.
              </div>
            )}
          </div>
        </div>
      </InnerPageLayout>
    )
  }

  const introParas = (dept.introduction || '').split('\n').filter(p => p.trim())

  return (
    <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
      {/* Banner */}
      {dept.banner_image && (
        <BannerImage src={dept.banner_image} alt={`Department of ${dept.dept_name}`} />
      )}

      {/* Title */}
      <PageHeader title={`Department of ${dept.dept_name}`} />

      {/* Courses Offered */}
      {courses.length > 0 && (
        <SectionBlock title="Courses Offered">
          <div className="space-y-3">
            {courses.map((c, i) => (
              <CourseChip key={i} label={c} />
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Introduction */}
      {dept.introduction && (
        <SectionBlock title="Introduction">
          {introParas.map((para, i) => (
            <BodyText key={i} className={i > 0 ? 'mt-4' : ''}>
              {para}
            </BodyText>
          ))}
        </SectionBlock>
      )}

      {/* Vision */}
      {dept.vision && (
        <SectionBlock title="Vision">
          <BodyText>{dept.vision}</BodyText>
        </SectionBlock>
      )}

      {/* Mission */}
      {mission.length > 0 && (
        <SectionBlock title="Mission">
          <BulletList items={mission} />
        </SectionBlock>
      )}

      {/* Highlights */}
      {highlights.length > 0 && (
        <SectionBlock title="Department Highlights">
          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map((s, i) => (
              <div key={i} className="rounded-lg border border-blue-100 bg-[#f0f5ff] px-5 py-4">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#001a66]/60">{s.label}</p>
                <p className="mt-1 text-[20px] font-extrabold text-[#001a66]">{s.value}</p>
              </div>
            ))}
          </div>
        </SectionBlock>
      )}

      {/* Empty state for departments with no content yet */}
      {!dept.introduction && !dept.vision && mission.length === 0 && highlights.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-4xl mb-4 opacity-20">📝</p>
          <p className="text-slate-400 font-medium text-sm">Department content is being updated. Please check back soon.</p>
        </div>
      )}
    </InnerPageLayout>
  )
}

export default DeptPage

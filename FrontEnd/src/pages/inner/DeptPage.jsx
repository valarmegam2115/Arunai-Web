import React, { useState, useEffect } from 'react'
import InnerPageLayout from '../../components/InnerPageLayout'
import { PageHeader, SectionBlock, BodyText, BannerImage, CourseChip, BulletList } from '../../components/blocks'
import { deptSidebar } from '../../utils/sidebarConfig'

/**
 * Generic dynamic department page.
 * Receives `slug` prop (e.g. 'cse', 'civil') and fetches content from the API.
 * Courses are stored in the DB but displayed as static chips.
 */
const DeptPage = ({ slug, subpage }) => {
  const [dept, setDept] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  // Build sidebar from slug
  const deptNameForSidebar = dept?.dept_name || slug.toUpperCase()
  const sidebar = deptSidebar(deptNameForSidebar, `/academics/dept/${slug}`)

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
        <PageHeader title="PEOs, PSOs & POs" />
        
        <SectionBlock title="Program Educational Objectives (PEOs)">
          {peos.length > 0 ? (
            <div className="space-y-4">
              {peos.map((p, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-10 bg-blue-50 text-[#001a66] font-black rounded-lg text-xs tracking-wider">
                    {p.code}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600 font-semibold text-sm leading-relaxed">{p.statement}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic text-sm">Objectives details are being updated.</p>
          )}
        </SectionBlock>

        <SectionBlock title="Program Specific Outcomes (PSOs)">
          {psos.length > 0 ? (
            <div className="space-y-4">
              {psos.map((p, i) => (
                <div key={i} className="flex gap-4 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-10 bg-[#0d2060]/5 text-[#0d2060] font-black rounded-lg text-xs tracking-wider">
                    {p.code}
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600 font-semibold text-sm leading-relaxed">{p.statement}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic text-sm">Outcome details are being updated.</p>
          )}
        </SectionBlock>

        <SectionBlock title="Program Outcomes (POs)">
          {pos.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {pos.map((p, i) => (
                <div key={i} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-2">
                  <div className="w-fit px-3 py-1 bg-slate-100 text-[#001a66] font-black rounded-md text-[10px] tracking-widest uppercase">
                    {p.code}
                  </div>
                  <p className="text-slate-600 font-semibold text-xs leading-relaxed">{p.statement}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-400 italic text-sm">Program Outcomes are being updated.</p>
          )}
        </SectionBlock>
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
                    src={f.image_url && f.image_url !== '/default-avatar.png' ? f.image_url : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop'} 
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
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Infrastructure & Lab Facilities" />
        {infrastructure.length > 0 ? (
          <div className="space-y-6">
            {infrastructure.map((inf, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 grid sm:grid-cols-12">
                <div className="sm:col-span-4 bg-slate-50 h-48 sm:h-full min-h-[160px] flex items-center justify-center overflow-hidden border-b sm:border-b-0 sm:border-r border-slate-100">
                  <img 
                    src={inf.image_url || 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=300&auto=format&fit=crop'} 
                    alt={inf.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=300&auto=format&fit=crop';
                    }}
                  />
                </div>
                <div className="sm:col-span-8 p-6 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-black text-slate-800 tracking-tight">{inf.name}</h4>
                    <p className="text-slate-600 font-semibold text-sm leading-relaxed mt-2">{inf.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🧪</p>
            <p className="text-slate-400 font-medium text-sm">Infrastructure details are being updated. Please check back soon.</p>
          </div>
        )}
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
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Department Activities & Events" />
        {activities.length > 0 ? (
          <div className="space-y-6">
            {activities.map((act, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="bg-blue-50 text-[#001a66] px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                    📅 {act.date}
                  </span>
                </div>
                <h4 className="text-lg font-black text-slate-800 tracking-tight leading-snug">{act.title}</h4>
                {act.description && (
                  <p className="text-slate-600 font-medium text-sm leading-relaxed">{act.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🎉</p>
            <p className="text-slate-400 font-medium text-sm">Department activities details are being updated. Please check back soon.</p>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'achievements') {
    const achievements = dept.achievements || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Student & Faculty Achievements" />
        {achievements.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {achievements.map((ach, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">🏆</div>
                <div className="min-w-0">
                  <h4 className="font-black text-slate-800 text-base leading-snug">{ach.title}</h4>
                  <p className="text-slate-500 font-semibold text-xs mt-1 leading-relaxed">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🏆</p>
            <p className="text-slate-400 font-medium text-sm">Achievements details are being updated. Please check back soon.</p>
          </div>
        )}
      </InnerPageLayout>
    )
  }

  if (subpage === 'placement') {
    const placements = dept.placements || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Placement Records" />
        {placements.length > 0 ? (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-[24px] overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="p-5 text-xs font-black uppercase text-slate-500 tracking-wider">Academic Year</th>
                    <th className="p-5 text-xs font-black uppercase text-slate-500 tracking-wider">Students Placed</th>
                    <th className="p-5 text-xs font-black uppercase text-slate-500 tracking-wider">Average Salary Package</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {placements.map((pl, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5 text-sm font-extrabold text-slate-800">{pl.academic_year}</td>
                      <td className="p-5 text-sm font-bold text-[#001a66]">{pl.students_placed} Students</td>
                      <td className="p-5 text-sm font-bold text-green-700">{pl.average_salary || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {placements.slice(0, 3).map((pl, i) => (
                <div key={i} className="bg-gradient-to-br from-[#0d2060] to-[#001a66] text-white p-6 rounded-[24px] shadow-md flex flex-col justify-between h-32">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Placement {pl.academic_year}</span>
                  <div>
                    <h5 className="text-3xl font-black">{pl.students_placed}</h5>
                    <p className="text-[11px] font-bold text-white/80">Placed at Average {pl.average_salary}</p>
                  </div>
                </div>
              ))}
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
    const alumni = dept.alumni || []
    return (
      <InnerPageLayout sidebarTitle={sidebar.title} sidebarLinks={sidebar.links}>
        <PageHeader title="Alumni Registry & Feedback" />
        {alumni.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {alumni.map((al, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <span className="text-3xl text-blue-200">“</span>
                  <p className="text-slate-600 font-semibold text-sm leading-relaxed -mt-2 italic">{al.feedback}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <h5 className="font-black text-slate-800 text-sm">{al.name}</h5>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{al.designation} at {al.company}</p>
                  </div>
                  <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    Batch {al.batch}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-4xl mb-4 opacity-20">🎓</p>
            <p className="text-slate-400 font-medium text-sm">Alumni registry details are being updated. Please check back soon.</p>
          </div>
        )}
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

import React, { useState, useEffect } from 'react'
import InnerPageLayout from '../../../components/InnerPageLayout'
import { PageHeader, SectionBlock } from '../../../components/blocks'
import { aboutSidebar } from '../../../utils/sidebarConfig'

const AcademicCouncil = () => {
  const [members, setMembers] = useState([])
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membersRes, meetingsRes] = await Promise.all([
          fetch('http://localhost:5000/api/academic-council/members'),
          fetch('http://localhost:5000/api/academic-council/meetings')
        ])
        const [membersData, meetingsData] = await Promise.all([
          membersRes.json(),
          meetingsRes.json()
        ])
        if (membersData.success) setMembers(membersData.data)
        if (meetingsData.success) setMeetings(meetingsData.data)
      } catch (err) {
        console.error('Error fetching academic council data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
        <PageHeader title="Academic Council Members (2024 - 2026)" />
        <div className="flex justify-center py-16">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600/20 border-t-blue-600"></div>
        </div>
      </InnerPageLayout>
    )
  }

  return (
    <InnerPageLayout sidebarTitle={aboutSidebar.title} sidebarLinks={aboutSidebar.links}>
      <PageHeader title="Academic Council Members (2024 - 2026)" />

      {/* Members Table */}
      <SectionBlock>
        {members.length === 0 ? (
          <p className="py-12 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
            No members data available yet.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#001a66] text-white">
                  <th className="w-16 px-5 py-3 text-center font-bold tracking-wide">S.No</th>
                  <th className="px-5 py-3 font-bold tracking-wide">Name</th>
                  <th className="px-5 py-3 font-bold tracking-wide">Designation / Details</th>
                  <th className="px-5 py-3 font-bold tracking-wide">Category</th>
                </tr>
              </thead>
              <tbody>
                {members.map((member, i) => (
                  <tr
                    key={member.id}
                    className={`border-t border-gray-100 ${i % 2 === 1 ? 'bg-[#fff0f0]' : 'bg-white'}`}
                  >
                    <td className="px-5 py-4 text-center font-bold text-gray-800">{member.sno}</td>
                    <td className="px-5 py-4 text-gray-700 leading-relaxed font-medium">{member.name}</td>
                    <td className="px-5 py-4 text-gray-700 leading-relaxed">{member.designation}</td>
                    <td className="px-5 py-4 text-gray-700 leading-relaxed">{member.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionBlock>

      {/* Academic Council Meetings */}
      <SectionBlock title="Academic Council Meeting">
        {meetings.length === 0 ? (
          <p className="py-6 text-center text-sm font-bold uppercase tracking-widest text-slate-400">
            No meetings available yet.
          </p>
        ) : (
          <ul className="space-y-2">
            {meetings.map((meeting) => (
              <li key={meeting.id} className="flex items-start gap-2 text-[15px] text-gray-700 leading-7">
                <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-[#001a66]" />
                <a
                  href={meeting.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-700 hover:underline transition-colors hover:text-blue-900"
                >
                  {meeting.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </SectionBlock>
    </InnerPageLayout>
  )
}

export default AcademicCouncil

import React from 'react'

const NISP = () => {
  const visionMissionData = {
    vision: [
      {
        id: 1,
        statement: 'To cultivate a vibrant ecosystem of research, innovation, and entrepreneurship that transforms students into skilled professionals and successful startup creators.'
      }
    ],
    mission: [
      {
        id: 1,
        statement: 'To integrate innovation and entrepreneurship into the academic framework through training, workshops, and experiential learning.'
      },
      {
        id: 2,
        statement: 'To establish strong incubation and mentoring support for transforming ideas into successful startups.'
      },
      {
        id: 3,
        statement: 'To encourage collaboration with industries, research organizations, and funding bodies.'
      },
      {
        id: 4,
        statement: 'To nurture a culture of ethical practices, sustainability, and problem-solving for real-world challenges.'
      }
    ]
  }

  const policyDocuments = [
    {
      title: 'AEC Innovation and Startup Policy',
      link: '#'
    },
    {
      title: 'Startup Policy 2019',
      link: '#'
    }
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:p-12 border border-gray-100">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1a202c] sm:text-3xl">
            AEC Innovation and Startup Policies
          </h1>
          <div className="mx-auto mt-3 flex h-[3px] w-16 items-center justify-center overflow-hidden">
            <div className="h-full w-1/2 bg-[#001a66]"></div>
            <div className="h-full w-1/2 bg-[#e53e3e]"></div>
          </div>
        </div>

        {/* Vision Section */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-[5px] bg-[#990000]"></div>
            <h2 className="text-lg font-bold tracking-wider text-[#1a202c] uppercase">
              VISION – AEC
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#feb2b2] text-[#1a202c]">
                  <th className="w-24 px-6 py-4 text-[13px] font-black uppercase tracking-widest border-r border-white/20">Sl.No.</th>
                  <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest text-center">Policy Statement</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {visionMissionData.vision.map((item) => (
                  <tr key={`vision-${item.id}`} className="border-t border-gray-100">
                    <td className="px-6 py-8 text-center font-bold text-gray-800 border-r border-gray-100">{item.id}</td>
                    <td className="px-10 py-8 text-center text-[15px] font-medium text-gray-700 leading-relaxed">
                      {item.statement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-[5px] bg-[#990000]"></div>
            <h2 className="text-lg font-bold tracking-wider text-[#1a202c] uppercase">
              MISSION – AEC
            </h2>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#feb2b2] text-[#1a202c]">
                  <th className="w-24 px-6 py-4 text-[13px] font-black uppercase tracking-widest border-r border-white/20">Sl.No.</th>
                  <th className="px-6 py-4 text-[13px] font-black uppercase tracking-widest text-center">Policy Statement</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {visionMissionData.mission.map((item, index) => (
                  <tr 
                    key={`mission-${item.id}`} 
                    className={`border-t border-gray-100 ${index % 2 === 1 || index === 3 ? 'bg-[#ebf4ff]' : 'bg-white'}`}
                  >
                    <td className="px-6 py-6 text-center font-bold text-gray-800 border-r border-gray-100">{item.id}</td>
                    <td className="px-10 py-6 text-center text-[15px] font-medium text-gray-700 leading-relaxed">
                      {item.statement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Policy Documents Section */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-[5px] bg-[#990000]"></div>
            <h2 className="text-lg font-bold tracking-wider text-[#1a202c] uppercase">
              Policy Documents
            </h2>
          </div>
          <div className="space-y-4">
            {policyDocuments.map((doc, index) => (
              <a
                key={index}
                href={doc.link}
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4 transition-all hover:border-blue-300 hover:shadow-sm"
              >
                <span className="text-[17px] font-bold text-[#001a66] group-hover:text-blue-700 transition-colors">
                  {doc.title}
                </span>
                <div className="text-blue-600 transition-transform group-hover:scale-110">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default NISP

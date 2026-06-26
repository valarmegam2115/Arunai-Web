import React, { useState, useEffect } from 'react';
import InnerPageLayout from '../../../components/InnerPageLayout';
import { PageHeader, SectionBlock } from '../../../components/blocks';
import { placementSidebar } from '../../../utils/sidebarConfig';

const Recruiters = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(30);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/recruiters');
      const data = await res.json();
      if (data.success) {
        setRecruiters(data.data);
      }
    } catch (err) {
      console.error('Error fetching recruiters:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + 30);
  };

  const visibleRecruiters = recruiters.slice(0, visibleCount);
  const recruitersWithLogos = recruiters.filter(r => r.logo_url && r.logo_url !== '#');

  return (
    <InnerPageLayout sidebarTitle={placementSidebar.title} sidebarLinks={placementSidebar.links}>
      <PageHeader title="List Of Recruiters" />

      <SectionBlock>
        <div className="w-full max-w-4xl mx-auto pb-12 mt-6">
          <p className="text-gray-600 leading-relaxed mb-8">
            Our aim is to provide 100% Placement to our students and we are striving towards achieving it. We have already established tie-ups with top Companies for on-campus recruitment.
          </p>

          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#001a66]/20 border-t-[#001a66] rounded-full animate-spin"></div>
            </div>
          ) : recruiters.length > 0 ? (
            <>
              {/* Companies Table */}
              <div className="overflow-hidden rounded-t-xl border border-gray-200 shadow-sm mb-10">
                <table className="w-full text-left bg-white border-collapse">
                  <thead>
                    <tr className="bg-[#ffb3b3] text-gray-900 text-xs font-bold uppercase tracking-wider">
                      <th className="py-4 px-6 w-24">S.No</th>
                      <th className="py-4 px-6 text-center">Company Name</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {visibleRecruiters.map((recruiter, index) => (
                      <tr key={recruiter.id} className="hover:bg-gray-50/50 transition-colors odd:bg-gray-50/30">
                        <td className="py-4 px-6 font-bold text-gray-700">{index + 1}</td>
                        <td className="py-4 px-6 font-medium text-gray-600 text-center uppercase tracking-widest text-[11px]">{recruiter.company_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* View More Button */}
              {visibleCount < recruiters.length && (
                <div className="flex flex-col items-center mb-16">
                  <button 
                    onClick={handleViewMore}
                    className="bg-[#8b0000] hover:bg-[#600000] text-white px-8 py-2.5 rounded shadow-md font-bold text-sm transition-all"
                  >
                    View More
                  </button>
                  <p className="text-gray-500 text-xs mt-3">
                    Showing {visibleRecruiters.length} of {recruiters.length} companies
                  </p>
                </div>
              )}

              {/* Logos Grid */}
              {recruitersWithLogos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {recruitersWithLogos.map(recruiter => (
                    <div 
                      key={recruiter.id} 
                      className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-shadow h-24"
                    >
                      <img 
                        src={recruiter.logo_url} 
                        alt={recruiter.company_name} 
                        className="max-h-16 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">No recruiters added yet.</p>
            </div>
          )}
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default Recruiters;

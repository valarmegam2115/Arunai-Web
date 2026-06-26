import React, { useState, useEffect } from 'react';
import InnerPageLayout from '../../../components/InnerPageLayout';
import { PageHeader, SectionBlock } from '../../../components/blocks';
import { coeSidebar } from '../../../utils/sidebarConfig';
import { FiFileText, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const CoeAccordionLayout = ({ title, category }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTerm, setExpandedTerm] = useState(null);

  useEffect(() => {
    fetchDocuments();
  }, [category]);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/coe-circulars');
      const data = await res.json();
      if (data.success) {
        // Filter by category
        const filteredData = data.data.filter(item => item.category === category);
        setDocuments(filteredData);
        
        // Auto-expand the first available term for this category
        const terms = [...new Set(filteredData.map(item => item.academic_term))];
        if (terms.length > 0) {
          setExpandedTerm(terms[0]);
        } else {
          setExpandedTerm(null);
        }
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group documents by academic_term
  const groupedDocuments = documents.reduce((acc, curr) => {
    if (!acc[curr.academic_term]) {
      acc[curr.academic_term] = [];
    }
    acc[curr.academic_term].push(curr);
    return acc;
  }, {});

  const toggleTerm = (term) => {
    if (expandedTerm === term) {
      setExpandedTerm(null);
    } else {
      setExpandedTerm(term);
    }
  };

  return (
    <InnerPageLayout sidebarTitle={coeSidebar.title} sidebarLinks={coeSidebar.links}>
      <PageHeader title={title} />

      <SectionBlock>
        <div className="w-full max-w-5xl mx-auto py-8">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-[#001a66]/20 border-t-[#001a66] rounded-full animate-spin"></div>
            </div>
          ) : Object.keys(groupedDocuments).length > 0 ? (
            <div className="space-y-4">
              {Object.keys(groupedDocuments).map((term, index) => {
                const isExpanded = expandedTerm === term;
                return (
                  <div key={index} className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                    <button
                      onClick={() => toggleTerm(term)}
                      className={`w-full px-6 py-4 flex justify-between items-center transition-colors ${
                        isExpanded ? 'bg-[#990000] text-white' : 'bg-[#001a66] text-white'
                      }`}
                    >
                      <span className="font-bold text-sm tracking-wide">{term}</span>
                      {isExpanded ? <FiChevronUp className="w-5 h-5" /> : <FiChevronDown className="w-5 h-5" />}
                    </button>
                    
                    {isExpanded && (
                      <div className="bg-white border-x border-b border-gray-200 p-6">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-[#ffb3b3]">
                              <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 border border-gray-300 w-16 text-center">S.No</th>
                              <th className="py-3 px-4 text-left text-xs font-bold text-gray-900 border border-gray-300">{title}</th>
                              <th className="py-3 px-4 text-center text-xs font-bold text-gray-900 border border-gray-300 w-24">View</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupedDocuments[term].map((doc, docIndex) => (
                              <tr key={doc.id} className="hover:bg-gray-50">
                                <td className="py-3 px-4 text-sm text-gray-700 border border-gray-300 text-center font-medium">
                                  {docIndex + 1}
                                </td>
                                <td className="py-3 px-4 text-sm text-gray-700 border border-gray-300">
                                  {doc.title}
                                </td>
                                <td className="py-3 px-4 text-center border border-gray-300">
                                  <a
                                    href={doc.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center text-red-600 hover:text-red-800 transition-colors"
                                  >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                                      <path d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M9.5,11.5C9.5,12.33 8.83,13 8,13H7V15H5.5V9H8A1.5,1.5 0 0,1 9.5,10.5V11.5M14.5,13.5A1.5,1.5 0 0,1 13,15H10.5V9H13A1.5,1.5 0 0,1 14.5,10.5V13.5M18.5,10.5H17V11.5H18.5V13H17V15H15.5V9H18.5V10.5M7,10.5H8V11.5H7V10.5M12,10.5H13V13.5H12V10.5Z" />
                                    </svg>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 border border-dashed border-gray-300 rounded-xl bg-gray-50">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">No documents available</p>
              <p className="text-gray-400 text-xs">Please check back later or contact the COE office.</p>
            </div>
          )}
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default CoeAccordionLayout;

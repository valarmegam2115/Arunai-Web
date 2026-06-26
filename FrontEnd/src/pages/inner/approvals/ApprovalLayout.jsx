import React, { useState, useEffect } from 'react';
import InnerPageLayout from '../../../components/InnerPageLayout';
import { PageHeader, SectionBlock } from '../../../components/blocks';
import { approvalSidebar } from '../../../utils/sidebarConfig';

const ApprovalLayout = ({ title, category }) => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDocuments();
  }, [category]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/documents');
      const data = await res.json();
      if (data.success) {
        const filteredDocs = data.data.filter(doc => doc.category === category);
        setDocuments(filteredDocs);
      }
    } catch (err) {
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InnerPageLayout sidebarTitle={approvalSidebar.title} sidebarLinks={approvalSidebar.links}>
      <PageHeader title={title} />

      <SectionBlock>
        <div className="space-y-5 mt-10 w-full max-w-4xl mx-auto pb-12">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-[#001a66]/20 border-t-[#001a66] rounded-full animate-spin"></div>
            </div>
          ) : documents.length > 0 ? (
            documents.map((doc, index) => (
              <a 
                key={index} 
                href={doc.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-white border border-gray-100 shadow-sm rounded-lg py-5 px-6 flex items-center hover:shadow-md transition-shadow block"
              >
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#001a66] rounded-l-lg"></div>
                <p className="text-[13px] font-bold text-gray-600 tracking-widest uppercase ml-4">
                  {doc.title}
                </p>
              </a>
            ))
          ) : (
            <div className="text-center py-10 border border-dashed border-gray-200 rounded-xl bg-gray-50">
              <p className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">No documents found.</p>
              <p className="text-gray-400 text-xs">Please upload {title} documents from the Admin Dashboard.</p>
            </div>
          )}
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default ApprovalLayout;

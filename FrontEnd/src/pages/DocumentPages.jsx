import React, { useState, useEffect } from 'react';

const DocumentSection = ({ category }) => {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDocs = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/documents');
                const data = await res.json();
                if (data.success) {
                    // Filter by category
                    const filtered = data.data.filter(doc => doc.category.toLowerCase().includes(category.toLowerCase()));
                    setDocuments(filtered);
                }
            } catch (err) {
                console.error('Error fetching documents:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDocs();
    }, [category]);

    if (loading) return (
        <div className="py-20 text-center">
            <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
        </div>
    );

    return (
        <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/50 overflow-hidden border border-slate-100 max-w-5xl mx-auto mt-32 mb-20">
            <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight inline-block relative">
                        {category.toUpperCase()}
                        <div className="h-1.5 w-full mt-2 flex">
                            <div className="h-full w-1/2 bg-[#001a66]"></div>
                            <div className="h-full w-1/2 bg-red-500"></div>
                        </div>
                    </h2>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-1.5 h-6 bg-red-600 rounded-full"></div>
                        <h3 className="text-xl font-black text-slate-800">
                            {category === 'IIC' ? 'IIC Document' : 'Documents'}
                        </h3>
                    </div>

                    <div className="grid gap-3">
                        {documents.length === 0 ? (
                            <p className="text-slate-400 text-center py-10 font-bold uppercase tracking-widest text-xs">No documents available yet.</p>
                        ) : (
                            documents.map((doc) => (
                                <a
                                    key={doc.id}
                                    href={doc.file_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between p-5 md:px-8 rounded-2xl border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                                >
                                    <span className="text-blue-600 font-black text-sm md:text-[15px] group-hover:translate-x-1 transition-transform">
                                        {doc.title}
                                    </span>
                                    <div className="flex items-center gap-3">
                                        <svg className="w-5 h-5 text-blue-600 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                                        </svg>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const IICPage = () => (
    <div className="min-h-screen bg-slate-50 px-4">
        <DocumentSection category="IIC" />
    </div>
);

const NIRFPage = () => (
    <div className="min-h-screen bg-slate-50 px-4">
        <DocumentSection category="NIRF" />
    </div>
);

export { IICPage, NIRFPage };

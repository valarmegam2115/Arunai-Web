import React, { useState, useEffect } from 'react';
import { navigateTo } from '../utils/router';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('news');
    const [newsData, setNewsData] = useState([]);
    const [carouselEventsData, setCarouselEventsData] = useState([]);
    const [extraCurricularData, setExtraCurricularData] = useState([]);
    const [documentsData, setDocumentsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [showCarouselModal, setShowCarouselModal] = useState(false);
    const [showExtraModal, setShowExtraModal] = useState(false);
    const [showDocModal, setShowDocModal] = useState(false);

    const [newsFormData, setNewsFormData] = useState({
        id: null, category: 'news', day: '', month: '', year: '2026', text: ''
    });

    const [carouselFormData, setCarouselFormData] = useState({
        id: null, title: '', date: '', image: '', description: ''
    });
    const [carouselImageFile, setCarouselImageFile] = useState(null);

    const [extraFormData, setExtraFormData] = useState({
        id: null, title: '', description: '', image: '', link: '#'
    });
    const [extraImageFile, setExtraImageFile] = useState(null);

    const [docFormData, setDocFormData] = useState({
        id: null, category: 'IIC 2026', title: '', file_url: '#'
    });
    const [docFile, setDocFile] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigateTo('/admin-login');
            return;
        }
        fetchAllData();
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [resNews, resCarousel, resExtra, resDocs] = await Promise.all([
                fetch('http://localhost:5000/api/news'),
                fetch('http://localhost:5000/api/our-events'),
                fetch('http://localhost:5000/api/extra-curricular'),
                fetch('http://localhost:5000/api/documents')
            ]);
            const [dataNews, dataCarousel, dataExtra, dataDocs] = await Promise.all([
                resNews.json(), resCarousel.json(), resExtra.json(), resDocs.json()
            ]);

            if (dataNews.success) setNewsData(dataNews.data);
            if (dataCarousel.success) setCarouselEventsData(dataCarousel.data);
            if (dataExtra.success) setExtraCurricularData(dataExtra.data);
            if (dataDocs.success) setDocumentsData(dataDocs.data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigateTo('/');
    };

    const handleOpenModal = (item = null) => {
        setIsEditing(!!item);
        if (activeTab === 'carousel_events') {
            if (item) {
                setCarouselFormData(item);
            } else {
                setCarouselFormData({ id: null, title: '', date: '', image: '', description: '' });
            }
            setCarouselImageFile(null);
            setShowCarouselModal(true);
        } else if (activeTab === 'extra_curricular') {
            if (item) {
                setExtraFormData(item);
            } else {
                setExtraFormData({ id: null, title: '', description: '', image: '', link: '#' });
            }
            setExtraImageFile(null);
            setShowExtraModal(true);
        } else if (activeTab === 'documents') {
            if (item) {
                setDocFormData(item);
            } else {
                setDocFormData({ id: null, category: 'IIC 2026', title: '', file_url: '#' });
            }
            setDocFile(null);
            setShowDocModal(true);
        } else {
            if (item) {
                setNewsFormData(item);
            } else {
                setNewsFormData({ id: null, category: activeTab, day: '', month: '', year: new Date().getFullYear().toString(), text: '' });
            }
            setShowNewsModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowNewsModal(false);
        setShowCarouselModal(false);
        setShowExtraModal(false);
        setShowDocModal(false);
    };

    const handleSaveNews = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const url = isEditing ? `http://localhost:5000/api/news/${newsFormData.id}` : 'http://localhost:5000/api/news';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(newsFormData)
            });
            const data = await res.json();
            if (data.success) {
                fetchAllData();
                handleCloseModal();
            } else {
                alert(data.message || 'Error saving item');
            }
        } catch (err) {
            console.error('Error saving item:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleSaveCarousel = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let imageUrl = carouselFormData.image;

        try {
            if (carouselImageFile) {
                const uploadData = new FormData();
                uploadData.append('file', carouselImageFile);

                const uploadRes = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });

                const uploadJson = await uploadRes.json();
                if (uploadJson.success) {
                    imageUrl = uploadJson.data.url;
                } else {
                    alert(uploadJson.message || 'Error uploading image');
                    return;
                }
            } else if (!imageUrl && !isEditing) {
                alert('Please select an image to upload.');
                return;
            }

            const url = isEditing ? `http://localhost:5000/api/our-events/${carouselFormData.id}` : 'http://localhost:5000/api/our-events';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...carouselFormData, image: imageUrl };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                fetchAllData();
                handleCloseModal();
            } else {
                alert(data.message || 'Error saving item');
            }
        } catch (err) {
            console.error('Error saving item:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleSaveExtra = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let imageUrl = extraFormData.image;

        try {
            if (extraImageFile) {
                const uploadData = new FormData();
                uploadData.append('file', extraImageFile);

                const uploadRes = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });

                const uploadJson = await uploadRes.json();
                if (uploadJson.success) {
                    imageUrl = uploadJson.data.url;
                } else {
                    alert(uploadJson.message || 'Error uploading image');
                    return;
                }
            } else if (!imageUrl && !isEditing) {
                alert('Please select an image to upload.');
                return;
            }

            const url = isEditing ? `http://localhost:5000/api/extra-curricular/${extraFormData.id}` : 'http://localhost:5000/api/extra-curricular';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...extraFormData, image: imageUrl };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                fetchAllData();
                handleCloseModal();
            } else {
                alert(data.message || 'Error saving item');
            }
        } catch (err) {
            console.error('Error saving item:', err);
            alert('Failed to connect to the server.');
        }
    };
    const handleSaveDoc = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let fileUrl = docFormData.file_url;

        try {
            if (docFile) {
                const uploadData = new FormData();
                uploadData.append('file', docFile);

                const uploadRes = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });

                const uploadJson = await uploadRes.json();
                if (uploadJson.success) {
                    fileUrl = uploadJson.data.url;
                } else {
                    alert(uploadJson.message || 'Error uploading PDF');
                    return;
                }
            } else if (!fileUrl && !isEditing) {
                alert('Please select a PDF file to upload.');
                return;
            }

            const url = isEditing ? `http://localhost:5000/api/documents/${docFormData.id}` : 'http://localhost:5000/api/documents';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...docFormData, file_url: fileUrl };

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.success) {
                fetchAllData();
                handleCloseModal();
            } else {
                alert(data.message || 'Error saving document');
            }
        } catch (err) {
            console.error('Error saving document:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        const token = localStorage.getItem('adminToken');
        let endpoint = 'news';
        if (type === 'carousel_events') endpoint = 'our-events';
        else if (type === 'extra_curricular') endpoint = 'extra-curricular';
        else if (type === 'documents') endpoint = 'documents';

        try {
            const res = await fetch(`http://localhost:5000/api/${endpoint}/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                fetchAllData();
            } else {
                alert(data.message || 'Error deleting item');
            }
        } catch (err) {
            console.error('Error deleting item:', err);
            alert('Failed to connect to the server.');
        }
    };

    const getActiveData = () => {
        if (activeTab === 'carousel_events') return carouselEventsData;
        if (activeTab === 'extra_curricular') return extraCurricularData;
        if (activeTab === 'documents') return documentsData;
        return newsData.filter(item => item.category === activeTab);
    };

    const activeData = getActiveData();

    const menuItems = [
        { id: 'news', label: 'News', icon: '📰' },
        { id: 'events', label: 'Events', icon: '📅' },
        { id: 'achievements', label: 'Achievements', icon: '🏆' },
        { id: 'carousel_events', label: 'Carousel', icon: '🎢' },
        { id: 'extra_curricular', label: 'Extra-Curricular', icon: '🎨' },
        { id: 'documents', label: 'Documents', icon: '📄' }
    ];

    const activeMenu = menuItems.find(i => i.id === activeTab) || menuItems[0];

    return (
        <div className="flex h-screen bg-[#f1f5f9] text-slate-800 font-sans overflow-hidden">
            {/* Left Sidebar - Fixed */}
            <aside className="w-72 bg-[#001a66] text-white flex flex-col flex-shrink-0 z-30 shadow-2xl">
                <div className="p-8 border-b border-white/10">
                    <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                        <span className="bg-white text-[#001a66] w-8 h-8 flex items-center justify-center rounded-lg">A</span>
                        Admin Portal
                    </h1>
                    <p className="text-blue-300/60 text-xs mt-2 font-medium tracking-widest uppercase">Content Manager</p>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4 overflow-y-auto">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group ${activeTab === item.id
                                ? 'bg-white/10 text-white shadow-inner border border-white/10'
                                : 'text-blue-200/70 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <span className={`text-xl transition-transform duration-200 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`}>
                                {item.icon}
                            </span>
                            <span className="font-bold text-[15px]">{item.label}</span>
                            {activeTab === item.id && (
                                <div className="ml-auto w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/10 bg-[#001450]">
                    <button
                        onClick={handleLogout}
                        className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper - Flex Column */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Header - Stays at top */}
                <header className="bg-white border-b border-slate-200 h-24 flex items-center justify-between px-8 lg:px-12 flex-shrink-0 z-20 shadow-sm">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                            <span className="text-blue-600">{activeMenu.icon}</span>
                            {activeMenu.label}
                        </h2>
                        <p className="text-slate-500 text-sm font-medium mt-1">Manage your campus {activeMenu.label.toLowerCase()} content.</p>
                    </div>

                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-3.5 rounded-2xl font-black shadow-xl shadow-blue-900/20 transition-all hover:-translate-y-1 active:translate-y-0 flex items-center gap-3"
                    >
                        <span className="text-2xl leading-none">+</span> 
                        <span className="uppercase tracking-widest text-xs">Add New Entry</span>
                    </button>
                </header>

                {/* Body - Scrollable content */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 bg-[#f8fafc]">
                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Total Entries</p>
                            <h4 className="text-3xl font-black text-slate-900">{activeData.length}</h4>
                        </div>
                        <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Live Status</p>
                            <h4 className="text-3xl font-black text-green-600 flex items-center gap-2">
                                Active <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                            </h4>
                        </div>
                    </div>

                    {/* Data List Container */}
                    <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
                        {loading ? (
                            <div className="p-24 text-center flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                                <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Synchronizing...</p>
                            </div>
                        ) : activeData.length === 0 ? (
                            <div className="p-24 text-center">
                                <div className="text-4xl mb-4 opacity-20">📁</div>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No entries found for {activeMenu.label}</p>
                                <button 
                                    onClick={() => handleOpenModal()}
                                    className="mt-6 text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline"
                                >
                                    Create the first one →
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] border-b border-slate-100">
                                            {activeTab === 'carousel_events' || activeTab === 'extra_curricular' || activeTab === 'documents' ? (
                                                <>
                                                    <th className="p-8">{activeTab === 'documents' ? 'Category' : 'Preview'}</th>
                                                    <th className="p-8">Information</th>
                                                    <th className="p-8 text-right">Actions</th>
                                                </>
                                            ) : (
                                                <>
                                                    <th className="p-8">Date</th>
                                                    <th className="p-8">Details</th>
                                                    <th className="p-8 text-right">Actions</th>
                                                </>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {activeData.map((item) => (
                                            <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                                                {activeTab === 'carousel_events' || activeTab === 'extra_curricular' || activeTab === 'documents' ? (
                                                    <>
                                                        <td className="p-8 w-56">
                                                            {activeTab === 'documents' ? (
                                                                <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest border border-slate-200">
                                                                    {item.category}
                                                                </span>
                                                            ) : (
                                                                <div className="relative overflow-hidden rounded-2xl w-40 h-24 border border-slate-200 shadow-sm bg-slate-100">
                                                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                                                </div>
                                                            )}
                                                        </td>
                                                        <td className="p-8">
                                                            <h5 className="font-black text-xl text-slate-900 group-hover:text-blue-700 transition-colors">{item.title}</h5>
                                                            {item.date && <div className="text-xs font-black text-blue-600 mt-1 uppercase tracking-widest">{item.date}</div>}
                                                            {item.description && <p className="text-slate-500 text-sm mt-3 line-clamp-2 max-w-2xl font-medium leading-relaxed">{item.description}</p>}
                                                            {item.file_url && item.file_url !== '#' && (
                                                                <a href={item.file_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">
                                                                    <span>📎</span> View Document
                                                                </a>
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className="p-8 w-48">
                                                            <div className="flex flex-col border border-slate-200 rounded-2xl overflow-hidden text-center text-xs font-black w-24 shadow-sm bg-white">
                                                                <span className="bg-[#facc15] text-[#854d0e] py-2 uppercase tracking-tighter">{item.day}</span>
                                                                <span className="bg-slate-50 text-slate-700 py-1 border-t border-slate-100">{item.month}</span>
                                                                <span className="bg-[#001a66] text-white py-2">{item.year}</span>
                                                            </div>
                                                        </td>
                                                        <td className="p-8">
                                                            <p className="text-slate-700 font-bold leading-relaxed text-lg">{item.text}</p>
                                                        </td>
                                                    </>
                                                )}

                                                <td className="p-8 text-right w-64">
                                                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                        <button
                                                            onClick={() => handleOpenModal(item)}
                                                            className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(item.id, activeTab)}
                                                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </main>
            </div>

            {/* Modals remain the same but use shared styles */}
            {/* News Modal */}
            {showNewsModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Entry' : 'New Entry'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Fill in the details below.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveNews} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Category</label>
                                <select className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                                    value={newsFormData.category} onChange={(e) => setNewsFormData({ ...newsFormData, category: e.target.value })}>
                                    <option value="news">News & Announcements</option>
                                    <option value="events">Events Upcoming</option>
                                    <option value="achievements">Achievements</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Day</label>
                                    <input type="text" required placeholder="15th" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={newsFormData.day} onChange={(e) => setNewsFormData({ ...newsFormData, day: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Month</label>
                                    <input type="text" required placeholder="APRIL" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold uppercase"
                                        value={newsFormData.month} onChange={(e) => setNewsFormData({ ...newsFormData, month: e.target.value.toUpperCase() })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Year</label>
                                    <input type="text" required placeholder="2026" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={newsFormData.year} onChange={(e) => setNewsFormData({ ...newsFormData, year: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Announcement Content</label>
                                <textarea required rows="4" placeholder="Type your announcement here..." className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                                    value={newsFormData.text} onChange={(e) => setNewsFormData({ ...newsFormData, text: e.target.value })}></textarea>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">{isEditing ? 'Update Entry' : 'Create Entry'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Carousel Modal */}
            {showCarouselModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Carousel' : 'New Carousel'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Configure your event slide.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveCarousel} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Event Title</label>
                                <input type="text" required placeholder="e.g. Tech Symposium 2026" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={carouselFormData.title} onChange={(e) => setCarouselFormData({ ...carouselFormData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Date String</label>
                                    <input type="text" required placeholder="March 15, 2026" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={carouselFormData.date} onChange={(e) => setCarouselFormData({ ...carouselFormData, date: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Media Upload</label>
                                    <div className="relative group/file">
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setCarouselImageFile(e.target.files[0])} />
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-3 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                            <span className="text-xl">🖼️</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{carouselImageFile ? carouselImageFile.name : 'Choose Image'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                                <textarea required rows="3" placeholder="Brief event summary..." className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                                    value={carouselFormData.description} onChange={(e) => setCarouselFormData({ ...carouselFormData, description: e.target.value })}></textarea>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Carousel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Extra Curricular Modal */}
            {showExtraModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Activity' : 'New Activity'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Update campus life activities.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveExtra} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Activity Name</label>
                                <input type="text" required placeholder="e.g. Dance and Music" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={extraFormData.title} onChange={(e) => setExtraFormData({ ...extraFormData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Media Upload</label>
                                    <div className="relative group/file">
                                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setExtraImageFile(e.target.files[0])} />
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-3 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                            <span className="text-xl">🎨</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{extraImageFile ? extraImageFile.name : 'Choose Image'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Link Reference</label>
                                    <input type="text" placeholder="#" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={extraFormData.link} onChange={(e) => setExtraFormData({ ...extraFormData, link: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Activity Description</label>
                                <textarea required rows="3" placeholder="Describe the activity..." className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                                    value={extraFormData.description} onChange={(e) => setExtraFormData({ ...extraFormData, description: e.target.value })}></textarea>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Activity</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Document Modal */}
            {showDocModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Document' : 'New Document'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Upload and categorize academic PDFs.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveDoc} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Category</label>
                                <select className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                                    value={docFormData.category} onChange={(e) => setDocFormData({ ...docFormData, category: e.target.value })}>
                                    <option value="IIC 2026">IIC 2026</option>
                                    <option value="NIRF">NIRF</option>
                                    <option value="AISHE">AISHE</option>
                                    <option value="NAAC">NAAC</option>
                                    <option value="Mandatory Disclosure">Mandatory Disclosure</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Document Title</label>
                                <input type="text" required placeholder="e.g. Council Members List 2026" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={docFormData.title} onChange={(e) => setDocFormData({ ...docFormData, title: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">PDF Upload</label>
                                <div className="relative group/file">
                                    <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        onChange={(e) => setDocFile(e.target.files[0])} />
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-3">
                                        <span className="text-2xl">📄</span>
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{docFile ? docFile.name : 'Choose PDF File'}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Document</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

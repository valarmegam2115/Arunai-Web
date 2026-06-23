import React, { useState, useEffect } from 'react';
import { navigateTo } from '../utils/router';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('news');
    const [newsData, setNewsData] = useState([]);
    const [carouselEventsData, setCarouselEventsData] = useState([]);
    const [extraCurricularData, setExtraCurricularData] = useState([]);
    const [documentsData, setDocumentsData] = useState([]);
    const [academicCalendarData, setAcademicCalendarData] = useState([]);
    const [councilMembersData, setCouncilMembersData] = useState([]);
    const [councilMeetingsData, setCouncilMeetingsData] = useState([]);
    const [codeOfConductData, setCodeOfConductData] = useState([]);
    const [departmentsData, setDepartmentsData] = useState([]);
    const [selectedDeptSlug, setSelectedDeptSlug] = useState('');
    const [loading, setLoading] = useState(true);

    const [isEditing, setIsEditing] = useState(false);
    const [showNewsModal, setShowNewsModal] = useState(false);
    const [showCarouselModal, setShowCarouselModal] = useState(false);
    const [showExtraModal, setShowExtraModal] = useState(false);
    const [showDocModal, setShowDocModal] = useState(false);
    const [showCalendarModal, setShowCalendarModal] = useState(false);
    const [showCouncilMemberModal, setShowCouncilMemberModal] = useState(false);
    const [showCouncilMeetingModal, setShowCouncilMeetingModal] = useState(false);
    const [showConductModal, setShowConductModal] = useState(false);

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

    const [calendarFormData, setCalendarFormData] = useState({
        id: null, title: '', file_url: '#', display_order: 0
    });
    const [calendarFile, setCalendarFile] = useState(null);

    const [councilMemberFormData, setCouncilMemberFormData] = useState({
        id: null, sno: 0, name: '', designation: '', category: ''
    });

    const [councilMeetingFormData, setCouncilMeetingFormData] = useState({
        id: null, title: '', file_url: '#', display_order: 0
    });
    const [councilMeetingFile, setCouncilMeetingFile] = useState(null);

    const [conductFormData, setConductFormData] = useState({
        id: null, title: '', file_url: '#', display_order: 0
    });
    const [conductFile, setConductFile] = useState(null);

    const [showDeptModal, setShowDeptModal] = useState(false);
    const [deptFormData, setDeptFormData] = useState({
        id: null, dept_slug: '', dept_name: '', banner_image: '', courses: [], introduction: '', vision: '', mission: [], highlights: [], curriculum: [],
        peo_pso_po: [], faculty: [], infrastructure: [], advisory: [], activities: [], achievements: [], placements: [], alumni: []
    });
    const [deptBannerFile, setDeptBannerFile] = useState(null);
    const [newCourse, setNewCourse] = useState('');
    const [newMission, setNewMission] = useState('');
    const [newHighlight, setNewHighlight] = useState({ label: '', value: '' });
    const [newCurriculum, setNewCurriculum] = useState({ name: '', file_url: '#' });
    const [deptModalTab, setDeptModalTab] = useState('general');
    const [newPeo, setNewPeo] = useState({ type: 'PEO', code: '', statement: '' });
    const [newFaculty, setNewFaculty] = useState({ name: '', designation: '', qualification: '', specialization: '', image_url: '/default-avatar.png' });
    const [newInfra, setNewInfra] = useState({ name: '', description: '', image_url: '' });
    const [newAdvisory, setNewAdvisory] = useState({ name: '', designation: '', organization: '' });
    const [newActivity, setNewActivity] = useState({ title: '', date: '', description: '', image_url: '' });
    const [newAchievement, setNewAchievement] = useState({ title: '', description: '', image_url: '' });
    const [newPlacement, setNewPlacement] = useState({ academic_year: '', students_placed: '', average_salary: '', image_or_file: '' });
    const [newAlumni, setNewAlumni] = useState({ name: '', batch: '', designation: '', company: '', feedback: '' });

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
            const [resNews, resCarousel, resExtra, resDocs, resCal, resMembers, resMeetings, resConduct, resDepts] = await Promise.all([
                fetch('http://localhost:5000/api/news'),
                fetch('http://localhost:5000/api/our-events'),
                fetch('http://localhost:5000/api/extra-curricular'),
                fetch('http://localhost:5000/api/documents'),
                fetch('http://localhost:5000/api/academic-calendars'),
                fetch('http://localhost:5000/api/academic-council/members'),
                fetch('http://localhost:5000/api/academic-council/meetings'),
                fetch('http://localhost:5000/api/code-of-conduct'),
                fetch('http://localhost:5000/api/departments')
            ]);
            const [dataNews, dataCarousel, dataExtra, dataDocs, dataCal, dataMembers, dataMeetings, dataConduct, dataDepts] = await Promise.all([
                resNews.json(), resCarousel.json(), resExtra.json(), resDocs.json(), resCal.json(), resMembers.json(), resMeetings.json(), resConduct.json(), resDepts.json()
            ]);

            if (dataNews.success) setNewsData(dataNews.data);
            if (dataCarousel.success) setCarouselEventsData(dataCarousel.data);
            if (dataExtra.success) setExtraCurricularData(dataExtra.data);
            if (dataDocs.success) setDocumentsData(dataDocs.data);
            if (dataCal.success) setAcademicCalendarData(dataCal.data);
            if (dataMembers.success) setCouncilMembersData(dataMembers.data);
            if (dataMeetings.success) setCouncilMeetingsData(dataMeetings.data);
            if (dataConduct.success) setCodeOfConductData(dataConduct.data);
            if (dataDepts.success) {
                setDepartmentsData(dataDepts.data);
                if (!selectedDeptSlug && dataDepts.data.length > 0) {
                    setSelectedDeptSlug(dataDepts.data[0].dept_slug);
                }
            }
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
        } else if (activeTab === 'academic_calendar') {
            if (item) {
                setCalendarFormData(item);
            } else {
                setCalendarFormData({ id: null, title: '', file_url: '#', display_order: 0 });
            }
            setCalendarFile(null);
            setShowCalendarModal(true);
        } else if (activeTab === 'council_members') {
            if (item) {
                setCouncilMemberFormData(item);
            } else {
                setCouncilMemberFormData({ id: null, sno: councilMembersData.length + 1, name: '', designation: '', category: '' });
            }
            setShowCouncilMemberModal(true);
        } else if (activeTab === 'council_meetings') {
            if (item) {
                setCouncilMeetingFormData(item);
            } else {
                setCouncilMeetingFormData({ id: null, title: '', file_url: '#', display_order: 0 });
            }
            setCouncilMeetingFile(null);
            setShowCouncilMeetingModal(true);
        } else if (activeTab === 'code_of_conduct') {
            if (item) {
                setConductFormData(item);
            } else {
                setConductFormData({ id: null, title: '', file_url: '#', display_order: 0 });
            }
            setConductFile(null);
            setShowConductModal(true);
        } else if (activeTab === 'departments') {
            if (item) {
                setDeptFormData({ 
                    ...item, 
                    courses: item.courses || [], 
                    mission: item.mission || [], 
                    highlights: item.highlights || [], 
                    curriculum: item.curriculum || [],
                    peo_pso_po: item.peo_pso_po || [],
                    faculty: item.faculty || [],
                    infrastructure: item.infrastructure || [],
                    advisory: item.advisory || [],
                    activities: item.activities || [],
                    achievements: item.achievements || [],
                    placements: item.placements || [],
                    alumni: item.alumni || []
                });
            } else {
                setDeptFormData({ 
                    id: null, dept_slug: '', dept_name: '', banner_image: '', courses: [], introduction: '', vision: '', mission: [], highlights: [], curriculum: [],
                    peo_pso_po: [], faculty: [], infrastructure: [], advisory: [], activities: [], achievements: [], placements: [], alumni: []
                });
            }
            setDeptBannerFile(null);
            setNewCourse('');
            setNewMission('');
            setNewHighlight({ label: '', value: '' });
            setNewCurriculum({ name: '', file_url: '#' });
            setNewPeo({ type: 'PEO', code: '', statement: '' });
            setNewFaculty({ name: '', designation: '', qualification: '', specialization: '', image_url: '/default-avatar.png' });
            setNewInfra({ name: '', description: '', image_url: '' });
            setNewAdvisory({ name: '', designation: '', organization: '' });
            setNewActivity({ title: '', date: '', description: '', image_url: '' });
            setNewAchievement({ title: '', description: '', image_url: '' });
            setNewPlacement({ academic_year: '', students_placed: '', average_salary: '', image_or_file: '' });
            setNewAlumni({ name: '', batch: '', designation: '', company: '', feedback: '' });
            setDeptModalTab('general');
            setShowDeptModal(true);
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
        setShowCalendarModal(false);
        setShowCouncilMemberModal(false);
        setShowCouncilMeetingModal(false);
        setShowConductModal(false);
        setShowDeptModal(false);
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

    const handleSaveCalendar = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let fileUrl = calendarFormData.file_url;

        try {
            if (calendarFile) {
                const uploadData = new FormData();
                uploadData.append('file', calendarFile);

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

            const url = isEditing ? `http://localhost:5000/api/academic-calendars/${calendarFormData.id}` : 'http://localhost:5000/api/academic-calendars';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...calendarFormData, file_url: fileUrl };

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
                alert(data.message || 'Error saving academic calendar');
            }
        } catch (err) {
            console.error('Error saving academic calendar:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleSaveCouncilMember = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        const url = isEditing ? `http://localhost:5000/api/academic-council/members/${councilMemberFormData.id}` : 'http://localhost:5000/api/academic-council/members';
        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(councilMemberFormData)
            });
            const data = await res.json();
            if (data.success) {
                fetchAllData();
                handleCloseModal();
            } else {
                alert(data.message || 'Error saving member');
            }
        } catch (err) {
            console.error('Error saving member:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleSaveCouncilMeeting = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let fileUrl = councilMeetingFormData.file_url;

        try {
            if (councilMeetingFile) {
                const uploadData = new FormData();
                uploadData.append('file', councilMeetingFile);

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

            const url = isEditing ? `http://localhost:5000/api/academic-council/meetings/${councilMeetingFormData.id}` : 'http://localhost:5000/api/academic-council/meetings';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...councilMeetingFormData, file_url: fileUrl };

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
                alert(data.message || 'Error saving meeting');
            }
        } catch (err) {
            console.error('Error saving meeting:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleSaveConduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let fileUrl = conductFormData.file_url;

        try {
            if (conductFile) {
                const uploadData = new FormData();
                uploadData.append('file', conductFile);

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

            const url = isEditing ? `http://localhost:5000/api/code-of-conduct/${conductFormData.id}` : 'http://localhost:5000/api/code-of-conduct';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...conductFormData, file_url: fileUrl };

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
                alert(data.message || 'Error saving entry');
            }
        } catch (err) {
            console.error('Error saving entry:', err);
            alert('Failed to connect to the server.');
        }
    };

    const handleSaveDept = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        let bannerUrl = deptFormData.banner_image;

        try {
            if (deptBannerFile) {
                const uploadData = new FormData();
                uploadData.append('file', deptBannerFile);
                const uploadRes = await fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    headers: { 'Authorization': `Bearer ${token}` },
                    body: uploadData
                });
                const uploadJson = await uploadRes.json();
                if (uploadJson.success) {
                    bannerUrl = uploadJson.data.url;
                } else {
                    alert(uploadJson.message || 'Error uploading banner image');
                    return;
                }
            }

            const url = isEditing ? `http://localhost:5000/api/departments/${deptFormData.id}` : 'http://localhost:5000/api/departments';
            const method = isEditing ? 'PUT' : 'POST';
            const payload = { ...deptFormData, banner_image: bannerUrl };

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
                alert(data.message || 'Error saving department');
            }
        } catch (err) {
            console.error('Error saving department:', err);
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
        else if (type === 'academic_calendar') endpoint = 'academic-calendars';
        else if (type === 'council_members') endpoint = 'academic-council/members';
        else if (type === 'council_meetings') endpoint = 'academic-council/meetings';
        else if (type === 'code_of_conduct') endpoint = 'code-of-conduct';
        else if (type === 'departments') endpoint = 'departments';

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
        if (activeTab === 'academic_calendar') return academicCalendarData;
        if (activeTab === 'council_members') return councilMembersData;
        if (activeTab === 'council_meetings') return councilMeetingsData;
        if (activeTab === 'code_of_conduct') return codeOfConductData;
        if (activeTab === 'departments') return departmentsData;
        return newsData.filter(item => item.category === activeTab);
    };

    const activeData = getActiveData();

    const menuItems = [
        { id: 'news', label: 'News', icon: '📰' },
        { id: 'events', label: 'Events', icon: '📅' },
        { id: 'achievements', label: 'Achievements', icon: '🏆' },
        { id: 'carousel_events', label: 'Carousel', icon: '🎢' },
        { id: 'extra_curricular', label: 'Extra-Curricular', icon: '🎨' },
        { id: 'documents', label: 'Documents', icon: '📄' },
        { id: 'academic_calendar', label: 'Academic Calendar', icon: '📅' },
        { id: 'council_members', label: 'Council Members', icon: '👥' },
        { id: 'council_meetings', label: 'Council Meetings', icon: '🗓️' },
        { id: 'code_of_conduct', label: 'Code of Conduct', icon: '📜' },
        { id: 'departments', label: 'Departments', icon: '🏛️' }
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

                    {/* Department Inline Editor */}
                    {activeTab === 'departments' && (() => {
                        const selectedDept = departmentsData.find(d => d.dept_slug === selectedDeptSlug);
                        return (
                            <div className="space-y-8 mb-10">
                                {/* Department Dropdown */}
                                <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Select Department</label>
                                    <select
                                        className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 text-lg appearance-none cursor-pointer"
                                        value={selectedDeptSlug}
                                        onChange={(e) => setSelectedDeptSlug(e.target.value)}
                                    >
                                        {departmentsData.map(d => (
                                            <option key={d.dept_slug} value={d.dept_slug}>{d.dept_name}</option>
                                        ))}
                                    </select>
                                </div>

                                {selectedDept && (
                                    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm p-8 space-y-6">
                                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                                            <h3 className="text-xl font-black text-slate-900">📝 Edit: {selectedDept.dept_name}</h3>
                                            <div className="flex gap-3">
                                                <button onClick={() => handleOpenModal(selectedDept)} className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all">Edit Full Details</button>
                                                <button onClick={() => handleDelete(selectedDept.id, 'departments')} className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all">Delete</button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Slug</p><p className="font-bold text-slate-700">{selectedDept.dept_slug}</p></div>
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Banner</p><p className="font-bold text-slate-700 truncate">{selectedDept.banner_image || '—'}</p></div>
                                        </div>

                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Courses ({(selectedDept.courses || []).length})</p>
                                            <div className="flex flex-wrap gap-2">{(selectedDept.courses || []).map((c, i) => (
                                                <span key={i} className="bg-[#0d2060] text-white px-4 py-2 rounded-lg text-sm font-semibold">{c}</span>
                                            ))}{(selectedDept.courses || []).length === 0 && <span className="text-slate-400 text-sm italic">No courses added</span>}</div>
                                        </div>

                                        <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Introduction</p>
                                            <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{selectedDept.introduction || <span className="italic text-slate-400">Not set</span>}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Vision</p>
                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{selectedDept.vision || <span className="italic text-slate-400">Not set</span>}</p>
                                            </div>
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Mission ({(selectedDept.mission || []).length} items)</p>
                                                <ul className="space-y-1">{(selectedDept.mission || []).map((m, i) => (
                                                    <li key={i} className="text-slate-600 text-sm flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>{m}</li>
                                                ))}</ul>
                                            </div>
                                        </div>

                                        {(selectedDept.highlights || []).length > 0 && (
                                            <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Highlights</p>
                                                <div className="grid grid-cols-3 gap-3">{selectedDept.highlights.map((h, i) => (
                                                    <div key={i} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase">{h.label}</p>
                                                        <p className="text-lg font-black text-slate-800">{h.value}</p>
                                                    </div>
                                                ))}</div>
                                            </div>
                                        )}

                                        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Academic Sections</p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Curriculum & Syllabus</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.curriculum || []).length} items</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">PEO's, PSO's & PO's</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.peo_pso_po || []).length} items</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Faculty Members</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.faculty || []).length} profiles</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Infrastructure & Labs</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.infrastructure || []).length} labs</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Department Life & Outcomes</p>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Advisory Committee</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.advisory || []).length} members</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Activities & Events</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.activities || []).length} events</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Student Achievements</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.achievements || []).length} items</span>
                                                    </div>
                                                    <div className="flex justify-between items-center bg-slate-50 p-2 rounded-lg text-xs font-bold">
                                                        <span className="text-slate-500">Placements / Alumni</span>
                                                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded">{(selectedDept.placements || []).length} yrs / {(selectedDept.alumni || []).length} feedback</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })()}

                    {/* Data List Container */}
                    {activeTab !== 'departments' && <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 overflow-hidden">
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
                                            {activeTab === 'council_members' ? (
                                                <>
                                                    <th className="p-8 w-20">S.No</th>
                                                    <th className="p-8">Name</th>
                                                    <th className="p-8">Designation</th>
                                                    <th className="p-8">Category</th>
                                                    <th className="p-8 text-right">Actions</th>
                                                </>
                                            ) : activeTab === 'carousel_events' || activeTab === 'extra_curricular' || activeTab === 'documents' || activeTab === 'academic_calendar' || activeTab === 'council_meetings' || activeTab === 'code_of_conduct' ? (
                                                <>
                                                    <th className="p-8">{activeTab === 'documents' ? 'Category' : activeTab === 'academic_calendar' || activeTab === 'council_meetings' || activeTab === 'code_of_conduct' ? 'Order' : 'Preview'}</th>
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
                                                {activeTab === 'council_members' ? (
                                                    <>
                                                        <td className="p-8 w-20 text-center font-black text-slate-700">{item.sno}</td>
                                                        <td className="p-8">
                                                            <h5 className="font-black text-lg text-slate-900 group-hover:text-blue-700 transition-colors">{item.name}</h5>
                                                        </td>
                                                        <td className="p-8">
                                                            <p className="text-slate-600 text-sm font-medium leading-relaxed">{item.designation}</p>
                                                        </td>
                                                        <td className="p-8">
                                                            <span className="bg-purple-50 text-purple-700 px-3 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-widest border border-purple-200">
                                                                {item.category}
                                                            </span>
                                                        </td>
                                                    </>
                                                ) : activeTab === 'carousel_events' || activeTab === 'extra_curricular' || activeTab === 'documents' || activeTab === 'academic_calendar' || activeTab === 'council_meetings' || activeTab === 'code_of_conduct' ? (
                                                    <>
                                                        <td className="p-8 w-56">
                                                            {activeTab === 'academic_calendar' || activeTab === 'council_meetings' || activeTab === 'code_of_conduct' ? (
                                                                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest border border-blue-200">
                                                                    #{item.display_order}
                                                                </span>
                                                            ) : activeTab === 'documents' ? (
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
                    </div>}
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
            {/* Academic Calendar Modal */}
            {showCalendarModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Calendar' : 'New Calendar Entry'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Upload academic calendar PDFs.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveCalendar} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Calendar Title</label>
                                <input type="text" required placeholder="e.g. Even Semester Academic Calendar 2025 – 2026" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={calendarFormData.title} onChange={(e) => setCalendarFormData({ ...calendarFormData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Display Order</label>
                                    <input type="number" min="0" placeholder="0" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={calendarFormData.display_order} onChange={(e) => setCalendarFormData({ ...calendarFormData, display_order: parseInt(e.target.value) || 0 })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">PDF Upload</label>
                                    <div className="relative group/file">
                                        <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setCalendarFile(e.target.files[0])} />
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-3 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                            <span className="text-xl">📄</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{calendarFile ? calendarFile.name : 'Choose PDF'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Calendar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Council Member Modal */}
            {showCouncilMemberModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Member' : 'New Member'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Academic council member details.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveCouncilMember} className="p-8 space-y-6">
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">S.No</label>
                                    <input type="number" min="1" required className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={councilMemberFormData.sno} onChange={(e) => setCouncilMemberFormData({ ...councilMemberFormData, sno: parseInt(e.target.value) || 0 })} />
                                </div>
                                <div className="col-span-3">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Name</label>
                                    <input type="text" required placeholder="e.g. Dr. C. Elanchezhian" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={councilMemberFormData.name} onChange={(e) => setCouncilMemberFormData({ ...councilMemberFormData, name: e.target.value })} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Designation / Details</label>
                                <textarea required rows="3" placeholder="e.g. Professor, Dept. of CSE" className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none"
                                    value={councilMemberFormData.designation} onChange={(e) => setCouncilMemberFormData({ ...councilMemberFormData, designation: e.target.value })}></textarea>
                            </div>
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Category</label>
                                <input type="text" required placeholder="e.g. University Nominee, Head of the Department" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={councilMemberFormData.category} onChange={(e) => setCouncilMemberFormData({ ...councilMemberFormData, category: e.target.value })} />
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Member</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Council Meeting Modal */}
            {showCouncilMeetingModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Meeting' : 'New Meeting'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Upload council meeting minutes PDF.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveCouncilMeeting} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Meeting Title</label>
                                <input type="text" required placeholder="e.g. Academic Council Meeting – 1" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={councilMeetingFormData.title} onChange={(e) => setCouncilMeetingFormData({ ...councilMeetingFormData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Display Order</label>
                                    <input type="number" min="0" placeholder="0" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={councilMeetingFormData.display_order} onChange={(e) => setCouncilMeetingFormData({ ...councilMeetingFormData, display_order: parseInt(e.target.value) || 0 })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">PDF Upload</label>
                                    <div className="relative group/file">
                                        <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setCouncilMeetingFile(e.target.files[0])} />
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-3 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                            <span className="text-xl">📄</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{councilMeetingFile ? councilMeetingFile.name : 'Choose PDF'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Meeting</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {/* Code of Conduct Modal */}
            {showConductModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Conduct' : 'New Conduct Document'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Upload Code of Conduct PDF.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSaveConduct} className="p-8 space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Title</label>
                                <input type="text" required placeholder="e.g. Student Code Book" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                    value={conductFormData.title} onChange={(e) => setConductFormData({ ...conductFormData, title: e.target.value })} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Display Order</label>
                                    <input type="number" min="0" placeholder="0" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                        value={conductFormData.display_order} onChange={(e) => setConductFormData({ ...conductFormData, display_order: parseInt(e.target.value) || 0 })} />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">PDF Upload</label>
                                    <div className="relative group/file">
                                        <input type="file" accept=".pdf" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            onChange={(e) => setConductFile(e.target.files[0])} />
                                        <div className="border-2 border-dashed border-slate-200 rounded-2xl p-3 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                            <span className="text-xl">📄</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{conductFile ? conductFile.name : 'Choose PDF'}</span>
                                        </div>
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
            {/* Department Modal */}
            {showDeptModal && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 flex-shrink-0">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900">{isEditing ? 'Edit Department' : 'New Department'}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">Configure department page content.</p>
                            </div>
                            <button onClick={handleCloseModal} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-2xl transition-colors">&times;</button>
                        </div>
                        {/* Tab Selector */}
                        <div className="flex bg-slate-50 border-b border-slate-100 p-2 overflow-x-auto gap-2 flex-shrink-0 no-scrollbar">
                            {[
                                { id: 'general', label: 'General' },
                                { id: 'curriculum', label: 'Curriculum' },
                                { id: 'peos', label: "PEOs/PSOs/POs" },
                                { id: 'faculty', label: 'Faculty' },
                                { id: 'infrastructure', label: 'Infrastructure' },
                                { id: 'advisory', label: 'Advisory' },
                                { id: 'activities_achievements', label: 'Activities/Achievements' },
                                { id: 'placements_alumni', label: 'Placements/Alumni' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setDeptModalTab(tab.id)}
                                    className={`px-4 py-2 text-xs font-black uppercase tracking-wider rounded-xl transition-all flex-shrink-0 ${
                                        deptModalTab === tab.id
                                            ? 'bg-[#001a66] text-white shadow-md'
                                            : 'text-slate-500 hover:bg-slate-200'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                        <form onSubmit={handleSaveDept} className="p-8 space-y-5 overflow-y-auto flex-1">
                            {deptModalTab === 'general' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Slug</label>
                                            <input type="text" required placeholder="e.g. cse" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                                value={deptFormData.dept_slug} onChange={(e) => setDeptFormData({ ...deptFormData, dept_slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })} />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Department Name</label>
                                            <input type="text" required placeholder="e.g. Computer Science & Engineering" className="w-full border-2 border-slate-100 rounded-2xl p-3.5 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold"
                                                value={deptFormData.dept_name} onChange={(e) => setDeptFormData({ ...deptFormData, dept_name: e.target.value })} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Banner Image</label>
                                        <div className="relative group/file">
                                            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                                onChange={(e) => setDeptBannerFile(e.target.files[0])} />
                                            <div className="border-2 border-dashed border-slate-200 rounded-2xl p-3 bg-slate-50 group-hover/file:border-blue-400 group-hover/file:bg-blue-50 transition-all flex items-center justify-center gap-2">
                                                <span className="text-xl">🖼️</span>
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{deptBannerFile ? deptBannerFile.name : (deptFormData.banner_image || 'Choose Image')}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Courses */}
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Courses Offered</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {(deptFormData.courses || []).map((c, i) => (
                                                <span key={i} className="bg-[#0d2060] text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2">
                                                    {c}
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, courses: deptFormData.courses.filter((_, idx) => idx !== i) })} className="text-white/60 hover:text-white">&times;</button>
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="e.g. UG – B.E. CSE" className="flex-1 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 focus:border-blue-500 outline-none text-sm font-bold"
                                                value={newCourse} onChange={(e) => setNewCourse(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (newCourse.trim()) { setDeptFormData({ ...deptFormData, courses: [...(deptFormData.courses || []), newCourse.trim()] }); setNewCourse(''); } } }} />
                                            <button type="button" onClick={() => { if (newCourse.trim()) { setDeptFormData({ ...deptFormData, courses: [...(deptFormData.courses || []), newCourse.trim()] }); setNewCourse(''); } }} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs hover:bg-blue-100">Add</button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Introduction</label>
                                        <textarea rows="3" placeholder="Department introduction..." className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none text-sm"
                                            value={deptFormData.introduction || ''} onChange={(e) => setDeptFormData({ ...deptFormData, introduction: e.target.value })}></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Vision</label>
                                        <textarea rows="2" placeholder="Department vision..." className="w-full border-2 border-slate-100 rounded-2xl p-4 bg-slate-50 focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700 resize-none text-sm"
                                            value={deptFormData.vision || ''} onChange={(e) => setDeptFormData({ ...deptFormData, vision: e.target.value })}></textarea>
                                    </div>
                                    {/* Mission */}
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Mission Points</label>
                                        <ul className="space-y-1 mb-2">
                                            {(deptFormData.mission || []).map((m, i) => (
                                                <li key={i} className="flex items-center gap-2 bg-slate-50 rounded-lg px-3 py-2 text-sm">
                                                    <span className="flex-1 font-medium text-slate-700">{m}</span>
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, mission: deptFormData.mission.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold">&times;</button>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Add mission point" className="flex-1 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 focus:border-blue-500 outline-none text-sm font-bold"
                                                value={newMission} onChange={(e) => setNewMission(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); if (newMission.trim()) { setDeptFormData({ ...deptFormData, mission: [...(deptFormData.mission || []), newMission.trim()] }); setNewMission(''); } } }} />
                                            <button type="button" onClick={() => { if (newMission.trim()) { setDeptFormData({ ...deptFormData, mission: [...(deptFormData.mission || []), newMission.trim()] }); setNewMission(''); } }} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs hover:bg-blue-100">Add</button>
                                        </div>
                                    </div>
                                    {/* Highlights */}
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Highlights</label>
                                        <div className="grid grid-cols-3 gap-2 mb-2">
                                            {(deptFormData.highlights || []).map((h, i) => (
                                                <div key={i} className="bg-slate-50 rounded-lg p-2 text-sm border border-slate-100 flex items-center justify-between">
                                                    <div><p className="text-[9px] font-bold text-slate-400 uppercase">{h.label}</p><p className="font-black text-slate-700">{h.value}</p></div>
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, highlights: deptFormData.highlights.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-lg">&times;</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Label" className="w-1/3 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 focus:border-blue-500 outline-none text-sm font-bold"
                                                value={newHighlight.label} onChange={(e) => setNewHighlight({ ...newHighlight, label: e.target.value })} />
                                            <input type="text" placeholder="Value" className="w-1/3 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 focus:border-blue-500 outline-none text-sm font-bold"
                                                value={newHighlight.value} onChange={(e) => setNewHighlight({ ...newHighlight, value: e.target.value })} />
                                            <button type="button" onClick={() => { if (newHighlight.label.trim() && newHighlight.value.trim()) { setDeptFormData({ ...deptFormData, highlights: [...(deptFormData.highlights || []), { ...newHighlight }] }); setNewHighlight({ label: '', value: '' }); } }} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs hover:bg-blue-100">Add</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'curriculum' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Curriculum & Syllabus Regulations</label>
                                    <div className="grid grid-cols-2 gap-2 mb-2">
                                        {(deptFormData.curriculum || []).map((c, i) => (
                                            <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100 flex items-center justify-between">
                                                <div className="min-w-0 flex-1 pr-2">
                                                    <p className="font-black text-slate-700 truncate">{c.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 truncate">{c.file_url}</p>
                                                </div>
                                                <button type="button" onClick={() => setDeptFormData({ ...deptFormData, curriculum: deptFormData.curriculum.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-lg flex-shrink-0">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <input type="text" placeholder="Regulation Name (e.g. Regulation-2024)" className="w-1/2 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 focus:border-blue-500 outline-none text-sm font-bold"
                                            value={newCurriculum.name} onChange={(e) => setNewCurriculum({ ...newCurriculum, name: e.target.value })} />
                                        <input type="text" placeholder="PDF Link (e.g. #)" className="w-1/2 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 focus:border-blue-500 outline-none text-sm font-bold"
                                            value={newCurriculum.file_url} onChange={(e) => setNewCurriculum({ ...newCurriculum, file_url: e.target.value })} />
                                        <button type="button" onClick={() => { if (newCurriculum.name.trim()) { setDeptFormData({ ...deptFormData, curriculum: [...(deptFormData.curriculum || []), { name: newCurriculum.name.trim(), file_url: newCurriculum.file_url.trim() || '#' }] }); setNewCurriculum({ name: '', file_url: '#' }); } }} className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl font-black text-xs hover:bg-blue-100 flex-shrink-0 font-bold">Add</button>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'peos' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">PEO's, PSO's & PO's</label>
                                    <div className="space-y-2 mb-2 max-h-[250px] overflow-y-auto">
                                        {(deptFormData.peo_pso_po || []).map((p, i) => (
                                            <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100 flex items-start justify-between">
                                                <div className="flex-1 pr-2">
                                                    <span className="inline-block bg-blue-100 text-blue-800 text-[10px] font-black uppercase px-2 py-0.5 rounded mr-2">{p.type}</span>
                                                    <span className="font-extrabold text-[#001a66]">{p.code}</span>
                                                    <p className="mt-1 text-slate-600 font-medium text-xs">{p.statement}</p>
                                                </div>
                                                <button type="button" onClick={() => setDeptFormData({ ...deptFormData, peo_pso_po: deptFormData.peo_pso_po.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-lg flex-shrink-0">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="flex gap-2">
                                            <select className="w-1/3 border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newPeo.type} onChange={(e) => setNewPeo({ ...newPeo, type: e.target.value })}>
                                                <option value="PEO">PEO</option>
                                                <option value="PSO">PSO</option>
                                                <option value="PO">PO</option>
                                            </select>
                                            <input type="text" placeholder="Code (e.g. PEO-1)" className="w-2/3 border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newPeo.code} onChange={(e) => setNewPeo({ ...newPeo, code: e.target.value })} />
                                        </div>
                                        <textarea placeholder="Statement description..." className="w-full border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold resize-none outline-none" rows="2"
                                            value={newPeo.statement} onChange={(e) => setNewPeo({ ...newPeo, statement: e.target.value })} />
                                        <button type="button" onClick={() => { if (newPeo.code.trim() && newPeo.statement.trim()) { setDeptFormData({ ...deptFormData, peo_pso_po: [...(deptFormData.peo_pso_po || []), { ...newPeo }] }); setNewPeo({ type: newPeo.type, code: '', statement: '' }); } }} className="bg-[#001a66] text-white py-2.5 rounded-xl font-black text-xs hover:bg-[#0b2a8a] mt-1">Add PEO/PSO/PO</button>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'faculty' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Faculty Members</label>
                                    <div className="grid grid-cols-2 gap-2 mb-2 max-h-[250px] overflow-y-auto">
                                        {(deptFormData.faculty || []).map((f, i) => (
                                            <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100 flex items-center justify-between">
                                                <div className="flex items-center gap-2 min-w-0">
                                                    <span className="text-xl flex-shrink-0">🧑‍🏫</span>
                                                    <div className="min-w-0">
                                                        <p className="font-black text-slate-700 truncate">{f.name}</p>
                                                        <p className="text-[9px] font-bold text-slate-400 truncate">{f.designation}</p>
                                                    </div>
                                                </div>
                                                <button type="button" onClick={() => setDeptFormData({ ...deptFormData, faculty: deptFormData.faculty.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-lg flex-shrink-0">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="text" placeholder="Name (e.g. Dr. A. Kumar)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newFaculty.name} onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })} />
                                            <input type="text" placeholder="Designation (e.g. Professor)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newFaculty.designation} onChange={(e) => setNewFaculty({ ...newFaculty, designation: e.target.value })} />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="text" placeholder="Qualification (e.g. M.E., Ph.D.)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newFaculty.qualification} onChange={(e) => setNewFaculty({ ...newFaculty, qualification: e.target.value })} />
                                            <input type="text" placeholder="Specialization (e.g. AI)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newFaculty.specialization} onChange={(e) => setNewFaculty({ ...newFaculty, specialization: e.target.value })} />
                                        </div>
                                        <input type="text" placeholder="Image URL (leave empty for default)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-xs font-bold outline-none"
                                            value={newFaculty.image_url === '/default-avatar.png' ? '' : newFaculty.image_url} onChange={(e) => setNewFaculty({ ...newFaculty, image_url: e.target.value || '/default-avatar.png' })} />
                                        <button type="button" onClick={() => { if (newFaculty.name.trim() && newFaculty.designation.trim()) { setDeptFormData({ ...deptFormData, faculty: [...(deptFormData.faculty || []), { ...newFaculty }] }); setNewFaculty({ name: '', designation: '', qualification: '', specialization: '', image_url: '/default-avatar.png' }); } }} className="bg-[#001a66] text-white py-2.5 rounded-xl font-black text-xs hover:bg-[#0b2a8a] mt-1">Add Faculty Member</button>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'infrastructure' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Infrastructure & Lab Facilities</label>
                                    <div className="space-y-2 mb-2 max-h-[250px] overflow-y-auto">
                                        {(deptFormData.infrastructure || []).map((inf, i) => (
                                            <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100 flex items-start justify-between">
                                                <div className="min-w-0 pr-2">
                                                    <p className="font-black text-slate-700">{inf.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-500 mt-0.5">{inf.description}</p>
                                                </div>
                                                <button type="button" onClick={() => setDeptFormData({ ...deptFormData, infrastructure: deptFormData.infrastructure.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-lg flex-shrink-0">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <input type="text" placeholder="Lab Name (e.g. Advanced Computing Lab)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                            value={newInfra.name} onChange={(e) => setNewInfra({ ...newInfra, name: e.target.value })} />
                                        <textarea placeholder="Lab Description / Major Equipment / Configuration..." className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-xs font-bold resize-none outline-none" rows="2"
                                            value={newInfra.description} onChange={(e) => setNewInfra({ ...newInfra, description: e.target.value })} />
                                        <input type="text" placeholder="Photo URL (optional)" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-xs font-bold outline-none"
                                            value={newInfra.image_url} onChange={(e) => setNewInfra({ ...newInfra, image_url: e.target.value })} />
                                        <button type="button" onClick={() => { if (newInfra.name.trim()) { setDeptFormData({ ...deptFormData, infrastructure: [...(deptFormData.infrastructure || []), { ...newInfra }] }); setNewInfra({ name: '', description: '', image_url: '' }); } }} className="bg-[#001a66] text-white py-2.5 rounded-xl font-black text-xs hover:bg-[#0b2a8a] mt-1">Add Facility</button>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'advisory' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Advisory Committee</label>
                                    <div className="grid grid-cols-2 gap-2 mb-2 max-h-[250px] overflow-y-auto">
                                        {(deptFormData.advisory || []).map((a, i) => (
                                            <div key={i} className="bg-slate-50 rounded-lg p-3 text-sm border border-slate-100 flex items-center justify-between">
                                                <div className="min-w-0 pr-2">
                                                    <p className="font-black text-slate-700 truncate">{a.name}</p>
                                                    <p className="text-[9px] font-bold text-slate-400 truncate">{a.designation} at {a.organization}</p>
                                                </div>
                                                <button type="button" onClick={() => setDeptFormData({ ...deptFormData, advisory: deptFormData.advisory.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-lg flex-shrink-0">&times;</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <input type="text" placeholder="Member Name" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                            value={newAdvisory.name} onChange={(e) => setNewAdvisory({ ...newAdvisory, name: e.target.value })} />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input type="text" placeholder="Designation" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newAdvisory.designation} onChange={(e) => setNewAdvisory({ ...newAdvisory, designation: e.target.value })} />
                                            <input type="text" placeholder="Organization / Affiliation" className="border-2 border-slate-100 rounded-xl p-2.5 bg-white text-sm font-bold outline-none"
                                                value={newAdvisory.organization} onChange={(e) => setNewAdvisory({ ...newAdvisory, organization: e.target.value })} />
                                        </div>
                                        <button type="button" onClick={() => { if (newAdvisory.name.trim()) { setDeptFormData({ ...deptFormData, advisory: [...(deptFormData.advisory || []), { ...newAdvisory }] }); setNewAdvisory({ name: '', designation: '', organization: '' }); } }} className="bg-[#001a66] text-white py-2.5 rounded-xl font-black text-xs hover:bg-[#0b2a8a] mt-1">Add Member</button>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'activities_achievements' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Department Activities</label>
                                        <div className="space-y-2 mb-2 max-h-[150px] overflow-y-auto">
                                            {(deptFormData.activities || []).map((act, i) => (
                                                <div key={i} className="bg-slate-50 rounded-lg p-2.5 text-xs border border-slate-100 flex items-center justify-between">
                                                    <div className="min-w-0 pr-2">
                                                        <span className="font-extrabold text-slate-700 truncate block">{act.title}</span>
                                                        <span className="text-[9px] text-slate-400 font-bold">{act.date}</span>
                                                    </div>
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, activities: deptFormData.activities.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-base flex-shrink-0">&times;</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="grid grid-cols-2 gap-2">
                                                <input type="text" placeholder="Activity Title" className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold outline-none"
                                                    value={newActivity.title} onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })} />
                                                <input type="text" placeholder="Date (e.g. 15th March 2026)" className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold outline-none"
                                                    value={newActivity.date} onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })} />
                                            </div>
                                            <textarea placeholder="Description..." className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold resize-none outline-none" rows="1"
                                                value={newActivity.description} onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })} />
                                            <button type="button" onClick={() => { if (newActivity.title.trim()) { setDeptFormData({ ...deptFormData, activities: [...(deptFormData.activities || []), { ...newActivity }] }); setNewActivity({ title: '', date: '', description: '', image_url: '' }); } }} className="bg-[#001a66] text-white py-1.5 rounded-lg font-black text-[10px] hover:bg-[#0b2a8a]">Add Activity</button>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100">
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Student Achievements</label>
                                        <div className="space-y-2 mb-2 max-h-[150px] overflow-y-auto">
                                            {(deptFormData.achievements || []).map((ach, i) => (
                                                <div key={i} className="bg-slate-50 rounded-lg p-2.5 text-xs border border-slate-100 flex items-center justify-between">
                                                    <p className="font-extrabold text-slate-700 truncate flex-1 pr-2">{ach.title} - <span className="font-medium text-slate-500 text-[10px]">{ach.description}</span></p>
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, achievements: deptFormData.achievements.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-base flex-shrink-0">&times;</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Achievement (e.g. First Prize)" className="w-1/2 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 text-xs font-bold outline-none"
                                                value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })} />
                                            <input type="text" placeholder="Details/Student Name" className="w-1/2 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 text-xs font-bold outline-none"
                                                value={newAchievement.description} onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })} />
                                            <button type="button" onClick={() => { if (newAchievement.title.trim()) { setDeptFormData({ ...deptFormData, achievements: [...(deptFormData.achievements || []), { ...newAchievement }] }); setNewAchievement({ title: '', description: '', image_url: '' }); } }} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-xl font-black text-xs hover:bg-blue-100 flex-shrink-0">Add</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {deptModalTab === 'placements_alumni' && (
                                <div className="space-y-5 animate-in fade-in duration-200">
                                    <div>
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Placement Records</label>
                                        <div className="grid grid-cols-2 gap-2 mb-2">
                                            {(deptFormData.placements || []).map((pl, i) => (
                                                <div key={i} className="bg-slate-50 rounded-lg p-2.5 text-xs border border-slate-100 flex items-center justify-between">
                                                    <div>
                                                        <span className="font-extrabold text-slate-700">{pl.academic_year}</span>
                                                        <p className="text-[9px] font-bold text-slate-400">{pl.students_placed} Placed | Avg: {pl.average_salary}</p>
                                                    </div>
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, placements: deptFormData.placements.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-base flex-shrink-0">&times;</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <input type="text" placeholder="Year (e.g. 2024-25)" className="w-1/4 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 text-xs font-bold outline-none"
                                                value={newPlacement.academic_year} onChange={(e) => setNewPlacement({ ...newPlacement, academic_year: e.target.value })} />
                                            <input type="text" placeholder="No. Placed" className="w-1/4 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 text-xs font-bold outline-none"
                                                value={newPlacement.students_placed} onChange={(e) => setNewPlacement({ ...newPlacement, students_placed: e.target.value })} />
                                            <input type="text" placeholder="Avg Salary" className="w-1/4 border-2 border-slate-100 rounded-xl p-2.5 bg-slate-50 text-xs font-bold outline-none"
                                                value={newPlacement.average_salary} onChange={(e) => setNewPlacement({ ...newPlacement, average_salary: e.target.value })} />
                                            <button type="button" onClick={() => { if (newPlacement.academic_year.trim()) { setDeptFormData({ ...deptFormData, placements: [...(deptFormData.placements || []), { ...newPlacement }] }); setNewPlacement({ academic_year: '', students_placed: '', average_salary: '', image_or_file: '' }); } }} className="bg-blue-50 text-blue-600 px-3 py-2 rounded-xl font-black text-xs hover:bg-blue-100 flex-shrink-0">Add</button>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-slate-100">
                                        <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2">Alumni Registry & Feedback</label>
                                        <div className="space-y-2 mb-2 max-h-[150px] overflow-y-auto">
                                            {(deptFormData.alumni || []).map((al, i) => (
                                                <div key={i} className="bg-slate-50 rounded-lg p-2.5 text-xs border border-slate-100 flex items-center justify-between">
                                                    <div className="min-w-0 pr-2">
                                                        <span className="font-extrabold text-slate-700 truncate block">{al.name} (Batch {al.batch})</span>
                                                        <span className="text-[9px] text-slate-400 block truncate">{al.designation} at {al.company}</span>
                                                    </div>
                                                    <button type="button" onClick={() => setDeptFormData({ ...deptFormData, alumni: deptFormData.alumni.filter((_, idx) => idx !== i) })} className="text-red-400 hover:text-red-600 font-bold text-base flex-shrink-0">&times;</button>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-col gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                            <div className="grid grid-cols-2 gap-2">
                                                <input type="text" placeholder="Alumni Name" className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold outline-none"
                                                    value={newAlumni.name} onChange={(e) => setNewAlumni({ ...newAlumni, name: e.target.value })} />
                                                <input type="text" placeholder="Batch (e.g. 2018-2022)" className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold outline-none"
                                                    value={newAlumni.batch} onChange={(e) => setNewAlumni({ ...newAlumni, batch: e.target.value })} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input type="text" placeholder="Designation" className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold outline-none"
                                                    value={newAlumni.designation} onChange={(e) => setNewAlumni({ ...newAlumni, designation: e.target.value })} />
                                                <input type="text" placeholder="Company" className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold outline-none"
                                                    value={newAlumni.company} onChange={(e) => setNewAlumni({ ...newAlumni, company: e.target.value })} />
                                            </div>
                                            <textarea placeholder="Alumni Feedback/Testimonial..." className="border-2 border-slate-100 rounded-xl p-2 bg-white text-xs font-bold resize-none outline-none" rows="1"
                                                value={newAlumni.feedback} onChange={(e) => setNewAlumni({ ...newAlumni, feedback: e.target.value })} />
                                            <button type="button" onClick={() => { if (newAlumni.name.trim()) { setDeptFormData({ ...deptFormData, alumni: [...(deptFormData.alumni || []), { ...newAlumni }] }); setNewAlumni({ name: '', batch: '', designation: '', company: '', feedback: '' }); } }} className="bg-[#001a66] text-white py-1.5 rounded-lg font-black text-[10px] hover:bg-[#0b2a8a]">Add Alumni</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="flex gap-4 pt-4 border-t border-slate-100">
                                <button type="button" onClick={handleCloseModal} className="flex-1 px-6 py-4 text-slate-500 hover:bg-slate-100 font-black rounded-2xl transition-all uppercase tracking-widest text-xs">Cancel</button>
                                <button type="submit" className="flex-[2] bg-[#001a66] hover:bg-[#0b2a8a] text-white px-8 py-4 font-black rounded-2xl shadow-xl shadow-blue-900/20 transition-all uppercase tracking-widest text-xs">Save Department</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;

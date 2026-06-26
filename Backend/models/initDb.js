const db = require('../config/db');
const bcrypt = require('bcryptjs');

const initialNewsData = [
  { category: 'news', day: '15th', month: 'APRIL', year: '2026', text: 'Fees is 15 April 2026' },
  { category: 'news', day: '18th', month: 'APRIL', year: '2026', text: 'University Theory Exams for both UG & PG will commence on 13-05-2026' },
  { category: 'news', day: '16th', month: 'APRIL', year: '2026', text: 'University practical exams for PG will commence on 08-05-2026.' },
  { category: 'events', day: '27th', month: 'MARCH', year: '2026', text: "INNOVISTA'2026 - Department of IT" },
  { category: 'events', day: '31st', month: 'MARCH', year: '2026', text: "ACHIEVERS DAY'2026" },
  { category: 'events', day: '07th', month: 'APRIL', year: '2026', text: "NEXZEN'2026 - Department of Management Studies" },
  { category: 'achievements', day: '08th', month: 'APRIL', year: '2026', text: 'Mr. J.Joyal (EEE Dept) won 3rd Prize Rs. 50000 in TM IMPACT Hackathon conducted by TANCAM at KIT, Coimbatore' },
  { category: 'achievements', day: '10th', month: 'APRIL', year: '2026', text: 'Mr. J.Joyal (EEE Dept) won 3rd Prize Rs. 50000 in TM IMPACT Hackathon conducted by TANCAM at KIT, Coimbatore' },
  { category: 'achievements', day: '15th', month: 'APRIL', year: '2026', text: 'Department toppers honored during annual academic excellence ceremony' },
  { category: 'achievements', day: '18th', month: 'APRIL', year: '2026', text: 'Guest lecture on Artificial Intelligence organized by CSE Department' },
  { category: 'achievements', day: '20th', month: 'APRIL', year: '2026', text: 'Sports meet concludes with record participation from all departments' },
  { category: 'achievements', day: '22nd', month: 'APRIL', year: '2026', text: 'Industry visit arranged for Mechanical Engineering students' },
  { category: 'achievements', day: '25th', month: 'APRIL', year: '2026', text: 'Workshop on Cyber Security conducted by IT Department' },
  { category: 'achievements', day: '28th', month: 'APRIL', year: '2026', text: 'Cultural festival "TechnoFest 2026" announced for next month' },
  { category: 'achievements', day: '30th', month: 'APRIL', year: '2026', text: 'Placement drive scheduled with leading MNCs' },
  { category: 'achievements', day: '02nd', month: 'MAY', year: '2026', text: 'Alumni meet organized for batch of 2015-2019' },
  { category: 'achievements', day: '05th', month: 'MAY', year: '2026', text: 'Research paper presentation by faculty members' }
];

const initialOurEventsData = [
  { title: 'Tech Symposium 2024', date: 'March 15, 2024', image: '/course/course-ug.png', description: 'Annual technical symposium featuring workshops, competitions, and guest lectures from industry experts.' },
  { title: 'Cultural Festival', date: 'April 20-22, 2024', image: '/course/course-pg.png', description: 'Three-day cultural extravaganza showcasing music, dance, drama, and various artistic performances.' },
  { title: 'Sports Meet 2024', date: 'May 10-12, 2024', image: '/course/course-research.png', description: 'Inter-college sports competition with various athletic events and team sports.' },
  { title: 'Hackathon 2024', date: 'June 5-6, 2024', image: '/course/course-ug.png', description: '48-hour coding challenge to develop innovative solutions for real-world problems.' },
  { title: 'Alumni Meet', date: 'July 15, 2024', image: '/course/course-pg.png', description: 'Annual alumni reunion bringing together graduates from across the years.' },
  { title: 'Convocation Ceremony', date: 'August 25, 2024', image: '/course/course-research.png', description: 'Graduation ceremony celebrating the achievements of our graduating students.' }
];

const initialExtraCurricularData = [
  { title: 'Dance and Music', description: 'Dance and music programs offer opportunities for creative expression, social interaction, and physical fitness.', image: '/course/course-ug.png', link: '#' },
  { title: 'Clubs and Societies', description: 'Clubs and societies provide opportunities for social interaction, leadership, and creative expression.', image: '/course/course-pg.png', link: '#' },
  { title: 'Sports and Physical Education', description: 'Sports and physical education programs provide opportunities for physical fitness, leadership, and social interaction.', image: '/course/course-research.png', link: '#' }
];

const initialDocumentsData = [
  { category: 'IIC 2026', title: 'IIC 8.0 Council Members List (2025-26)', file_url: '#' },
  { category: 'NIRF', title: 'Engineering 2026', file_url: '#' }
];

const initialAcademicCalendarsData = [
  { title: 'Even Semester Academic Calendar 2025 \u2013 2026', file_url: '#', display_order: 1 },
  { title: 'Odd Semester Academic Calendar PG 1st Year 2025 \u2013 2026', file_url: '#', display_order: 2 },
  { title: 'Odd Semester Academic Calendar UG 1st Year 2025 \u2013 2026', file_url: '#', display_order: 3 },
  { title: 'Odd Semester Academic Calendar 2025 \u2013 2026', file_url: '#', display_order: 4 },
  { title: 'Academic Calendar 2024 \u2013 2025', file_url: '#', display_order: 5 },
  { title: 'Academic Calendar 2023 \u2013 2024', file_url: '#', display_order: 6 }
];

const initialAcademicCouncilMembers = [
  { sno: 1, name: 'Dr. C. Elanchezhian', designation: 'Principal', category: 'Chairman \u2013 Principal' },
  { sno: 2, name: 'Dr. Ganapathi Malarvizhi', designation: 'Professor, Dept. of Civil Engineering, CEG Campus, Anna University, Chennai \u2013 600 025', category: 'University Nominee' },
  { sno: 3, name: 'Dr. S. Hosimin Thilagar', designation: 'Professor, Dept. of Electrical & Electronics Engineering, Anna University, Chennai \u2013 600 025', category: 'University Nominee' },
  { sno: 4, name: 'Dr. V. Vijayalakshmi', designation: 'Professor, Dept. of ECE, Puducherry Technological University, Puducherry', category: 'University Nominee' },
  { sno: 5, name: 'Dr. S. Prabhu', designation: 'Professor & Head, Dept. of Mechanical Engineering', category: 'Head of the Department' },
  { sno: 6, name: 'Dr. C. Jeyamala', designation: 'Professor & Head, Dept. of CSE', category: 'Head of the Department' },
  { sno: 7, name: 'Dr. K. Rajalakshmi', designation: 'Professor & Head, Dept. of ECE', category: 'Head of the Department' },
  { sno: 8, name: 'Dr. N. Nagarajan', designation: 'Professor & Head, Dept. of EEE', category: 'Head of the Department' },
  { sno: 9, name: 'Dr. K. Valarmathi', designation: 'Professor & Head, Dept. of IT', category: 'Head of the Department' },
  { sno: 10, name: 'Dr. G. Amirthavalli', designation: 'Professor & Head, Dept. of Civil Engineering', category: 'Head of the Department' },
  { sno: 11, name: 'Dr. T. Rajkumar', designation: 'Professor & Head, Dept. of Mathematics', category: 'Head of the Department' },
  { sno: 12, name: 'Dr. R. Punithavalli', designation: 'Professor & Head, Dept. of English', category: 'Head of the Department' },
  { sno: 13, name: 'Dr. B. Karthikeyan', designation: 'Professor & Head, Dept. of Physics', category: 'Head of the Department' },
  { sno: 14, name: 'Dr. S. Selvaraj', designation: 'Professor & Head, Dept. of Chemistry', category: 'Head of the Department' },
  { sno: 15, name: 'Dr. V. Radhika', designation: 'Professor & Head, Dept. of AI & DS', category: 'Head of the Department' },
  { sno: 16, name: 'Dr. N. Sivakumar', designation: 'Associate Professor, Dept. of Biotechnology', category: 'Head of the Department' },
  { sno: 17, name: 'Dr. S. Jayanthi', designation: 'Professor, Dept. of CSE', category: 'Professors Nominated by the Principal' },
  { sno: 18, name: 'Dr. N. Kumaresan', designation: 'Professor, Dept. of Mathematics', category: 'Professors Nominated by the Principal' },
  { sno: 19, name: 'Dr. G. Maragatham', designation: 'Professor, Dept. of IT', category: 'Professors Nominated by the Principal' },
  { sno: 20, name: 'Dr. S. Priya', designation: 'Professor, Dept. of EEE', category: 'Professors Nominated by the Principal' },
  { sno: 21, name: 'Dr. K. Sathiyasekar', designation: 'Professor, Dept. of EEE', category: 'Professors Nominated by the Principal' },
  { sno: 22, name: 'Dr. C. Nalini', designation: 'Professor, Dept. of CSE', category: 'Professors Nominated by the Principal' },
  { sno: 23, name: 'Dr. R. Kavitha', designation: 'Professor, Dept. of ECE', category: 'Professors Nominated by the Principal' },
  { sno: 24, name: 'Dr. S. Vasuki', designation: 'Associate Professor, Dept. of Mechanical Engineering', category: 'Professors Nominated by the Principal' },
  { sno: 25, name: 'HoD \u2013 Management Studies', designation: 'Head of Department', category: 'All the Heads of Departments' },
  { sno: 26, name: 'Dr. S. Thirumalvalavan', designation: 'Controller of Examinations', category: 'CoE' },
  { sno: 27, name: 'Dr. J. Vinoth Arulraj', designation: 'Assistant Professor, Biotechnology', category: 'Member Secretary \u2013 Nominated by the Principal' }
];

const initialAcademicCouncilMeetings = [
  { title: 'Academic Council Meeting \u2013 1', file_url: '#', display_order: 1 },
  { title: 'Academic Council Meeting \u2013 2', file_url: '#', display_order: 2 },
  { title: 'Academic Council Meeting \u2013 3', file_url: '#', display_order: 3 }
];

const initialCodeOfConductData = [
  { title: 'HR Manual', file_url: '#', display_order: 1 },
  { title: 'Faculty Code Book', file_url: '#', display_order: 2 },
  { title: 'Student Code Book', file_url: '#', display_order: 3 }
];

const initDb = async () => {
    try {
        // Create admins table
        const createAdminsTableQuery = `
            CREATE TABLE IF NOT EXISTS admins (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createAdminsTableQuery);

        // Check if admin user exists
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

        const { rows: adminRows } = await db.query(`SELECT * FROM admins WHERE username = $1`, [adminUsername]);
        if (adminRows.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(adminPassword, salt);
            await db.query(`INSERT INTO admins (username, password) VALUES ($1, $2)`, [adminUsername, hashedPassword]);
            console.log(`Default admin (${adminUsername}) created successfully.`);
        }

        // Create campus_news table
        const createNewsTableQuery = `
            CREATE TABLE IF NOT EXISTS campus_news (
                id SERIAL PRIMARY KEY,
                category VARCHAR(50) NOT NULL,
                day VARCHAR(10) NOT NULL,
                month VARCHAR(20) NOT NULL,
                year VARCHAR(10) NOT NULL,
                text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createNewsTableQuery);

        // Seed campus_news if empty
        const { rows: newsRows } = await db.query(`SELECT COUNT(*) FROM campus_news`);
        if (parseInt(newsRows[0].count) === 0) {
            console.log('Seeding campus_news table...');
            for (const item of initialNewsData) {
                await db.query(
                    `INSERT INTO campus_news (category, day, month, year, text) VALUES ($1, $2, $3, $4, $5)`,
                    [item.category, item.day, item.month, item.year, item.text]
                );
            }
            console.log('campus_news seeded successfully.');
        } else {
            console.log('Database tables ready.');
        }

        // Create our_events table
        const createOurEventsTableQuery = `
            CREATE TABLE IF NOT EXISTS our_events (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                date VARCHAR(100) NOT NULL,
                image VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createOurEventsTableQuery);

        // Seed our_events if empty
        const { rows: ourEventsRows } = await db.query(`SELECT COUNT(*) FROM our_events`);
        if (parseInt(ourEventsRows[0].count) === 0) {
            console.log('Seeding our_events table...');
            for (const item of initialOurEventsData) {
                await db.query(
                    `INSERT INTO our_events (title, date, image, description) VALUES ($1, $2, $3, $4)`,
                    [item.title, item.date, item.image, item.description]
                );
            }
            console.log('our_events seeded successfully.');
        }

        // Create extra_curricular table
        const createExtraCurricularTableQuery = `
            CREATE TABLE IF NOT EXISTS extra_curricular (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                image VARCHAR(255) NOT NULL,
                link VARCHAR(255) DEFAULT '#',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createExtraCurricularTableQuery);

        // Seed extra_curricular if empty
        const { rows: extraRows } = await db.query(`SELECT COUNT(*) FROM extra_curricular`);
        if (parseInt(extraRows[0].count) === 0) {
            console.log('Seeding extra_curricular table...');
            for (const item of initialExtraCurricularData) {
                await db.query(
                    `INSERT INTO extra_curricular (title, description, image, link) VALUES ($1, $2, $3, $4)`,
                    [item.title, item.description, item.image, item.link]
                );
            }
            console.log('extra_curricular seeded successfully.');
        }

        // Create documents table
        const createDocumentsTableQuery = `
            CREATE TABLE IF NOT EXISTS documents (
                id SERIAL PRIMARY KEY,
                category VARCHAR(100) NOT NULL,
                title VARCHAR(255) NOT NULL,
                file_url VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createDocumentsTableQuery);

        // Seed documents if empty
        const { rows: docRows } = await db.query(`SELECT COUNT(*) FROM documents`);
        if (parseInt(docRows[0].count) === 0) {
            console.log('Seeding documents table...');
            for (const item of initialDocumentsData) {
                await db.query(
                    `INSERT INTO documents (category, title, file_url) VALUES ($1, $2, $3)`,
                    [item.category, item.title, item.file_url]
                );
            }
            console.log('documents seeded successfully.');
        }

        // Create academic_calendars table
        const createAcademicCalendarsTableQuery = `
            CREATE TABLE IF NOT EXISTS academic_calendars (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                file_url VARCHAR(255) NOT NULL,
                display_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createAcademicCalendarsTableQuery);

        // Seed academic_calendars if empty
        const { rows: calRows } = await db.query(`SELECT COUNT(*) FROM academic_calendars`);
        if (parseInt(calRows[0].count) === 0) {
            console.log('Seeding academic_calendars table...');
            for (const item of initialAcademicCalendarsData) {
                await db.query(
                    `INSERT INTO academic_calendars (title, file_url, display_order) VALUES ($1, $2, $3)`,
                    [item.title, item.file_url, item.display_order]
                );
            }
            console.log('academic_calendars seeded successfully.');
        }

        // Create academic_council_members table
        const createCouncilMembersTableQuery = `
            CREATE TABLE IF NOT EXISTS academic_council_members (
                id SERIAL PRIMARY KEY,
                sno INTEGER NOT NULL,
                name VARCHAR(255) NOT NULL,
                designation TEXT NOT NULL,
                category VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createCouncilMembersTableQuery);

        // Seed academic_council_members if empty
        const { rows: memberRows } = await db.query(`SELECT COUNT(*) FROM academic_council_members`);
        if (parseInt(memberRows[0].count) === 0) {
            console.log('Seeding academic_council_members table...');
            for (const item of initialAcademicCouncilMembers) {
                await db.query(
                    `INSERT INTO academic_council_members (sno, name, designation, category) VALUES ($1, $2, $3, $4)`,
                    [item.sno, item.name, item.designation, item.category]
                );
            }
            console.log('academic_council_members seeded successfully.');
        }

        // Create academic_council_meetings table
        const createCouncilMeetingsTableQuery = `
            CREATE TABLE IF NOT EXISTS academic_council_meetings (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                file_url VARCHAR(255) NOT NULL,
                display_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createCouncilMeetingsTableQuery);

        // Seed academic_council_meetings if empty
        const { rows: meetingRows } = await db.query(`SELECT COUNT(*) FROM academic_council_meetings`);
        if (parseInt(meetingRows[0].count) === 0) {
            console.log('Seeding academic_council_meetings table...');
            for (const item of initialAcademicCouncilMeetings) {
                await db.query(
                    `INSERT INTO academic_council_meetings (title, file_url, display_order) VALUES ($1, $2, $3)`,
                    [item.title, item.file_url, item.display_order]
                );
            }
            console.log('academic_council_meetings seeded successfully.');
        }

        // Create code_of_conduct table
        const createCodeOfConductTableQuery = `
            CREATE TABLE IF NOT EXISTS code_of_conduct (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                file_url VARCHAR(255) NOT NULL,
                display_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createCodeOfConductTableQuery);

        // Seed code_of_conduct if empty
        const { rows: cocRows } = await db.query(`SELECT COUNT(*) FROM code_of_conduct`);
        if (parseInt(cocRows[0].count) === 0) {
            console.log('Seeding code_of_conduct table...');
            for (const item of initialCodeOfConductData) {
                await db.query(
                    `INSERT INTO code_of_conduct (title, file_url, display_order) VALUES ($1, $2, $3)`,
                    [item.title, item.file_url, item.display_order]
                );
            }
            console.log('code_of_conduct seeded successfully.');
        }

        // Create departments table
        const createDepartmentsTableQuery = `
            CREATE TABLE IF NOT EXISTS departments (
                id SERIAL PRIMARY KEY,
                dept_slug VARCHAR(50) UNIQUE NOT NULL,
                dept_name VARCHAR(255) NOT NULL,
                banner_image VARCHAR(255) DEFAULT '',
                courses TEXT DEFAULT '[]',
                introduction TEXT DEFAULT '',
                vision TEXT DEFAULT '',
                mission TEXT DEFAULT '[]',
                highlights TEXT DEFAULT '[]',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `;
        await db.query(createDepartmentsTableQuery);
        await db.query(`
            ALTER TABLE departments 
            ADD COLUMN IF NOT EXISTS curriculum TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS peo_pso_po TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS faculty TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS infrastructure TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS advisory TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS activities TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS achievements TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS placements TEXT DEFAULT '[]',
            ADD COLUMN IF NOT EXISTS alumni TEXT DEFAULT '[]';
        `);

        // Seed departments if empty
        const { rows: deptRows } = await db.query(`SELECT COUNT(*) FROM departments`);
        if (parseInt(deptRows[0].count) === 0) {
            console.log('Seeding departments table...');
            const initialDepartments = [
                {
                    dept_slug: 'cse',
                    dept_name: 'Computer Science & Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Computer Science & Engineering', 'PG – M.E. Computer Science & Engineering']),
                    introduction: 'The Department of Computer Science & Engineering was established in 1993. The department offers B.E. and M.E. programs affiliated to Anna University, Chennai. The department has well-equipped laboratories with the latest hardware and software tools to provide hands-on training to the students.\n\nThe department has a team of highly qualified, dedicated and experienced faculty members committed to achieving the highest standards of academic excellence. The faculty actively engage in research and development activities and regularly publish papers in national and international journals and conferences.',
                    vision: 'To be a centre of excellence in Computer Science & Engineering education and research, producing globally competent professionals with ethical values.',
                    mission: JSON.stringify([
                        'To impart quality education in Computer Science & Engineering through updated curriculum and pedagogy.',
                        'To enhance research, innovation and problem-solving skills among students and faculty.',
                        'To develop professionals with strong ethical values, communication skills and social responsibility.',
                        'To collaborate with industries and research organizations for mutual benefit.',
                    ]),
                    highlights: JSON.stringify([
                        { label: 'Established', value: '1993' },
                        { label: 'UG Intake', value: '240' },
                        { label: 'PG Intake', value: '18' },
                        { label: 'Faculty', value: '30+' },
                        { label: 'Publications', value: '100+' },
                        { label: 'Placement %', value: '92%' },
                    ]),
                },
                {
                    dept_slug: 'civil',
                    dept_name: 'Civil Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Civil Engineering']),
                    introduction: 'The department of Civil Engineering started in the year 2008. It offers B. E programme in Civil Engineering affiliated to Anna University, Chennai. The department is certified to ISO 9001:2015 from DNV Netherlands. The department has well qualified and experienced faculty members and equipped with excellent laboratory infrastructure.\n\nWe consistently produce University ranks in undergraduate stream. We do R & D and consultancy activities in collaboration with L & T, Chennai and other leading organisations. We have received National Awards from industrial organisations and associations like Indian Society for Technical education, New Delhi for carrying academic projects. The department has been producing quality technical manpower needed by industry, R&D organization and Academic Institution.',
                    vision: 'To produce engineers having professional and leadership qualities with capacity to take up professional and research assignments in civil engineering and allied fields with focus on inter-disciplinary and innovative approach and to compete at the global level.',
                    mission: JSON.stringify([
                        'To impart quality and real time education to contribute to the field of Civil Engineering',
                        'To impart soft skills, leadership qualities and professional ethics among the graduates to handle projects independently.',
                        'To develop graduates to compete at the global level',
                        'To deal with the contemporary issues and to cater to the societal needs.',
                    ]),
                    highlights: JSON.stringify([
                        { label: 'Established', value: '2008' },
                        { label: 'UG Intake', value: '60' },
                        { label: 'Faculty', value: '10+' },
                        { label: 'Placement %', value: '85%' },
                    ]),
                    curriculum: JSON.stringify([
                        { name: 'Regulation-2024', file_url: '#' },
                        { name: 'Regulation-2021', file_url: '#' }
                    ]),
                    infrastructure: JSON.stringify([
                        { name: 'Total Number of Classrooms', description: '08' }
                    ]),
                },
                {
                    dept_slug: 'cse-cs',
                    dept_name: 'CSE – Cyber Security',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. CSE (Cyber Security)']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'cse-aiml',
                    dept_name: 'CSE – AI & Machine Learning',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. CSE (AI & ML)']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'ece',
                    dept_name: 'Electronics & Communication Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Electronics & Communication Engineering']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'eee',
                    dept_name: 'Electrical & Electronics Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Electrical & Electronics Engineering']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'mech',
                    dept_name: 'Mechanical Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Mechanical Engineering']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'agri',
                    dept_name: 'Agricultural Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Agricultural Engineering']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'aids',
                    dept_name: 'AI & Data Science',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Artificial Intelligence & Data Science']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'biotech',
                    dept_name: 'Bio Technology',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Bio Technology']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'chemical',
                    dept_name: 'Chemical Engineering',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Chemical Engineering']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'it',
                    dept_name: 'Information Technology',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Information Technology']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'csbs',
                    dept_name: 'Computer Science and Business Systems',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['UG – B.E. Computer Science and Business Systems']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
                {
                    dept_slug: 'mba',
                    dept_name: 'Master of Business Administration',
                    banner_image: '/course/course-pg.png',
                    courses: JSON.stringify(['PG – MBA']),
                    introduction: '',
                    vision: '',
                    mission: JSON.stringify([]),
                    highlights: JSON.stringify([]),
                },
            ];

            for (const dept of initialDepartments) {
                await db.query(
                    `INSERT INTO departments (
                        dept_slug, dept_name, banner_image, courses, introduction, vision, mission, highlights, 
                        curriculum, peo_pso_po, faculty, infrastructure, advisory, activities, achievements, placements, alumni
                    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
                    [
                        dept.dept_slug, 
                        dept.dept_name, 
                        dept.banner_image, 
                        dept.courses, 
                        dept.introduction, 
                        dept.vision, 
                        dept.mission, 
                        dept.highlights, 
                        dept.curriculum || '[]',
                        dept.peo_pso_po || '[]',
                        dept.faculty || '[]',
                        dept.infrastructure || '[]',
                        dept.advisory || '[]',
                        dept.activities || '[]',
                        dept.achievements || '[]',
                        dept.placements || '[]',
                        dept.alumni || '[]'
                    ]
                );
            }
            console.log('departments seeded successfully.');
        }

        // Ensure "Computer Science and Business Systems" exists in departments table
        const { rows: csbsRows } = await db.query(`SELECT * FROM departments WHERE dept_slug = $1`, ['csbs']);
        if (csbsRows.length === 0) {
            console.log('Inserting Computer Science and Business Systems department...');
            await db.query(
                `INSERT INTO departments (
                    dept_slug, dept_name, banner_image, courses, introduction, vision, mission, highlights, 
                    curriculum, peo_pso_po, faculty, infrastructure, advisory, activities, achievements, placements, alumni
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)`,
                [
                    'csbs', 
                    'Computer Science and Business Systems', 
                    '/course/course-pg.png', 
                    JSON.stringify(['UG – B.E. Computer Science and Business Systems']), 
                    '', 
                    '', 
                    '[]', 
                    '[]', 
                    '[]',
                    '[]',
                    '[]',
                    '[]',
                    '[]',
                    '[]',
                    '[]',
                    '[]',
                    '[]'
                ]
            );
            console.log('Computer Science and Business Systems department inserted successfully.');
        }

    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

module.exports = initDb;

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
        const { rows: adminRows } = await db.query(`SELECT * FROM admins WHERE username = $1`, ['admin']);
        if (adminRows.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await db.query(`INSERT INTO admins (username, password) VALUES ($1, $2)`, ['admin', hashedPassword]);
            console.log('Default admin created successfully.');
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

    } catch (err) {
        console.error('Error initializing database:', err);
    }
};

module.exports = initDb;

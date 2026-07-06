/**
 * Sidebar configurations for all inner sections.
 * Each entry: { label, path, icon (key from InnerPageLayout icons map), children? }
 */

export const aboutSidebar = {
  title: 'Profile',
  links: [
    { label: 'About AEC',              path: '/about',                     icon: 'info' },
    { label: 'Founder Chairman',       path: '/about/founder',             icon: 'crown' },
    { label: 'Chairperson',            path: '/about/chairperson',         icon: 'person' },
    { label: 'Vice Chairman',          path: '/about/vice-chairman',       icon: 'person' },
    { label: 'The Principal',          path: '/about/principal',           icon: 'building' },
    { label: 'Governing Body Members', path: '/about/governing-body',      icon: 'people' },
    { label: 'Key Functionaries',      path: '/about/key-functionaries',   icon: 'star' },
    { label: 'Academic Council Members',path: '/about/academic-council',   icon: 'people' },
    { label: 'Academic Calendar',      path: '/about/academic-calendar',   icon: 'calendar' },
    { label: 'Code of Conduct',        path: '/about/code-of-conduct',     icon: 'scales' },
    { label: 'Organizational Structure',path: '/about/org-structure',      icon: 'chart' },
  ],
}

export const academicsSidebar = {
  title: 'Academics',
  links: [
    { label: 'Courses Offered', path: '/academics/courses', icon: 'courses' },
    {
      label: 'Department', path: '/academics/departments', icon: 'building',
      children: [
        { label: 'Civil Engineering',                          path: '/academics/dept/civil',       icon: 'building' },
        { label: 'Computer Science & Engineering',             path: '/academics/dept/cse',         icon: 'building' },
        { label: 'CSE – Cyber Security',                       path: '/academics/dept/cse-cs',      icon: 'building' },
        { label: 'CSE – AI & Machine Learning',                path: '/academics/dept/cse-aiml',    icon: 'building' },
        { label: 'Electronics & Communication Engineering',    path: '/academics/dept/ece',         icon: 'building' },
        { label: 'Electrical & Electronics Engineering',       path: '/academics/dept/eee',         icon: 'building' },
        { label: 'Mechanical Engineering',                     path: '/academics/dept/mech',        icon: 'building' },
        { label: 'Agricultural Engineering',                   path: '/academics/dept/agri',        icon: 'building' },
        { label: 'AI & Data Science',                          path: '/academics/dept/aids',        icon: 'building' },
        { label: 'Bio Technology',                             path: '/academics/dept/biotech',     icon: 'building' },
        { label: 'Chemical Engineering',                       path: '/academics/dept/chemical',    icon: 'building' },
        { label: 'Information Technology',                     path: '/academics/dept/it',          icon: 'building' },
        { label: 'Master of Business Administration',          path: '/academics/dept/mba',         icon: 'building' },
      ],
    },
  ],
}

export const researchSidebar = {
  title: 'Research',
  links: [
    { label: 'About Research',                        path: '/research',                icon: 'info' },
    { label: 'Research Advisory Committee Members',   path: '/research/advisory',       icon: 'people' },
    { label: 'Research Centres',                      path: '/research/centres',        icon: 'building' },
    { label: 'Recognized Supervisor List',            path: '/research/supervisors',    icon: 'list' },
    { label: 'Funded Projects',                       path: '/research/funded-projects',icon: 'award' },
    { label: 'Publication',                           path: '/research/publication',    icon: 'book' },
    { label: 'Patent',                                path: '/research/patent',         icon: 'star' },
    { label: 'Memorandum of Understanding',           path: '/research/mou',            icon: 'handshake' },
  ],
}

export const admissionSidebar = {
  title: 'Admission',
  links: [
    { label: 'Admission Process',    path: '/admission',               icon: 'info' },
    { label: 'Fee Structure',        path: '/admission/fee-structure', icon: 'doc' },
    { label: 'Scholarships',         path: '/admission/scholarships',  icon: 'award' },
    { label: 'Apply Now',            path: '/admission/apply',         icon: 'gear' },
  ],
}

export const facilitiesSidebar = {
  title: 'Facilities',
  links: [
    { label: 'Library',                       path: '/facilities',                    icon: 'book' },
    { label: 'Hostel',                        path: '/facilities/hostel',             icon: 'building' },
    { label: 'Computing & Internet Facility', path: '/facilities/computing',          icon: 'gear' },
    { label: 'ICT Class rooms',               path: '/facilities/ict',               icon: 'chart' },
    { label: 'Health Care',                   path: '/facilities/healthcare',         icon: 'star' },
    { label: 'Transport',                     path: '/facilities/transport',          icon: 'gear' },
    { label: 'Sports',                        path: '/facilities/sports',             icon: 'award' },
    { label: 'Auditorium',                    path: '/facilities/auditorium',         icon: 'building' },
  ],
}

export const placementSidebar = {
  title: 'Placement',
  links: [
    { label: 'Overview',    path: '/placement/Overview',                  icon: 'info' },
    { label: 'Rules & Regulations',    path: '/placement/Rules',          icon: 'people' },
    { label: 'Code of Conduct',     path: '/placement/PlacementCodeOfConduct',       icon: 'building' },
    { label: 'List of Students Placed',  path: '/placement/StudentsPlaced',         icon: 'courses' },
    { label: 'List of Recruiters',  path: '/placement/Recruiters',         icon: 'award' },
    { label: 'Contact Us',  path: '/placement/ContactUs',         icon: 'gear' },
  ],
}
export const approvalSidebar = {
  title: 'Institutional Approvals',
  links: [
    { label: 'Mandatory Disclosure', path: '/approvals/MandatoryDisclosure', icon: 'star' },
    { label: 'AICTE Approvals', path: '/approvals/AICTE', icon: 'star' },
    { label: 'Anna University Affiiations', path: '/approvals/AUC', icon: 'star' },
    { label: 'NBA Approvals', path: '/approvals/NBA', icon: 'star' },
    { label: 'NAAC Approvals', path: '/approvals/NAAC', icon: 'star' },
    { label: 'Autonomous Approvals', path: '/approvals/Autonomous', icon: 'star' },
    { label: 'ISO Approvals', path: '/approvals/ISO', icon: 'star' },
  ],
}

export const coeSidebar = {
  title: 'Controller of Examinations',
  links: [
    { label: 'About COE',                  path: '/coe/aboutCOE',             icon: 'info' },
    { label: 'COE Officials',              path: '/coe/coeOfficials',         icon: 'people' },
    { label: 'Circulars and Notifications', path: '/coe/coeCircular',          icon: 'doc' },
    { label: 'Malpractice Punishment',     path: '/coe/coePunishment',        icon: 'scales' },
    { label: 'Exam Time Table',             path: '/coe/coeTimetable',         icon: 'calendar' },
    { label: 'Download Forms',             path: '/coe/coeForms',             icon: 'doc' },
    { label: 'Staff Login',                path: 'https://arunaicoe.org/stafflogin/login.php?done=/stafflogin/',          icon: 'person' },
    { label: 'Student Login',              path: 'https://arunaicoe.org/studentlogin/login.php?done=/studentlogin/',          icon: 'person' },
  ],
}
   
                              
// Dept page sidebar factory — takes dept name & path prefix
export const deptSidebar = (deptName, prefix) => ({
  title: `Department of ${deptName}`,
  links: [
    { label: 'Courses',             path: `${prefix}`,                  icon: 'courses' },
    { label: 'Curriculum & Syllabus',path: `${prefix}/curriculum`,      icon: 'book' },
    { label: "PEO's, PSO's & PO's", path: `${prefix}/peo-pso-po`,     icon: 'list' },
    { label: 'Faculty',             path: `${prefix}/faculty`,          icon: 'people' },
    { label: 'Facilities',          path: `${prefix}/facilities`,       icon: 'building' },
    { label: 'Events',              path: `${prefix}/events`,           icon: 'calendar' },
    { label: 'Placement',           path: `${prefix}/placement`,        icon: 'placement' },
    { label: 'Gallery',             path: `${prefix}/gallery`,          icon: 'image' },
    { label: "Alumni's Feedback",   path: `${prefix}/alumni-feedback`,  icon: 'feedback' },
  ],
})

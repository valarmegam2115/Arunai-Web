/**
 * Sidebar configurations for all inner sections.
 * Each entry: { label, path, icon (key from InnerPageLayout icons map), children? }
 */

export const aboutSidebar = {
  title: 'Profile',
  links: [
    { label: 'About AEC',              path: '/about',                     icon: 'info' },
    { label: 'Founder Chairman',       path: '/about/founder',             icon: 'person' },
    { label: 'Chairperson',            path: '/about/chairperson',         icon: 'person' },
    { label: 'Vice Chairman',          path: '/about/vice-chairman',       icon: 'person' },
    { label: 'The Principal',          path: '/about/principal',           icon: 'person' },
    { label: 'Governing Body Members', path: '/about/governing-body',      icon: 'people' },
    { label: 'Key Functionaries',      path: '/about/key-functionaries',   icon: 'star' },
    { label: 'Academic Council Members',path: '/about/academic-council',   icon: 'people' },
    { label: 'Academic Calendar',      path: '/about/academic-calendar',   icon: 'calendar' },
    { label: 'Code of Conduct',        path: '/about/code-of-conduct',     icon: 'doc' },
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
    { label: 'About Research',               path: '/research',                icon: 'info' },
    { label: 'Research Advisory Committee',  path: '/research/advisory',       icon: 'people' },
    { label: 'Research Centres',             path: '/research/centres',        icon: 'building' },
    { label: 'Recognized Supervisor List',   path: '/research/supervisors',    icon: 'list' },
    { label: 'Funded Projects',              path: '/research/funded-projects',icon: 'award' },
    { label: 'Publication',                  path: '/research/publication',    icon: 'book' },
    { label: 'Patent',                       path: '/research/patent',         icon: 'star' },
    { label: 'Memorandum of Understanding',  path: '/research/mou',            icon: 'handshake' },
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
    { label: 'Infrastructure',    path: '/facilities',                  icon: 'building' },
    { label: 'Digital Library',   path: '/facilities/library',          icon: 'book' },
    { label: 'Laboratories',      path: '/facilities/labs',             icon: 'flask' },
    { label: 'Hostels',           path: '/facilities/hostels',          icon: 'building' },
    { label: 'Transportation',    path: '/facilities/transportation',   icon: 'gear' },
    { label: 'Sports',            path: '/facilities/sports',           icon: 'award' },
  ],
}

export const placementSidebar = {
  title: 'Placement',
  links: [
    { label: 'About Placement',    path: '/placement',                  icon: 'info' },
    { label: 'Placed Students',    path: '/placement/placed-students',  icon: 'people' },
    { label: 'Our Recruiters',     path: '/placement/recruiters',       icon: 'building' },
    { label: 'Training Programs',  path: '/placement/training',         icon: 'courses' },
  ],
}

// Dept page sidebar factory — takes dept name & path prefix
export const deptSidebar = (deptName, prefix) => ({
  title: `Department of ${deptName}`,
  links: [
    { label: 'Courses',             path: `${prefix}`,                  icon: 'courses' },
    { label: 'Curriculum & Syllabus',path: `${prefix}/curriculum`,      icon: 'book',
      children: [
        { label: `B.E – ${deptName}`,  path: `${prefix}/curriculum/ug` },
        { label: `M.E – ${deptName}`,  path: `${prefix}/curriculum/pg` },
      ]
    },
    { label: "PEO's, PSO's & PO's", path: `${prefix}/peo-pso-po`,     icon: 'list' },
    { label: 'Faculty',             path: `${prefix}/faculty`,          icon: 'people' },
    { label: 'Facilities',          path: `${prefix}/facilities`,       icon: 'building' },
    { label: 'Events',              path: `${prefix}/events`,           icon: 'calendar' },
    { label: 'Placement',           path: `${prefix}/placement`,        icon: 'placement' },
    { label: 'Gallery',             path: `${prefix}/gallery`,          icon: 'image' },
    { label: "Alumni's Feedback",   path: `${prefix}/alumni-feedback`,  icon: 'feedback' },
  ],
})

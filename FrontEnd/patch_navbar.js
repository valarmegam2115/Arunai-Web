const fs = require('fs');

let content = fs.readFileSync('src/components/Navbar.jsx', 'utf-8');

// 1. Replace mainNavConfig Academics part
content = content.replace(
  `  {
    label: 'ACADEMICS',
    megaMenu: {
      first: [
        {
          label: 'COURSES OFFERED',
          path: '/academics/courses',
          children: [
            { label: 'UG', path: '/academics/courses/ug' },
            { label: 'PG', path: '/academics/courses/pg' },
          ],
        },
        {
          label: 'DEPARTMENT',
          path: '/academics/departments',
          children: [
            { label: 'Civil Engineering', path: '/academics/dept/civil' },
            { label: 'Computer Science & Engineering', path: '/academics/dept/cse' },
            { label: 'CSE – Cyber Security', path: '/academics/dept/cse-cs' },
            { label: 'CSE – Artificial Intelligence & ML', path: '/academics/dept/cse-aiml' },
            { label: 'Electronics & Communication Engineering', path: '/academics/dept/ece' },
            { label: 'Electrical & Electronics Engineering', path: '/academics/dept/eee' },
            { label: 'Mechanical Engineering', path: '/academics/dept/mech' },
            { label: 'Agricultural Engineering', path: '/academics/dept/agri' },
            { label: 'Artificial Intelligence & Data Science', path: '/academics/dept/aids' },
            { label: 'Bio Technology', path: '/academics/dept/biotech' },
            { label: 'Chemical Engineering', path: '/academics/dept/chemical' },
            { label: 'Information Technology', path: '/academics/dept/it' },
            { label: 'Master of Business Administration', path: '/academics/dept/mba' },
          ],
        },
      ],
    },
  },`,
  `  {
    label: 'ACADEMICS',
    dropdown: [
      {
        label: 'COURSES OFFERED',
        path: '/academics/courses',
        children: [
          { label: 'UG', path: '/academics/courses/ug' },
          { label: 'PG', path: '/academics/courses/pg' },
        ],
      },
      {
        label: 'DEPARTMENT',
        path: '/academics/departments',
        children: [
          { label: 'Civil Engineering', path: '/academics/dept/civil' },
          { label: 'Computer Science & Engineering', path: '/academics/dept/cse' },
          { label: 'CSE – Cyber Security', path: '/academics/dept/cse-cs' },
          { label: 'CSE – Artificial Intelligence & ML', path: '/academics/dept/cse-aiml' },
          { label: 'Electronics & Communication Engineering', path: '/academics/dept/ece' },
          { label: 'Electrical & Electronics Engineering', path: '/academics/dept/eee' },
          { label: 'Mechanical Engineering', path: '/academics/dept/mech' },
          { label: 'Agricultural Engineering', path: '/academics/dept/agri' },
          { label: 'Artificial Intelligence & Data Science', path: '/academics/dept/aids' },
          { label: 'Bio Technology', path: '/academics/dept/biotech' },
          { label: 'Chemical Engineering', path: '/academics/dept/chemical' },
          { label: 'Information Technology', path: '/academics/dept/it' },
          { label: 'Master of Business Administration', path: '/academics/dept/mba' },
        ],
      },
    ],
  },`
);

// 2. Replace SimpleDropdown and remove MegaMenu
const simpleDropdownStart = content.indexOf('// ── SimpleDropdown ────────────────────────────────────────────────────────────');
const megaMenuEnd = content.indexOf('// ── Navbar ────────────────────────────────────────────────────────────────────');

const newDropdowns = `// ── Dropdowns ─────────────────────────────────────────────────────────────────
const DropdownItem = ({ item, pathname, closeParent }) => {
  const [open, setOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  return (
    <div 
      className="relative"
      onMouseEnter={() => setOpen(true)} 
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href={item.path}
        onClick={e => { if(!hasChildren) { go(item.path, e); closeParent() } else { e.preventDefault() } }}
        className="flex items-center justify-between px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-[#f7932f] hover:text-white transition-colors cursor-pointer"
      >
        {item.label}
        {hasChildren && (
          <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z" /></svg>
        )}
      </a>
      {hasChildren && open && (
        <div className="absolute left-full top-0 z-50 min-w-[260px] bg-[#0d1f6e] shadow-xl">
          {item.children.map((c, i) => (
            <a
              key={i}
              href={c.path}
              onClick={e => { go(c.path, e); setOpen(false); closeParent() }}
              className="block px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-[#f7932f] hover:text-white transition-colors"
            >
              {c.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

const SimpleDropdown = ({ item, pathname, scrolled }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const active = item.dropdown?.some(d => isActivePath(pathname, d.path) || d.children?.some(c => isActivePath(pathname, c.path)))

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className={\`flex items-center gap-1 text-[14px] font-bold tracking-wide transition-colors
          \${scrolled
            ? (active ? 'text-[#f7932f]' : 'text-[#061a66] hover:text-[#f7932f]')
            : (active ? 'text-[#f7932f]' : 'text-white/95 hover:text-[#f7932f]')
          }\`}
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <svg className={\`h-3.5 w-3.5 transition-transform \${open ? 'rotate-180' : ''}\`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[220px] bg-[#0d1f6e] shadow-xl border-t-2 border-white">
          {item.dropdown.map((d, i) => (
            <DropdownItem key={i} item={d} pathname={pathname} closeParent={() => setOpen(false)} />
          ))}
        </div>
      )}
    </div>
  )
}

// ── TopSimpleDropdown (for top nav, e.g. ERP) ─────────────────────────────────
const TopDropdown = ({ item, pathname }) => {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="flex items-center gap-1 text-[15px] tracking-wide text-white/95 hover:text-[#f7932f] transition-colors"
        onClick={() => setOpen(o => !o)}
      >
        {item.label}
        <svg className={\`h-3 w-3 transition-transform \${open ? 'rotate-180' : ''}\`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[170px] bg-[#0d1f6e] shadow-xl">
          {item.dropdown.map((d, i) => (
            <a
              key={i}
              href={d.path}
              onClick={e => { go(d.path, e); setOpen(false) }}
              className="block px-5 py-3 text-[13px] font-bold uppercase tracking-wider text-white hover:bg-[#f7932f] transition-colors"
            >
              {d.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

`;

content = content.substring(0, simpleDropdownStart) + newDropdowns + content.substring(megaMenuEnd);

// 3. Fix map inside Navbar main nav render
content = content.replace(
  /if \(item\.megaMenu\) return <MegaMenu key=\{i\} item=\{item\} pathname=\{pathname\} scrolled=\{scrolled\} \/>/g,
  ''
);

// 4. Fix mobile menu mapping
content = content.replace(
  /const hasChildren = item\.dropdown \|\| item\.megaMenu/g,
  'const hasChildren = !!item.dropdown'
);

content = content.replace(
  /const children = item\.dropdown \?\? item\.megaMenu\?\.first\?\.flatMap\(f => \[\{ label: f\.label, path: f\.path \}, \.\.\.\(f\.children \?\? \[\]\)\]\)/g,
  \`const children = item.dropdown?.flatMap(d => [
              { label: d.label, path: d.path },
              ...(d.children ? d.children.map(c => ({ label: \`— \${c.label}\`, path: c.path })) : [])
            ])\`
);


fs.writeFileSync('src/components/Navbar.jsx', content);

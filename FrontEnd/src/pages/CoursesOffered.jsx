import React from 'react';

const CourseList = ({ title, courses }) => {
  return (
    <div className="min-h-[60vh] bg-[#fafafa] pt-46 pb-16 flex justify-center">
      <div className="w-[90%] max-w-[1150px] shadow-sm rounded-lg bg-white overflow-hidden border border-gray-100">
        <div className="bg-[#f2a900] py-4 text-center">
          <h2 className="text-[18px] sm:text-[20px] font-bold text-black tracking-wide">{title}</h2>
        </div>
        <div className="px-6 py-10 sm:px-16 sm:py-12">
          <ul className="space-y-5 text-[#333333] text-[15px] sm:text-[16px] list-disc list-inside marker:text-gray-700 ml-4">
            {courses.map((course, index) => (
              <li key={index} className="pl-2 leading-relaxed">
                {course}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const UgCourses = () => {
  const ugCourses = [
    'Civil Engineering',
    'Computer Science & Engineering',
    'CSE — Cyber Security',
    'CSE — Artificial Intelligence & Machine Learning',
    'Electronics & Communication Engineering',
    'Electrical & Electronics Engineering',
    'Mechanical Engineering',
    'Agricultural Engineering',
    'Artificial Intelligence & Data Science',
    'Bio Technology',
    'Chemical Engineering',
    'Information Technology'
  ];
  return <CourseList title="UG Courses Offered" courses={ugCourses} />;
};

export const PgCourses = () => {
  const pgCourses = [
    'Computer Science & Engineering',
    'Power Electronics and Drives',
    'Thermal Engineering',
    'Bio Technology',
    'Master of Business Administration'
  ];
  return <CourseList title="PG Courses Offered" courses={pgCourses} />;
};

import React from "react";
import InnerPageLayout from "../../../components/InnerPageLayout";
import { PageHeader, SectionBlock } from "../../../components/blocks";
import { aboutSidebar } from "../../../utils/sidebarConfig";

const functionaries = [
  {
    designation: "Registrar",
    name: "Dr. R. Sathiyaseelan",
    qualification: "M.E., Ph.D",
    department: "Professor, CSE",
  },
  {
    designation: "Controller of Examinations",
    name: "Dr. S. Thirumalvalavan",
    qualification: "M.E., Ph.D",
    department: "Professor, Mechanical Engineering",
  },
  {
    designation: "Public Relation Officer",
    name: "Dr. M. Asim Basha",
    qualification: "M.Sc., M.Phil., PGDCA., Ph.D",
    department: "Assistant Professor, HAS",
  },
];

const MemberCard = ({ member }) => (
  <div
    className="
      group
      bg-white
      rounded-[28px]
      p-8
      w-full
      max-w-[360px]
      min-h-[260px]
      flex
      flex-col
      justify-start
      shadow-[0_15px_35px_rgba(0,0,0,0.12)]
      transition-all
      duration-500
      ease-out
      hover:-translate-y-5
      hover:scale-105
      hover:shadow-[0_35px_70px_rgba(0,0,0,0.22)]
      cursor-pointer
    "
  >
    {/* Designation Badge */}
    <div className="flex justify-center mb-8">
      <span
        className="
          bg-gradient-to-r
          from-blue-800
          to-red-600
          text-white
          px-6
          py-2
          rounded-full
          font-semibold
          text-lg
          transition-all
          duration-500
          group-hover:scale-110
        "
      >
        {member.designation}
      </span>
    </div>

    {/* Name */}
    <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
      {member.name}
    </h3>

    {/* Qualification */}
    <p className="text-lg font-semibold text-center text-gray-800 mb-6">
      {member.qualification}
    </p>

    {/* Department */}
    <p className="text-lg text-center text-gray-700 leading-relaxed">
      {member.department}
    </p>
  </div>
);

const KeyFunctionaries = () => {
  return (
    <InnerPageLayout
      sidebarTitle={aboutSidebar.title}
      sidebarLinks={aboutSidebar.links}
    >
      <PageHeader title="Key Functionaries" />

      <SectionBlock>
        {/* Row 1 */}
        <div className="flex justify-center mb-12">
          <MemberCard member={functionaries[0]} />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-items-center">
          <MemberCard member={functionaries[1]} />
          <MemberCard member={functionaries[2]} />
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default KeyFunctionaries;
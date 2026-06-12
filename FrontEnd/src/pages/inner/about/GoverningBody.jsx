import React from "react";
import InnerPageLayout from "../../../components/InnerPageLayout";
import { PageHeader, SectionBlock } from "../../../components/blocks";
import { aboutSidebar } from "../../../utils/sidebarConfig";

const members = [
  {
    sno: 1,
    name: "Mrs. V. Sankari",
    designation: "Chairperson, Saraswathi Ammal Educational Trust",
    category: "Management",
  },
  {
    sno: 2,
    name: "Er. E.V. Kumaran",
    designation: "Vice Chairman, Saraswathi Ammal Educational Trust",
    category: "Management",
  },
  {
    sno: 3,
    name: "Dr. E. V. Kamban",
    designation: "Managing Director",
    category: "Management",
  },
  {
    sno: 4,
    name: "Dr. R. Sathiyaseelan",
    designation: "Registrar",
    category: "Management",
  },
  {
    sno: 5,
    name: "Dr. M. Arumugam",
    designation: "Advisor",
    category: "Management",
  },
  {
    sno: 6,
    name: "Dr. R. Seshadri",
    designation: "Professor, ECE",
    category: "Teachers of the College",
  },
  {
    sno: 7,
    name: "Mr. R. Praveen Kumar",
    designation: "HoD – Biotechnology",
    category: "Teachers of the College",
  },
  {
    sno: 8,
    name: "Dr. P. Santhakumar",
    designation: "PRO",
    category: "Administrative Staff",
  },
  {
    sno: 9,
    name: "Dr. Kulanthaivel G",
    designation: "Professor, NITTTR, Chennai",
    category: "Educationist",
  },
  {
    sno: 10,
    name: "Dr. S. Sundari",
    designation: "Professor (CAS), Govt. College of Engineering, Salem",
    category: "State Government Nominee",
  },
  {
    sno: 11,
    name: "Dr. C. Elanchezhian",
    designation: "Principal",
    category: "Principal of the College",
  },
];

const GoverningBody = () => {
  return (
    <InnerPageLayout
      sidebarTitle={aboutSidebar.title}
      sidebarLinks={aboutSidebar.links}
    >
      <PageHeader title="Governing Body Members" />

      <SectionBlock>
        {/* Section Heading */}
        <div className="flex items-center gap-3 mb-8">
          <span className="w-1 h-7 bg-red-600 rounded-full"></span>
          <h2 className="text-3xl font-bold text-gray-800">
            Governing Body Members (2024–2026)
          </h2>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl shadow-sm">
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="bg-[#7393B3] text-black">
                <th className="w-[8%] px-4 py-5 text-center font-semibold rounded-tl-2xl">
                  S.No
                </th>
                <th className="w-[20%] px-4 py-5 text-left font-semibold">
                  Name
                </th>
                <th className="w-[42%] px-4 py-5 text-left font-semibold">
                  Designation / Role
                </th>
                <th className="w-[25%] px-4 py-5 text-left font-semibold rounded-tr-2xl">
                  Category
                </th>
              </tr>
            </thead>

            <tbody>
              {members.map((member, index) => (
                <tr
                  key={member.sno}
                  className={`border-b border-gray-300 ${
                    index % 2 === 0 ? "bg-white" : "bg-[#eef3fb]"
                  } hover:bg-gray-50 transition`}
                >
                  <td className="px-4 py-5 text-center font-semibold text-gray-700">
                    {member.sno}
                  </td>

                  <td className="px-4 py-5 text-gray-700">
                    {member.name}
                  </td>

                  <td className="px-4 py-5 text-gray-700 leading-relaxed">
                    {member.designation}
                  </td>

                  <td className="px-4 py-5 text-gray-700">
                    {member.category}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionBlock>
    </InnerPageLayout>
  );
};

export default GoverningBody;
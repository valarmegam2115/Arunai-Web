import React from "react";
import { PageHeader } from "../components/blocks";
import IIC2526 from "../assets/pdfs/iic_pdf/IIC_8.0_Council_Members_List_2025-26.pdf";

const IIC = () => {
  const documents = [
    {
      title: "IIC 8.0 Council Members List (2025-26)",
      link: IIC2526,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] sm:p-12">
        {/* Page Header */}
        <PageHeader title="NIRF" />

        {/* Main Heading */}
        <div className="mb-14 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Institutions Innovation Council
          </h1>

          <div className="mx-auto mt-3 flex h-1 w-20 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#1E40AF]"></div>
            <div className="w-1/2 bg-red-600"></div>
          </div>
        </div>

        {/* Document Section */}
        <section>
          <div className="mb-6 flex items-center gap-3">
            <div className="h-6 w-[5px] rounded bg-gradient-to-b from-blue-700 to-red-600"></div>

            <h2 className="text-2xl font-bold text-gray-800">
              IIC Documents
            </h2>
          </div>

          <div className="space-y-4">
            {documents.map((doc, index) => (
              <a
                key={index}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-white px-6 py-4 transition-all duration-300 hover:border-blue-500 hover:shadow-md"
              >
                {/* Document Title */}
                <span className="text-lg font-semibold text-blue-700 group-hover:text-blue-900">
                  {doc.title}
                </span>

                {/* PDF Icon */}
                <div className="flex items-center gap-1 text-blue-600 group-hover:scale-110 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm0 2.5L18.5 9H14V4.5zM8 11h8v1.5H8V11zm0 3h8v1.5H8V14zm0 3h5v1.5H8V17z" />
                  </svg>
                  <span className="text-xs font-bold">PDF</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default IIC;
import React from 'react'

const PageSection = ({ title, description, points = [] }) => {
  return (
    <section className="rounded-[14px] border border-white/10 bg-[#0a1b32b8] p-6">
      <h3 className="mb-2.5 mt-0 text-2xl">{title}</h3>
      <p className="m-0 leading-relaxed text-white/85">{description}</p>
      {points.length > 0 && (
        <ul className="mb-0 mt-3.5 list-disc pl-[18px]">
          {points.map((point) => (
            <li key={point} className="my-[7px] text-white/90">
              {point}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default PageSection

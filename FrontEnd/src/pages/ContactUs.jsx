import React from "react";
import collegeImg from "../assets/hero-image.png";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <>
      <section className="bg-[#00186B] pt-24 md:pt-[190px] pb-12 md:pb-24 px-4 relative">
        <h2 className="text-center text-white text-3xl sm:text-5xl font-black uppercase tracking-wider mb-8">
          CONTACT US
        </h2>

        {/* Image Container */}
        <div className="relative mx-auto mt-6 w-[90%] max-w-4xl">
          <img
            src={collegeImg}
            alt="College Campus"
            className="h-[200px] sm:h-[370px] w-full rounded-2xl object-cover shadow-2xl"
          />

          {/* Overlapping Info Cards */}
          <div className="relative md:absolute mt-8 md:mt-0 md:-bottom-54 left-0 md:left-1/2 translate-x-0 md:-translate-x-1/2 flex w-full md:w-[1040px] md:max-w-5xl flex-col md:flex-row justify-center items-stretch gap-6 md:gap-8 z-10">
            
            {/* Left Card: General Enquiry */}
            <div className="w-full max-w-lg rounded-2xl border-2 border-yellow-400 bg-white/10 p-8 text-center text-white backdrop-blur-lg shadow-xl flex flex-col justify-center min-h-[300px]">
              <h3 className="mb-5 text-xl sm:text-2xl font-black uppercase tracking-wide">
                General Enquiry
              </h3>

              <p className="leading-relaxed text-sm sm:text-base text-white/90 font-medium">
                Arunai Engineering College (Autonomous)
                <br />
                Velu Nagar, Tiruvannamalai,
                <br />
                Tamil Nadu – 606603
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-base sm:text-lg font-bold">
                <FaEnvelope className="text-white/80 shrink-0" />
                <a 
                  href="mailto:aectvm1993@gmail.com" 
                  className="hover:underline text-white underline decoration-white/50 underline-offset-4"
                >
                  aectvm1993@gmail.com
                </a>
              </div>

              <div className="mt-3 flex items-center justify-center gap-2 text-base sm:text-lg font-bold">
                <FaPhoneAlt className="text-white/80 shrink-0" />
                <span className="text-white">
                  <a 
                    href="tel:04175222001" 
                    className="hover:underline underline decoration-white/50 underline-offset-4"
                  >
                    04175-222001
                  </a>
                  {" / "}
                  <a 
                    href="tel:04175222002" 
                    className="hover:underline underline decoration-white/50 underline-offset-4"
                  >
                    222002
                  </a>
                </span>
              </div>
            </div>

            {/* Right Card: Official Student Verification */}
            <div className="w-full max-w-lg rounded-2xl border-2 border-yellow-400 bg-white/10 p-8 text-center text-white backdrop-blur-lg shadow-xl flex flex-col justify-center min-h-[300px]">
              <h3 className="mb-5 text-lg sm:text-[20px] md:text-[21px] lg:text-[22px] font-extrabold tracking-wide">
                Official Student Verification Email ID
              </h3>

              <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold">
                <FaEnvelope className="text-white/80 shrink-0" />
                <a 
                  href="mailto:coearunai@gmail.com" 
                  className="hover:underline text-white underline decoration-white/50 underline-offset-4"
                >
                  coearunai@gmail.com
                </a>
              </div>

              <h4 className="mt-8 text-lg sm:text-xl font-extrabold tracking-wide">
                For Admission
              </h4>

              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold">
                  <FaPhoneAlt className="text-white/80 shrink-0" />
                  <a 
                    href="tel:9597374446" 
                    className="hover:underline text-white underline decoration-white/50 underline-offset-4"
                  >
                    9597374446
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold">
                  <FaPhoneAlt className="text-white/80 shrink-0" />
                  <a 
                    href="tel:9443576270" 
                    className="hover:underline text-white underline decoration-white/50 underline-offset-4"
                  >
                    9443576270
                  </a>
                </div>

                <div className="flex items-center justify-center gap-2 text-base sm:text-lg font-bold">
                  <FaPhoneAlt className="text-white/80 shrink-0" />
                  <a 
                    href="tel:9600653288" 
                    className="hover:underline text-white underline decoration-white/50 underline-offset-4"
                  >
                    9600653288
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Responsive Spacer to push down map */}
        <div className="hidden md:block md:h-52"></div>
      </section>

      {/* Google Map */}
      <div className="w-full">
        <iframe
          title="College Map"
          src="https://www.google.com/maps?q=Arunai+Engineering+College+Tiruvannamalai&output=embed"
          className="h-[430px] w-full border-0"
          loading="lazy"
          allowFullScreen
        />
      </div>
    </>
  );
};

export default ContactUs;
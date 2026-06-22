import React from "react";
import collegeImg from "../assets/hero-image.png";
import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <>
      <section className="bg-[#00186B] pt-10">

        <h2 className="text-center text-white text-5xl font-extrabold tracking-wide">
          CONTACT US
        </h2>

        {/* Image */}
        <div className="relative mx-auto mt-6 w-[92%] max-w-5xl">
          <img
            src={collegeImg}
            alt="College"
            className="h-[370px] w-full rounded-xl object-cover shadow-2xl"
          />

          {/* Cards */}
          <div className="absolute -bottom-24 left-1/2 flex w-full -translate-x-1/2 justify-center gap-4 px-4">

            {/* Left Card */}
            <div className="w-full max-w-md rounded-lg border border-yellow-400 bg-white/10 p-8 text-center text-white backdrop-blur-lg">

              <h3 className="mb-5 text-3xl font-bold">
                General Enquiry
              </h3>

              <p className="leading-8">
                Arunai Engineering College (Autonomous)
                <br />
                Velu Nagar, Tiruvannamalai,
                <br />
                Tamil Nadu – 606603
              </p>

              <div className="mt-6 flex justify-center gap-2">
                <FaEnvelope className="mt-1" />
                <span>aectvm1993@gmail.com</span>
              </div>

              <div className="mt-3 flex justify-center gap-2">
                <FaPhoneAlt className="mt-1" />
                <span>04175-222001 / 222002</span>
              </div>

            </div>

            {/* Right Card */}
            <div className="w-full max-w-md rounded-lg border border-yellow-400 bg-white/10 p-8 text-center text-white backdrop-blur-lg">

              <h3 className="mb-5 text-3xl font-bold">
                Official Student Verification
                <br />
                Email ID
              </h3>

              <div className="flex justify-center gap-2">
                <FaEnvelope className="mt-1" />
                <span>coearunai@gmail.com</span>
              </div>

              <h4 className="mt-8 text-3xl font-bold">
                For Admission
              </h4>

              <div className="mt-4 space-y-3">

                <div className="flex justify-center gap-2">
                  <FaPhoneAlt className="mt-1" />
                  9597374446
                </div>

                <div className="flex justify-center gap-2">
                  <FaPhoneAlt className="mt-1" />
                  9443576270
                </div>

                <div className="flex justify-center gap-2">
                  <FaPhoneAlt className="mt-1" />
                  9600653288
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* Spacer */}
        <div className="h-40"></div>

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
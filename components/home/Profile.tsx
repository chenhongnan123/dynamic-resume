"use client";
import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserInfo } from "@/types";

const introduction = ({
  userProfile,
}: {
  userProfile: UserInfo,
}) => {
  return (
    <section className="lg:py-6"  id="profile">
      <div className="grid grid-cols-1 sm:grid-cols-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full place-self-center text-center md:text-left justify-self-start"
        >
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-8xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600">
              Hello, I&apos;m{" "}
            </span>
            <br></br>
            {
              userProfile.name && <TypeAnimation
                sequence={[
                  userProfile.name || '',
                  1000,
                  userProfile.position || '',
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            }
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl text-pretty break-all indent-8 text-left">
            {userProfile.introduction }
          </p>
          {/* hireLink,
            fileName,
            filePath, */}
          <div>
          {userProfile.hireLink && 
            <Link
              href={userProfile.hireLink}
              target="_blank"
              className="px-6 inline-block py-3 w-full md:w-fit rounded-full mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              Hire Me
            </Link>}
            {userProfile.filePath && 
            <Link
              href={userProfile.filePath}
              target="_blank"
              className="px-1 inline-block py-1 w-full md:w-fit rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                Download CV
              </span>
            </Link>}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default introduction;

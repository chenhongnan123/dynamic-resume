"use client";
import React from "react";

const PersonalIntroduction = () => {
  return (
    <section className="py-8"  id="PersonalIntroduction">
        <label htmlFor="message" className="block leading-6">Personal Introduction</label>
        <div className="mt-2.5">
            <textarea name="message" id="message" rows={4} className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
        </div>
    </section>
  );
};

export default PersonalIntroduction;

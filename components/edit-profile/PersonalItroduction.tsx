"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { httpPut } from "@/lib/api";
import { UserInfo } from "@/types";


const PersonalIntroduction = ({
    userProfile,
    setUserProfile
  }: {
    userProfile: UserInfo,
    setUserProfile: (userProfile: UserInfo) => void
  }) => {
    const [ isUpdated, setUsUpdated ] = useState(false)

    async function updatePersonalIntroduction() {
        const result = await httpPut(`${window.location.origin}/api/user`, userProfile)
        setUsUpdated(false)
    }

    return (
        <section className="py-8"  id="PersonalIntroduction">
            <div className="grid grid-cols-6">
            <div className="leading-8 font-medium col-start-1 col-end-5 text-xl">Personal Introduction</div>
            <Button
            color="primary"
            className="col-start-8 col-end-8 text-md"
            size="sm"
            isDisabled={!isUpdated}
            onClick={updatePersonalIntroduction}
            >
                Save
            </Button>
            </div>
            <div className="mt-2.5">
                <textarea
                name="message"
                id="message"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={userProfile?.personalIntroduction}
                onChange={(e) => {
                    setUsUpdated(true)
                    setUserProfile({
                        ...userProfile,
                        personalIntroduction: e.target.value
                    })
                }}
                >
                </textarea>
            </div>
        </section>
    );
};

export default PersonalIntroduction;

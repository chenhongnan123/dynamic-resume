"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { httpPut } from "@/lib/api";
import { UserInfo } from "@/types";
import { AiOutlineReload } from "react-icons/ai";
import { Tooltip } from "@nextui-org/react";


const NamePosition = ({
    userProfile,
    setUserProfile,
    init,
  }: {
    userProfile: UserInfo;
    setUserProfile: (userProfile: UserInfo) => void;
    init: () => void;
  }) => {
    const [ isUpdated, setUpdated ] = useState(false);
    async function updateintroduction() {
        const {
            id,
            sub,
            name,
            position,
            introduction,
        } = userProfile;
        const payload = {
            id,
            sub,
            name,
            position,
            introduction,
        }
        const result = await httpPut(`${window.location.origin}/api/user`, payload)
        if (result) {
            setUpdated(false);
            window.enqueueSnackbar('Successfully updated', { variant: "success" });
        }
    }
    const inputStyles = 'block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    return (
        <section className="py-8"  id="introduction">
            <div className="flex">
                <div className="leading-8 font-medium text-xl">Profile</div>
                <div className="flex-1"></div>
                <Tooltip content="Refresh">
                    <Button
                    color="primary"
                    className="text-md mr-2"
                    isIconOnly
                    variant="light"
                    size="sm"
                    onClick={() => {
                        init();
                        setUpdated(false);
                    }}
                    >
                        <AiOutlineReload className="text-xl" />
                    </Button>
                </Tooltip>
                <Button
                color="primary"
                className="col-start-8 col-end-8 text-md"
                size="sm"
                isDisabled={!isUpdated}
                onClick={updateintroduction}
                >
                    Save
                </Button>
            </div>
            <div className="mt-2.5 grid md:grid-cols-1 md:grid-cols-2 md:gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6">Name</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    className={inputStyles}
                    value={userProfile.name || ''}
                    onChange={(e) => {
                        setUpdated(true)
                        setUserProfile({
                            ...userProfile,
                            name: e.target.value
                        })
                    }}
                    />
                </div>
                <div className="mt-2.5 md:mt-0 ">
                    <label htmlFor="position" className="block text-sm font-semibold leading-6">Position</label>
                    <input
                    type="text"
                    name="name"
                    id="name"
                    className={inputStyles}
                    value={userProfile.position || ''}
                    onChange={(e) => {
                        setUpdated(true)
                        setUserProfile({
                            ...userProfile,
                            position: e.target.value
                        })
                    }}
                    />
                </div>
                <div className="mt-2.5 md:col-start-1 md:col-end-3">
                    <label htmlFor="introduction" className="block text-sm font-semibold leading-6">Introduction</label>
                    <textarea
                    name="introduction"
                    id="introduction"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={userProfile?.introduction}
                    onChange={(e) => {
                        setUpdated(true)
                        setUserProfile({
                            ...userProfile,
                            introduction: e.target.value
                        })
                    }}
                    >
                    </textarea>
                </div>
            </div>
            
        </section>
    );
};

export default NamePosition;

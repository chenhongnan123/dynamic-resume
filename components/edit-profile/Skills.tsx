"use client";
import React from "react";
import { useState, useMemo } from 'react';
import { httpPut } from "@/lib/api";
import { UserInfo, Skill } from "@/types";
import { Button } from "@nextui-org/react";
import ChipSelector from './ChipSelector';

const Skills = ({
    userProfile,
    setUserProfile,
  }: {
    userProfile: UserInfo,
    setUserProfile: (userProfile: UserInfo) => void
  }) => {
    const [ isUpdated, setUpdated ] = useState(false);

    const skills = useMemo(() => userProfile.skills ? userProfile.skills.split(',') : [], [userProfile]);

    async function updateSkill() {
        const {
            id,
            sub,
        } = userProfile;
        const payload = {
            id,
            sub,
            skills: userProfile.skills,
        }
        const result = await httpPut(`${window.location.origin}/api/user`, payload);
        setUpdated(false);
    }

    function setSkills (skills: string[]) {
        setUserProfile(((userProfile: UserInfo) => {
            return {
                ...userProfile,
                skills: skills.join(','),
            }
        }) as UserInfo);
    }

    return (
        <section className="py-8"  id="introduction">
            <div className="grid grid-cols-6">
                <div className="leading-8 font-medium col-start-1 col-end-5 text-xl">Skills</div>
                <Button
                color="primary"
                className="col-start-8 col-end-8 text-md"
                size="sm"
                isDisabled={!isUpdated}
                onClick={updateSkill}
                >
                    Save
                </Button>
            </div>
            <ChipSelector chips={skills} setChips={setSkills} setUpdated={setUpdated} size="lg"/>
        </section>
    );
};

export default Skills;

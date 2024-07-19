"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { httpGet, httpPost } from "@/lib/api";
import { UserInfo, Skill } from "@/types";
import { Button } from "@nextui-org/react";
import ChipSelector from './ChipSelector';

const Skills = ({
    userProfile,
  }: {
    userProfile: UserInfo,
  }) => {
    const [ isUpdated, setUpdated ] = useState(false);
    const [skills, setSkills] = useState<(string)[]>([]);

    useEffect(() => {
        async function init() {
            const result = await httpGet(`${window.location.origin}/api/skill?username=${userProfile?.username}`) as Skill[];
            console.log(result, 'result')
            if (result) {
                const skills = result.map((skill: Skill) => skill.name) as string[]
                setSkills(skills);
            }
        }
        init()
    }, [userProfile]);

    async function updateSkill() {
        const {
            id,
            username,
            sub,
        } = userProfile;
        const payload = skills.map((skill) => ({
            userid: id,
            username,
            usersub: sub,
            name: skill,
        }));
        const result = await httpPost(`${window.location.origin}/api/skill`, payload);
        setUpdated(false);
    }

    return (
        <section className="py-8"  id="PersonalIntroduction">
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

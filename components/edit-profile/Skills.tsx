"use client";
import React from "react";
import { useState, useMemo } from 'react';
import { httpPut } from "@/lib/api";
import { UserInfo } from "@/types";
import { Button } from "@nextui-org/react";
import ChipSelector from './ChipSelector';
import { AiOutlineReload } from "react-icons/ai";
import { Tooltip } from "@nextui-org/react";
import { useTranslation } from 'react-i18next';

const Skills = ({
    userProfile,
    setUserProfile,
    init,
  }: {
    userProfile: UserInfo,
    setUserProfile: (userProfile: UserInfo) => void
    init: () => void;
  }) => {
    const { t } = useTranslation();
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
        if (result) {
            setUpdated(false);
            window.enqueueSnackbar('Successfully updated', { variant: "success" } );
        }
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
        <section className="py-8"  id="skills">
            <div className="flex">
                <div className="leading-8 font-medium text-xl">Skills</div>
                <div className="flex-1"></div>
                <Tooltip content={t('profile.refresh')}>
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
                onClick={updateSkill}
                >
                    {t('profile.save')}
                </Button>
            </div>
            <ChipSelector chips={skills} setChips={setSkills} setUpdated={setUpdated} size="lg"/>
        </section>
    );
};

export default Skills;

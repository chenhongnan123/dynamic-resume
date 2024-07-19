"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { httpGet, httpPost } from "@/lib/api";
import { UserInfo, Skill } from "@/types";
import { BsPlusCircle } from "react-icons/bs";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Chip, Input} from "@nextui-org/react"

const Skills = ({
    userProfile,
  }: {
    userProfile: UserInfo,
  }) => {
    const [ isUpdated, setUsUpdated ] = useState(false)
    const [skill, setSkill] = useState<string>('');
    const [skills, setSkills] = useState<(string)[]>([]);
    const [ isInvalid, setIsInvalid ] = useState(false)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

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

    const handleDeleteSkill = (skillToRemove: string) => {
        setUsUpdated(true)
        setSkills(skills.filter((skill: string) => skill !== skillToRemove));
    };

    const handleAddSkill = (skill: string) => {
        setSkills([...skills, skill]);
        setSkill('');
        setUsUpdated(true)
    };

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
        setUsUpdated(false);
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
            <div className="mt-2.5 flex gap-2">
                {skills.map((skill, index) => (
                    <Chip key={index} onClose={() => handleDeleteSkill(skill)} variant="shadow"  size="lg">
                    {skill}
                    </Chip>
                ))}
                <Button
                color="primary"
                className="col-start-8 col-end-8 text-md"
                size="sm"
                isIconOnly
                variant="light"
                onPress={() => {
                    setSkill('');
                    setIsInvalid(false);
                    onOpen();
                }}
                >
                    <BsPlusCircle />
                </Button>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Add skill</ModalHeader>
                    <ModalBody>
                        <Input
                        value={skill}
                        type="email"
                        label="Enter skill name"
                        variant="bordered"
                        isInvalid={isInvalid}
                        color={isInvalid ? "danger" : "success"}
                        errorMessage="Skill already exists or is empty"
                        onValueChange={(value) => {
                            setSkill(value)
                            console.log(value, "value")
                            if (value === "" || skills.includes(value)) {
                                setIsInvalid(true);
                                return
                            };
                            setIsInvalid(false);
                        }}
                        className="max-w-xs"
                        fullWidth={true}
                        autoFocus
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={() => {
                            if (skill === "" || skills.includes(skill)) {
                                setIsInvalid(true);
                                return
                            };
                            handleAddSkill(skill);
                            onClose();
                        }}>
                        Confirm
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </section>
    );
};

export default Skills;

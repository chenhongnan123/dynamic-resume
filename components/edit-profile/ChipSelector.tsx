"use client";
import React, { useEffect } from "react";
import { useState, useMemo } from 'react';
import { BsPlusCircle } from "react-icons/bs";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Button, Chip, Input, Tooltip } from "@nextui-org/react"
import { useTranslation } from 'react-i18next';

enum ResultEnum {
    DEFAULT = 'default',
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    WARNING = 'warning',
    DANGER = 'danger',
}

const ChipSelector = ({
    chips,
    setChips,
    setUpdated,
    size,
  }: {
    chips: string[],
    setChips: (chips: string[]) => void,
    setUpdated: (chips: boolean) => void,
    size?: "sm" | "md" | "lg",
  }) => {
    const colors: ResultEnum[] = [
        ResultEnum.DEFAULT,
        ResultEnum.PRIMARY,
        ResultEnum.SECONDARY,
        ResultEnum.SUCCESS,
        ResultEnum.WARNING,
        ResultEnum.DANGER,
    ];
    const { t } = useTranslation();
    // const chipColor = useMemo((index: any): ResultEnum => {
    //     const colors: ResultEnum[] = [
    //         ResultEnum.DEFAULT,
    //         ResultEnum.PRIMARY,
    //         ResultEnum.SECONDARY,
    //         ResultEnum.SUCCESS,
    //         ResultEnum.WARNING,
    //         ResultEnum.DANGER,
    //     ];
    //     console.log(chips, 'chips');
    //     return chips.map(() => colors[Math.ceil(Math.random() * colors.length)]);
    // }, [chips])

    // const randomColor = (): ResultEnum => {
    //     const colors: ResultEnum[] = [
    //         ResultEnum.DEFAULT,
    //         ResultEnum.PRIMARY,
    //         ResultEnum.SECONDARY,
    //         ResultEnum.SUCCESS,
    //         ResultEnum.WARNING,
    //         ResultEnum.DANGER,
    //     ];
    //     const index = Math.ceil(Math.random() * colors.length);
    //     return colors[index];
    // }

    const [chip, setChip] = useState('');
    const [ isInvalid, setIsInvalid ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    

    const handleDeleteChips = (chipToRemove: string) => {
        setChips(chips.filter((chip: string) => chip !== chipToRemove));
        setUpdated(true);
    };

    const handleAddChips = (chip: string) => {
        setChips([...chips, chip]);
        setChip('');
        setUpdated(true);
    };

    return (
        <div className="py-8">
            <div className="flex gap-2 flex-wrap items-center">
                {chips.map((chip, index) => (
                    <Chip
                    key={index}
                    onClose={() => handleDeleteChips(chip)}
                    variant="shadow"
                    size={size}
                    color={colors[index > colors.length ? index % colors.length : index]}
                    >
                    {chip}
                    </Chip>
                ))}
                <Tooltip content={t('profile.addSkill')}>
                    <Button
                    color="primary"
                    className="text-md"
                    isIconOnly
                    variant="light"
                    size="md"
                    onPress={() => {
                        setChip('');
                        setIsInvalid(false);
                        onOpen();
                    }}
                    >
                        <BsPlusCircle className="text-xl" />
                    </Button>
                </Tooltip>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose: any) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">{t('profile.addSkill')}</ModalHeader>
                    <ModalBody>
                        <Input
                        value={chip}
                        type="text"
                        label={t('profile.addSkill')}
                        variant="bordered"
                        isInvalid={isInvalid}
                        color={isInvalid ? "danger" : "success"}
                        errorMessage={errorMessage}
                        onValueChange={(value: string) => {
                            setChip(value)
                            if (value === "") {
                                setIsInvalid(true);
                                setErrorMessage('Skill can not be is empty!');
                                return
                            };
                            if (chips.includes(value)) {
                                setIsInvalid(true);
                                setErrorMessage('Skill is already exists!');
                                return
                            };
                            if (!/^[a-zA-Z]+$/.test(value)) {
                                setIsInvalid(true);
                                setErrorMessage('Skill is only letters!');
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
                        {t('profile.close')}
                        </Button>
                        <Button color="primary" onPress={() => {
                            if (chip === "" || chips.includes(chip)) {
                                setIsInvalid(true);
                                return
                            };
                            handleAddChips(chip);
                            onClose();
                        }}>
                        {t('profile.confirm')}
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ChipSelector;

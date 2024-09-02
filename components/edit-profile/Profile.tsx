"use client";
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { httpPut, httpPost } from "@/lib/api";
import { UserInfo, File } from "@/types";
import { AiOutlineReload } from "react-icons/ai";
import { Tooltip } from "@nextui-org/react";
import { BsUpload, BsFillXCircleFill } from "react-icons/bs";
import { useTranslation } from 'react-i18next';

const NamePosition = ({
    userProfile,
    setUserProfile,
    init,
  }: {
    userProfile: UserInfo;
    setUserProfile: (userProfile: UserInfo) => void;
    init: () => void;
  }) => {
    const { t } = useTranslation();
    const [ isUpdated, setUpdated ] = useState(false);
    async function updateintroduction() {
        const {
            id,
            sub,
            name,
            position,
            introduction,
            hireLink,
            fileName,
            filePath,
        } = userProfile;
        const payload = {
            id,
            sub,
            name,
            position,
            introduction,
            hireLink,
            fileName,
            filePath,
        }
        const result = await httpPut(`${window.location.origin}/api/user`, payload)
        if (result) {
            setUpdated(false);
            window.enqueueSnackbar('Successfully updated', { variant: "success" });
        }
    }

    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        console.log(e.target.files, 'e.target.files');
        if (e.target.files[0].size / 1024 / 1024 > 10) {
            window.enqueueSnackbar('最大上传10M', { variant: "error" } );
            return;
        }
        const payload = new FormData();
        payload.append('file', e.target.files[0]);
        const result = await httpPost(`${window.location.origin}/api/file/upload`, payload, {
            headers: {
                "Content-Type": "multipart/form-data; boundary=----"
            }
        } as any) as File;
        setUserProfile({
            ...userProfile,
            fileName: result.fileName,
            filePath: result.filePath,
        })
        setUpdated(true)
    }

    const inputStyles = 'block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
    return (
        <section className="py-8"  id="profile">
            <div className="flex">
                <div className="leading-8 font-medium text-xl">{t('profile.profile')}</div>
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
                onClick={updateintroduction}
                >
                    {t('profile.save')}
                </Button>
            </div>
            <div className="mt-2.5 grid md:grid-cols-1 md:grid-cols-2 md:gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-semibold leading-6">{t('profile.name')}</label>
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
                    <label htmlFor="position" className="block text-sm font-semibold leading-6">{t('profile.position')}</label>
                    <input
                    type="text"
                    name="position"
                    id="position"
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
                    <label htmlFor="introduction" className="block text-sm font-semibold leading-6">{t('profile.introduction')}</label>
                    <textarea
                    name="introduction"
                    id="introduction"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={userProfile.introduction || ""}
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
                <div className="mt-2.5 md:mt-0 ">
                    <label htmlFor="hireLink" className="block text-sm font-semibold leading-6">{t('profile.hireLink')}</label>
                    <input
                    type="text"
                    name="hireLink"
                    id="hireLink"
                    className={inputStyles}
                    value={userProfile.hireLink || ''}
                    onChange={(e) => {
                        setUserProfile({
                            ...userProfile,
                            hireLink: e.target.value
                        })
                        setUpdated(true)
                    }}
                    />
                </div>
                <div className="mt-2.5 md:mt-0 ">
                    {
                        !userProfile.filePath ?
                        <div className="mt-6">
                            <Tooltip content="Upload">
                                <Button
                                color="primary"
                                className="text-md w-full"
                                size="md"
                                >
                                    <label htmlFor="profileFile" className="w-full block text-sm font-semibold leading-6 flex justify-center gap-2">
                                        <BsUpload className="text-xl" />
                                        <span>{t('profile.uploadCV')}</span>
                                    </label>
                                </Button>
                            </Tooltip>
                            <input type="file" id="profileFile" className="hidden" accept=".doc,.docx,.pdf"  onChange={handleUploadFile} />
                        </div> :
                        <div className="mt-6 text-center">
                            <a href={userProfile.filePath} className="underline text-blue-500 hover:text-blue-700" target="_blank">{userProfile.fileName}</a>
                            <Button
                            color="danger"
                            className="text-md"
                            isIconOnly
                            variant="light"
                            size="md"
                            onClick={() => {
                                setUserProfile({
                                    ...userProfile,
                                    fileName: "",
                                    filePath: "",
                                })
                                setUpdated(true)
                            }}
                            >
                                <BsFillXCircleFill className="text-xl" />
                            </Button>
                        </div>
                    }
                </div>
            </div>
            
        </section>
    );
};

export default NamePosition;

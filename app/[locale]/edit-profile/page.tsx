"use client"
import React from "react";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { httpGet } from "@/lib/api";
import { UserInfo } from "@/types";
import NamePosition from "@/components/edit-profile/NamePosition";
import PersonalItroduction from "@/components/edit-profile/PersonalItroduction";
import Skills from "@/components/edit-profile/Skills";
import ProjectExp from "@/components/edit-profile/ProjectExp";
import { useTranslation } from 'react-i18next';
import { useSession } from "next-auth/react";

export default function EditProfile() {
    const { data: session } = useSession();
    const userInfo = session?.user;
    const { i18n } = useTranslation();
    const langName = i18n.language;
    if (!userInfo) {
      const router = useRouter()
      router.push(`/${langName}/login`)
    }
    const [ userProfile, setUserProfile ] = useState<UserInfo>({})
    useEffect(() => {
      async function init() {
        const result = await httpGet(`${window.location.origin}/api/user?username=${userInfo?.name}`) as UserInfo
        setUserProfile(result)
      }
      init()
    }, [userInfo]);
    return <>
        <NamePosition userProfile={userProfile} setUserProfile={setUserProfile}/>
        <PersonalItroduction userProfile={userProfile} setUserProfile={setUserProfile}/>
        <Skills userProfile={userProfile} />
        <ProjectExp userProfile={userProfile} />
    </>
  }
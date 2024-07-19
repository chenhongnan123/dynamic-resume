"use client"
import React from "react";
import { useContext, useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { rootContext } from "@/components/RootProvider";
import { httpGet, httpPut } from "@/lib/api";
import { UserInfo } from "@/types";
import NamePosition from "@/components/edit-profile/NamePosition";
import PersonalItroduction from "@/components/edit-profile/PersonalItroduction";
import Skills from "@/components/edit-profile/Skills";
import ProjectExp from "@/components/edit-profile/ProjectExp";

export default function EditProfile() {
    const { userInfo, headerDict, langName } = useContext(rootContext)
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
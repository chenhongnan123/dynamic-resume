"use client";
import React from "react";
import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { rootContext } from "@/components/RootProvider";
import { httpGet, httpPut } from "@/lib/api";
import PersonalIntroduction from "@/components/home/PersonalIntroduction";
import Skills from "@/components/home/Skills";
import { UserInfo } from "@/types";

const MainContainer = () => {
  const { userInfo, headerDict, langName } = useContext(rootContext)
  const threeSenceRef = useRef(null);
  if (!userInfo) {
    const router = useRouter()
    router.push(`/${langName}/login`)
  }
  const [ userProfile, setUserProfile ] = useState<UserInfo>({})
  useEffect(() => {
    async function init() {
      const result = await httpGet(`${window.location.origin}/api/user?username=${userInfo?.name}`) as UserInfo
      setUserProfile(result)
      console.log(threeSenceRef.current, 'threeSenceRef')
    }
    init()
  }, [userInfo]);
  return (
    <>
      <PersonalIntroduction userProfile={userProfile}/>
      <div id="threeSence" ref={threeSenceRef} className="h-96 w-screenr"></div>
      <Skills renderDom={threeSenceRef.current} userProfile={userProfile}/>
    </>
  );
};

export default MainContainer;

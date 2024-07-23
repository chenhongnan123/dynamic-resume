"use client";
import React from "react";
import { useEffect, useState, useRef } from 'react';
import { httpGet } from "@/lib/api";
import PersonalIntroduction from "@/components/home/PersonalIntroduction";
import Skills from "@/components/home/Skills";
import ProjectExp from "@/components/home/ProjectExp";
import { UserInfo } from "@/types";
import { useSession, signIn } from "next-auth/react";
import {useLocale} from 'react-aria';

const MainContainer = () => {
  const threeSenceRef = useRef(null);
  const { data: session } = useSession()
  console.log(session, 'session999')
  let test = useLocale();
  console.log(test, 'locale, direction')
  // if (!userInfo) {
  //   const router = useRouter()
  //   router.push(`/${langName}/login`)
  // }
  const [ userProfile, setUserProfile ] = useState<UserInfo | null>()
  useEffect(() => {
    async function init() {
      const result = await httpGet(`${window.location.origin}/api/user?username=${session?.user?.name}`) as UserInfo
      setUserProfile(result)
    }
    init()
  }, [session]);
  return (
    userProfile ?
    <>
      <PersonalIntroduction userProfile={userProfile}/>
      <div id="threeSence" ref={threeSenceRef} className="h-96 w-screenr"></div>
      <Skills renderDom={threeSenceRef as any} userProfile={userProfile}/>
      <ProjectExp userProfile={userProfile}/>
    </> : <></>
  );
};

export default MainContainer;

"use client";
import React from "react";
import { useEffect, useState, useRef } from 'react';
import { httpGet } from "@/lib/api";
import Profile from "@/components/home/Profile";
import Skills from "@/components/home/Skills";
import ProjectExp from "@/components/home/ProjectExp";
import { UserInfo } from "@/types";
import { useParams } from "next/navigation";

const MainContainer = () => {
  const params = useParams();
  const threeSenceRef = useRef(null);
  const [ userProfile, setUserProfile ] = useState<UserInfo | null>();
  useEffect(() => {
    async function init() {
      const result = await httpGet(`${window.location.origin}/api/user?username=${params.user}`) as UserInfo
      setUserProfile(result)
    }
    init()
  }, [params.user]);
  return (
    userProfile ?
    <>
      <Profile userProfile={userProfile}/>
      <div id="skills" ref={threeSenceRef} className="h-96 w-screenr"></div>
      <Skills renderDom={threeSenceRef as any} skills={userProfile.skills || ''}/>
      <ProjectExp userProfile={userProfile}/>
    </> : <></>
  );
};

export default MainContainer;

"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { UserInfo, Skill } from "@/types";
import { httpGet, httpPost } from "@/lib/api";
import ThreeCanvas from "./ThreeCanvas"

let reactRenderDom: any = null

const Skills = ({ userProfile, renderDom }: {
  userProfile: UserInfo,
  renderDom: any
}) => {
  const [skills, setSkills] = useState<(string)[]>([]);
  useEffect(() => {
    async function init() {
        const result = await httpGet(`${window.location.origin}/api/skill?username=${userProfile?.username}`) as Skill[];
        console.log(result, 'result')
        if (result) {
            const skills = result.map((skill: Skill) => skill.name?.toUpperCase()) as string[]
            setSkills(skills);
        }
    }
    init()
  }, [userProfile]);
  useEffect(() => {
    if (!renderDom?.current) {
      return
    }
    if (!reactRenderDom) {
      reactRenderDom = createRoot(renderDom.current);
      return;
    }
    reactRenderDom.render(
      <ThreeCanvas skills={skills}/>,
    )
  }, [renderDom, skills])
  return <></>
}

export default Skills;
"use client"
import * as THREE from 'three'
import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useEffect } from 'react'
import { UserInfo, Skill } from "@/types";
import { httpGet, httpPost } from "@/lib/api";
import ThreeCanvas from "./ThreeCanvas"

let reactRenderDom: any = null

const ThreeSence = ({ userProfile, renderDom }: {
  userProfile: UserInfo,
  renderDom: HTMLElement | null
}) => {
  const [skills, setSkills] = useState<(string)[]>([]);
  console.log(userProfile, 'userProfile')
  useEffect(() => {
    async function init() {
        const result = await httpGet(`${window.location.origin}/api/skill?username=${userProfile?.username}`) as Skill[];
        console.log(result, 'result')
        if (result) {
            const skills = result.map((skill: Skill) => skill.name?.toUpperCase()) as string[]
            setSkills(skills);
        }
        // setSkills(["VUE", "REACT", "NODE", "NEXT"]);
    }
    init()
  }, [userProfile]);
  useEffect(() => {
    if (!renderDom) {
      return
    }
    if (!reactRenderDom) {
      reactRenderDom = createRoot(renderDom);
    }
    reactRenderDom.render(
      <ThreeCanvas skills={skills}/>,
    )
  }, [renderDom, skills])
  return <></>
}

export default ThreeSence;
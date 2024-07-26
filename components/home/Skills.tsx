"use client"
import { createRoot } from 'react-dom/client'
import React, { useEffect, useMemo } from 'react'
import ThreeCanvas from "./ThreeCanvas"

let reactRenderDom: any = null

const Skills = ({ skills, renderDom }: {
  skills: string,
  renderDom: any
}) => {
  const skillsArr = useMemo(() => skills ? skills.toUpperCase().split(',') : [], [skills]);

  useEffect(() => {
    if (!renderDom?.current) {
      return
    }
    if (!reactRenderDom) {
      reactRenderDom = createRoot(renderDom.current);
      return;
    }
    reactRenderDom.render(
      <ThreeCanvas skills={skillsArr}/>,
    )
  }, [renderDom, skills])
  return <></>
}

export default Skills;
"use client"
import { createRoot } from 'react-dom/client'
import React, { useEffect, useMemo } from 'react'
import ThreeCanvas from "./ThreeCanvas"

const Skills = ({ skills, renderDom }: {
  skills: string,
  renderDom: any
}) => {
  const skillsArr = useMemo(() => skills ? skills.toUpperCase().split(',') : [], [skills]);
  let reactRenderDom: any = null;

  useEffect(() => {
    if (!renderDom?.current) {
      return
    }
    if (!reactRenderDom) {
      reactRenderDom = createRoot(renderDom.current);
    }
    reactRenderDom.render(
      <ThreeCanvas skills={skillsArr}/>,
    )
  }, [renderDom, skills])
  return <></>
}

export default Skills;
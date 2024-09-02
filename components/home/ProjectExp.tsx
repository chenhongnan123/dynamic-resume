"use client";
import React from "react";
import { useState, useEffect } from 'react';
import { UserInfo, ProjectExpType } from "@/types";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { BsPersonWorkspace } from "react-icons/bs";
import { useTheme } from "next-themes";
import { httpGet } from "@/lib/api";
import moment from "moment";
import { Chip } from "@nextui-org/react"


enum ResultEnum {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger',
}

const ProjectExp = ({
  userProfile,
}: {
  userProfile: UserInfo,
}) => {
  const { theme } = useTheme();
  const initialItem = {
    id: Date.now(),
    order: 1,
    durationTime: [Date.now() - 1000 * 60 * 60 * 24 * 30, Date.now()],
    technology_stack: [],
    company_name: "",
    details: "",
  };

  const colors: ResultEnum[] = [
    ResultEnum.DEFAULT,
    ResultEnum.PRIMARY,
    ResultEnum.SECONDARY,
    ResultEnum.SUCCESS,
    ResultEnum.WARNING,
    ResultEnum.DANGER,
];

  const [ projectExpList, setProjectExpList ] = useState([initialItem]);
  useEffect(() => {
    async function init() {
        const result = await httpGet(`${window.location.origin}/api/projectexp?username=${userProfile?.username}`) as ProjectExpType[];
        if (result) {
            if (result.length > 0) {
                const list = result.map(item => ({
                    ...item,
                    technology_stack: item.technology_stack ? (item.technology_stack as string)?.split(',') : [],
                })).sort((a, b) => a.order - b.order);;
                setProjectExpList(list);
                return;
            }
            setProjectExpList([initialItem]);
        }
    }
    init()
  }, [userProfile]);

  const dateView = (item: ProjectExpType) => {
    return (
      <div  className="text-white md:text-transparent  md:bg-clip-text md:bg-gradient-to-r md:from-primary-400 md:to-secondary-600 -mt-3">
        <div>
          {moment(item.durationTime[0]).format('YYYY-MM-DD')} - {moment(item.durationTime[1]).format('YYYY-MM-DD')}
        </div>
        <div>{item.company_name}</div>
      </div>
    )
  }
  const isDark = theme === 'dark';
  const showdowColor = isDark ? '0 0 0 4px #fff, inset 0 2px #00000014, 0 3px 0 4px #0000000d' : '0 0 0 4px #7bd964, inset 0 2px #00000014, 0 3px 0 4px #0000000d';
  return (
    <div id="experience">
      <VerticalTimeline lineColor={isDark ? '#fff' : '#7bd964'} >
        {
          projectExpList.map((item: ProjectExpType) => (
            <VerticalTimelineElement
              key={item.id}
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
              date={dateView(item) as any}
              iconClassName={'shadow-black'}
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff', boxShadow: showdowColor} as any}
              icon={<BsPersonWorkspace />}
              visible={true}
            >
              <div className="flex gap-2 flex-wrap items-center">
                {(item.technology_stack as string[]).map((chip, index) => (
                    <Chip
                    key={index}
                    variant="shadow"
                    size={'md'}
                    color={colors[index > colors.length ? index % colors.length : index]}
                    >
                    {chip}
                    </Chip>
                ))}
              </div>
              <p>Show:  <a href={item.filePath as string} className="underline hover:text-blue-500 text-blue-700" target="_blank">{item.fileName}</a></p>
              <p className="text-pretty break-all" dangerouslySetInnerHTML={{
                __html: item.details?.replace(/\n/g, "<br>") || ''
              }}>
              </p>
            </VerticalTimelineElement>
          ))
        }
      </VerticalTimeline>
    </div>
  );
};

export default ProjectExp;

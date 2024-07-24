import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { getCurrentUser } from "@/lib/session";
import { UserInfo, ProjectExpType } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url) 
    const username = searchParams.get('username')
    if (!username) {
      const result = {
        code: ResultEnum.MISSPARAMS,
        data: {},
        msg: 'require username'
      }
      return NextResponse.json(result);
    }
    const lang = headers().get('Lang')
    const select = {
      id: true,
      userid: true,
      usersub: true,
      username: true,
      durationTime: true,
      technologyStackZh: lang === 'cn',
      technologyStackEn: lang === 'en',
      companyNameZh: lang === 'cn',
      companyNameEn: lang === 'en',
      detailsZh: lang === 'cn',
      detailsEn: lang === 'en',
      fileName: true,
      filePath: true,
      fileSize: true,
      fileType: true,
      createdAt: true,
      updatedAt: true,
    }
    const projectExpList = await prisma.projectExp.findMany({
      where: {
        username,
      },
      select,
    });
    const payload = projectExpList.map((item) => ({
      ...item,
      technologyStack: lang === 'en' ? item.technologyStackEn : item.technologyStackZh,
      technologyStackEn: null,
      technologyStackZh: null,
      companyName: lang === 'en' ? item.companyNameEn : item.companyNameZh,
      companyNameEn: null,
      companyNameZh: null,
      details: lang === 'en' ? item.detailsEn : item.detailsZh,
      detailsEn: null,
      detailsZh: null,
      durationTime: item.durationTime ? item.durationTime.split(',').map(item => Number(item)) : [],
    }))
    const result = {
      code: ResultEnum.SUCCESS,
      data: payload || [],
      msg: ResultMessageEnum.SUCCESS
    }
    return NextResponse.json(result)
  } catch (e) {
    console.log(e)
    const result = {
      code: ResultEnum.SERVER_ERROR,
      data: [],
      msg: e
    }
    return NextResponse.json(result);
  }
}

export async function POST(req: NextRequest) {
  try {
    const authorization = headers().get('authorization')
    const lang = headers().get('Lang')
    const userInfo = await getCurrentUser() as UserInfo
    if (authorization !== userInfo?.jti) {
      const result = {
        code: ResultEnum.TOKEN_OVERDUE,
        msg: ResultMessageEnum.TOKEN_OVERDUE
      }
      return NextResponse.json(result);
    }
    const body = await req.json();
    const payload = body.map((item: ProjectExpType) => ({
      userid: item.userid,
      username: item.username,
      usersub: item.usersub,
      updatedAt: new Date(),
      [lang === 'en' ? 'technologyStackEn' : 'technologyStackZh']: item.technologyStack,
      [lang === 'en' ? 'companyNameEn' : 'companyNameZh']: item.companyName,
      [lang === 'en' ? 'detailsEn' : 'detailsZh']: item.details,
      durationTime: item.durationTime?.length > 0 ? `${item.durationTime[0]},${item.durationTime[1]}` : '',
      fileName: item.fileName,
      filePath: item.filePath,
      fileSize: item.fileSize,
      fileType: item.fileType,
    }))
    await prisma.projectExp.deleteMany({
      where: {
        username: {
          contains: payload.username,
        },
      },
    })
    await prisma.projectExp.createMany({
      data: payload,
      // skipDuplicates: true,
    })
    const result = {
      code: ResultEnum.SUCCESS,
      msg: ResultMessageEnum.SUCCESS
    }
    return NextResponse.json(result)
  } catch (e) {
    console.log(e)
    const result = {
      code: ResultEnum.SERVER_ERROR,
      data: {},
      msg: e
    }
    return NextResponse.json(result);
  }
}
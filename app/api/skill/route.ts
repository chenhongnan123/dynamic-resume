import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { getCurrentUser } from "@/lib/session";
import { UserInfo, Skill } from "@/types";

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
      nameCn: lang === 'zh',
      nameEn: lang === 'en',
      createdAt: true,
      updatedAt: true,
    }
    const user = await prisma.skill.findMany({
      where: {
        username,
      },
      select,
    })
    const payload = user.map((item) => ({
      ...item,
      name: lang === 'en' ? item.nameEn : item.nameCn,
      nameEn: null,
      nameCn: null,
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
    const payload = body.map((item: Skill) => ({
      userid: item.userid,
      username: item.username,
      usersub: item.usersub,
      updatedAt: new Date(),
      [lang === 'en' ? 'nameEn' : 'nameCn']: item.name,
    }))
    await prisma.skill.deleteMany({
      where: {
        username: {
          contains: payload.username,
        },
      },
    })
    await prisma.skill.createMany({
      data: payload,
      skipDuplicates: true,
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
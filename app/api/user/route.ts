import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types";

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
      username: true,
      sub: true,
      platform: true,
      avatar: true,
      email: true,
      createdAt: true,
      updatedAt: true,
      nameCn: lang === 'zh',
      nameEn: lang === 'en',
      positionCn: lang === 'zh',
      positionEn: lang === 'en',
      personalIntroductionCn: lang === 'zh',
      personalIntroductionEn: lang === 'en',
    }
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select,
    })
    const payload = {...user} as UserInfo
    if (lang === 'en') {
      payload.name = payload.nameEn
      payload.position = payload.positionEn
      payload.personalIntroduction = payload.personalIntroductionEn
    } else {
      payload.name = payload.nameCn
      payload.position = payload.positionCn
      payload.personalIntroduction = payload.personalIntroductionCn
    }
    const result = {
      code: ResultEnum.SUCCESS,
      data: payload || {},
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

export async function PUT(req: NextRequest) {
  try {
    const authorization = headers().get('authorization')
    const lang = headers().get('Lang')
    const userInfo = await getCurrentUser() as UserInfo
    if (authorization !== userInfo?.jti) {
      const result = {
        code: ResultEnum.TOKEN_OVERDUE,
        data: {},
        msg: ResultMessageEnum.TOKEN_OVERDUE
      }
      return NextResponse.json(result);
    }
    const body = await req.json();
    const payload = {
      ...body,
      updatedAt: new Date()
    };
    if (lang === 'en') {
      payload.nameEn = payload.name
      payload.positionEn = payload.position
      payload.personalIntroductionEn = payload.personalIntroduction
    } else {
      payload.nameCn = payload.name
      payload.positionCn = payload.position
      payload.personalIntroductionCn = payload.personalIntroduction
    }
    delete payload.id
    delete payload.name
    delete payload.position
    delete payload.personalIntroduction
    const user = await prisma.user.update({
      where: {
        sub: payload.sub
      },
      data: payload
    })
    const result = {
      code: ResultEnum.SUCCESS,
      data: user || {},
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
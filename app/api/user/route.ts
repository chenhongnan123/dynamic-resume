import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import i18nConfig from "@/i18nConfig";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const {
  locales,
  defaultLocale,
} = i18nConfig;

const i18nMapList = ['name', 'position', 'introduction', 'skills'];

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
    let lang = headers().get('Lang');
    if (!lang || !locales.includes(lang)) {
      lang = defaultLocale;
    }
    const select = {
      id: true,
      username: true,
      sub: true,
      platform: true,
      avatar: true,
      email: true,
      hireLink: true,
      fileName: true,
      filePath: true,
      createdAt: true,
      updatedAt: true,
    } as { [key: string]: boolean }
    i18nMapList.forEach((item) => {
      select[`${item}_${lang}`] = true
    });
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
      select,
    })
    const payload = {...user} as { [key: string]: boolean | string }
    i18nMapList.forEach((item) => {
      payload[item] = payload[`${item}_${lang}`];
      delete payload[`${item}_${lang}`];
    });
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
    const session = await getServerSession(authOptions);
    // const test = null;
    // test.a = 0;
    const lang = headers().get('Lang')
    if (!session) {
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
    i18nMapList.forEach((item) => {
      if (payload.hasOwnProperty(item)) {
        payload[`${item}_${lang}`] = payload[item];
        delete payload[item];
      }
    });
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
    console.log(e);
    const result = {
      code: ResultEnum.SERVER_ERROR,
      data: {},
      msg: e
    }
    return NextResponse.json(result);
  }
}
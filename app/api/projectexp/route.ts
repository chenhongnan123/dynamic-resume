import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { ProjectExpType } from "@/types";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const i18nMapList = ['company_name', 'technology_stack', 'details'] as (keyof ProjectExpType)[];

console.log(BigInt("1721886328197"), 'BigInt')

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
      fileName: true,
      filePath: true,
      fileSize: true,
      fileType: true,
      createdAt: true,
      updatedAt: true,
      timestamp: true,
      order: true,
    } as { [key: string]: boolean }
    i18nMapList.forEach((item) => {
      select[`${item}_${lang}`] = true
    });
    const projectExpList = await prisma.projectExp.findMany({
      where: {
        AND: {
          username,
          lang,
        }
      } as any,
      select,
    });
    const payload = projectExpList.map((item) => ({
      ...item,
      timestamp: Number(BigInt(item.timestamp)),
      durationTime: item.durationTime ? (item.durationTime as string).split(',').map(item => Number(item)) : [],
    })) as ProjectExpType[]
    i18nMapList.forEach((key) => {
      payload.forEach((item: any) => {
        if (item[`${key}_${lang}`]) {
          item[key] = item[`${key}_${lang}`];
          delete item[`${key}_${lang}`];
        }
      });
    });
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
    const session = await getServerSession(authOptions);
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
    const payload = body.map((item: ProjectExpType) => {
      const obj = {
        ...item,
        lang,
        updatedAt: new Date(),
        durationTime: item.durationTime?.length > 0 ? `${item.durationTime[0]},${item.durationTime[1]}` : '',
      } as { [key: string]: any }
      i18nMapList.forEach((key) => {
        obj[`${key}_${lang}`] = obj[key];
        delete obj[key];
      });
      return obj;
    })
    // i18nMapList.forEach((key) => {
    //   payload.forEach((item: any) => {
    //     if (item[key]) {
    //       item[`${key}_${lang}`] = item[key];
    //       delete item[key];
    //     }
    //   });
    // });
    // console.log(payload, 'payload');
    await prisma.projectExp.deleteMany({
      where: {
        username: payload.username,
        lang,
      } as any,
    })
    await prisma.projectExp.createMany({
      data: payload,
      // skipDuplicates: true,
    })
    // payload.forEach(async (item: any) => {
    //   await prisma.projectExp.upsert({
    //     where: {
    //       timestamp: item.timestamp,
    //     } as any,
    //     update: item,
    //     create: item,
    //   })
    // })
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
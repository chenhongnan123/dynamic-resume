import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types";
import { writeFile } from "fs/promises";


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
    const formData = await req.formData();
    const file = formData.get("file") as File;
    console.log(file, 'file');
    // 将文件保存到服务器的文件系统中
    const fileBuffer = await file.arrayBuffer();
    const filePath = "public/files/" + file.name;
    await writeFile(filePath, Buffer.from(fileBuffer));
    const result = {
      code: ResultEnum.SUCCESS,
      data: {
        filePath: "/files/" + file.name,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      },
      msg: ResultMessageEnum.SUCCESS
    }
    return NextResponse.json(result);
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
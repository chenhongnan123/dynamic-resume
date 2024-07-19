import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { getCurrentUser } from "@/lib/session";
import { UserInfo, Skill } from "@/types";
import { writeFile } from "fs/promises";


export async function POST(req: NextRequest) {
  const formData = await req.formData();
  // 获取上传文件
  const file = formData.get("file") as File;
  // 将文件保存到服务器的文件系统中
  const fileBuffer = await file.arrayBuffer();
  await writeFile("uploads/" + file.name, Buffer.from(fileBuffer));

  return new NextResponse("uploads/" + file.name, { status: 200 });
}
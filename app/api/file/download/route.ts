import { NextRequest, NextResponse } from "next/server";
import { headers } from 'next/headers'
import prisma from "@/lib/prisma";
import { ResultEnum, ResultMessageEnum } from '@/enums/httpEnum'
import { getCurrentUser } from "@/lib/session";
import { UserInfo, Skill } from "@/types";
import { writeFile } from "fs/promises";
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest, res: NextResponse) {
  const filePath = 'files/20231228_100308.mp4'
  const fileContent = fs.readFileSync(filePath);
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
  return new NextResponse(fileContent, { status: 200, headers: {
    // "Content-Type": "image/*",
    "Content-Disposition": `attachment; filename=${filePath}`
  }, });
}
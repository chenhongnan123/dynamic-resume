import { getServerSession } from "next-auth/next"
import { Session } from "next-auth"
 
import { authOptions } from "@/lib/auth"
 
export async function getCurrentUser(): Promise<Session | null>{
  const session = await getServerSession(authOptions)
  return session
}
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
    // session: {
    //     strategy: "jwt",
    // },
    // pages: {
    //     signIn: "/auth/login",
    //     signOut: '/auth/logout',
    // },
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? "",
        }),
    ],
    callbacks: {
        session: async ({ session, token } : any) => {
          try {
            const res = await prisma.user.upsert({
              where: {
                sub: token.sub
              },
              update: {
                // 使用token中的数据
                username: token.name || '',
                avatar: token.picture || '',
                email: token.email || '',
              },
              create: {
                // 使用token中的数据 
                sub: token.sub || '',
                username: token.name || '',
                avatar: token.picture || '',
                email: token.email || '',
                platform: 'github',
              }
            })
            return session
          } catch (error) {
            console.log(error, 'error')
            return session
          }
        },
      } as any,
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
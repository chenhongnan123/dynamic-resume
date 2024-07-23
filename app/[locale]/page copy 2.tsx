// import initTranslations from '../i18n';
// import TranslationsProvider from '@/components/TranslationsProvider';
// import MainContainer from "@/components/home/MainContainer";

// const i18nNamespaces = ['home'];

// export default async function LangHome({
//     params: { locale },
//   }: {
//     params: { locale: string };
//   }) {
//     const { t, resources } = await initTranslations(locale, i18nNamespaces);
//     return <>
//       <TranslationsProvider
//       namespaces={i18nNamespaces}
//       locale={locale}
//       resources={resources}>
//         {/* <MainContainer /> */}
//         <h1>{t('test')}</h1>
//       </TranslationsProvider>
//     </>
//   }

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

import { Providers } from "../providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

import { getCurrentUser } from "@/lib/session";
import { redirect } from 'next/navigation'
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import MainContainer from "@/components/home/MainContainer";

const i18nNamespaces = ['home'];

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  const userInfo = await getCurrentUser();
  const session = await getServerSession();
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }} userInfo={userInfo}>
          <SessionProvider session={session}>
            <div className="relative flex flex-col h-screen">
              <Navbar/>
              <main className="container mx-auto max-w-7xl px-6 flex-grow">
                <div>{t('test')}</div>
                <MainContainer />
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600">Powered by</span>
                  <p className="text-primary">NextUI</p>
                </Link>
              </footer>
            </div>
          </SessionProvider>
        </Providers>
      </body>
    </html>
  );
}

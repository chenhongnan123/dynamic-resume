import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import { Providers } from "../providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/navbar";

import SessionProvider from "@/components/SessionProvider";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "@/lib/auth";

import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';

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
  children,
}: {
  params: { locale: string };
  children: React.ReactNode;
}) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);
  // const userInfo = await getCurrentUser();
  const session = await getServerSession(authOptions) as Session | null | undefined;
  // const session = await getServerSession();
  // console.log(resources, 'resources')
  return (
    <TranslationsProvider
    namespaces={i18nNamespaces}
    locale={locale}
    resources={resources}>
      <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
        <SessionProvider session={session}>
            <div className="relative flex flex-col h-screen">
              <Navbar/>
              <main className="container mx-auto max-w-7xl px-6 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600">{t('footer.poweredBy')}</span>
                  <p className="text-primary">{t('footer.nextUi')}</p>
                </Link>
              </footer>
            </div>
        </SessionProvider>
      </Providers>
    </TranslationsProvider>
);
}

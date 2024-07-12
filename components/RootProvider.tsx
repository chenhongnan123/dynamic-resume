"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { createContext, useState, useEffect } from 'react';
import { getDictionary, defaultLocale } from "@/lib/i18n";

export const rootContext = createContext<any>(null);
export function RootProvider({ children, userInfo }: {
  children: React.ReactNode;
  userInfo: any;
}) {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang;
  if (!lang) {
    router.push(`/${defaultLocale}`)
  }
  const langName = (lang || defaultLocale) as string;
  const [headerDict, setHeaderDict] = useState<any>({})

  useEffect(() => {
    async function init() {
      const dict = await getDictionary(langName);
      setHeaderDict(dict.header);
    }
    init()
  });
  return (
    <rootContext.Provider value={{userInfo, headerDict}}>
      {children}
    </rootContext.Provider>
   
  );
}

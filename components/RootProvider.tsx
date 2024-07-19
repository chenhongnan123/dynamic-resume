"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { createContext, useState, useEffect } from 'react';
import { getDictionary, defaultLocale } from "@/lib/i18n";
import axiosInstance from "@/lib/api/axios";
import {I18nProvider} from '@react-aria/i18n';

export const rootContext = createContext<any>(null);
export function RootProvider({ children, userInfo }: {
  children: React.ReactNode;
  userInfo: any;
}) {
  axiosInstance.defaults.headers.common.Authorization = userInfo?.jti
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang;
  axiosInstance.defaults.headers.common.lang = lang
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
    <rootContext.Provider value={{userInfo, headerDict, langName}}>
      <I18nProvider locale={langName === "en" ? "en-EN" : "zh-CN"}>
        {children}
      </I18nProvider>
    </rootContext.Provider>
   
  );
}

"use client";

import * as React from "react";
import { useRouter, useParams } from "next/navigation";
import { createContext, useState, useEffect } from 'react';
import { getDictionary, defaultLocale } from "@/lib/i18n";
import axiosInstance from "@/lib/api/axios";
import {I18nProvider} from '@react-aria/i18n';
import { useTranslation } from 'react-i18next';

export const rootContext = createContext<any>(null);
export function RootProvider({ children, userInfo }: {
  children: React.ReactNode;
  userInfo: any;
}) {
  axiosInstance.defaults.headers.common.Authorization = userInfo?.jti
  const { t, i18n } = useTranslation();
  const liStyles = "flex flex-col gap-2 text-sm font-medium text-inherit";
  const langName = i18n.language;
  axiosInstance.defaults.headers.common.lang = langName;
  console.log("langName", langName);
  return (
    <rootContext.Provider value={{userInfo}}>
      <I18nProvider locale={langName === "en" ? "en-EN" : "zh-CN"}>
        {children}
      </I18nProvider>
    </rootContext.Provider>
   
  );
}

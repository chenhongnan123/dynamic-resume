"use client";

import * as React from "react";
import axiosInstance from "@/lib/api/axios";
import {I18nProvider} from '@react-aria/i18n';
import { useTranslation } from 'react-i18next';

export function I18nNextUIProvider() {
  axiosInstance.defaults.headers.common.Authorization = userInfo?.jti
  const { i18n } = useTranslation();
  const langName = i18n.language;
  axiosInstance.defaults.headers.common.lang = langName;
  console.log("langName", langName);
  return (
    <I18nProvider locale={langName === "en" ? "en-EN" : "zh-CN"}>
      {children}
    </I18nProvider>
  );
}

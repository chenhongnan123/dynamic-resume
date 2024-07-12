"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter, useParams } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { createContext, useState, useEffect } from 'react';
import { getDictionary, defaultLocale } from "@/lib/i18n";
import { RootProvider } from "@/components/RootProvider"

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  userInfo: any;
}

export const userInfoContext = createContext<any>(null);
export function Providers({ children, themeProps, userInfo }: ProvidersProps) {
  const router = useRouter();
  return (
    <RootProvider userInfo={userInfo}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </NextUIProvider>
    </ RootProvider>
  );
}

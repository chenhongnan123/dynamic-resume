"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter, useParams } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { I18nProvider } from '@react-aria/i18n';
import axiosInstance from "@/lib/api/axios";
import { useTranslation } from 'react-i18next';
import { SnackbarProvider } from 'notistack';
import { Spinner, Modal, useDisclosure, Button, ModalContent, ModalBody } from "@nextui-org/react";
import { useEffect } from "react";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const { i18n } = useTranslation();
  const langName = i18n.language;
  axiosInstance.defaults.headers.common.Lang = langName;
  const router = useRouter();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  if (window) {
    window.showLoading = onOpen;
    window.hideLoading = onClose;
  }
  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <I18nProvider locale={langName === "en" ? "en-EN" : "zh-CN"}>
          <SnackbarProvider anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
            <Modal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              isDismissable={false}
              hideCloseButton={true}
            >
                <ModalContent className="bg-none-100">
                  <ModalBody>
                    <Spinner size="lg"/>
                  </ModalBody>
                </ModalContent>
            </Modal>
            {children}
          </ SnackbarProvider>
        </I18nProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}

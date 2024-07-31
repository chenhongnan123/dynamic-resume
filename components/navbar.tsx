"use client";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { AiOutlineMenu, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { LiaAddressCard } from "react-icons/lia";
import { useState, useEffect } from 'react';
import { ThemeSwitch } from "@/components/navbar/theme-switch";
import { LangSwitcher } from "@/components/navbar/LangSwitcher";
import { LoginAvatar } from '@/components/navbar/LoginAvatar'
import { useTranslation } from 'react-i18next';
import { useSession } from "next-auth/react";
import { useSnackbar } from 'notistack';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const links = [
  {
    value: "profile",
    href: "#profile",
  },
  {
    value: "skills",
    href: "#skills",
  },
  {
    value: "experience",
    href: "#experience",
  },
];

let homeViewFlag = localStorage.getItem('homeViewFlag');
let editPageViewFlag = localStorage.getItem('editPageViewFlag');

export const Navbar = () => {
  const { data: session } = useSession();
  const userInfo = session?.user;
  const { t, i18n } = useTranslation();
  const liStyles = "flex flex-col gap-2 text-sm font-medium text-inherit";
  const pathName = usePathname();
  const isLoginPage = pathName?.includes("/login");
  const isEditPage = pathName?.includes("/edit-profile");
  const langName = i18n.language;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  if (window) {
    window.enqueueSnackbar = enqueueSnackbar;
  }

    
  const homeDriverConfig: any = {
    steps: [
      {
        element: '#login-link',
        popover: {
          title: 'Generate your own profile',
          description: 'Login to create your own profile and start building your portfolio',
          side: "left",
          align: 'start',
        },
      },
    ]
  };

  const editDriverConfig: any = {
    steps: [
      {
        element: '.home-button',
        popover: {
          title: 'Back to home',
          description: 'Back to the home page to view exmple profile',
          side: "left",
          align: 'start',
        },
      },
      {
        element: '.preview-button',
        popover: {
          title: 'Preview your profile',
          description: 'Preview your profile to see how it looks',
          side: "left",
          align: 'start',
        },
      },
    ]
  };

  useEffect(() => {
    function initDriver() {
      let homeDriver = null as any;
      let editPageDriver = null;
      if (!isEditPage && !homeViewFlag) {
          homeDriver = driver(homeDriverConfig);
          setTimeout(() => {
            homeDriver.drive();
            localStorage.setItem('homeViewFlag', 'true');
          }, 10000);
          return;
      } 
      if (isEditPage && !editPageViewFlag) {
        editPageDriver = driver(editDriverConfig);
        editPageDriver.drive();
        localStorage.setItem('editPageViewFlag', 'true');
      }
    }
    initDriver();
  }, [isEditPage]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Button
              isIconOnly
              variant="light"
              className="home-button"
            >
              <LiaAddressCard className="text-4xl"/>
            </Button>
            {!isLoginPage && <p className="hidden md:block font-bold text-inherit">{t('header.title')}</p>}
          </NextLink>
        </NavbarBrand>
        {isEditPage && <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href={`/${langName}/view/${userInfo?.name}`}>
            <Button
              isIconOnly
              variant="light"
              color="primary"
              className="preview-button"
            >
              <AiOutlineEye className="text-4xl"/>
            </Button>
          </NextLink>
        </NavbarBrand>}
      </NavbarContent>
      
      {!isLoginPage && 
        <NavbarContent
        className="hidden md:flex"
        justify="center"
        >
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.value}>
                <Link
                  href={link.href}
                  aria-label={t(`header.${link.value}`)}
                  title={t(`header.${link.value}`)}
                  className={liStyles}
                >
                  {t(`header.${link.value}`)}
                </Link>
              </li>
            ))}
          </ul>
        </NavbarContent>
      }

      {!isLoginPage && 
        <NavbarContent
          className="hidden md:flex"
          justify="end"
        >
          <NavbarItem>
            <ThemeSwitch />
          </NavbarItem>
          <NavbarItem>
            <LangSwitcher />
          </NavbarItem>
          <NavbarItem>
            <LoginAvatar userInfo={userInfo} langName={langName} liStyles={liStyles}/>
          </NavbarItem>
        </NavbarContent>
      }
      {!isLoginPage &&   
        <NavbarContent className="md:hidden" justify="end">
          <Button
            isIconOnly
            variant="light"
            onClick={() => setIsMenuOpen(true)}
          >
            <AiOutlineMenu className="text-2xl"/>
          </Button>
          {isMenuOpen && (
              <div className="absolute top-0 left-0 w-full z-50">
                <div className="p-5 bg-background border rounded shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Landing Page Boilerplate"
                        title="Landing Page Boilerplate"
                        className="inline-flex items-center text-inherit"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LiaAddressCard className="text-4xl"/>
                        <p className="font-bold text-inherit">Dynamic resume</p>
                      </Link>
                      {isEditPage && <Link
                        href={`/${langName}/view/${userInfo?.name}`}
                        aria-label="Landing Page Boilerplate"
                        title="Landing Page Boilerplate"
                        className="inline-flex items-center text-inherit"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LiaAddressCard className="text-4xl"/>
                      </Link>}
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="tracking-wide transition-colors duration-200 font-norma"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.value}>
                        <Link
                          href={link.href}
                          aria-label={t(`header.${link.value}`)}
                          title={t(`header.${link.value}`)}
                          className={liStyles}
                          onClick={() => {setIsMenuOpen(false)}}
                        >
                          {t(`header.${link.value}`)}
                        </Link>
                      </li>
                    ))}
                    </ul>
                  </nav>
                  <div className="pt-2">
                    <div className="flex items-center gap-x-5 justify-between">
                      {/* <ul className="items-center gap-6 flex">
                        {iconLinks.map((link) => (
                          <li key={link.name}>
                            <Link
                              href={link.href}
                              aria-label={link.name}
                              title={link.name}
                              target="_blank"
                              className={liStyles}
                            >
                              {link.icon &&
                                React.createElement(link.icon, { className: "text-lg" })}
                            </Link>
                          </li>
                        ))}                      
                      </ul> */}
                      {/* <div className="flex items-center justify-end gap-x-5 w-1/2"> */}
                        <div className="flex max-w-[24px] flex-col items-center justify-center text-inherit">
                          <ThemeSwitch closeMenu={() => {setIsMenuOpen(false)}}/>
                        </div>
                        <div className="flex-1"></div>
                        <LangSwitcher />
                        <div>
                          <LoginAvatar userInfo={userInfo} langName={langName} liStyles={liStyles} closeMenu={() => {setIsMenuOpen(false)}}/>
                        </div>
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
        </NavbarContent>
      }
    </NextUINavbar>
  );
};
